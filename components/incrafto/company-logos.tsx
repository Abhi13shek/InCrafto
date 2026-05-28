"use client"

const companies = [
  "Cognizant",
  "HCL",
  "Hexaware",
  "Virtusa",
  "Dell",
  "Tech Mahindra",
  "Wipro",
  "Deloitte",
  "Accenture",
  "Amazon",
  "Coca-Cola",
  "L&T Infotech",
  "KONE",
  "Verizon",
  "Mindtree",
  "Capgemini",
  "HP Enterprise",
  "Dalmia",
]

export function CompanyLogos() {
  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 items-center">
          {/* Stats */}
          <div>
            <div className="text-4xl lg:text-5xl font-bold text-foreground">
              17,350+
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-[#3498db]">
              Career
              <br />
              Transformations
            </div>
          </div>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-4 flex items-center justify-center h-16 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-muted-foreground font-medium text-sm text-center">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
