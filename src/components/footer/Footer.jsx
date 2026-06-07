import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-lg font-semibold text-gray-900">MegaBlog</Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              A modern platform for sharing ideas, stories, and knowledge with the world.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} MegaBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
