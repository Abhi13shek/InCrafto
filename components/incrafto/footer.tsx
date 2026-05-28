"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 50 50" className="h-10 w-10">
                <path d="M10 40 L25 10 L30 25" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M25 25 L40 25" stroke="currentColor" strokeWidth="4" fill="none" />
                <path d="M35 20 L40 25 L35 30" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
              <span className="text-2xl font-bold">Incrafto</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering careers through quality education and professional training. Your success is our mission.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Courses", "Corporate Training", "Placement", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              {["Python Full Stack", "Data Science", "Digital Marketing", "Java Development", "Data Analytics"].map((course) => (
                <li key={course}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="h-4 w-4 text-white" />
                <span>9211567120</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="h-4 w-4 text-white" />
                <span>info@incrafto.in</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 text-white mt-1" />
                <span>Delhi, India</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-white hover:text-black flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Incrafto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
