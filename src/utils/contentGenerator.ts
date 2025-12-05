import type { Service, Area, Neighborhood, ProgrammaticPageData } from '../types';

// Helper to pick a random item from an array, providing variety.
// Simple seeded random number generator
const mulberry32 = (a: number) => {
  return () => {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

// Convert string seed to number
const cyrb128 = (str: string) => {
  let h1 = 1779033703, h2 = 3144134277,
    h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
}

// Helper to pick a random item from an array using a seed
const pickRandom = <T>(arr: T[], seed: string): T => {
  const seedNum = cyrb128(seed);
  const rand = mulberry32(seedNum);
  // Warm up
  rand();
  // Use the random number to pick an index
  // We use a specific sequence based on the array length to ensure "randomness" but consistency
  // However, for simple picking, just using the next random float is enough if the seed is unique per call context.
  // BUT, since we call pickRandom multiple times in the same function with the SAME seed (service+area),
  // we need to vary the seed slightly for each call, OR pass a mutable random generator.
  // To keep it stateless and simple, we will append a "context" string to the seed.
  return arr[Math.floor(rand() * arr.length)];
};

// We need a way to generate a sequence of random choices from a single seed.
// Let's create a class or closure for it.
class SeededGenerator {
  private rand: () => number;

  constructor(seed: string) {
    const seedNum = cyrb128(seed);
    this.rand = mulberry32(seedNum);
  }

  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.rand() * arr.length)];
  }
}


/**
 * Generates programmatic SEO content for a specific service in a given city/area.
 * This function creates unique-feeling, SEO-optimized content on the fly.
 */
export function generateProgrammaticData(service: Service, area: Area): ProgrammaticPageData {
  // Initialize seeded generator
  // The seed is a combination of service and area to ensure consistency for this specific page
  const generator = new SeededGenerator(`${service.slug}-${area.slug}`);

  // Expanded Spintax for page content
  const pageTitleTemplates = [
    `Your Go-To ${service.title} Specialists in ${area.name}`,
    `Expert ${service.title} Services in ${area.name}, NC`,
    `Top-Rated ${area.name} ${service.title} Company`,
    `Reliable ${service.title} for ${area.name} Homes`,
    `The Best ${service.title} in ${area.name}, North Carolina`,
    `${area.name}'s Premier ${service.title} Service Provider`
  ];

  const pageDescriptionTemplates = [
    `Tidy & Fix is proud to be ${area.name}'s trusted provider for expert ${service.title.toLowerCase()}. Our local team is committed to delivering outstanding results for your home or business.`,
    `Looking for reliable ${service.title.toLowerCase()} in ${area.name}? Our professional team offers top-quality service with a satisfaction guarantee.`,
    `From routine maintenance to complex jobs, Tidy & Fix is the leading choice for ${service.title.toLowerCase()} in the ${area.name} area.`,
    `We bring professional ${service.title.toLowerCase()} directly to your door in ${area.name}. Experience the Tidy & Fix difference today.`,
    `Serving the ${area.name} community with pride, we offer comprehensive ${service.title.toLowerCase()} solutions tailored to your needs.`
  ];

  // Expanded Spintax for SEO meta content
  const metaTitleTemplates = [
    `Expert ${service.title} in ${area.name}, NC | Tidy & Fix`,
    `Local ${service.title} Services in ${area.name} | Get a Free Quote`,
    `${area.name} ${service.title} | Licensed & Insured Experts`,
    `Best ${service.title} Near Me in ${area.name} | Tidy & Fix`,
    `Affordable ${service.title} in ${area.name}, NC`
  ];

  const metaDescriptionTemplates = [
    `Top-rated ${service.title.toLowerCase()} in ${area.name}. Our local, licensed team guarantees satisfaction. Eco-friendly options available. Get your free estimate today!`,
    `Need reliable ${service.title.toLowerCase()} in ${area.name}, NC? Tidy & Fix offers fast, professional service for your home or business. Call now for a free quote!`,
    `Your specialist for ${service.title.toLowerCase()} in ${area.name}. From ${service.slug.includes('clean') ? 'deep cleaning' : 'minor repairs'} to major projects, we do it all. Book online!`,
    `Trust Tidy & Fix for all your ${service.title.toLowerCase()} needs in ${area.name}. We are local, experienced, and ready to help.`,
    `Serving ${area.name} with excellence. Our ${service.title.toLowerCase()} is second to none. Contact us for a consultation.`
  ];

  // Dynamic Intro Paragraphs
  const introTemplates = [
    area.uniqueSellingPoint
      ? `As a city known for ${area.uniqueSellingPoint}, ${area.name} deserves the best. We provide premier ${service.title.toLowerCase()} services that match the quality of our community.`
      : `As ${area.name}'s premier choice for ${service.title.toLowerCase()}, we pride ourselves on delivering exceptional quality and unmatched customer service.`,

    `Living in ${area.name} means enjoying a certain quality of life. At Tidy & Fix, we help maintain that standard with our top-tier ${service.title.toLowerCase()}.`,

    `For homeowners and businesses in ${area.name}, finding reliable ${service.title.toLowerCase()} shouldn't be a hassle. We make it easy with our professional, prompt service.`
  ];

  // Dynamic Landmark Paragraphs
  const landmarkTemplates = [
    area.landmark
      ? `Whether you are located near ${area.landmark} or in the surrounding neighborhoods, our teams are ready to serve you with prompt and professional ${service.title.toLowerCase()}.`
      : `We serve the entire ${area.name} area, providing reliable ${service.title.toLowerCase()} to all neighborhoods.`,

    area.landmark
      ? `Our team frequently works in areas around ${area.landmark}, so we know the ${area.name} community well.`
      : `We are proud to be a part of the ${area.name} community, serving neighbors like you every day.`,

    `From the heart of ${area.name} to the outskirts, Tidy & Fix is your local partner for all things ${service.title.toLowerCase()}.`
  ];

  // Dynamic Outro Paragraphs
  const outroTemplates = [
    `We use the highest quality materials and state-of-the-art techniques to ensure your complete satisfaction. Contact us today for a free, no-obligation estimate for your project in ${area.name}!`,
    `Don't settle for less when it comes to your home. Choose Tidy & Fix for ${service.title.toLowerCase()} in ${area.name} and experience the difference.`,
    `Ready to get started? Our ${area.name} team is standing by. Call us or fill out our online form to schedule your ${service.title.toLowerCase()}.`
  ];

  // Select details: use variations if available, otherwise default
  let selectedDetails = service.details || [];
  if (service.detailsVariations && service.detailsVariations.length > 0) {
    // Add the default details to the pool of options
    const allOptions = [service.details, ...service.detailsVariations];
    selectedDetails = generator.pick(allOptions);
  }

  return {
    metaTitle: generator.pick(metaTitleTemplates),
    metaDescription: generator.pick(metaDescriptionTemplates),
    pageTitle: generator.pick(pageTitleTemplates),
    pageDescription: generator.pick(pageDescriptionTemplates),
    details: [
      generator.pick(introTemplates),
      ...selectedDetails,
      generator.pick(landmarkTemplates),
      generator.pick(outroTemplates)
    ],
    faqs: [
      {
        question: `What makes your ${service.title.toLowerCase()} different in ${area.name}?`,
        answer: `Our key differentiator is our commitment to the ${area.name} community. We combine top-tier workmanship with a neighborly approach, ensuring every job is done right. Plus, we're fully licensed and insured for your peace of mind.`
      },
      {
        question: `How quickly can you provide ${service.title.toLowerCase()} in the ${area.name} area?`,
        answer: `We offer flexible scheduling to accommodate the busy lives of ${area.name} residents. Contact us, and we'll work with you to find the earliest and most convenient appointment time for your service.`
      },
      {
        question: `Do you offer free estimates in ${area.name}?`,
        answer: `Yes! We provide free, no-obligation estimates for all ${service.title.toLowerCase()} in ${area.name}. Simply fill out our contact form or give us a call to get started.`
      }
    ],
    ogTitle: `${service.title} in ${area.name} | Tidy & Fix`,
    ogDescription: `Top-rated ${service.title.toLowerCase()} in ${area.name}. Licensed, insured, and ready to help. Get a free quote today!`,
    ogImage: 'https://tidyfix.services/og-image-default.jpg'
  };
}


