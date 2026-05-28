"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Anita Verma",
    role: "Software Tester",
    review: "Industrial training ne mujhe real-time projects pe kaam karna sikhaya. Confidence boost ho gaya",
    rating: 4,
    avatar: "AV",
  },
  {
    id: 2,
    name: "Pravin Kumar",
    role: "Engineer",
    review: "The 2D animation course was super creative. I learned real industry tools used by professionals",
    rating: 5,
    avatar: "PK",
  },
  {
    id: 3,
    name: "Anshul Kumar",
    role: "Engineer",
    review: "Corporate sessions helped improve my soft skills and team communication. Very professional setup",
    rating: 5,
    avatar: "AK",
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Data Analyst",
    review: "The data science course transformed my career. Excellent mentorship and practical projects.",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 5,
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    review: "Best investment for my career. The curriculum is industry-relevant and instructors are top-notch.",
    rating: 5,
    avatar: "RS",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleTestimonials = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= testimonials.length - visibleTestimonials + 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? testimonials.length - visibleTestimonials : prev - 1
    )
  }

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
          What our learners have to say?
        </h2>

        <div className="relative">
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * 340}px)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-[320px] flex-shrink-0"
                >
                  <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {testimonial.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {testimonial.review}
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-[#e8a838] fill-[#e8a838]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-gray-300"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
