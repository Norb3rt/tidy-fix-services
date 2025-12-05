import { areasData, servicesData } from '../src/data';
import { generateProgrammaticData } from '../src/utils/contentGenerator';

// Simple Jaccard Similarity function for text
function getJaccardSimilarity(str1: string, str2: string) {
    const set1 = new Set(str1.toLowerCase().split(/\s+/));
    const set2 = new Set(str2.toLowerCase().split(/\s+/));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
}

async function runAudit() {
    console.log('Starting PSEO Audit...');

    const pages: any[] = [];
    const titles = new Set<string>();
    const h1s = new Set<string>();

    // Generate all pages
    for (const area of areasData) {
        for (const service of servicesData) {
            const content = generateProgrammaticData(service, area);
            const url = `/locations/${area.slug}/services/${service.slug}`;

            pages.push({
                url,
                area: area.name,
                service: service.title,
                metaTitle: content.metaTitle,
                metaDescription: content.metaDescription,
                pageTitle: content.pageTitle, // H1
                pageDescription: content.pageDescription,
                details: content.details.join(' ')
            });

            titles.add(content.metaTitle);
            h1s.add(content.pageTitle);
        }
    }

    const totalPages = pages.length;
    const uniqueTitles = titles.size;
    const uniqueH1s = h1s.size;

    console.log(`\nTotal Service Pages Generated: ${totalPages}`);
    console.log(`Unique Meta Titles: ${uniqueTitles}`);
    console.log(`Unique H1s: ${uniqueH1s}`);

    if (totalPages !== uniqueTitles) {
        console.error('❌ Duplicate Meta Titles found!');
    } else {
        console.log('✅ All Meta Titles are unique.');
    }

    if (totalPages !== uniqueH1s) {
        console.error('❌ Duplicate H1s found!');
    } else {
        console.log('✅ All H1s are unique.');
    }

    // Check Similarity
    console.log('\nChecking Content Similarity (Sample)...');
    let totalSimilarity = 0;
    let comparisons = 0;
    let maxSimilarity = 0;
    let mostSimilarPair = '';

    // Compare first 50 pairs to save time, or compare same service across different cities
    // Let's compare "Cleaning in Raleigh" vs "Cleaning in Durham"
    for (let i = 0; i < pages.length; i++) {
        for (let j = i + 1; j < pages.length; j++) {
            // Only compare if same service (highest risk of duplication)
            if (pages[i].service === pages[j].service) {
                const sim = getJaccardSimilarity(pages[i].details, pages[j].details);
                totalSimilarity += sim;
                comparisons++;
                if (sim > maxSimilarity) {
                    maxSimilarity = sim;
                    mostSimilarPair = `${pages[i].url} vs ${pages[j].url}`;
                }
            }
        }
    }

    const avgSimilarity = comparisons > 0 ? (totalSimilarity / comparisons) : 0;
    console.log(`Average Content Similarity: ${(avgSimilarity * 100).toFixed(2)}%`);
    console.log(`Max Similarity: ${(maxSimilarity * 100).toFixed(2)}%`);
    // console.log(`Most Similar Pair: ${mostSimilarPair}`);

    if (avgSimilarity > 0.8) {
        console.warn('⚠️ High content similarity detected. Consider adding more variations.');
    } else {
        console.log('✅ Content variability is healthy.');
    }
}

runAudit().catch(console.error);
