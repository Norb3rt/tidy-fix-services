import React from 'react';
import type { Service, Area, ProgrammaticPageData, Testimonial, GalleryItem } from './types';

// Icons
const CleaningIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-blue-600",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
}));
const BuildingIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-blue-600",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
}));
const WrenchIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-blue-600",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
}));
const PaintIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-blue-600",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4Zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
}));
const LeafIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-emerald-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2,
  d: "M14.752 21.168l-3.197-2.132A1 1 0 0010.925 18H4a1 1 0 01-1-1V4a1 1 0 011-1h12a1 1 0 011 1v10.925a1 1 0 00.632.928l3.197 2.132c.34.226.34.74 0 .966l-3.197 2.132A1 1 0 0114.752 21.168zM9 9h6M9 13h6"
}));

const HomeIcon = React.createElement('svg', {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-10 w-10 text-blue-600",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor"
}, React.createElement('path', {
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
}));

// Data
export const servicesData: Service[] = [
  {
    slug: 'renovations',
    icon: HomeIcon,
    title: 'Full Renovations',
    description: 'Transform your home with our full-service renovation capabilities. From dream kitchens to luxury bathrooms and master suites.',
    details: [
      'Complete kitchen remodeling: cabinets, countertops, and layout redesign.',
      'Luxury bathroom renovations: spa-like showers, vanities, and tile work.',
      'Master suite transformations including custom walk-in closets.',
      'Whole-home flooring updates and interior design execution.',
      'Project management from concept to completion.'
    ]
  },
  {
    slug: 'residential-cleaning',
    icon: CleaningIcon,
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
    icon: BuildingIcon,
    title: 'Commercial Cleaning',
    description: 'Maintain a pristine, healthy, and productive environment for your employees and customers with our reliable cleaning services.',
    details: [
      'Customized cleaning schedules (daily, weekly, bi-weekly) to fit your business operations.',
      'Services for offices, retail spaces, medical facilities, and more.',
      'Disinfection of high-touch surfaces to promote a healthy workplace.',
      'Trash removal, floor care, and restroom sanitation.',
      'Insured and bonded professionals for your peace of mind.'
    ]
  },
  {
    slug: 'handyman-services',
    icon: WrenchIcon,
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
    ],
    subServices: [
      {
        name: 'TV Mounting',
        slug: 'tv-mounting',
        description: 'Secure and professional TV mounting on any wall type.',
        details: [
          'We securely mount any size of TV to drywall, brick, or concrete, ensuring it is perfectly level and stable.',
          'Our service includes professional cable concealment for a clean, wire-free look, enhancing your viewing experience.',
          'We can also set up and connect your soundbar and other media devices to create the perfect home theater system.'
        ]
      },
      {
        name: 'Faucet Repair & Installation',
        slug: 'faucet-repair-installation',
        description: 'Stop drips and upgrade your fixtures with our expert plumbing services.',
        details: [
          'Whether it\'s a constant drip or a leak at the base, our technicians can quickly diagnose and repair any faucet issue, saving you water and money.',
          'Ready for an upgrade? We can install any type of new faucet for your kitchen or bathroom, ensuring a perfect fit and leak-free operation.',
          'Our service includes removal of the old fixture, installation of the new one, and a thorough test to guarantee everything is working perfectly.'
        ]
      },
      {
        name: 'Ceiling Fan Installation',
        slug: 'ceiling-fan-installation',
        description: 'Improve air circulation and add style to any room.',
        details: [
          'Our certified technicians handle all electrical wiring safely, ensuring your new ceiling fan is installed to code.',
          'We assemble and balance the fan blades for quiet, wobble-free operation, maximizing comfort and efficiency.',
          'We can install fans on any ceiling height, including vaulted ceilings, and can add new junction boxes where needed.'
        ]
      }
    ]
  },
  {
    slug: 'drywall-sheetrock-painting',
    icon: PaintIcon,
    title: 'Drywall, Sheetrock & Painting',
    description: 'From minor repairs to complete room makeovers, our flawless finishes deliver professional, lasting results every time.',
    details: [
      'Expert drywall and sheetrock repair for holes, cracks, and water damage.',
      'Professional interior painting with meticulous attention to detail and clean lines.',
      'Thorough surface preparation, including sanding, patching, and priming.',
      'Protection of your furniture, floors, and belongings during the entire process.',
      'A full clean-up after the job, leaving your space ready to enjoy.'
    ]
  },
  {
    slug: 'eco-friendly-cleaning',
    icon: LeafIcon,
    title: 'Eco-Friendly Cleaning',
    description: 'A deep clean that is safe for the planet. We use powerful, plant-based products tough on grime but gentle on your home and family.',
    details: [
      'Use of non-toxic, biodegradable, and plant-derived cleaning agents.',
      'Effective cleaning without harsh chemicals, fumes, or residues.',
      'Safe for children, pets, and individuals with allergies or sensitivities.',
      'Reduced environmental impact with sustainable products and practices.',
      'Achieve a sparkling clean home that is also healthy and green.'
    ]
  },
];

