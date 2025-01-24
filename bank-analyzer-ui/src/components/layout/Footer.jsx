import React from 'react';
import { DollarSign, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">LLendify</h1>
                <p className="text-xs text-gray-500">LLM-Driven Loan Insights</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Transforming banking data into actionable loan insights with the power of AI.
            </p>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-green-600">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2024 LLendify. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-600">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;