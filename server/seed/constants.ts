import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/creatorstack";

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
  // --- Development ---
  {
    name: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com",
    description: "DevOps platform delivered as a single application",
  },
  {
    name: "Bitbucket",
    url: "https://bitbucket.org",
    description: "Git code management for teams",
  },
  {
    name: "VS Code",
    url: "https://code.visualstudio.com",
    description: "Code editing. Redefined",
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    description: "Where developers learn, share, & build careers",
  },
  {
    name: "Docker",
    url: "https://www.docker.com",
    description: "Accelerate how you build, share, and run applications",
  },
  {
    name: "Kubernetes",
    url: "https://kubernetes.io",
    description: "Production-Grade Container Orchestration",
  },
  {
    name: "AWS",
    url: "https://aws.amazon.com",
    description: "Cloud Computing Services",
  },
  {
    name: "Google Cloud",
    url: "https://cloud.google.com",
    description: "Cloud Computing Services",
  },
  {
    name: "Azure",
    url: "https://azure.microsoft.com",
    description: "Cloud Computing Services",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    description: "Deploy frontend projects with ease",
  },
  {
    name: "Netlify",
    url: "https://netlify.com",
    description: "Develop and deploy the best web experiences",
  },
  {
    name: "Heroku",
    url: "https://heroku.com",
    description: "Platform as a service based on a managed container system",
  },
  {
    name: "DigitalOcean",
    url: "https://digitalocean.com",
    description: "The developer cloud",
  },
  {
    name: "Fly.io",
    url: "https://fly.io",
    description: "Run your full stack apps (and databases) close to your users",
  },
  {
    name: "Railway",
    url: "https://railway.app",
    description: "Deploy apps in seconds",
  },
  {
    name: "Render",
    url: "https://render.com",
    description: "Cloud Application Hosting",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    description: "Open source Firebase alternative",
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com",
    description:
      "Google's mobile platform that helps you quickly develop high-quality apps",
  },
  {
    name: "PlanetScale",
    url: "https://planetscale.com",
    description: "Serverless MySQL platform",
  },
  {
    name: "MongoDB Atlas",
    url: "https://www.mongodb.com/atlas",
    description: "Multi-cloud developer data platform",
  },
  {
    name: "Redis",
    url: "https://redis.io",
    description: "The open source, in-memory data store",
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
    name: "Insomnia",
    url: "https://insomnia.rest",
    description: "The API Design Platform",
  },
  {
    name: "Sentry",
    url: "https://sentry.io",
    description: "Application Performance Monitoring & Error Tracking",
  },
  {
    name: "LogRocket",
    url: "https://logrocket.com",
    description: "Frontend Application Monitoring",
  },
  {
    name: "Datadog",
    url: "https://datadoghq.com",
    description: "Cloud Monitoring as a Service",
  },
  {
    name: "Auth0",
    url: "https://auth0.com",
    description: "Secure access for everyone. But not just anyone",
  },
  {
    name: "Clerk",
    url: "https://clerk.com",
    description: "The most comprehensive User Management Platform",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    description: "Payment infrastructure for the internet",
  },
  {
    name: "Lemon Squeezy",
    url: "https://lemonsqueezy.com",
    description: "Payments, tax & subscriptions for software companies",
  },
  {
    name: "Paddle",
    url: "https://paddle.com",
    description: "Complete payment, tax, and subscriptions solution for SaaS",
  },
  {
    name: "Algolia",
    url: "https://algolia.com",
    description: "Search and Discovery API",
  },
  {
    name: "Twilio",
    url: "https://twilio.com",
    description: "Communication APIs for SMS, Voice, Video and Authentication",
  },
  {
    name: "Resend",
    url: "https://resend.com",
    description: "Email for developers",
  },
  {
    name: "Mailgun",
    url: "https://mailgun.com",
    description: "Transactional Email API Service",
  },

  // --- Design ---
  {
    name: "Figma",
    url: "https://figma.com",
    description: "Collaborative design tool for teams",
  },
  {
    name: "Adobe XD",
    url: "https://helpx.adobe.com/xd/get-started.html",
    description: "Fast & powerful UI/UX design solution",
  },
  {
    name: "Sketch",
    url: "https://www.sketch.com",
    description: "The digital design toolkit",
  },
  {
    name: "Canva",
    url: "https://canva.com",
    description: "Design anything, publish anywhere",
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com",
    description: "Discover the world’s top designers & creative professionals",
  },
  {
    name: "Behance",
    url: "https://behance.net",
    description: "Showcase and discover creative work",
  },
  {
    name: "Unsplash",
    url: "https://unsplash.com",
    description: "The internet’s source of freely-usable images",
  },
  {
    name: "Pexels",
    url: "https://pexels.com",
    description: "The best free stock photos, royalty free images & videos",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Utility-first CSS framework",
  },
  {
    name: "Google Fonts",
    url: "https://fonts.google.com",
    description: "Library of free licensed font families",
  },
  {
    name: "FontAwesome",
    url: "https://fontawesome.com",
    description: "The internet's icon library and toolkit",
  },
  {
    name: "Coolors",
    url: "https://coolors.co",
    description: "The super fast color palettes generator",
  },
  {
    name: "Framer",
    url: "https://framer.com",
    description: "Design and publish stunning sites",
  },
  {
    name: "Webflow",
    url: "https://webflow.com",
    description: "Visual web development platform",
  },
  {
    name: "Spline",
    url: "https://spline.design",
    description: "3D Design tool for the web",
  },
  {
    name: "Rive",
    url: "https://rive.app",
    description: "Build interactive animations that run anywhere",
  },
  {
    name: "LottieFiles",
    url: "https://lottiefiles.com",
    description: "Lightweight, scalable animations for your apps and websites",
  },

  // --- Productivity ---
  {
    name: "Notion",
    url: "https://notion.so",
    description: "All-in-one workspace for notes and docs",
  },
  {
    name: "Obsidian",
    url: "https://obsidian.md",
    description: "Private knowledge base",
  },
  {
    name: "Trello",
    url: "https://trello.com",
    description: "Manage teams and projects",
  },
  {
    name: "Asana",
    url: "https://asana.com",
    description: "Work management platform",
  },
  {
    name: "Monday.com",
    url: "https://monday.com",
    description: "A platform built for a new way of working",
  },
  {
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    description: "Issue tracking and project management",
  },
  {
    name: "Linear",
    url: "https://linear.app",
    description: "Issue tracking for modern teams",
  },
  {
    name: "ClickUp",
    url: "https://clickup.com",
    description: "One app to replace them all",
  },
  {
    name: "Basecamp",
    url: "https://basecamp.com",
    description: "Project management and team communication",
  },
  {
    name: "Slack",
    url: "https://slack.com",
    description: "Team communication hub",
  },
  {
    name: "Discord",
    url: "https://discord.com",
    description: "Place to talk and hang out",
  },
  {
    name: "Microsoft Teams",
    url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software",
    description: "Chat, meetings, calling, and collaboration",
  },
  {
    name: "Zoom",
    url: "https://zoom.us",
    description:
      "Video conferencing, web conferencing, webinars, screen sharing",
  },
  {
    name: "Google Meet",
    url: "https://meet.google.com",
    description: "Real-time meetings by Google",
  },
  {
    name: "Calendly",
    url: "https://calendly.com",
    description: "Scheduling made simple",
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
    name: "Zapier",
    url: "https://zapier.com",
    description: "Automate your workflows",
  },
  {
    name: "Make",
    url: "https://www.make.com",
    description: "Design, build, and automate anything",
  },
  {
    name: "IFTTT",
    url: "https://ifttt.com",
    description: "Connect your apps and devices",
  },
  {
    name: "1Password",
    url: "https://1password.com",
    description: "Password Manager for Families, Enterprise, & Teams",
  },
  {
    name: "LastPass",
    url: "https://lastpass.com",
    description: "#1 Password Manager & Vault App",
  },

  // --- AI & ML ---
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    description: "AI assistant for everything",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    description: "Next-generation AI assistant",
  },
  {
    name: "Perplexity",
    url: "https://perplexity.ai",
    description: "Where knowledge begins",
  },
  {
    name: "Midjourney",
    url: "https://midjourney.com",
    description: "AI image generation",
  },
  {
    name: "Stable Diffusion",
    url: "https://stability.ai",
    description: "Generative AI models",
  },
  {
    name: "Hugging Face",
    url: "https://huggingface.co",
    description: "The AI community building the future",
  },
  {
    name: "Replit",
    url: "https://replit.com",
    description: "Software creation platform",
  },
  {
    name: "Github Copilot",
    url: "https://github.com/features/copilot",
    description: "Your AI pair programmer",
  },
  {
    name: "Cursor",
    url: "https://cursor.sh",
    description: "AI-first code editor",
  },
  {
    name: "Jasper",
    url: "https://www.jasper.ai",
    description: "AI Create Content Faster",
  },
  {
    name: "Copy.ai",
    url: "https://copy.ai",
    description: "Write better marketing copy and content with AI",
  },
  {
    name: "Runway",
    url: "https://runwayml.com",
    description: "Advancing creativity with artificial intelligence",
  },
  {
    name: "Synthesia",
    url: "https://www.synthesia.io",
    description: "#1 AI Video Generator",
  },

  // --- Marketing & Analytics ---
  {
    name: "Google Analytics",
    url: "https://analytics.google.com",
    description: "Get to know your customers",
  },
  {
    name: "Hotjar",
    url: "https://hotjar.com",
    description: "Website heatmaps and behavior analytics",
  },
  {
    name: "Mixpanel",
    url: "https://mixpanel.com",
    description: "Product analytics for mobile, web, and more",
  },
  {
    name: "Segment",
    url: "https://segment.com",
    description: "The leading Customer Data Platform",
  },
  {
    name: "HubSpot",
    url: "https://www.hubspot.com",
    description:
      "CRM platform that has all the software, integrations, and resources you need",
  },
  {
    name: "Salesforce",
    url: "https://www.salesforce.com",
    description: "The Customer Company",
  },
  {
    name: "Mailchimp",
    url: "https://mailchimp.com",
    description: "Email marketing made easy",
  },
  {
    name: "ConvertKit",
    url: "https://convertkit.com",
    description: "The creator marketing platform",
  },
  {
    name: "Beehiiv",
    url: "https://www.beehiiv.com",
    description: "The newsletter platform built for growth",
  },
  {
    name: "Substack",
    url: "https://substack.com",
    description: "The home for great writing",
  },
  {
    name: "Buffer",
    url: "https://buffer.com",
    description: "Grow your audience on social",
  },
  {
    name: "Hootsuite",
    url: "https://hootsuite.com",
    description: "Social Media Marketing & Management Dashboard",
  },
  {
    name: "Gumroad",
    url: "https://gumroad.com",
    description: "Sell what you know and see what sticks",
  },
  {
    name: "Product Hunt",
    url: "https://producthunt.com",
    description: "The best new products in tech",
  },

  // --- No-Code ---
  {
    name: "Bubble",
    url: "https://bubble.io",
    description: "The best way to build web apps without code",
  },
  {
    name: "Softr",
    url: "https://www.softr.io",
    description:
      "Build client portals and internal tools on Airtable/Google Sheets",
  },
  {
    name: "Glide",
    url: "https://www.glideapps.com",
    description: "Create the software your business needs",
  },
  {
    name: "Carrd",
    url: "https://carrd.co",
    description: "Simple, free, fully responsive one-page sites",
  },
  {
    name: "Typeform",
    url: "https://www.typeform.com",
    description: "People-friendly forms and surveys",
  },
  {
    name: "Airtable",
    url: "https://airtable.com",
    description: "Spreadsheet meets database",
  },
  {
    name: "Cloudflare",
    url: "https://cloudflare.com",
    description: "Web security and performance",
  },
];
