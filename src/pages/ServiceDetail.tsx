import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  included: string[];
  forWho: string[];
  whyUs: string;
  gallery?: string[];
}

export default function ServiceDetail({ title, subtitle, description, included, forWho, whyUs, gallery }: ServiceDetailProps) {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const nextImage = () => {
    if (gallery) {
      setCurrentImage((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (gallery) {
      setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt={title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {description}
                </p>
                <Link to="/contact" className="btn-primary inline-block">
                  {t('cta_estimate')}
                </Link>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-brand-dark">{t('service_included')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {included.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-slate-600">
                      <CheckCircle2 className="text-brand-light shrink-0" size={20} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {gallery && gallery.length > 0 && (
                <div className="space-y-8 pt-8 border-t border-slate-100">
                  <h2 className="text-3xl font-bold text-brand-dark">{t('service_gallery')}</h2>
                  
                  {/* Carousel Container - 60% of screen width on large screens, aligned left */}
                  <div className="relative w-full lg:w-[90%] group">
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImage}
                          src={gallery[currentImage]}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setLightboxImage(gallery[currentImage])}
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>

                      {/* Overlay controls */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <button 
                        onClick={() => setLightboxImage(gallery[currentImage])}
                        className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                      >
                        <Maximize2 size={20} />
                      </button>

                      {/* Navigation Arrows */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                        {gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImage ? 'bg-white w-6' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`relative shrink-0 w-24 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                          idx === currentImage ? 'border-brand-light scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>


            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold text-brand-dark">{t('service_for_who')}</h3>
                <ul className="space-y-3">
                  {forWho.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-light mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-dark p-8 rounded-3xl text-white space-y-4">
                <h3 className="text-xl font-bold">{t('service_why_us')}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {whyUs}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X size={40} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

