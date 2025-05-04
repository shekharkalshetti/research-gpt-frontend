"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaperOverviewPage() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");
  const paperTitle = searchParams.get("title");
  const paperLink = searchParams.get("link");
  const publicationInfo = searchParams.get("publicationInfo");
  const paperYear = searchParams.get("year");
  const paperCitedBy = searchParams.get("citedBy");

  const [paperData, setPaperData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaperOverview = async () => {
      if (!pdfUrl) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:5000/api/overview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pdf_url: pdfUrl }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch paper overview: ${response.status}`);
        }

        const data = await response.json();
        setPaperData(data.analysis);
      } catch (err) {
        console.error("Error fetching paper overview:", err);
        setError("Failed to fetch paper overview. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaperOverview();
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-off-white">
        <header className="border-b border-silver/30 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Logo />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-deep-graphite mx-auto mb-4" />
            <h2 className="font-obviously font-medium text-xl mb-2">
              Analyzing Paper
            </h2>
            <p className="text-light-graphite">This may take a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-off-white">
        <header className="border-b border-silver/30 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Logo />
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-obviously font-medium text-xl mb-4 text-red-500">
              Error Loading Paper Overview
            </h2>
            <p className="text-light-graphite mb-6">{error}</p>
            <Link href="/results">
              <Button variant="outline">Back to results</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!paperData && !pdfUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="text-center">
          <h1 className="font-obviously font-medium text-2xl mb-4">
            Paper not found
          </h1>
          <Link href="/results">
            <Button variant="outline">Back to results</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-off-white">
      <header className="border-b border-silver/30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />
          <Link
            href={paperLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex"
          >
            <Button variant="outline" size="sm" className="gap-2 font-cabinet">
              <ExternalLink className="h-4 w-4" />
              Go to Paper
            </Button>
          </Link>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/results"
              className="inline-flex items-center text-light-graphite hover:text-deep-graphite transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="font-cabinet">Back to results</span>
            </Link>
          </div>
          {/* Paper Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              {paperYear && (
                <>
                  <div className="text-light-graphite text-sm font-cabinet">
                    Published in {paperYear}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-silver"></div>
                </>
              )}
              {paperCitedBy && (
                <div className="text-light-graphite text-sm font-cabinet">
                  {parseInt(paperCitedBy).toLocaleString()} citations
                </div>
              )}
            </div>
            <h1 className="font-obviously font-medium text-3xl md:text-4xl mb-4">
              {paperTitle}
            </h1>
            {publicationInfo && (
              <p className="text-light-graphite text-lg mb-4">
                {publicationInfo}
              </p>
            )}
            <div className="flex gap-3 mt-4 md:hidden">
              <Link
                href={paperLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 font-cabinet"
                >
                  <ExternalLink className="h-4 w-4" />
                  Go to Paper
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary */}
          {paperData?.summary && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Summary
                </h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">
                  {paperData.summary}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Key Findings */}
          {paperData?.key_findings && paperData.key_findings.length > 0 && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Key Findings
                </h2>
                <ul className="font-cabinet text-deep-graphite/80 leading-relaxed space-y-2">
                  {paperData.key_findings.map(
                    (finding: string, index: number) => (
                      <li key={index} className="flex">
                        <span className="mr-2">•</span>
                        <span>{finding}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Research Objectives */}
          {paperData?.objectives && paperData.objectives.length > 0 && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Research Objectives
                </h2>
                <ul className="font-cabinet text-deep-graphite/80 leading-relaxed space-y-2">
                  {paperData.objectives.map(
                    (objective: string, index: number) => (
                      <li key={index} className="flex">
                        <span className="mr-2">•</span>
                        <span>{objective}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Methods Used */}
          {paperData?.methods && paperData.methods.length > 0 && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Methods Used
                </h2>
                <ul className="font-cabinet text-deep-graphite/80 leading-relaxed space-y-2">
                  {paperData.methods.map((method: string, index: number) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {paperData?.results && paperData.results.length > 0 && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Results
                </h2>
                <ul className="font-cabinet text-deep-graphite/80 leading-relaxed space-y-2">
                  {paperData.results.map((result: string, index: number) => (
                    <li key={index} className="flex">
                      <span className="mr-2">•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Conclusion */}
          {paperData?.conclusion && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Conclusion
                </h2>
                <p className="font-cabinet text-deep-graphite/80 leading-relaxed">
                  {paperData.conclusion}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Key Concepts */}
          {paperData?.key_concepts && paperData.key_concepts.length > 0 && (
            <Card className="border-0 shadow-sm bg-white mb-6">
              <CardContent className="p-6">
                <h2 className="font-obviously font-medium text-xl mb-4">
                  Key Concepts
                </h2>
                <div className="flex flex-wrap gap-2">
                  {paperData.key_concepts.map(
                    (concept: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-silver/20 text-deep-graphite px-3 py-1 rounded-full text-sm font-cabinet"
                      >
                        {concept}
                      </span>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#2D2D34 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
    </main>
  );
}
