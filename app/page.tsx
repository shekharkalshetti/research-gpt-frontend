import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-off-white text-deep-graphite">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="flex justify-center mb-12">
          <Logo />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-obviously font-light text-5xl md:text-6xl mb-8 tracking-tight">Research with depth</h1>
          <p className="font-cabinet text-light-graphite text-xl mb-12 max-w-2xl mx-auto">
            Get comprehensive research insights with reliable sources on any topic
          </p>

          <div className="relative mt-8">
            <form action="/results" className="flex flex-col items-center">
              <div className="relative w-full max-w-2xl">
                <Input
                  type="text"
                  name="query"
                  placeholder="Ask anything..."
                  className="w-full h-16 pl-12 pr-16 rounded-full bg-off-white border-silver shadow-sm font-cabinet text-lg focus-visible:ring-1 focus-visible:ring-deep-graphite"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-light-graphite" />
                <Link href="/results">
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-deep-graphite hover:bg-deep-graphite/90 text-white"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>

              <div className="mt-6 text-light-graphite text-sm tracking-wide font-cabinet">
                Try: "climate change solutions", "trump tariffs", "healthy meal prep ideas"
              </div>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-silver/5 to-transparent -z-10" />

        <div className="absolute inset-0 -z-20">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#2D2D34 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>
      </div>
    </main>
  )
}