/**
 * Generates even more specific programmatic SEO content for a service within a particular neighborhood.
 */
export function generateNeighborhoodProgrammaticData(service: Service, area: Area, neighborhood: Neighborhood): ProgrammaticPageData {
  // Initialize seeded generator
  const generator = new SeededGenerator(`${service.slug}-${area.slug}-${neighborhood.slug}`);

  // Spintax for hyper-local meta content
  const metaTitleTemplates = [
    `${service.title} in ${neighborhood.name}, ${area.name} | Tidy & Fix`,
    `Local ${service.title} | ${neighborhood.name} Neighborhood Pro`,
    `Fast ${service.title} Services | ${neighborhood.name}, ${area.name}`
  ];

  const metaDescriptionTemplates = [
    `Your trusted neighborhood team for ${service.title.toLowerCase()} in ${neighborhood.name}, ${area.name}. Fast, reliable, and professional service. Get a quick quote!`,
    `Tidy & Fix proudly serves the ${neighborhood.name} community with expert ${service.title.toLowerCase()}. We're your local, licensed, and insured choice.`,
    `Looking for ${service.title.toLowerCase()} in ${neighborhood.name}? We provide top-quality service right at your doorstep. Contact us for a free estimate today.`
  ];

  return {
    metaTitle: generator.pick(metaTitleTemplates),
    metaDescription: generator.pick(metaDescriptionTemplates),
    pageTitle: `${service.title} Services in ${neighborhood.name}`,
    pageDescription: `Your dedicated local specialists for professional ${service.title.toLowerCase()}, proudly serving the ${neighborhood.name} community in ${area.name}.`,
    details: [
      `For residents of the beautiful ${neighborhood.name} neighborhood, maintaining a pristine and functional home is a top priority. At Tidy & Fix, we bring our expert ${service.title.toLowerCase()} directly to your doorstep.`,
      `We understand that every home in ${neighborhood.name} is unique. That’s why we tailor our services to meet your specific needs. Our comprehensive ${service.title.toLowerCase()} includes:`,
      ...(service.details || []),
      `Our team is proud to serve the ${neighborhood.name} community. We are committed to providing prompt, reliable service that you can count on. Trust Tidy & Fix to keep your home in perfect condition.`
    ],
    faqs: [
      {
        question: `Do you serve the entire ${neighborhood.name} neighborhood?`,
        answer: `Absolutely. Our team provides full ${service.title.toLowerCase()} coverage for the entire ${neighborhood.name} area. We are familiar with the community and can provide prompt and efficient service.`
      },
      {
        question: `Why should I choose a local provider for ${service.title.toLowerCase()} in ${neighborhood.name}?`,
        answer: `Choosing a local provider like Tidy & Fix means you get a team that understands the specific needs and styles of homes in ${neighborhood.name}. We're your neighbors, committed to upholding the quality and beauty of our shared community.`
      }
    ],
    ogTitle: `${service.title} in ${neighborhood.name} | Tidy & Fix`,
    ogDescription: `Expert ${service.title.toLowerCase()} for ${neighborhood.name} residents. Local, reliable, and professional. Contact us!`,
    ogImage: 'https://tidyfix.services/og-image-default.jpg'
  };
}