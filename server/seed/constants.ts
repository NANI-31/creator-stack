import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/creatorstack";

export const CATEGORIES = [
  {
    name: "Development",
    slug: "development",
    icon: "💻",
    color: "#3B82F6",
    status: "Active",
  },
  {
    name: "Design",
    slug: "design",
    icon: "🎨",
    color: "#EC4899",
    status: "Active",
  },
  {
    name: "Productivity",
    slug: "productivity",
    icon: "⚡",
    color: "#F59E0B",
    status: "Active",
  },
  {
    name: "AI & ML",
    slug: "ai-ml",
    icon: "🤖",
    color: "#8B5CF6",
    status: "Active",
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: "📢",
    color: "#10B981",
    status: "Hidden",
  },
  {
    name: "No-Code",
    slug: "no-code",
    icon: "🧩",
    color: "#6366F1",
    status: "Active",
  },
];

export const WEBSITES = [
  {
    name: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software",
  },
  {
    name: "Figma",
    url: "https://figma.com",
    description: "Collaborative design tool for teams",
  },
  {
    name: "Notion",
    url: "https://notion.so",
    description: "All-in-one workspace for notes and docs",
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    description: "AI assistant for everything",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    description: "Deploy frontend projects with ease",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework",
  },
  {
    name: "Slack",
    url: "https://slack.com",
    description: "Team communication hub",
  },
  {
    name: "Linear",
    url: "https://linear.app",
    description: "Issue tracking for modern teams",
  },
  {
    name: "Framer",
    url: "https://framer.com",
    description: "Design and publish stunning sites",
  },
  {
    name: "Midjourney",
    url: "https://midjourney.com",
    description: "AI image generation",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    description: "Payment infrastructure for the internet",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    description: "Open source Firebase alternative",
  },
  {
    name: "Webflow",
    url: "https://webflow.com",
    description: "Visual web development platform",
  },
  {
    name: "Airtable",
    url: "https://airtable.com",
    description: "Spreadsheet meets database",
  },
  {
    name: "Canva",
    url: "https://canva.com",
    description: "Design anything, publish anywhere",
  },
  {
    name: "Mailchimp",
    url: "https://mailchimp.com",
    description: "Email marketing made easy",
  },
  {
    name: "Loom",
    url: "https://loom.com",
    description: "Async video messaging for work",
  },
  {
    name: "Miro",
    url: "https://miro.com",
    description: "Online whiteboard for teams",
  },
  {
    name: "Zapier",
    url: "https://zapier.com",
    description: "Automate your workflows",
  },
  {
    name: "Calendly",
    url: "https://calendly.com",
    description: "Scheduling made simple",
  },
  {
    name: "Hotjar",
    url: "https://hotjar.com",
    description: "Website heatmaps and behavior analytics",
  },
  {
    name: "Cloudflare",
    url: "https://cloudflare.com",
    description: "Web security and performance",
  },
  {
    name: "Railway",
    url: "https://railway.app",
    description: "Deploy apps in seconds",
  },
  {
    name: "PlanetScale",
    url: "https://planetscale.com",
    description: "Serverless MySQL platform",
  },
  {
    name: "Prisma",
    url: "https://prisma.io",
    description: "Next-gen Node.js and TypeScript ORM",
  },
  {
    name: "Postman",
    url: "https://postman.com",
    description: "API platform for developers",
  },
  {
    name: "Raycast",
    url: "https://raycast.com",
    description: "Mac productivity launcher",
  },
  {
    name: "Arc Browser",
    url: "https://arc.net",
    description: "The browser reimagined",
  },
  {
    name: "Obsidian",
    url: "https://obsidian.md",
    description: "Private knowledge base",
  },
  {
    name: "Cursor",
    url: "https://cursor.sh",
    description: "AI-first code editor",
  },
];
