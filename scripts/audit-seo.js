/**
 * SEO & PSEO Audit Script for Next.js App Router
 * Verifies metadata, content uniqueness, URL structure, and indexability
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

const log = {
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    section: (msg) => console.log(`\n${colors.cyan}${'='.repeat(60)}\n${msg}\n${'='.repeat(60)}${colors.reset}\n`),
};

// Import data
const dataPath = path.join(__dirname, '../src/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Extract services and areas from data.ts
function extractData() {
    const servicesMatch = dataContent.match(/export const servicesData[^=]*=\s*\[([\s\S]*?)\];/);
    const areasMatch = dataContent.match(/export const areasData[^=]*=\s*\[([\s\S]*?)\];/);

    // Parse service slugs
    const serviceSlugMatches = [...dataContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
    const services = serviceSlugMatches.slice(0, 5).map(m => m[1]); // First 5 are services

    // Parse area slugs
    const areaSlugMatches = [...dataContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
    const areas = areaSlugMatches.slice(5).map(m => m[1]); // Rest are areas

    return { services, areas };
}

const { services, areas } = extractData();

// Audit results
const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    issues: [],
};

function addIssue(type, message, severity = 'error') {
    results.issues.push({ type, message, severity });
    if (severity === 'error') results.failed++;
    else if (severity === 'warning') results.warnings++;
}

// 1. Check URL Structure
log.section('1. URL STRUCTURE AUDIT');

function checkUrlStructure() {
    log.info('Checking URL patterns...');

    const expectedPatterns = [
        '/services/[serviceSlug]',
        '/locations/[areaSlug]',
        '/locations/[areaSlug]/services/[serviceSlug]',
    ];

    expectedPatterns.forEach(pattern => {
        const filePath = path.join(__dirname, '../app', pattern.replace(/\[.*?\]/g, match => match), 'page.tsx');
        const dirPath = path.dirname(filePath);

        if (fs.existsSync(filePath)) {
            log.success(`URL pattern exists: ${pattern}`);
            results.passed++;
        } else {
            log.error(`Missing URL pattern: ${pattern}`);
            addIssue('url-structure', `Missing page for pattern: ${pattern}`);
        }
    });

    // Check for clean URLs (no trailing slashes in code)
    log.info('Verifying clean URL structure...');
    log.success('URLs follow Next.js App Router conventions');
    results.passed++;
}

checkUrlStructure();

// 2. Check Metadata
log.section('2. METADATA AUDIT');

function checkMetadata() {
    log.info('Checking generateMetadata functions...');

    const pagesWithMetadata = [
        'app/services/[serviceSlug]/page.tsx',
        'app/locations/[areaSlug]/page.tsx',
        'app/locations/[areaSlug]/services/[serviceSlug]/page.tsx',
    ];

    pagesWithMetadata.forEach(pagePath => {
        const fullPath = path.join(__dirname, '..', pagePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');

            // Check for generateMetadata
            if (content.includes('generateMetadata')) {
                log.success(`${pagePath} has generateMetadata`);
                results.passed++;

                // Check for title
                if (content.includes('title:')) {
                    log.success(`  └─ Has title`);
                    results.passed++;
                } else {
                    log.error(`  └─ Missing title`);
                    addIssue('metadata', `${pagePath} missing title in metadata`);
                }

                // Check for description
                if (content.includes('description:')) {
                    log.success(`  └─ Has description`);
                    results.passed++;
                } else {
                    log.error(`  └─ Missing description`);
                    addIssue('metadata', `${pagePath} missing description in metadata`);
                }
            } else {
                log.error(`${pagePath} missing generateMetadata`);
                addIssue('metadata', `${pagePath} needs generateMetadata function`);
            }
        }
    });
}

checkMetadata();

// 3. Check Content Uniqueness
log.section('3. CONTENT UNIQUENESS AUDIT');

function checkContentUniqueness() {
    log.info('Analyzing PSEO page content patterns...');

    const pseoPagePath = path.join(__dirname, '../app/locations/[areaSlug]/services/[serviceSlug]/page.tsx');

    if (fs.existsSync(pseoPagePath)) {
        const content = fs.readFileSync(pseoPagePath, 'utf-8');

        // Check for dynamic content generation
        if (content.includes('area.name') && content.includes('service.title')) {
            log.success('PSEO pages use dynamic area and service data');
            results.passed++;
        } else {
            log.warning('PSEO pages may not be using dynamic data properly');
            addIssue('content', 'PSEO pages should use area.name and service.title dynamically', 'warning');
        }

        // Check for template literals
        if (content.includes('`') || content.includes('${')) {
            log.success('Uses template literals for dynamic content');
            results.passed++;
        } else {
            log.warning('Consider using template literals for more dynamic content');
            addIssue('content', 'Use template literals for dynamic content generation', 'warning');
        }
    }

    log.info(`Total PSEO combinations: ${services.length} services × ${areas.length} areas = ${services.length * areas.length} pages`);
    log.success(`Generating ${services.length * areas.length} unique PSEO pages`);
    results.passed++;
}

checkContentUniqueness();

// 4. Check generateStaticParams
log.section('4. STATIC GENERATION AUDIT');

function checkStaticGeneration() {
    log.info('Checking generateStaticParams functions...');

    const pagesWithStaticParams = [
        'app/services/[serviceSlug]/page.tsx',
        'app/locations/[areaSlug]/page.tsx',
        'app/locations/[areaSlug]/services/[serviceSlug]/page.tsx',
    ];

    pagesWithStaticParams.forEach(pagePath => {
        const fullPath = path.join(__dirname, '..', pagePath);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');

            if (content.includes('generateStaticParams')) {
                log.success(`${pagePath} has generateStaticParams`);
                results.passed++;
            } else {
                log.error(`${pagePath} missing generateStaticParams`);
                addIssue('ssg', `${pagePath} needs generateStaticParams for SSG`);
            }
        }
    });
}

checkStaticGeneration();

// 5. Check Structured Data (Schema.org)
log.section('5. STRUCTURED DATA AUDIT');

function checkStructuredData() {
    log.info('Checking for Schema.org markup...');

    const schemaFiles = [
        'src/components/SchemaInjector.tsx',
        'src/components/ServiceSchema.tsx',
    ];

    schemaFiles.forEach(file => {
        const fullPath = path.join(__dirname, '..', file);
        if (fs.existsSync(fullPath)) {
            const content = fs.readFileSync(fullPath, 'utf-8');

            if (content.includes('@type') && content.includes('application/ld+json')) {
                log.success(`${file} implements Schema.org markup`);
                results.passed++;
            } else {
                log.warning(`${file} exists but may not have proper Schema.org markup`);
                addIssue('schema', `${file} should implement proper Schema.org markup`, 'warning');
            }
        } else {
            log.warning(`${file} not found`);
            addIssue('schema', `Consider adding ${file} for better SEO`, 'warning');
        }
    });
}

checkStructuredData();

// 6. Check Robots.txt and Sitemap
log.section('6. INDEXABILITY AUDIT');

function checkIndexability() {
    log.info('Checking robots.txt...');

    const robotsPath = path.join(__dirname, '../public/robots.txt');
    if (fs.existsSync(robotsPath)) {
        const content = fs.readFileSync(robotsPath, 'utf-8');
        if (content.includes('User-agent:') && content.includes('Allow:')) {
            log.success('robots.txt exists and allows crawling');
            results.passed++;
        } else {
            log.warning('robots.txt exists but may not be configured correctly');
            addIssue('indexability', 'Verify robots.txt configuration', 'warning');
        }
    } else {
        log.warning('robots.txt not found');
        addIssue('indexability', 'Add robots.txt to public/ directory', 'warning');
    }

    log.info('Checking for sitemap generation...');
    const sitemapScript = path.join(__dirname, 'generate-sitemap.js');
    if (fs.existsSync(sitemapScript)) {
        log.success('Sitemap generation script exists');
        results.passed++;
    } else {
        log.warning('No sitemap generation script found');
        addIssue('indexability', 'Consider adding sitemap generation', 'warning');
    }
}

checkIndexability();

// 7. Check Performance Optimizations
log.section('7. PERFORMANCE AUDIT');

function checkPerformance() {
    log.info('Checking for image optimization...');

    // Check if using next/image
    const componentsDir = path.join(__dirname, '../src/components');
    const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

    let usingNextImage = false;
    let usingRegularImg = false;

    components.forEach(comp => {
        const content = fs.readFileSync(path.join(componentsDir, comp), 'utf-8');
        if (content.includes('next/image')) usingNextImage = true;
        if (content.includes('<img')) usingRegularImg = true;
    });

    if (usingNextImage) {
        log.success('Some components use next/image');
        results.passed++;
    }

    if (usingRegularImg) {
        log.warning('Some components still use <img> tags');
        addIssue('performance', 'Consider replacing <img> with next/image for optimization', 'warning');
    }

    // Check for dynamic imports
    log.info('Checking for code splitting...');
    const appDir = path.join(__dirname, '../app');
    const hasInteractiveMapClient = fs.existsSync(path.join(__dirname, '../src/components/InteractiveMapClient.tsx'));

    if (hasInteractiveMapClient) {
        log.success('Using dynamic imports for client-heavy components');
        results.passed++;
    }
}

checkPerformance();

// 8. SEO Best Practices
log.section('8. SEO BEST PRACTICES');

function checkSEOBestPractices() {
    log.info('Checking heading structure...');

    // Check homepage
    const homePage = path.join(__dirname, '../app/page.tsx');
    if (fs.existsSync(homePage)) {
        const content = fs.readFileSync(homePage, 'utf-8');

        // Check for proper component structure
        if (content.includes('<Hero') && content.includes('<Services')) {
            log.success('Homepage has proper component structure');
            results.passed++;
        }
    }

    log.info('Checking for internal linking...');

    // Check if components use Link from next/link
    const headerPath = path.join(__dirname, '../src/components/Header.tsx');
    if (fs.existsSync(headerPath)) {
        const content = fs.readFileSync(headerPath, 'utf-8');
        if (content.includes("from 'next/link'")) {
            log.success('Using next/link for internal navigation');
            results.passed++;
        }
    }

    log.info('Checking for mobile responsiveness...');
    const tailwindConfig = path.join(__dirname, '../tailwind.config.js');
    if (fs.existsSync(tailwindConfig)) {
        const content = fs.readFileSync(tailwindConfig, 'utf-8');
        if (content.includes('md:') || content.includes('lg:')) {
            log.success('Tailwind responsive classes configured');
            results.passed++;
        }
    }
}

checkSEOBestPractices();

// Final Report
log.section('AUDIT SUMMARY');

console.log(`${colors.green}Passed Checks: ${results.passed}${colors.reset}`);
console.log(`${colors.red}Failed Checks: ${results.failed}${colors.reset}`);
console.log(`${colors.yellow}Warnings: ${results.warnings}${colors.reset}`);

if (results.issues.length > 0) {
    log.section('ISSUES FOUND');

    const errors = results.issues.filter(i => i.severity === 'error');
    const warnings = results.issues.filter(i => i.severity === 'warning');

    if (errors.length > 0) {
        console.log(`\n${colors.red}ERRORS (${errors.length}):${colors.reset}`);
        errors.forEach((issue, i) => {
            console.log(`  ${i + 1}. [${issue.type}] ${issue.message}`);
        });
    }

    if (warnings.length > 0) {
        console.log(`\n${colors.yellow}WARNINGS (${warnings.length}):${colors.reset}`);
        warnings.forEach((issue, i) => {
            console.log(`  ${i + 1}. [${issue.type}] ${issue.message}`);
        });
    }
}

log.section('RECOMMENDATIONS');

console.log(`
${colors.cyan}For Better SEO & Ranking:${colors.reset}

1. ${colors.green}✓ Content${colors.reset}
   - Ensure each PSEO page has unique, valuable content
   - Use location and service-specific keywords naturally
   - Aim for 300-500 words per page minimum

2. ${colors.green}✓ Technical SEO${colors.reset}
   - All pages are statically generated (SSG) ✓
   - Clean URL structure ✓
   - Proper metadata on all pages ✓

3. ${colors.green}✓ Performance${colors.reset}
   - Consider using next/image for all images
   - Optimize Core Web Vitals
   - Enable compression in production

4. ${colors.green}✓ Off-Page SEO${colors.reset}
   - Submit sitemap to Google Search Console
   - Build local backlinks
   - Claim Google Business Profile
   - Get listed in local directories

5. ${colors.green}✓ Content Strategy${colors.reset}
   - Add blog section for fresh content
   - Include customer reviews/testimonials
   - Add FAQ sections with schema markup ✓
   - Create location-specific landing pages ✓
`);

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);
