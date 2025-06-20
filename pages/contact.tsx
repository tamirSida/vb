import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import DiscreteAdminAccess, { useUrlAdminAccess } from '../components/admin/DiscreteAdminAccess';

export default function Contact() {
  useUrlAdminAccess();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Version Bravo Accelerator</title>
        <meta name="description" content="Get in touch with Version Bravo. Contact our team for questions about our accelerator program, investment opportunities, or partnership inquiries." />
        <meta name="keywords" content="contact version bravo, accelerator contact, veteran entrepreneur contact, startup program inquiry" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://versionbravo.ventures/contact" />
        <meta property="og:title" content="Contact Us | Version Bravo Accelerator" />
        <meta property="og:description" content="Get in touch with Version Bravo for accelerator program inquiries and partnership opportunities." />
        
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://versionbravo.ventures/contact" />
      </Head>

      <Header isAcceleratorPage={true} />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="container-max px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-vb-navy mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-vb-medium max-w-2xl mx-auto">
                Ready to accelerate your venture? Have questions about our program? We'd love to hear from you.
              </p>
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center items-center space-x-12 mb-16">
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/company/version-bravo-ventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-vb-navy to-vb-blue rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <i className="fab fa-linkedin-in text-white text-2xl"></i>
                </div>
                <span className="text-sm font-medium text-vb-medium group-hover:text-vb-navy transition-colors">LinkedIn</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:adam@versionbravo.com"
                className="group flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-vb-navy to-vb-blue rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <i className="fas fa-envelope text-white text-2xl"></i>
                </div>
                <span className="text-sm font-medium text-vb-medium group-hover:text-vb-navy transition-colors">Email</span>
              </a>

              {/* Phone */}
              <a 
                href="tel:+1-555-VERSION"
                className="group flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-vb-navy to-vb-blue rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <i className="fas fa-phone text-white text-2xl"></i>
                </div>
                <span className="text-sm font-medium text-vb-medium group-hover:text-vb-navy transition-colors">Phone</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              {isSubmitted ? (
                <div className="text-center py-12">
                  {/* VB Logo */}
                  <div className="mb-8">
                    <img 
                      src="/images/brand/vb-logo.png" 
                      alt="Version Bravo"
                      className="h-16 mx-auto"
                    />
                  </div>
                  
                  {/* Success Animation */}
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <i className="fas fa-check-circle text-green-600 text-3xl"></i>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-vb-navy mb-4">
                    Thank You!
                  </h2>
                  <p className="text-xl text-vb-medium mb-4">
                    Your message has been received successfully.
                  </p>
                  <p className="text-vb-medium mb-8">
                    We'll be in touch soon to discuss how Version Bravo can help accelerate your venture.
                  </p>
                  
                  {/* Back to Home Button */}
                  <div className="space-y-4">
                    <a 
                      href="/accelerator" 
                      className="inline-flex items-center bg-vb-navy hover:bg-vb-blue text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 mr-4"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to Accelerator
                    </a>
                    <a 
                      href="/accelerator/program" 
                      className="inline-flex items-center bg-vb-gold hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                    >
                      <i className="fas fa-rocket mr-2"></i>
                      Learn About Our Program
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-vb-navy mb-8 text-center">
                    Send Us a Message
                  </h2>
                  
                  {/* Hidden HTML form for Netlify detection */}
                  <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <input type="tel" name="phone" />
                    <input type="text" name="company" />
                    <select name="interest">
                      <option value="accelerator-program">VB Accelerator Program</option>
                      <option value="alpha-bet-program">Alpha-Bet Program</option>
                      <option value="investment-opportunities">Investment Opportunities</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea name="message"></textarea>
                    <select name="source">
                      <option value="linkedin">LinkedIn</option>
                      <option value="referral">Referral from colleague/friend</option>
                      <option value="google">Google search</option>
                      <option value="social-media">Social media</option>
                      <option value="event">Event/Conference</option>
                      <option value="veteran-network">Veteran network</option>
                      <option value="other">Other</option>
                    </select>
                  </form>

                  <form 
                    name="contact" 
                    method="POST" 
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Hidden inputs for Netlify */}
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />
                    
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-vb-navy mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-vb-navy mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    {/* Phone and Company Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-vb-navy mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-vb-navy mb-2">
                          Company/Organization
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Interest Type */}
                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold text-vb-navy mb-2">
                        I'm interested in
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                      >
                        <option value="">Select your primary interest</option>
                        <option value="accelerator-program">VB Accelerator Program</option>
                        <option value="alpha-bet-program">Alpha-Bet Program</option>
                        <option value="investment-opportunities">Investment Opportunities</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="mentorship">Mentorship</option>
                        <option value="general-inquiry">General Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-vb-navy mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your project, goals, or questions..."
                      ></textarea>
                    </div>

                    {/* How did you hear about us */}
                    <div>
                      <label htmlFor="source" className="block text-sm font-semibold text-vb-navy mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="source"
                        name="source"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vb-blue focus:border-transparent transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="referral">Referral from colleague/friend</option>
                        <option value="google">Google search</option>
                        <option value="social-media">Social media</option>
                        <option value="event">Event/Conference</option>
                        <option value="veteran-network">Veteran network</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-vb-navy hover:bg-vb-blue text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane mr-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <DiscreteAdminAccess />
    </>
  );
}