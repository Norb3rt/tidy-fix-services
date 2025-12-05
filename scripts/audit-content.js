
import fs from 'fs';

// --- Data (Mirroring src/data.ts) ---
const servicesData = [
    {
        slug: 'residential-cleaning',
        title: 'Residential Cleaning',
        description: 'A comprehensive cleaning service that leaves your home spotless, from one-time deep cleans to recurring maintenance.',
        details: [
            'Complete kitchen cleaning, including countertops, appliances, sinks, and floors.',
            'Thorough bathroom sanitization: toilets, showers, tubs, and vanities.',
            'Dusting all surfaces, furniture, and fixtures throughout the home.',
            'Vacuuming carpets and rugs, and mopping all hard floors.',
            'Customizable cleaning plans to fit your specific needs and schedule.'
        ],
        detailsVariations: [
            [
                'Our kitchen service covers everything from appliance exteriors to deep scrubbing of sinks and counters.',
                'Bathrooms are left sparkling, with special attention to disinfecting toilets, tubs, and showers.',
                'We meticulously dust every corner, including baseboards, light fixtures, and blinds.',
                'Floors are treated with care, vacuuming carpets and mopping hard surfaces for a streak-free shine.',
                'We tailor our checklist to your home\'s unique requirements.'
            ],
            [
                'Kitchens are the heart of the home; we keep yours hygienic and tidy, focusing on all surfaces.',
                'We sanitize bathrooms thoroughly, ensuring a germ-free environment for your family.',
                'From ceiling fans to furniture, we remove dust and allergens from your living spaces.',
                'Our floor care includes detailed vacuuming and mopping to remove dirt and debris.',
                'Tell us what you need, and we will create a cleaning plan that works for you.'
            ]
        ]
    },
    {
        slug: 'commercial-cleaning',
        title: 'Commercial Cleaning',
        description: 'Maintain a pristine, healthy, and productive environment for your employees and customers with our reliable cleaning services.',
        details: [
            'Customized cleaning schedules (daily, weekly, bi-weekly) to fit your business operations.',
            'Services for offices, retail spaces, medical facilities, and more.',
            'Disinfection of high-touch surfaces to promote a healthy workplace.',
            'Trash removal, floor care, and restroom sanitation.',
            'Insured and bonded professionals for your peace of mind.'
        ],
        detailsVariations: [
            [
                'We design cleaning plans that fit your business hours, whether daily or weekly.',
                'Our team services a variety of spaces including retail stores, offices, and clinics.',
                'We prioritize sanitizing high-traffic areas to keep your workplace healthy.',
                'From floor maintenance to restroom cleaning and trash removal, we handle it all.',
                'Rest easy knowing our professionals are fully bonded and insured.'
            ],
            [
                'Flexible scheduling allows us to clean your facility without disrupting operations.',
                'We are experienced in maintaining offices, medical centers, and commercial retail spaces.',
                'Our focus is on disinfecting surfaces that are touched most often.',
                'We take care of the dirty work, including trash, floors, and bathrooms.',
                'Your business is safe with our insured and background-checked team.'
            ]
        ]
    },
    {
        slug: 'handyman-services',
        title: 'Handyman Services',
        description: 'From leaky faucets and fixture installations to minor repairs and furniture assembly—no job is too small for our expert team.',
        details: [
            'General home repairs: fixing leaky pipes, repairing drywall, and more.',
            'Installation services: ceiling fans, light fixtures, faucets, and smart home devices.',
            'Assembly services for furniture, shelving, and exercise equipment.',
            'Carpentry, electrical, and plumbing fixes performed by skilled technicians.',
            'One call to solve all your small projects and home maintenance needs.'
        ],
        detailsVariations: [
            [
                'We tackle general repairs like drywall patching and fixing leaky pipes.',
                'Need a fan or light fixture installed? We handle ceiling fans, faucets, and more.',
                'We assemble furniture, shelves, and exercise gear so you don\'t have to.',
                'Our skilled technicians are proficient in carpentry, minor electrical, and plumbing work.',
                'Simplify your life with one call for all your home maintenance projects.'
            ],
            [
                'From patching holes in walls to stopping leaks, we handle your home repairs.',
                'We expertly install smart devices, light fixtures, and ceiling fans.',
                'Don\'t struggle with instructions; let us assemble your furniture and equipment.',
                'Our team has the skills for various carpentry, plumbing, and electrical tasks.',
                'We are your one-stop solution for checking off that home to-do list.'
            ]
        ]
    },
    {
        slug: 'drywall-sheetrock-painting',
        title: 'Drywall, Sheetrock & Painting',
        description: 'From minor repairs to complete room makeovers, our flawless finishes deliver professional, lasting results every time.',
        details: [
            'Expert drywall and sheetrock repair for holes, cracks, and water damage.',
            'Professional interior painting with meticulous attention to detail and clean lines.',
            'Thorough surface preparation, including sanding, patching, and priming.',
            'Protection of your furniture, floors, and belongings during the entire process.',
            'A full clean-up after the job, leaving your space ready to enjoy.'
        ],
        detailsVariations: [
            [
                'We expertly repair holes, cracks, and water damage in your drywall.',
                'Our interior painting services focus on clean lines and a professional finish.',
                'We prepare surfaces thoroughly by sanding and priming before painting.',
                'Your home is protected with drop cloths and furniture covers during our work.',
                'We leave your space spotless and ready to enjoy after the job is done.'
            ],
            [
                'Seamless repairs for drywall cracks, holes, and moisture damage.',
                'Transform your rooms with our meticulous interior painting services.',
                'Preparation is key; we sand, patch, and prime for the best results.',
                'We take great care to cover your floors and belongings while we work.',
                'Our team ensures a complete cleanup, so you only see the beautiful results.'
            ]
        ]
    },
    {
        slug: 'eco-friendly-cleaning',
        title: 'Eco-Friendly Cleaning',
        description: 'A deep clean that is safe for the planet. We use powerful, plant-based products tough on grime but gentle on your home and family.',
        details: [
            'Use of non-toxic, biodegradable, and plant-derived cleaning agents.',
            'Effective cleaning without harsh chemicals, fumes, or residues.',
            'Safe for children, pets, and individuals with allergies or sensitivities.',
            'Reduced environmental impact with sustainable products and practices.',
            'Achieve a sparkling clean home that is also healthy and green.'
        ],
        detailsVariations: [
            [
                'We utilize plant-based, biodegradable cleaners that are safe for the environment.',
                'Get a deep clean without the worry of harsh chemical fumes or residues.',
                'Our products are safe for kids, pets, and those with allergies.',
                'We support sustainable practices to reduce our environmental footprint.',
                'Enjoy a home that is both spotlessly clean and eco-consciously maintained.'
            ],
            [
                'Our cleaning agents are non-toxic and derived from plants for a greener clean.',
                'No harsh chemicals means no dangerous fumes or sticky residues left behind.',
                'Perfect for households with children, pets, or sensitive family members.',
                'We are committed to sustainability in all our cleaning methods.',
                'A healthy home and a healthy planet go hand in hand with our service.'
            ]
        ]
    }
];

