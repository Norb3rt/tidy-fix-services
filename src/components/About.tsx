
import React from 'react';

const About: React.FC = () => {
  const differentiators = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      ),
      title: "Licensed & Insured",
      text: "Complete peace of mind knowing you're working with qualified professionals."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      title: "Eco-Friendly Products",
      text: "Safe for your family, pets, and the planet. We prioritize green cleaning solutions."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      ),
      title: "5+ Years of Experience",
      text: "Our skilled team has the expertise to handle any job, big or small."
    },
    {
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
      ),
      title: "Satisfaction Guarantee",
      text: "We're not happy until you are. We stand behind our work 100%."
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Your Home, Handled with Care</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At Tidy & Fix Services, we're more than just a service provider—we're your neighbors. For over 5 years, we've been proudly serving the Raleigh-Durham-Chapel Hill community with a commitment to quality, integrity, and your complete satisfaction.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, index) => (
            <div key={index} className="group relative text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">{item.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors relative z-10">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
