/** Site-wide content — update here to change personal details across the site */
export const SITE_CONFIG = {
  name: "Abhishek Kumar Mishra",
  /** Casual dev brand — navbar, logo, chatbot */
  brand: "CodAbhi",
  brandPart1: "Cod",
  brandPart2: "Abhi",
  brandTagline: "code · create · rank",
  role: "Full Stack Developer & SEO",
  headline:
    "I build fast websites with React.js, Node.js, and MongoDB — and handle the SEO that helps them get found.",
  yearsOfExperience: 3,
  intro:
    "I am a Full Stack Developer with 3 years of hands-on experience in landing pages, business websites, and full-stack web apps. I also offer SEO: on-page, technical, and local work, plus keyword research and rank tracking for the sites I build.",
  email: "krmanish489@gmail.com",
  phone: "+91 9173234214",
  whatsapp: "919173234214",
  whatsappLink: "https://wa.link/ra43rd",
  linkedin: "https://www.linkedin.com/in/abhishek-mishra0606/",
  github: "https://github.com/krmanish489",
  location: "New Delhi, India",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "PHP", "Laravel"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    title: "CMS",
    skills: ["WordPress", "Shopify", "Headless CMS"],
  },
  {
    title: "Tools",
    skills: ["GitHub", "Figma", "VS Code", "Postman"],
  },
  {
    title: "Deployment",
    skills: ["Vercel", "Netlify", "cPanel", "AWS"],
  },
  {
    title: "SEO",
    skills: [
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Keyword Research",
      "Search Console",
      "Rank Tracking",
    ],
  },
];

export const SERVICES = [
  {
    title: "Landing Page Development",
    description:
      "High-converting landing pages designed to capture leads and drive sales with modern UI and fast performance.",
    icon: "layout",
  },
  {
    title: "Full Website Development",
    description:
      "Complete business websites with clean structure, responsive design, and SEO-ready architecture.",
    icon: "globe",
  },
  {
    title: "Full Stack Web Applications",
    description:
      "Custom web apps with robust frontends, secure backends, and scalable database architecture.",
    icon: "code",
  },
  {
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins tailored to your brand with easy content management.",
    icon: "wordpress",
  },
  {
    title: "Shopify Website Development",
    description:
      "Beautiful Shopify stores optimized for conversions, product discovery, and smooth checkout flows.",
    icon: "shopping",
  },
  {
    title: "SEO-Friendly Website Structure",
    description:
      "Semantic markup, meta optimization, and performance-first builds that search engines love.",
    icon: "search",
  },
  {
    title: "SEO",
    description:
      "On-page, technical, and local SEO for the sites I build — keyword research, Search Console, and rank tracking so pages get found.",
    icon: "trending",
  },
  {
    title: "Website Speed Optimization",
    description:
      "Core Web Vitals improvements, image optimization, and caching strategies for lightning-fast sites.",
    icon: "zap",
  },
  {
    title: "Website Maintenance",
    description:
      "Ongoing updates, security patches, backups, and support so your site stays reliable.",
    icon: "shield",
  },
];

export const WORK_PROCESS = [
  {
    step: "01",
    title: "Requirement Discussion",
    description: "We align on goals, audience, features, timeline, and success metrics.",
  },
  {
    step: "02",
    title: "UI/UX Planning",
    description: "Wireframes and visual direction ensure the site matches your brand and converts.",
  },
  {
    step: "03",
    title: "Development",
    description: "Clean, scalable code with modern frameworks and best practices throughout.",
  },
  {
    step: "04",
    title: "Testing",
    description: "Cross-browser, mobile, and performance testing before anything goes live.",
  },
  {
    step: "05",
    title: "Deployment",
    description: "Smooth launch on Vercel, Netlify, cPanel, or your preferred hosting platform.",
  },
  {
    step: "06",
    title: "Support",
    description: "Post-launch updates, plus SEO so the site keeps getting found as the business grows.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CEO, BrightPath Agency",
    content:
      "Alex delivered a stunning landing page that doubled our lead generation within the first month. Professional, fast, and incredibly detail-oriented.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Founder, MedCare Plus",
    content:
      "Our healthcare website needed to feel trustworthy and modern. The result exceeded expectations — patients love the new experience.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Director, LuxeStyle",
    content:
      "The Shopify store Alex built is beautiful and fast. Sales increased 40% after launch thanks to the optimized user journey.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Real Estate Broker",
    content:
      "Property listings look premium and load instantly. Alex understood our market and built exactly what we needed to stand out.",
    rating: 5,
  },
];

export const PRICING_PLANS = [
  {
    name: "Informative Website",
    delivery: "1–2 days",
    oldPrice: "2,999",
    price: "999",
    unit: "per page",
    cta: "Get Started",
    popular: false,
    features: [
      "Premium page design",
      "Mobile friendly design",
      "On-page SEO setup",
      "Inquiry / contact form",
      "Social media integration",
      "Google Map integration",
      "WhatsApp integration",
    ],
  },
  {
    name: "Business Website",
    delivery: "3–5 days",
    oldPrice: "10,000",
    price: "4,999",
    unit: "",
    cta: "Book Now",
    popular: true,
    features: [
      "Up to 5 pages",
      "Blog setup",
      "Mobile and SEO friendly design",
      "Contact and inquiry forms",
      "WhatsApp and social media integration",
      "Google Map integration",
      "1 month free maintenance",
    ],
  },
  {
    name: "E-commerce Store",
    delivery: "3–5 days",
    oldPrice: "25,000",
    price: "9,999",
    unit: "",
    cta: "Launch Store",
    popular: false,
    features: [
      "WooCommerce store setup",
      "Payment gateway and shipping setup",
      "Order dashboard",
      "WhatsApp and social media integration",
      "Mobile and SEO friendly design",
      "Contact and inquiry forms",
      "Google Map integration",
      "Popup offers and CTA sections",
      "1 month free maintenance",
    ],
  },
];

export const PROJECT_TYPES = [
  "Landing Page",
  "Business Website",
  "E-commerce Store",
  "Web Application",
  "WordPress Site",
  "Shopify Store",
  "Website Redesign",
  "SEO",
  "Other",
];
