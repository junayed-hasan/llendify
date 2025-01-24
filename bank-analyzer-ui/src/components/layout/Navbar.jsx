import React, { useState } from 'react';
import { DollarSign, Mail, Phone, MapPin } from 'lucide-react';
import Modal from '../common/Modal';

const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <nav className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition-opacity">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">LLendify</h1>
                    <p className="text-sm text-gray-500">LLM-Driven Loan Insights</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsAboutOpen(true)}
                className="text-gray-600 hover:text-green-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-green-50"
              >
                About
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* About Modal */}
      <Modal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About LLendify"
      >
        <div className="space-y-4">
          <p>
            LLendify is an innovative loan analysis tool that leverages the power of AI to provide deep insights into your banking data. Our platform uses advanced LLM technology to analyze bank statements and provide actionable loan recommendations.
          </p>
          <p>
            Our mission is to make loan qualification analysis accessible and understandable for everyone, whether you're an individual looking to understand your loan eligibility or a business seeking to optimize your borrowing potential.
          </p>
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <h3 className="font-semibold text-green-800 mb-2">Key Features:</h3>
            <ul className="space-y-2 text-green-700">
              <li>• Instant AI-powered loan analysis</li>
              <li>• Secure document processing</li>
              <li>• Comprehensive financial insights</li>
              <li>• Smart loan recommendations</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Us"
      >
        <div className="space-y-6">
          <p className="text-gray-600 mb-4">
            Have questions about your loan analysis? We're here to help! Reach out to us through any of the following channels:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-5 w-5 text-green-600" />
              <a href="mailto:support@llendify.com" className="hover:text-green-600">
                support@llendify.com
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="h-5 w-5 text-green-600" />
              <a href="tel:+1234567890" className="hover:text-green-600">
                +1 (234) 567-890
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>123 Finance Street, Silicon Valley, CA 94025</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Business Hours:</h4>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;