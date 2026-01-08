import { faker } from "@faker-js/faker";
import User from "../src/model/user.model";

export const clearUsers = async () => {
  console.log("🗑️ Clearing users...");
  await User.deleteMany({});
};

export const seedUsers = async () => {
  const plainPassword = "a";

  console.log("👤 Creating admin user...");
  const admin = await User.create({
    fullName: "Admin User",
    username: "admin",
    email: "aa1@a.com",
    password: plainPassword,
    role: "Admin",
    status: "Active",
    reputation: 1000,
    isVerified: true,
  });

  console.log("👥 Creating 15 regular users...");
  const users = [];
  const roles = [
    "User",
    "User",
    "User",
    "Developer",
    "Designer",
    "Creator",
    "Moderator",
  ];
  const statuses = ["Active", "Active", "Active", "Suspended", "Banned"];

  for (let i = 1; i <= 15; i++) {
    const user = await User.create({
      fullName: faker.person.fullName(),
      username: faker.internet.username().toLowerCase(),
      email: `a${i}@a.com`,
      password: plainPassword,
      role: faker.helpers.arrayElement(roles),
      status: "Active",
      reputation: faker.number.int({ min: -100, max: 1000 }),
      bio: faker.person.bio(),
      isVerified: faker.datatype.boolean(),
    });
    users.push(user);
  }

  return { admin, users };
};
