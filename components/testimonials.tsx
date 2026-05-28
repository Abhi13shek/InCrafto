"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Data Scientist at Google",
    course: "Data Science & Analytics",
    image: "/testimonials/priya.jpg",
    content: "Incrafto transformed my career completely. The hands-on projects and mentorship helped me land my dream job at Google. The curriculum is truly industry-relevant.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "ML Engineer at Microsoft",
    course: "AI & Machine Learning",
    image: "/testimonials/rahul.jpg",
    content: "The AI course here is exceptional. The instructors are industry experts who share real-world insights. I went from a fresher to an ML engineer in just 8 months.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Senior Animator at DreamWorks",
    course: "3D Animation & VFX",
    image: "/testimonials/ananya.jpg",
    content: "The animation program exceeded my expectations. Working on real projects and getting feedback from professionals was invaluable for my growth.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Full Stack Developer at Amazon",
    course: "Full Stack Development",
    image: "/testimonials/vikram.jpg",
    content: "Best investment I made in my career. The placement support was incredible - I had 3 job offers before even completing the course!",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Marketing Manager at Meta",
    course: "Digital Marketing",
    image: "/testimonials/sneha.jpg",
    content: "The digital marketing program gave me practical skills that I use daily. The live campaign projects were exactly what employers look for.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Data Analyst at Netflix",
    course: "Data Science & Analytics",
    image: "/testimonials/arjun.jpg",
    content: "Incrafto&apos;s focus on real-world applications sets it apart. The capstone project helped me showcase my skills and get noticed by recruiters.",
    rating: 5,
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-4">
            Student Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-balance">What Our Students </span>
            <span className="text-gradient">Say About Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful professionals who started their journey with Incrafto.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl border border-border/50 p-6 transition-all duration-500 hover:shadow-premium hover:border-primary/10 hover:-translate-y-1">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                {/* Content */}
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {testimonial.content}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-muted-foreground text-muted-foreground" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
