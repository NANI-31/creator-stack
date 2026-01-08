import mongoose from "mongoose";
import { MONGO_URI } from "./constants";
import { clearUsers, seedUsers } from "./users.seed";
import { clearWebsites, seedWebsites } from "./websites.seed";
import { clearInteractions, seedInteractions } from "./interactions.seed";
import { clearAdminFeatures, seedAdminFeatures } from "./admin.seed";

async function seed() {
  try {
    console.log("🌱 Starting modular seeding process...");
    console.log("🌱 Connecting to database...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1. Clear existing data in reverse dependency order
    console.log("\n🗑️  Step 1: Clearing existing data...");
    await clearAdminFeatures();
    await clearInteractions();
    await clearWebsites();
    await clearUsers();
    console.log("✅ All collections cleared");

    // 2. Seed data in dependency order
    console.log("\n👤 Step 2: Seeding Users...");
    const { admin, users } = await seedUsers();
    console.log(`✅ Admin and ${users.length} users seeded`);

    console.log("\n🌐 Step 3: Seeding Categories and Websites...");
    const { websites } = await seedWebsites(users, admin);
    console.log(`✅ Websites seeded`);

    console.log("\n💬 Step 4: Seeding Interactions (Comments/Votes)...");
    const { comments } = await seedInteractions(users, admin, websites);
    console.log(`✅ Interactions seeded`);

    console.log("\n🚩 Step 5: Seeding Admin Features (Reports/Logs/Notifs)...");
    await seedAdminFeatures(users, admin, websites, comments);
    console.log(`✅ Admin features seeded`);

    console.log("\n🎉 Modular Seeding completed successfully!");
    console.log("   Admin: aa1@a.com / password: a");
    console.log("   Users: a1@a.com to a15@a.com / password: a");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
