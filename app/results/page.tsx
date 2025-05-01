"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Search, Share, MoreHorizontal, X, ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";

// Mock data for search results
const mockResponse = {
  response:
    "### 1. Executive Summary\nThe tariffs imposed by President Donald Trump have been a significant aspect of his economic policy, aimed at reshaping global trade relationships. These tariffs targeted major trading partners such as Canada, Mexico, and China, with the intention of addressing trade imbalances and protecting American industries. However, the implementation of these tariffs has led to increased costs for consumers, potential slowdowns in economic growth, and retaliatory measures from affected countries. The long-term effects of these tariffs remain a subject of debate among economists and policymakers.\n\n### 2. Research Context\nThe concept of tariffs, which are taxes imposed on imported goods, has been a tool used by governments to protect domestic industries and generate revenue. Historically, tariffs have been employed to influence trade balances and protect nascent industries from foreign competition. Under President Trump, tariffs were used as a strategic tool to renegotiate trade agreements and address perceived unfair trade practices by other countries. The tariffs were part of a broader strategy to prioritize American economic interests and reduce the trade deficit.\n\n### 3. Core Analysis\n- **Implementation and Scope**: President Trump imposed tariffs on a wide range of goods, including steel, aluminum, and various consumer products. The tariffs on Canada and Mexico were set at 25%, while those on China were initially 10%, with some variations over time. These measures were justified as necessary to protect national security and address unfair trade practices.\n  \n- **Economic Impact**: The tariffs led to increased costs for American consumers and businesses, as imported goods became more expensive. This, in turn, contributed to inflationary pressures. The tariffs also disrupted global supply chains, affecting industries reliant on imported components.\n\n- **Retaliation and Trade Wars**: Affected countries, particularly China, responded with their own tariffs on American goods, leading to a trade war. This retaliation targeted key American exports, such as soybeans and pork, impacting U.S. farmers and exporters.\n\n- **Political and Strategic Considerations**: The tariffs were part of a broader strategy to renegotiate trade agreements, such as the United States-Mexico-Canada Agreement (USMCA), and to address issues like intellectual property theft and forced technology transfers by China.\n\n### 4. Implications & Applications\nThe tariffs have had significant implications for international trade and economic policy. They have highlighted the complexities of using tariffs as a tool for economic leverage and the potential for unintended consequences, such as trade wars and increased consumer costs. The experience with tariffs under the Trump administration may inform future trade negotiations and economic strategies, emphasizing the need for a balanced approach that considers both domestic and international impacts.\n\n### 5. Limitations & Future Directions\nThe long-term effects of the tariffs are still unfolding, with ongoing debates about their effectiveness in achieving stated goals. Further research is needed to assess the full economic impact, including potential shifts in global supply chains and the resilience of affected industries. Future studies could also explore alternative strategies for addressing trade imbalances and protecting domestic industries without resorting to tariffs.\n\n### 6. Source Analysis\nThe information on Trump's tariffs is derived from a variety of sources, including news articles, economic analyses, and government reports. Key sources include reputable publications such as The New York Times, Time, and the Associated Press, which provide detailed accounts of the tariffs' implementation and impact. However, the complexity of the issue and the potential for political bias necessitate careful evaluation of sources to ensure a balanced understanding. Further research could benefit from academic studies and empirical analyses to provide a more comprehensive assessment of the tariffs' effects.",
  sources: [
    {
      content:
        "President Donald Trump has made good on his campaign promise to impose tariffs on imports from the United States' three largest supplier countries—Canada, China, and Mexico. Trump signed orders on Saturday evening, imposing 25% tariffs on imports from Mexico and Canada (though Canadian energy faces a lower tariff of 10%) and 10% tariffs on goods from China.",
      score: 0.8033131,
      source:
        "https://time.com/7212166/what-are-tariffs-trump-imposing-import-taxes/",
      title:
        "China to now pay up to 245% tariffs on imports to US: Trump administration announces",
      publication: "hindustantimes",
    },
    {
      content:
        "The Trump administration imposed several rounds of tariffs on steel, aluminum, washing machines, solar panels, and goods from China, affecting more than $380 billion worth of trade at the time of implementation and amounting to a tax increase of nearly $80 billion.",
      score: 0.78788257,
      source:
        "https://taxfoundation.org/research/all/federal/trump-tariffs-trade-war/",
      title:
        "China now faces 245% tariffs on US imports after retaliation amid trade war",
      publication: "indianexpress",
    },
    {
      content:
        "Tariffs What to Know About Trump's New Tariffs The president announced sweeping tariffs on Wednesday in an effort to reset global trading relationships. The tariffs announced by President Trump on Wednesday apply to most of the world.",
      score: 0.77650476,
      source:
        "https://www.nytimes.com/2025/04/03/business/economy/trump-tariffs-trade.html",
      title:
        "Ask US for the specific tax rate figures: China responds to Trump's tariffs",
      publication: "economictimes",
    },
  ],
};

