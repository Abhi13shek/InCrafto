"use client"

import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative">
            <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto">
              <div className="relative w-full h-full">
                {/* Woman placeholder with laptop */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-6xl lg:text-8xl">👩‍💻</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-400 leading-tight mb-4">
              Do you have further inquiries or require tailored assistance?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our goal is to assist you in finding the right path for your future.
            </p>
            <Button className="bg-[#e8a838] hover:bg-[#d49730] text-white rounded-full px-10 py-6 text-xl font-semibold">
              Talk to us?
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
