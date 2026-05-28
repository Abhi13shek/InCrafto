"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Users, Star, Brain, Code, LineChart, Palette, Megaphone, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  {
    title: "AI & Machine Learning",
    description: "Master cutting-edge AI technologies and build intelligent systems",
    icon: Brain,
    duration: "6 months",
    students: "2.5K+",
    rating: 4.9,
    color: "from-zinc-100 to-zinc-500",
    popular: true,
  },
  {
    title: "Full Stack Development",
    description: "Build modern web applications with React, Node.js, and cloud services",
    icon: Code,
    duration: "5 months",
    students: "3.2K+",
    rating: 4.8,
    color: "from-zinc-200 to-zinc-600",
    popular: false,
  },
  {
    title: "Data Science & Analytics",
    description: "Transform data into insights with Python, SQL, and visualization tools",
    icon: LineChart,
    duration: "4 months",
    students: "1.8K+",
    rating: 4.9,
    color: "from-zinc-300 to-zinc-700",
    popular: true,
  },
  {
    title: "3D Animation & VFX",
    description: "Create stunning visuals and animations for film, games, and media",
    icon: Palette,
    duration: "8 months",
    students: "1.2K+",
    rating: 4.7,
    color: "from-zinc-400 to-zinc-800",
    popular: false,
  },
  {
    title: "Digital Marketing",
    description: "Master SEO, social media, PPC, and growth marketing strategies",
    icon: Megaphone,
    duration: "3 months",
    students: "2.8K+",
    rating: 4.8,
    color: "from-zinc-200 to-zinc-700",
    popular: false,
  },
  {
    title: "Corporate Training",
    description: "Customized programs to upskill your team with industry-relevant skills",
    icon: Briefcase,
    duration: "Custom",
    students: "500+",
    rating: 4.9,
    color: "from-zinc-100 to-zinc-800",
    popular: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Courses() {
  return (
    <section id="courses" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      
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
            Featured Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-balance">Discover Your </span>
            <span className="text-gradient">Perfect Course</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-designed curriculum taught by experts. Choose from our range of premium programs to accelerate your career.
          </p>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full bg-card rounded-2xl border border-border/50 p-6 transition-all duration-500 hover:shadow-premium-hover hover:border-primary/20 hover:-translate-y-1">
                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute -top-3 right-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-foreground border border-border text-xs font-semibold">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <course.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-muted-foreground" />
                    {course.rating}
                  </div>
                </div>

                {/* CTA */}
                <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary/5 rounded-xl">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="rounded-xl px-8 py-6 text-base font-medium border-2 hover:bg-primary hover:text-white hover:border-primary transition-all">
            View All Courses
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