// Type definition for search results
interface SearchResult {
  id: string;
  query: string;
  timestamp: Date;
  response: typeof mockResponse;
}

export default function ResultsPage() {
  // State for managing multiple search results
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: "initial-search",
      query: "trump tariffs",
      timestamp: new Date(),
      response: mockResponse,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const floatingInputRef = useRef<HTMLDivElement>(null);

  // Refs for scrolling to new results
  const resultRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current && isInputExpanded) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [newMessage, isInputExpanded]);

  // Handle click outside to collapse input when expanded
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        floatingInputRef.current &&
        !floatingInputRef.current.contains(event.target as Node) &&
        isInputExpanded
      ) {
        setIsInputExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputExpanded]);

  // Format the response into a more structured document
  const formatResponse = () => {
    const introduction = `The recent developments in tariffs imposed by the Trump administration on China have significantly escalated tensions in the ongoing trade war between the two nations. Here's a summary of the key points:`;

    return (
      <div className="space-y-8">
        <p className="text-deep-graphite leading-relaxed">{introduction}</p>

        <div className="space-y-6">
          <h2 className="text-xl font-obviously font-medium text-deep-graphite">
            Overview of Trump's Tariffs on China
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  Tariff Rates:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  The Trump administration has announced that China now faces
                  tariffs of up to 245% on certain imports to the United States.
                  However, this figure represents the cumulative effect of
                  multiple tariffs rather than a new blanket tariff rate{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  1
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  6
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  8
                </span>
                .
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  Reasons for Tariffs:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  The tariffs are part of Trump's "America First" trade policy,
                  aimed at countering China's export restrictions and
                  retaliatory measures. China had banned exports of key
                  high-tech materials and rare earth metals, which are crucial
                  for various industries{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  1
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  2
                </span>
                .
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  Escalation of Trade War:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  The move follows a series of retaliations, including China
                  raising tariffs on U.S. goods to 125% after the U.S. increased
                  tariffs on Chinese imports to 145%{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  2
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  8
                </span>
                .
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-obviously font-medium text-deep-graphite">
            Impact and Reactions
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  Global Market Impact:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  The trade tensions have caused volatility in global markets
                  and investor sentiments{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  3
                </span>
                .
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  China's Response:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  China has not directly commented on the specific tariff rates
                  but has asked the U.S. to provide detailed figures{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  3
                </span>
                .
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-deep-graphite font-bold">•</span>
              <div>
                <span className="text-deep-graphite font-bold">
                  Hong Kong's Response:
                </span>
                <span className="text-deep-graphite/80">
                  {" "}
                  Hong Kong has suspended postal services to and from the U.S.
                  in response to Trump's tariff hikes and removal of the de
                  minimis exemption for shipments from Hong Kong{" "}
                </span>
                <span className="text-xs bg-silver/30 px-1 rounded mx-1">
                  5
                </span>
                .
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Create a new search result with unique ID
    const newResultId = `search-${Date.now()}`;
    const newResult: SearchResult = {
      id: newResultId,
      query: newMessage,
      timestamp: new Date(),
      response: mockResponse, // Using the same mock response for now
    };

    // Add the new result to the array
    setSearchResults((prev) => [...prev, newResult]);

    // Clear the input and collapse it
    setNewMessage("");
    setIsInputExpanded(false);

    // Scroll to the new result after a short delay to ensure it's rendered
    setTimeout(() => {
      if (resultRefs.current[newResultId]) {
        resultRefs.current[newResultId]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleInputFocus = () => {
    setIsInputExpanded(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <main className="min-h-screen flex flex-col bg-off-white text-deep-graphite">
      <header className="border-b border-silver/30 py-3 sticky top-0 bg-off-white z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Logo />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-light-graphite">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button className="bg-deep-graphite hover:bg-deep-graphite/90 text-white rounded-full">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Render all search results */}
          {searchResults.map((result, index) => (
            <div
              key={result.id}
              className={`mb-16 ${
                index > 0 ? "pt-16 border-t border-silver/30" : ""
              }`}
              ref={(el) => {
                resultRefs.current[result.id] = el;
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-obviously font-medium">
                  {result.query}
                </h1>
                <div className="text-sm text-light-graphite">
                  {formatTimestamp(result.timestamp)}
                </div>
              </div>

              <Tabs defaultValue="search" className="mb-8">
                <div className="flex justify-between items-center">
                  <TabsList className="bg-transparent">
                    <TabsTrigger
                      value="search"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-deep-graphite data-[state=active]:rounded-none data-[state=active]:shadow-none text-light-graphite data-[state=active]:text-deep-graphite"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </TabsTrigger>
                    <TabsTrigger
                      value="sources"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-deep-graphite data-[state=active]:rounded-none data-[state=active]:shadow-none text-light-graphite data-[state=active]:text-deep-graphite"
                    >
                      <span className="flex items-center">
                        <span className="mr-2">Sources</span>
                        <span className="bg-silver/20 text-deep-graphite text-xs px-1.5 py-0.5 rounded-full">
                          {result.response.sources.length}
                        </span>
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-light-graphite flex items-center">
                    <span>2 tasks</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M6.5 12L9.5 8L6.5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <TabsContent value="search" className="mt-6">
                  {formatResponse()}
                </TabsContent>

                <TabsContent value="sources" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.response.sources.map((source, sourceIndex) => (
                      <Card
                        key={sourceIndex}
                        className="bg-white border-silver/30 overflow-hidden hover:border-silver/50 transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-6 w-6 rounded-full bg-silver/20 flex items-center justify-center text-xs">
                              {source.publication.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm text-light-graphite">
                              {source.publication}
                            </span>
                          </div>
                          <h3 className="font-medium text-deep-graphite mb-2">
                            {source.title}
                          </h3>
                          <p className="text-sm text-deep-graphite/70 line-clamp-2">
                            {source.content}
                          </p>
                          <div className="mt-3 text-xs text-light-graphite">
                            <span>
                              +{Math.floor(Math.random() * 10)} sources
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={floatingInputRef}
        className={`fixed bottom-6 left-0 right-0 z-50 px-4 ${
          isInputExpanded ? "mb-0" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-full shadow-lg border border-silver/50 ${
              isInputExpanded
                ? "p-4 rounded-xl"
                : "p-3 hover:shadow-xl cursor-pointer rounded-full"
            }`}
            onClick={!isInputExpanded ? handleInputFocus : undefined}
          >
            {!isInputExpanded ? (
              <div className="flex items-center cursor-text">
                <Search className="h-5 w-5 text-light-graphite mr-3 ml-1" />
                <div className="text-light-graphite flex-grow">
                  Ask anything...
                </div>
                <div className="bg-deep-graphite text-white p-1 rounded-full">
                  <ArrowUp className="h-4 w-4" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-start">
                  <div className="ml-1 mr-3">
                    <Search className="h-5 w-5 text-light-graphite" />
                  </div>
                  <div className="flex-grow">
                    <textarea
                      ref={textareaRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask anything..."
                      className="w-full bg-transparent border-none text-deep-graphite placeholder:text-light-graphite resize-none focus:ring-0 focus:outline-none min-h-[60px]"
                      rows={2}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-deep-graphite text-white hover:bg-deep-graphite/90"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