export const areasData: Area[] = [
  {
    name: 'Raleigh',
    slug: 'raleigh',
    description: 'Affordable same-day cleaning in Raleigh and expert home repairs.',
    lat: 35.7796,
    lng: -78.6382,
    landmark: "the North Carolina State Capitol",
    uniqueSellingPoint: "its beautiful oak-lined streets and historic neighborhoods",
    neighborhoods: [
      { name: 'North Hills', slug: 'north-hills' },
      { name: 'Brier Creek', slug: 'brier-creek' },
      { name: 'Oakwood', slug: 'oakwood' },
      { name: 'Boylan Heights', slug: 'boylan-heights' },
    ]
  },
  {
    name: 'Durham',
    slug: 'durham',
    description: 'Your go-to for reliable drywall, painting, and handyman services in Durham.',
    lat: 35.9940,
    lng: -78.8986,
    landmark: "the Duke University Chapel",
    uniqueSellingPoint: "its vibrant arts scene and revitalized downtown",
    neighborhoods: [
      { name: 'Brightleaf', slug: 'brightleaf' },
      { name: 'Trinity Park', slug: 'trinity-park' },
      { name: 'Southpoint', slug: 'southpoint' },
    ]
  },
  {
    name: 'Chapel Hill',
    slug: 'chapel-hill',
    description: 'Specializing in eco-friendly cleaning services for Chapel Hill homes and businesses.',
    lat: 35.9132,
    lng: -79.0558,
    landmark: "the Morehead Planetarium",
    uniqueSellingPoint: "its charming, college-town atmosphere",
    neighborhoods: [
      { name: 'Meadowmont', slug: 'meadowmont' },
      { name: 'Southern Village', slug: 'southern-village' },
    ]
  },
  {
    name: 'Cary',
    slug: 'cary',
    description: 'Comprehensive maintenance services to keep your Cary property pristine.',
    lat: 35.7915,
    lng: -78.7811,
    landmark: "the Koka Booth Amphitheatre",
    uniqueSellingPoint: "its family-friendly parks and greenways"
  },
  {
    name: 'Apex',
    slug: 'apex',
    description: 'Trusted, local professionals for all your Apex cleaning and handyman needs.',
    lat: 35.7327,
    lng: -78.8503,
    landmark: "the historic downtown district",
    uniqueSellingPoint: "its 'Peak of Good Living' community spirit"
  },
  {
    name: 'Morrisville',
    slug: 'morrisville',
    description: 'Fast and efficient home services for the bustling community of Morrisville.',
    lat: 35.8221,
    lng: -78.8256,
    landmark: "Lake Crabtree County Park",
    uniqueSellingPoint: "its central location in the Research Triangle"
  },
  {
    name: 'Wake Forest',
    slug: 'wake-forest',
    description: 'Comprehensive maintenance services to keep your Wake Forest property pristine.',
    lat: 35.9799,
    lng: -78.5097,
    landmark: "Southeastern Baptist Theological Seminary",
    uniqueSellingPoint: "its historic charm and small-town feel"
  },
];

