import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import SchemaInjector from "@/components/SchemaInjector";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: {
        default: "Tidy & Fix | Professional Cleaning, Handyman & Drywall Services | Raleigh-Durham",
        template: "%s | Tidy & Fix"
    },
    description: "Professional handyman, cleaning, and drywall services in Raleigh-Durham. Licensed, insured, and satisfaction guaranteed. Get your free quote today with 2-hour response time.",
    keywords: ["handyman Raleigh", "cleaning services Durham", "drywall repair", "home services Raleigh-Durham", "residential cleaning", "commercial cleaning", "handyman services"],
    authors: [{ name: "Tidy & Fix Services" }],
    openGraph: {
        title: "Tidy & Fix | Professional Home Services in Raleigh-Durham",
        description: "Professional cleaning, handyman, and drywall services. Licensed, insured, and satisfaction guaranteed. 2-hour response time.",
        url: "https://tidyfix.services",
        siteName: "Tidy & Fix",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tidy & Fix | Professional Home Services",
        description: "Get your free quote from Tidy & Fix. Professional service guaranteed with 2-hour response time.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Check if we're on admin or login pages
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/login');

    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-50 text-slate-900`}>
                {!isAdminRoute && (
                    <>
                        <SchemaInjector />
                        <Header />
                        <BreadcrumbsWrapper />
                    </>
                )}
                <main>{children}</main>
                {!isAdminRoute && (
                    <>
                        <Footer />
                        <FloatingActionButton />
                    </>
                )}
            </body>
        </html>
    );
}
