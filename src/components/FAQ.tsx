import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need any technical knowledge to integrate 3D AR in my website?',
    answer: 'No, our platform is designed to be user-friendly and requires no technical expertise. We provide simple embed codes and integration guides for all major e-commerce platforms.',
    mobileAnswer: 'No technical expertise needed. We provide simple embed codes for all major platforms.',
  },
  {
    question: 'I don\'t have a website. Can I still utilize 3D and AR visualizations for my products?',
    answer: 'Yes! We provide hosted solutions and shareable links that you can use across various platforms and social media.',
    mobileAnswer: 'Yes! Use our hosted solutions and shareable links anywhere.',
  },
  {
    question: 'How much time does it take?',
    answer: 'Most products can be transformed into 3D visualizations within 24-48 hours. Complex products might take longer depending on the detail required.',
    mobileAnswer: '24-48 hours for most products. Complex items may take longer.',
  },
  {
    question: 'How am I charged?',
    answer: 'We offer flexible pricing plans based on your needs. You can choose from monthly subscriptions or pay-per-model options. Contact us for custom enterprise solutions.',
    mobileAnswer: 'Choose from monthly plans or pay-per-model. Custom solutions available.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="bg-[#181819] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className={`text-[#fff4e2] ${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-3 sm:mb-4`}>
            Frequently Asked <span className="text-[#677870]">Questions</span>
          </h2>
          <p className={`text-[#fff4e2]/60 ${isMobile ? 'text-base px-4' : 'text-xl'} font-medium`}>
            {isMobile ? 'Quick answers to common questions' : 'Everything you need to know about our service'}
          </p>
        </div>
        
        <div className={`space-y-4 sm:space-y-6`}>
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#1e1e1f] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300
                hover:bg-[#242425] hover:shadow-lg hover:shadow-[#677870]/5"
            >
              <button
                className={`w-full ${isMobile ? 'px-4 py-4' : 'px-6 py-5'} flex items-center justify-between text-left group`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-[#fff4e2] group-hover:text-[#677870] transition-colors pr-4`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-[#677870] flex-shrink-0`} />
                ) : (
                  <ChevronDown className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-[#fff4e2]/60 group-hover:text-[#677870] transition-colors flex-shrink-0`} />
                )}
              </button>
              
              {openIndex === index && (
                <div className={`${isMobile ? 'px-4 pb-4' : 'px-6 pb-5'}`}>
                  <p className="text-[#fff4e2]/80 leading-relaxed">
                    {isMobile ? faq.mobileAnswer : faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}