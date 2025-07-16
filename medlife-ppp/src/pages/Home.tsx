import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import medsConsultLogo from '../assets/logos/meds-consult.png';
import medsLabLogo from '../assets/logos/meds-lab.png';
import medsDeliveryLogo from '../assets/logos/meds-delivery.png';

const Home: React.FC = () => {
  useEffect(() => {
    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(50px)';
      (card as HTMLElement).style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fadeIn">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-glow">
              Join Our Medical
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Partnership Network
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
              <span className="text-medlife-teal font-semibold">MEDS MADE EASY</span> - Connect with healthcare professionals and expand your practice. 
              Apply to become a partner and help us deliver quality healthcare services to communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/application"
                className="group btn-primary inline-flex items-center px-10 py-5 text-xl font-semibold rounded-xl text-white shadow-2xl"
              >
                <span className="mr-3">🚀</span>
                Start Application
                <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fadeIn">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              The MedLife Ecosystem 🏥
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              One platform, multiple services - making healthcare accessible through our integrated solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* MEDS CONSULT */}
            <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-teal/20">
              <div className="w-48 h-24 flex items-center justify-center mx-auto mb-8">
                <img 
                  src={medsConsultLogo} 
                  alt="Meds Consult" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Doctor Consultations</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with verified healthcare professionals for remote consultations and medical partnerships
              </p>
            </div>

            {/* MEDS LAB */}
            <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-yellow/20">
              <div className="w-48 h-24 flex items-center justify-center mx-auto mb-8">
                <img 
                  src={medsLabLogo} 
                  alt="Meds Lab" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Laboratory Services</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Convenient at-home laboratory testing and diagnostic services for comprehensive healthcare
              </p>
            </div>

            {/* MEDS DELIVERY */}
            <div className="feature-card hover-lift text-center p-10 rounded-2xl shadow-xl border-2 border-medlife-red/20">
              <div className="w-48 h-24 flex items-center justify-center mx-auto mb-8">
                <img 
                  src={medsDeliveryLogo} 
                  alt="Meds Delivery" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pharmacy Delivery</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fast and reliable medication delivery service bringing your prescriptions directly to your door
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;