const areasData = [
    {
        name: 'Raleigh',
        slug: 'raleigh',
        landmark: "the North Carolina State Capitol",
        uniqueSellingPoint: "its beautiful oak-lined streets and historic neighborhoods"
    },
    {
        name: 'Durham',
        slug: 'durham',
        landmark: "the Duke University Chapel",
        uniqueSellingPoint: "its vibrant arts scene and revitalized downtown"
    },
    {
        name: 'Chapel Hill',
        slug: 'chapel-hill',
        landmark: "the Morehead Planetarium",
        uniqueSellingPoint: "its charming, college-town atmosphere"
    },
    {
        name: 'Cary',
        slug: 'cary',
        landmark: "the Koka Booth Amphitheatre",
        uniqueSellingPoint: "its family-friendly parks and greenways"
    },
    {
        name: 'Apex',
        slug: 'apex',
        landmark: "the historic downtown district",
        uniqueSellingPoint: "its 'Peak of Good Living' community spirit"
    },
    {
        name: 'Morrisville',
        slug: 'morrisville',
        landmark: "Lake Crabtree County Park",
        uniqueSellingPoint: "its central location in the Research Triangle"
    },
    {
        name: 'Wake Forest',
        slug: 'wake-forest',
        landmark: "Southeastern Baptist Theological Seminary",
        uniqueSellingPoint: "its historic charm and small-town feel"
    }
];

// --- Content Generation Logic (Mirroring src/utils/contentGenerator.ts) ---
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateProgrammaticData(service, area) {
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
        selectedDetails = pickRandom(allOptions);
    }

    return {
        metaTitle: pickRandom(metaTitleTemplates),
        metaDescription: pickRandom(metaDescriptionTemplates),
        pageTitle: pickRandom(pageTitleTemplates),
        pageDescription: pickRandom(pageDescriptionTemplates),
        details: [
            pickRandom(introTemplates),
            ...selectedDetails,
            pickRandom(landmarkTemplates),
            pickRandom(outroTemplates)
        ]
    };
}

// --- Audit Logic ---

function calculateSimilarity(str1, str2) {
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    const intersection = words1.filter(word => words2.includes(word));
    const union = new Set([...words1, ...words2]);
    return (intersection.length / union.size) * 100;
}

console.log("Starting SEO Content Audit...");
console.log("--------------------------------------------------");

const generatedPages = [];

servicesData.forEach(service => {
    areasData.forEach(area => {
        // Generate multiple times to test randomness, but for audit we just take one snapshot
        const data = generateProgrammaticData(service, area);
        generatedPages.push({
            id: `${service.slug}-${area.slug}`,
            service: service.title,
            area: area.name,
            content: data
        });
    });
});

console.log(`Generated ${generatedPages.length} pages.`);

let totalSimilarity = 0;
let comparisons = 0;
let highSimilarityCount = 0;

// Compare each page with every other page of the SAME service (different location)
// We expect high similarity here, but we want to see HOW high.
for (let i = 0; i < generatedPages.length; i++) {
    for (let j = i + 1; j < generatedPages.length; j++) {
        const pageA = generatedPages[i];
        const pageB = generatedPages[j];

        if (pageA.service === pageB.service) {
            const textA = pageA.content.details.join(' ');
            const textB = pageB.content.details.join(' ');
            const similarity = calculateSimilarity(textA, textB);

            totalSimilarity += similarity;
            comparisons++;

            if (similarity > 80) {
                highSimilarityCount++;
            }
        }
    }
}

const avgSimilarity = totalSimilarity / comparisons;

console.log("\n--- Audit Results ---");
console.log(`Average Content Similarity (Same Service, Diff Location): ${avgSimilarity.toFixed(2)}%`);
console.log(`Pages with >80% Similarity: ${highSimilarityCount} / ${comparisons} comparisons`);

if (avgSimilarity > 70) {
    console.log("\n[WARNING] Content similarity is high. Consider adding more location-specific data points (landmarks, neighborhoods, history) to 'areasData' to diversify content.");
} else {
    console.log("\n[PASS] Content variation looks good.");
}

console.log("\n--- Sample Content Check ---");
const samplePage = generatedPages[0];
console.log(`Page: ${samplePage.service} in ${samplePage.area}`);
console.log(`Title: ${samplePage.content.pageTitle}`);
console.log(`Intro: ${samplePage.content.details[0]}`);
console.log("--------------------------------------------------");
