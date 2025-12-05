import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { servicesData, areasData } from '@/data';
import HashLink from './HashLink';

const Footer: React.FC = () => {
  // Get top 4 services and locations
  const topServices = servicesData.slice(0, 4);
  const topLocations = areasData.slice(0, 4);

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo-transparente.png" alt="Tidy & Fix" className="h-24 w-auto brightness-0 invert" />
            </div>
            <p className="text-slate-400 leading-relaxed font-sans">
              Professional cleaning, handyman, and drywall services in Raleigh-Durham. Licensed, insured, and satisfaction guaranteed.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Twitter, href: 'https://twitter.com' },
                { Icon: Linkedin, href: 'https://linkedin.com' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label={`Visit our ${Icon.name} page`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 group font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations Column */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Service Areas</h4>
            <ul className="space-y-4">
              {topLocations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 group font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Service Area</p>
                  <p className="text-sm text-slate-400">Raleigh, Durham, Chapel Hill & Surrounding Areas</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+19842124247" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    (984) 212-4247
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:info@tidyfix.services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    info@tidyfix.services
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Tidy & Fix Services. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium flex-wrap justify-center">
            <Link href="/quote" className="text-white hover:text-blue-400 transition-colors">Get a Quote</Link>
            <Link href="/about" className="text-white hover:text-blue-400 transition-colors">About Us</Link>
            <HashLink to="#faq" className="text-white hover:text-blue-400 transition-colors">FAQ</HashLink>
            <Link href="/sitemap" className="text-white hover:text-blue-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
