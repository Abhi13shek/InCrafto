"use client"

import { User, ExternalLink } from "lucide-react"

const categories = [
  { id: 1, title: "Full Stack Developer with AI", link: "#" },
  { id: 2, title: "Java Full Stack Development", link: "#" },
  { id: 3, title: "Python Full Stack Developer", link: "#" },
  { id: 4, title: "Data Science", link: "#" },
  { id: 5, title: "Data Analytics", link: "#" },
  { id: 6, title: "Digital Marketing", link: "#" },
  { id: 7, title: "Human Resource Management", link: "#" },
  { id: 8, title: "Corporate Training", link: "#" },
]

export function Categories() {
  return (
    <section className="py-16 px-4 bg-background" id="corporate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3498db] mb-4">
            Explore Our High-Demand Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            The most effective project-based immersive learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="bg-muted hover:bg-muted rounded-xl p-6 flex items-start gap-4 transition-colors group"
            >
              <div className="bg-background rounded-full p-3 shadow-sm group-hover:shadow-md transition-shadow">
                <User className="h-5 w-5 text-[#3498db]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                  {category.title}
                </h3>
                <span className="text-[#3498db] text-sm flex items-center gap-1">
                  Explore <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
