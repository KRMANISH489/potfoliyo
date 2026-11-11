import { SITE_CONFIG, SERVICES, SKILL_CATEGORIES, PRICING_PLANS } from "@/lib/constants";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export const QUICK_REPLIES = [
  "What services do you offer?",
  "What's your tech stack?",
  "How can I contact you?",
  "Tell me about your experience",
];

export function getWelcomeMessage(): string {
  return `Hi! 👋 Welcome to ${SITE_CONFIG.brand} — I'm ${SITE_CONFIG.name.split(" ")[0]}'s assistant. Ask me about services, skills, experience, or how to get in touch!`;
}

/** Match user input to a helpful FAQ response */
export function getBotResponse(input: string): string {
  const msg = input.toLowerCase().trim();

  if (/^(hi|hello|hey|namaste|hola)\b/.test(msg)) {
    return `Hey! 👋 You're chatting with ${SITE_CONFIG.brand} — ${SITE_CONFIG.name}'s studio. Ask me about web development, SEO, projects, or hiring!`;
  }

  if (/service|offer|do you build|website type|kya banate|kya service/.test(msg)) {
    const list = SERVICES.map((s) => `• ${s.title}`).join("\n");
    return `I offer the following services:\n\n${list}\n\nWant details on any specific service? Just ask, or reach out via WhatsApp for a free consultation!`;
  }

  if (/skill|tech|stack|technology|react|node|mongo|framework|language/.test(msg)) {
    const skills = SKILL_CATEGORIES.map(
      (cat) => `**${cat.title}:** ${cat.skills.join(", ")}`
    ).join("\n");
    return `Here's what I work with:\n\n${skills.replace(/\*\*/g, "")}\n\nI build with React.js, Node.js, Express.js, and MongoDB, and I also do on-page, technical, and local SEO.`;
  }

  if (/experience|exp|years|background|about you|kaun ho|kon ho/.test(msg)) {
    return `${SITE_CONFIG.name} is a ${SITE_CONFIG.role} with ${SITE_CONFIG.yearsOfExperience} years of experience, based in ${SITE_CONFIG.location}.\n\n${SITE_CONFIG.intro}`;
  }

  if (/contact|email|phone|whatsapp|reach|call|message|baat|number|mail/.test(msg)) {
    return `You can reach me through:\n\n📧 Email: ${SITE_CONFIG.email}\n📱 Phone/WhatsApp: ${SITE_CONFIG.phone}\n📍 Location: ${SITE_CONFIG.location}\n\nClick the WhatsApp button below to chat directly — I typically reply within 24 hours!`;
  }

  if (/project|portfolio|work|sample|case study|website/.test(msg)) {
    return `You can browse my projects in the Portfolio section on this page, or scroll to "#projects". Each project includes live links, tech stack, and case study details.\n\nHave a similar project in mind? I'd love to hear about it!`;
  }

  if (/price|cost|rate|charge|budget|kitna|paisa|fee|quote|package|pricing/.test(msg)) {
    const plans = PRICING_PLANS.map(
      (plan) => `• ${plan.name}: ₹${plan.price}${plan.unit ? ` ${plan.unit}` : ""} (${plan.delivery})`
    ).join("\n");
    return `Here are the starting packages:\n\n${plans}\n\nDomain & hosting are not included.\n\nScroll to the Pricing section, or message me on WhatsApp (${SITE_CONFIG.phone}) with the package you want.`;
  }

  if (/location|where|delhi|india|based|remote/.test(msg)) {
    return `I'm based in ${SITE_CONFIG.location} and available for remote work with clients worldwide. Distance is never a barrier — I communicate clearly and deliver on time.`;
  }

  if (/hire|work with|freelance|available|collaborat|kaam/.test(msg)) {
    return `Yes, I'm available for freelance and contract work! 🚀\n\nI can build a landing page, business website, or full-stack app — and I can handle the SEO after launch. Use the contact form on this page or message me on WhatsApp.`;
  }

  if (/process|how do you work|timeline|steps/.test(msg)) {
    return `My work process:\n\n1. Requirement Discussion\n2. UI/UX Planning\n3. Development\n4. Testing\n5. Deployment\n6. Ongoing Support\n\nI keep you updated at every step for a smooth experience.`;
  }

  if (/seo|search engine|ranking|keyword|google console|local seo/.test(msg)) {
    return `Yes — I offer SEO along with development.\n\nThat includes on-page SEO, technical SEO, local SEO, keyword research, Google Search Console, and rank tracking.\n\nShare your site on WhatsApp (${SITE_CONFIG.phone}) and I'll tell you where to start.`;
  }

  if (/landing|business website|ecommerce|wordpress|shopify|speed|optim/.test(msg)) {
    return `Yes, I build ${msg.includes("landing") ? "high-converting landing pages" : "custom web solutions"} including landing pages, business sites, e-commerce, WordPress, Shopify, and speed optimization.\n\nTell me about your project on WhatsApp and I'll share how I can help!`;
  }

  if (/thank|thanks|dhanyavad|shukriya/.test(msg)) {
    return `You're welcome! 😊 Feel free to ask anything else, or connect with me directly on WhatsApp. Looking forward to working together!`;
  }

  return `I'm not sure about that specific question, but I'd love to help personally!\n\nTry asking about:\n• Services I offer\n• Tech stack & skills\n• My experience\n• How to contact me\n\nOr tap WhatsApp below to chat with me directly.`;
}
