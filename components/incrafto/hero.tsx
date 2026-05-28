"use client"

import { Button } from "@/components/ui/button"
import { HeroScene } from "./hero-scene"

export function Hero() {
  const skillTags = [
    { text: "Java", top: "10%", right: "30%", delay: "0s" },
    { text: "SEO", top: "30%", right: "60%", delay: "0.2s" },
    { text: "Marketing", top: "45%", right: "50%", delay: "0.4s" },
    { text: "Data Science", top: "20%", right: "10%", delay: "0.6s" },
    { text: "Animation", top: "60%", right: "20%", delay: "0.8s" },
  ]

  return (
    <section className="relative bg-gradient-to-br from-background via-muted to-background min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* 3D Background - Full Width */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance">
              <span className="text-foreground">Craft Your Career</span>
              <br />
              <span className="text-muted-foreground">Learn With Incrafto</span>
            </h1>
            <p className="mt-6 text-xl lg:text-2xl text-foreground font-medium">
              Upskill Today, Succeed Tomorrow
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button className="bg-foreground hover:bg-zinc-200 text-background rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Talk to Advisor
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-border text-foreground hover:bg-muted rounded-full px-8 py-6 text-lg transition-all"
              >
                Download Brochure
              </Button>
            </div>
          </div>

          {/* Right Content - Floating Skill Tags */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:block">
            {/* Skill Tags floating on right side */}
            {skillTags.map((tag, index) => (
              <div
                key={index}
                className="absolute bg-card border border-border text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow cursor-default"
                style={{ 
                  top: tag.top, 
                  right: tag.right,
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: tag.delay,
                }}
              >
                {tag.text}
              </div>
            ))}
            
            {/* Decorative woman illustration placeholder */}
            {/* <div className="absolute bottom-0 right-10 w-72 h-96 flex items-end justify-center">
              <div className="relative">
                <div className="w-48 h-72 bg-gradient-to-t from-[#f5c842] to-[#f5d76e] rounded-t-full flex items-start justify-center pt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mx-auto mb-2" />
                    <div className="w-24 h-8 bg-background/20 rounded-lg mx-auto" />
                  </div>
                </div>
                <div className="absolute -left-8 bottom-20 w-32 h-20 bg-gray-700 rounded-lg transform -rotate-12 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <div className="w-20 h-12 bg-blue-400/30 rounded" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
