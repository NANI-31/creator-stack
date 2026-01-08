import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Types
import type { Submission } from "../components/SubmissionReview/types";

// Modular Components
import Header from "../components/SubmissionReview/Header";
import ContentCard from "../components/SubmissionReview/ContentCard";
import AuthorCard from "../components/SubmissionReview/AuthorCard";
import CommunitySignal from "../components/SubmissionReview/CommunitySignal";
import QualityChecklist from "../components/SubmissionReview/QualityChecklist";
import ActionConsole from "../components/SubmissionReview/ActionConsole";
import AuditTrail from "../components/SubmissionReview/AuditTrail";

const SubmissionReview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adminNote, setAdminNote] = useState("");
  const [checklist, setChecklist] = useState({
    reachable: false,
    descriptionAccurate: false,
    categoryCorrect: false,
    contentSafe: false,
    noMalware: false,
  });

  // Mock Data (In a real app, this would be fetched by ID)
  const submission: Submission = {
    id: "1",
    name: "Cursor AI",
    url: "https://cursor.sh",
    favicon: "https://www.google.com/s2/favicons?domain=cursor.sh&sz=64",
    description:
      "Cursor is an AI-first code editor designed to make pair-programming with AI seamless. It allows engineers to build software faster with features like semantic search, codebase indexing, and smart suggestions.",
    fullDescription:
      "Cursor is built on top of VS Code, so it supports all extensions and themes. It integrates deeply with your codebase, allowing you to ask questions about specific files or the entire project. Features include 'Cmd+K' to edit code with AI, 'Copilot++' for predictive coding, and a chat interface that understands your project context. Ideally suited for developers looking to boost productivity with LLMs.",
    category: "IDE / AI",
    tags: ["AI", "Code Editor", "Productivity", "Free Plan"],
    pricing: "Freemium",
    submittedBy: {
      username: "alex_dev",
      avatar: "https://i.pravatar.cc/150?u=alex",
      reputation: 1250,
      totalSubmissions: 42,
      joinDate: "2023-11-15",
    },
    stats: {
      upvotes: 1240,
      rating: 4.9,
      reviewCount: 86,
      comments: 12,
    },
    status: "Pending",
    submittedDate: "2024-03-20 14:30",
    history: [
      {
        action: "Submitted",
        user: "alex_dev",
        date: "2024-03-20 14:30",
        note: "",
      },
      {
        action: "Review Started",
        user: "Admin",
        date: "2024-03-21 09:15",
        note: "Assigning to self for detailed review.",
      },
    ],
  };

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprove = () => console.log("Approved", id);
  const handleReject = () => console.log("Rejected", id);
  const handleSaveDraft = () => console.log("Draft Saved", adminNote);
  const handleDelete = () => console.log("Deleted", id);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      <Header
        id={id}
        status={submission.status}
        submittedDate={submission.submittedDate}
        onBack={() => navigate("/admin/submissions")}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Content Validation */}
        <div className="lg:col-span-2 space-y-8">
          <ContentCard submission={submission} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AuthorCard author={submission.submittedBy} />
            <CommunitySignal stats={submission.stats} />
          </div>
        </div>

        {/* Right Column: Moderation Console (Sticky) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">
          <QualityChecklist checklist={checklist} onToggle={toggleChecklist} />

          <ActionConsole
            adminNote={adminNote}
            setAdminNote={setAdminNote}
            onSaveDraft={handleSaveDraft}
            onDelete={handleDelete}
          />

          <AuditTrail history={submission.history} />
        </div>
      </div>
    </div>
  );
};

export default SubmissionReview;
