import { Header } from "@/components/incrafto/header"
import { Hero } from "@/components/incrafto/hero"
import { Footer } from "@/components/incrafto/footer"

import { Courses } from "@/components/courses"
import { WhyUs } from "@/components/why-us"
import { Success } from "@/components/success"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />

      <Courses />
      <WhyUs />
      <Success />
      <Testimonials />
      <CTA />

      <Footer />
    </main>
  )
}