export const testimonialsData: Testimonial[] = [
  {
    quote: "Tidy & Fix transformed our office space! The cleaning crew is professional, thorough, and always on time. It's the best commercial cleaning service in Raleigh we've ever used.",
    name: 'Sarah L.',
    role: 'Business Owner, Raleigh',
    avatar: 'https://picsum.photos/100/100?random=1',
    citySlug: 'raleigh'
  },
  {
    quote: "I needed urgent drywall repair and painting before a party. Their handyman in Durham was a lifesaver! The wall looks brand new, and they left the place spotless.",
    name: 'Michael B.',
    role: 'Homeowner, Durham',
    avatar: 'https://picsum.photos/100/100?random=2',
    citySlug: 'durham'
  },
  {
    quote: "As a parent, I love their commitment to eco-friendly cleaning in Chapel Hill. The house smells fresh and clean without any harsh chemicals. Highly recommend!",
    name: 'Jessica P.',
    role: 'Parent, Chapel Hill',
    avatar: 'https://picsum.photos/100/100?random=3',
    citySlug: 'chapel-hill'
  },
];

export const galleryData: GalleryItem[] = [
  {
    serviceSlug: 'renovations',
    title: 'Modern Kitchen Redesign',
    description: 'A complete transformation featuring an open-concept layout, quartz countertops, and custom cabinetry.',
    location: 'Cary, NC',
    after: '/portfolio/renovations/modern-kitchen-design-renovation.jpg'
  },
  {
    serviceSlug: 'renovations',
    title: 'Luxury Master Bath',
    description: 'Spa-inspired master bathroom renovation with frameless glass shower and freestanding tub.',
    location: 'Durham, NC',
    after: '/portfolio/renovations/modern-master-bath-renovation-project.jpg'
  },
  {
    serviceSlug: 'renovations',
    title: 'Master Suite & Closet',
    description: 'Elegant bedroom update including a custom-designed walk-in closet system.',
    location: 'Raleigh, NC',
    after: '/portfolio/renovations/modern-bedroom-with-walkin-closet.jpg'
  },
  {
    serviceSlug: 'drywall-sheetrock-painting',
    title: 'Drywall Installation & Finish',
    description: 'Expert drywall hanging and finishing, leaving perfectly smooth surfaces ready for the painter.',
    location: 'North Hills, Raleigh',
    after: '/portfolio/drywall-painting/drywall-installation-only-finish-no-painting.jpg'
  },
  {
    serviceSlug: 'drywall-sheetrock-painting',
    title: 'Full Home Sheetrock & Finish Work',
    description: 'Complete drywall installation and finishing for a new construction project.',
    location: 'Cary, NC',
    after: '/portfolio/drywall-painting/full-home-sheetrock-and-finish-work.jpg'
  },
  {
    serviceSlug: 'drywall-sheetrock-painting',
    title: 'Bedroom Accent Wall',
    description: 'A bold new color completely changed the feel of this master bedroom.',
    location: 'Trinity Park, Durham',
    challenge: 'The master bedroom lacked character and felt too plain. The client wanted a focal point without an expensive renovation.',
    solution: 'We created a stunning accent wall using a deep, calming blue tone that adds depth and elegance to the room instantly.',
    duration: '1 Day',
    after: '/portfolio/drywall-painting/bedroom-accent-wall.jpg'
  },
  {
    serviceSlug: 'residential-cleaning',
    title: 'Move-Out Cleaning',
    description: 'Ensuring the previous tenants left the apartment in pristine condition.',
    location: 'Chapel Hill, NC',
    duration: '6 Hours',
    after: '/portfolio/residential-cleaning/move-out cleaning.jpg'
  },
  {
    serviceSlug: 'handyman-services',
    title: 'Custom Shelving Unit',
    description: 'Installed and secured custom floating shelves for a modern look.',
    location: 'Apex, NC',
    duration: '2 Hours',
    after: '/portfolio/handyman-services/custom-shelving-unit.png'
  },
  {
    serviceSlug: 'residential-cleaning',
    title: 'Basic Cleaning Service',
    description: 'A thorough basic cleaning service leaving the home fresh and tidy.',
    location: 'Raleigh, NC',
    after: '/portfolio/residential-cleaning/basic-cleaning-service.jpg'
  },
  {
    serviceSlug: 'residential-cleaning',
    title: 'Basic Cleaning Service - Living Area',
    description: 'Immaculate floors and dusted surfaces following our standard cleaning package.',
    location: 'Raleigh, NC',
    after: '/portfolio/residential-cleaning/basic-cleaning-service-2.jpg'
  }
];


