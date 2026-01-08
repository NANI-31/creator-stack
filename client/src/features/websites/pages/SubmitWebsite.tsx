import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  HiOutlineGlobeAlt,
  HiOutlinePhotograph,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi";

import { toast } from "react-hot-toast";
import { websiteApi } from "../services/website.service";

const SubmitWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<
    { _id: string; name: string; slug: string }[]
  >([]);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    shortDesc: "",
    longDesc: "",
    category: "",
    audience: "Creator",
    pricing: "Free",
    pricingNotes: "",
    agreed: false,
    confirmed: false,
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await websiteApi.getCategories();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) =>
    setFeatures(features.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed || !formData.confirmed) {
      toast.error("Please confirm the guidelines and terms.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Map frontend data to backend model
      const payload = {
        name: formData.name,
        url: formData.url,
        description: formData.longDesc || formData.shortDesc, // Use detailed if available, else short
        categorySlug: formData.category, // Use selected slug directly
        tags: tags,
        // thumbnail: "", // TODO: Handle image upload
      };

      await websiteApi.create(payload);
      toast.success("Website submitted successfully!");
      navigate("/submission-success");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit website");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-(--color-sextary) mb-2">
            Submit a New Website
          </h1>
          <p className="text-(--color-quinary)/70 font-medium">
            Help others discover useful tools and resources across the web.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-(--color-secondary)/40 backdrop-blur-sm border border-(--color-secondary)/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-12">
          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Section 1: Basic Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-(--color-quinary)/10">
                <div className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center text-tertiary">
                  <HiOutlineInformationCircle size={20} />
                </div>
                <h3 className="text-xl font-black text-(--color-sextary)">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Website Name*
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CreatorStack"
                    className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 px-5 outline-none font-bold text-(--color-sextary) transition-all placeholder:text-(--color-quinary)/30"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Website URL*
                  </label>
                  <div className="relative">
                    <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-quinary)/30" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 pl-11 pr-5 outline-none font-bold text-(--color-sextary) transition-all placeholder:text-(--color-quinary)/30"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData({ ...formData, url: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                  Short Description*
                </label>
                <input
                  type="text"
                  placeholder="Catchy headline for your tool (max 100 characters)"
                  maxLength={100}
                  className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 px-5 outline-none font-bold text-(--color-sextary) transition-all placeholder:text-(--color-quinary)/30"
                  value={formData.shortDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDesc: e.target.value })
                  }
                />
                <div className="flex justify-end pr-2">
                  <span className="text-[10px] font-bold text-(--color-quinary)/40">
                    {formData.shortDesc.length}/100
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell the community why they should use this website..."
                  className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-4 px-5 outline-none font-bold text-(--color-sextary) transition-all resize-none placeholder:text-(--color-quinary)/30"
                  value={formData.longDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, longDesc: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Section 2: Categorization */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-(--color-quinary)/10">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-600">
                  <HiOutlineExclamationCircle size={20} />
                </div>
                <h3 className="text-xl font-black text-(--color-sextary)">
                  Categorization
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Category*
                  </label>
                  <select
                    className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 px-5 outline-none font-bold text-(--color-sextary) transition-all appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Intended Audience
                  </label>
                  <div className="flex gap-2">
                    {["Developer", "Designer", "Creator"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, audience: role })
                        }
                        className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all ${
                          formData.audience === role
                            ? "bg-quaternary text-white shadow-md shadow-orange-500/20"
                            : "bg-white text-(--color-quinary)/50 hover:bg-white/80"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                  Tags (Press Enter)
                </label>
                <div className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl p-2 flex flex-wrap gap-2 transition-all">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-(--color-primary) text-quaternary px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        type="button"
                        className="hover:text-quinary transition-colors"
                      >
                        <HiOutlineX size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={
                      tags.length === 0
                        ? "Add tags e.g. Open Source, React..."
                        : ""
                    }
                    className="flex-1 bg-transparent border-none outline-none py-2 px-3 font-bold text-sm text-(--color-sextary) min-w-37.5"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Pricing */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-(--color-quinary)/10">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-600">
                  <HiOutlineCheckCircle size={20} />
                </div>
                <h3 className="text-xl font-black text-(--color-sextary)">
                  Pricing & Access
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Free", "Freemium", "Paid"].map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setFormData({ ...formData, pricing: plan })}
                    className={`py-6 rounded-3xl flex flex-col items-center gap-2 border-2 transition-all ${
                      formData.pricing === plan
                        ? "bg-white border-quaternary text-quaternary shadow-xl"
                        : "bg-white border-transparent text-(--color-quinary)/40 hover:border-(--color-secondary)"
                    }`}
                  >
                    <span className="text-sm font-black uppercase tracking-widest">
                      {plan}
                    </span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                  Pricing Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14-day free trial, Credit card required..."
                  className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 px-5 outline-none font-bold text-(--color-sextary) transition-all placeholder:text-(--color-quinary)/30"
                  value={formData.pricingNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, pricingNotes: e.target.value })
                  }
                />
              </div>
            </section>

            {/* Section 4: Media */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-(--color-quinary)/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-600">
                  <HiOutlinePhotograph size={20} />
                </div>
                <h3 className="text-xl font-black text-(--color-sextary)">
                  Logo & Media
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Website Logo
                  </label>
                  <div className="border-4 border-dashed border-(--color-secondary) rounded-3xl p-8 flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-2xl bg-(--color-primary) flex items-center justify-center text-quaternary mb-4 group-hover:scale-110 transition-transform">
                      <HiOutlinePlus size={32} />
                    </div>
                    <p className="text-xs font-black text-(--color-quinary)/40 uppercase tracking-widest">
                      Upload PNG/SVG
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-(--color-quinary) uppercase tracking-widest pl-1">
                    Hero Screenshot
                  </label>
                  <div className="border-4 border-dashed border-(--color-secondary) rounded-3xl p-8 flex flex-col items-center justify-center bg-white/40 hover:bg-white/60 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-2xl bg-(--color-primary) flex items-center justify-center text-quaternary mb-4 group-hover:scale-110 transition-transform">
                      <HiOutlinePlus size={32} />
                    </div>
                    <p className="text-xs font-black text-(--color-quinary)/40 uppercase tracking-widest">
                      Landscape (16:9)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Features */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-(--color-quinary)/10">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-600">
                  <HiOutlinePlus size={20} />
                </div>
                <h3 className="text-xl font-black text-(--color-sextary)">
                  Key Features
                </h3>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-quaternary font-black text-sm">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder="Detail a standout feature..."
                        className="w-full bg-white border-2 border-transparent focus:border-quaternary/30 rounded-2xl py-3 pl-10 pr-5 outline-none font-bold text-(--color-sextary) transition-all"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                      />
                    </div>
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-3 text-(--color-quinary)/30 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                      >
                        <HiOutlineX size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full py-4 border-2 border-dashed border-(--color-secondary) rounded-2xl text-xs font-black text-quaternary hover:bg-white/40 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <HiOutlinePlus /> Add Another Feature
                </button>
              </div>
            </section>

            {/* Section 6: Guidelines */}
            <section className="space-y-4 pt-6">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={formData.confirmed}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmed: e.target.checked })
                    }
                  />
                  <div className="w-6 h-6 border-2 border-(--color-secondary) rounded-lg peer-checked:bg-quaternary peer-checked:border-quaternary transition-all flex items-center justify-center text-white">
                    <HiOutlineCheckCircle
                      size={14}
                      className={
                        formData.confirmed ? "opacity-100" : "opacity-0"
                      }
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-(--color-quinary)/70 group-hover:text-(--color-sextary) transition-colors select-none">
                  I confirm this website is safe, relevant, and useful for the
                  community.
                </span>
              </label>

              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={formData.agreed}
                    onChange={(e) =>
                      setFormData({ ...formData, agreed: e.target.checked })
                    }
                  />
                  <div className="w-6 h-6 border-2 border-(--color-secondary) rounded-lg peer-checked:bg-quaternary peer-checked:border-quaternary transition-all flex items-center justify-center text-white">
                    <HiOutlineCheckCircle
                      size={14}
                      className={formData.agreed ? "opacity-100" : "opacity-0"}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-(--color-quinary)/70 group-hover:text-(--color-sextary) transition-colors select-none">
                  I agree to the community guidelines and terms of service.
                </span>
              </label>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 py-4! text-base shadow-xl shadow-orange-500/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Website"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 py-4! text-base border-quinary/10! text-quinary/60! hover:bg-white!"
                disabled={isSubmitting}
              >
                Save as Draft
              </Button>
              <button
                type="button"
                className="px-8 py-4 text-sm font-black text-(--color-quinary)/40 hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitWebsite;
