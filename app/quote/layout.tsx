import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get Your Free Quote | Tidy & Fix Services",
    description: "Get your free quote from Tidy & Fix for professional handyman, cleaning, and drywall services in Raleigh-Durham. Fast 2-hour response guaranteed.",
    keywords: ["free quote", "handyman quote", "cleaning quote", "drywall quote", "Raleigh services", "Durham services"],
    openGraph: {
        title: "Get Your Free Quote | Tidy & Fix",
        description: "Professional cleaning, handyman, and drywall services. 2-hour response guarantee.",
        type: "website"
    },
    robots: "index, follow"
};

export default function QuoteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