export const programmaticData: Record<string, Record<string, ProgrammaticPageData>> = {
  'raleigh': {
    'residential-cleaning': {
      metaTitle: 'Residential Cleaning Services in Raleigh, NC | Tidy & Fix',
      metaDescription: 'Top-rated residential cleaning in Raleigh. We offer deep cleaning, recurring maid services, and more. Get your Raleigh home spotless today!',
      pageTitle: 'Expert Residential Cleaning in Raleigh',
      pageDescription: 'At Tidy & Fix, we provide Raleigh homeowners with reliable and thorough residential cleaning services. Whether you need a one-time deep clean or regular housekeeping, our professional team uses eco-friendly products to ensure your home is both sparkling clean and safe for your family.',
      details: [
        'Our Raleigh cleaning crews are fully vetted, insured, and trained to the highest standards. We treat your home with the same care and respect we would our own.',
        'We offer flexible scheduling to fit your busy life. From weekly to monthly services, we create a custom cleaning plan that works for you in the Raleigh area.',
        'Services include dusting, vacuuming, mopping, kitchen and bathroom sanitization, and more. We leave no corner untouched.'
      ],
      faqs: [
        {
          question: "How often should I schedule residential cleaning in Raleigh?",
          answer: "For most Raleigh homes, we recommend bi-weekly service to maintain a clean and healthy environment. However, we offer flexible plans including weekly, monthly, or one-time deep cleans to fit your specific needs."
        },
        {
          question: "Do you bring your own cleaning supplies and equipment?",
          answer: "Yes, we do. Our Raleigh cleaning teams arrive fully equipped with all necessary supplies, including our preferred eco-friendly cleaning solutions and professional-grade equipment, to get the job done right."
        },
        {
          question: "Is Tidy & Fix licensed and insured in Raleigh, NC?",
          answer: "Absolutely. We are fully licensed and insured to operate in Raleigh and the entire Triangle area. This provides complete peace of mind for our clients, knowing their property is in safe and professional hands."
        }
      ]
    },
    'handyman-services': {
      metaTitle: 'Raleigh Handyman Services | Home Repair & Maintenance',
      metaDescription: 'Need a handyman in Raleigh, NC? Tidy & Fix offers reliable home repair, assembly, and maintenance services. Free quotes for all Raleigh jobs.',
      pageTitle: 'Your Go-To Handyman in Raleigh, NC',
      pageDescription: 'From minor plumbing leaks to furniture assembly and drywall repair, Tidy & Fix is the name Raleigh residents trust for all their handyman needs. No job is too big or too small for our skilled, local technicians.',
      details: [
        'We specialize in a wide range of home repairs including electrical, plumbing, carpentry, and general maintenance tasks.',
        'Why call multiple contractors? Our Raleigh handyman team can handle all your small projects in a single visit, saving you time and money.',
        'We provide transparent, upfront pricing, so you know exactly what to expect. Quality workmanship guaranteed for every project in Raleigh.'
      ],
      faqs: [
        {
          question: "Can you help with small tasks like hanging pictures or assembling furniture?",
          answer: "Yes! We handle all types of small jobs including furniture assembly, picture hanging, and minor repairs."
        }
      ]
    }
  },
  'durham': {
    'drywall-sheetrock-painting': {
      metaTitle: 'Drywall & Painting in Durham, NC | Tidy & Fix',
      metaDescription: 'Professional drywall, sheetrock repair, and painting services in Durham, NC. We deliver flawless finishes for your home or business. Contact us for a quote!',
      pageTitle: 'Seamless Drywall & Painting Services in Durham',
      pageDescription: 'Tidy & Fix offers expert drywall repair and professional painting services to residents and businesses throughout Durham. We handle everything from patching holes to painting entire interiors, delivering a crisp, clean finish every time.',
      details: [
        'Our Durham team is skilled in all aspects of drywall installation and repair, ensuring smooth, seamless walls.',
        'We use high-quality paints and professional techniques to revitalize your space with vibrant, long-lasting color.',
        'Whether it\'s water damage repair or a fresh coat of paint for your living room, we treat your home with the utmost care and respect.'
      ],
      faqs: [
        {
          question: "Do you offer color consultation for painting projects?",
          answer: "We can certainly provide advice on popular colors and finishes to help you achieve the look you want for your Durham home."
        }
      ]
    }
  }
};
