import { faker } from "@faker-js/faker";
import Category from "../src/model/category.model";
import Website from "../src/model/website.model";
import { CATEGORIES, WEBSITES } from "./constants";

export const clearWebsites = async () => {
  console.log("🗑️ Clearing categories and websites...");
  await Category.deleteMany({});
  await Website.deleteMany({});
};

export const seedWebsites = async (users: any[], admin: any) => {
  console.log("📂 Creating categories...");
  const categories = await Category.insertMany(CATEGORIES);

  console.log("🌐 Creating 30 websites...");
  const websites = [];
  for (const siteData of WEBSITES) {
    const author = faker.helpers.arrayElement([...users, admin]);
    const category = faker.helpers.arrayElement(categories);

    const website = await Website.create({
      name: siteData.name,
      url: siteData.url,
      description: siteData.description,
      category: category._id,
      tags: faker.helpers.arrayElements(
        ["free", "paid", "open-source", "saas", "tool", "productivity"],
        { min: 1, max: 3 }
      ),
      thumbnail: `https://logo.clearbit.com/${new URL(siteData.url).hostname}`,
      author: author._id,
      stats: {
        upvotes: faker.number.int({ min: 10, max: 500 }),
        downvotes: faker.number.int({ min: 0, max: 50 }),
        rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
        reviewCount: faker.number.int({ min: 5, max: 100 }),
        commentCount: 0,
      },
      isFeatured: faker.datatype.boolean(),
      status: faker.helpers.arrayElement([
        "Approved",
        "Approved",
        "Approved",
        "Pending",
      ]),
    });
    websites.push(website);

    await Category.findByIdAndUpdate(category._id, {
      $inc: { websiteCount: 1 },
    });
  }

  return { categories, websites };
};
