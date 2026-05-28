"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: 1,
    title: "Python Full Stack Developer",
    image: "🐍",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 2,
    title: "Data Science",
    image: "📊",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    title: "Digital Marketing",
    image: "📈",
    color: "from-orange-400 to-pink-500",
  },
  {
    id: 4,
    title: "Data Analytics",
    image: "📉",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 5,
    title: "Java Full Stack",
    image: "☕",
    color: "from-red-400 to-orange-500",
  },
  {
    id: 6,
    title: "2D/3D Animation",
    image: "🎬",
    color: "from-pink-400 to-rose-500",
  },
]

export function FeaturedCourses() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCourses = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= courses.length - visibleCourses + 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? courses.length - visibleCourses : prev - 1
    )
  }

  return (
    <section className="py-16 px-4 bg-background" id="courses">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#e8a838] mb-4">
          Featured Courses
        </h2>
        <p className="text-muted-foreground mb-10 max-w-3xl">
          Upgrade your skills with our career-focused courses in Technology, Animation, and Professional Training — from web development and Python to 2D/3D animation, VFX, and digital marketing.
        </p>

        <div className="relative">
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * 290}px)` }}
            >
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="w-[270px] flex-shrink-0"
                >
                  <div className="bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className={`h-48 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                      <span className="text-6xl">{course.image}</span>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-foreground text-lg mb-2">
                        {course.title}
                      </h3>
                      <a 
                        href="#" 
                        className="text-[#e8a838] hover:text-[#d49730] font-medium inline-flex items-center gap-1"
                      >
                        View more...
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#e8a838] hover:bg-[#d49730] text-white border-none rounded-full shadow-lg z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#e8a838] hover:bg-[#d49730] text-white border-none rounded-full shadow-lg z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
