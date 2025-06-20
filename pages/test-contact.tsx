import Head from 'next/head';
import Header from '../components/Header';

export default function TestContact() {
  return (
    <>
      <Head>
        <title>Test Contact | Version Bravo</title>
      </Head>

      <Header isAcceleratorPage={true} />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Test Contact Form</h1>
          
          {/* Simple form with default submission - no React handling */}
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="bg-white p-8 rounded-lg shadow-md space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Interest</label>
              <select
                name="interest"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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

            <div>
              <label className="block text-sm font-medium mb-1">Message *</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
              <select
                name="source"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </>
  );
}