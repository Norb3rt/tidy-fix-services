import React from 'react';
import About from '@/components/About';
import ServiceAreas from '@/components/ServiceAreas';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import StatsBar from '@/components/StatsBar';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
    return (
        <>
            <Hero />
            <StatsBar />
            <About />
            <Services />
            <HowItWorks />
            <ServiceAreas />
            <WhyChooseUs />
            <Gallery />
            <Testimonials />
            <Faq />
            <Contact />
        </>
    );
}
