import { faker } from "@faker-js/faker";
import Comment from "../src/model/comment.model";
import Vote from "../src/model/vote.model";
import Website from "../src/model/website.model";

export const clearInteractions = async () => {
  console.log("🗑️ Clearing comments and votes...");
  await Comment.deleteMany({});
  await Vote.deleteMany({});
};

export const seedInteractions = async (
  users: any[],
  admin: any,
  websites: any[]
) => {
  console.log("💬 Creating comments...");
  const comments = [];
  for (const website of websites) {
    const numComments = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numComments; i++) {
      const author = faker.helpers.arrayElement([...users, admin]);
      const comment = await Comment.create({
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        author: author._id,
        website: website._id,
        upvotes: faker.number.int({ min: 0, max: 20 }),
        downvotes: faker.number.int({ min: 0, max: 5 }),
      });
      comments.push(comment);
    }
    await Website.findByIdAndUpdate(website._id, {
      "stats.commentCount": numComments,
    });
  }

  console.log("🗳️ Creating votes...");
  for (const website of websites.slice(0, 15)) {
    const voterCount = faker.number.int({ min: 3, max: 8 });
    const voters = faker.helpers.arrayElements(users, voterCount);
    for (const voter of voters) {
      try {
        await Vote.create({
          user: voter._id,
          target: website._id,
          targetType: "Website",
          voteType: faker.helpers.arrayElement([
            "upvote",
            "upvote",
            "upvote",
            "downvote",
          ]),
        });
      } catch (e) {}
    }
  }

  return { comments };
};
