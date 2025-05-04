"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Search,
  Share,
  MoreHorizontal,
  ArrowUp,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { LoadingState } from "@/components/loading-state";

// Type definitions
interface Source {
  title: string;
  citedBy: string;
  year: string;
  publicationInfo: string;
  abstract: string;
  link: string;
  pdfUrl: null | string;
}

interface ApiResponse {
  query: string;
  response: string;
  papers: Source[];
}

interface SearchResult {
  id: string;
  query: string;
  timestamp: Date;
  response: ApiResponse;
}

// API call function
const fetchResearch = async (query: string): Promise<ApiResponse> => {
  const response = await fetch("http://127.0.0.1:5000/api/research", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch research data");
  }
  return response.json();
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  // State for managing search results
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isInputExpanded, setIsInputExpanded] = useState(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const floatingInputRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // React Query mutation for API call
  const { mutate, isPending } = useMutation({
    mutationFn: fetchResearch,
    onSuccess: (data) => {
      // Check if a result with the same query already exists
      const queryExists = searchResults.some(
        (result) => result.query.toLowerCase() === data.query.toLowerCase()
      );
      if (queryExists) {
        // If the query already exists, don't add a duplicate result
        setNewMessage("");
        setIsInputExpanded(false);
        return;
      }

      const newResultId = `search-${Date.now()}`;
      const newResult: SearchResult = {
        id: newResultId,
        query: data.query,
        timestamp: new Date(),
        response: data,
      };
      setSearchResults((prev) => [...prev, newResult]);
      setNewMessage("");
      setIsInputExpanded(false);
      setTimeout(() => {
        if (resultRefs.current[newResultId]) {
          resultRefs.current[newResultId]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    },
    onError: (error) => {
      console.error("Error fetching research:", error);
      // Optionally, display an error message to the user
    },
  });

  // Handle initial query from URL
  useEffect(() => {
    if (initialQuery) {
      // Only trigger the API call if the query hasn't been processed yet
      const queryExists = searchResults.some(
        (result) => result.query.toLowerCase() === initialQuery.toLowerCase()
      );
      if (!queryExists) {
        mutate(initialQuery);
      }
    }
  }, [initialQuery, mutate, searchResults]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && isInputExpanded) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [newMessage, isInputExpanded]);

  // Handle click outside to collapse input
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

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    mutate(newMessage);
  };

  const handleInputFocus = () => {
    setIsInputExpanded(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Format response using ReactMarkdown
  const formatResponse = (response: string) => {
    return (
      <div className="space-y-8">
        <div className="prose max-w-none text-deep-graphite">
          <ReactMarkdown
            disallowedElements={["hr"]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-medium text-deep-graphite mt-6 mb-4"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-medium text-deep-graphite mt-6 mb-4"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg font-medium text-deep-graphite mt-4 mb-2"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-deep-graphite leading-relaxed mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-4 list-disc pl-5" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-deep-graphite/80" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-deep-graphite" {...props} />
              ),
            }}
          >
            {response}
          </ReactMarkdown>
        </div>
      </div>
    );
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
            <Button className="bg-deep-graphite hover:bg-deep-graphite/90 text-white rounded-xl">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl mx-auto">
          {isPending && searchResults.length < 1 && (
            <div className="flex justify-center items-center">
              <LoadingState />
            </div>
          )}
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
                        <span className="mr-2">Papers</span>
                        <span className="bg-silver/20 text-deep-graphite text-xs px-1.5 py-0.5 rounded-full">
                          {result.response.papers.length}
                        </span>
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="search" className="mt-6">
                  {formatResponse(result.response.response)}
                </TabsContent>
                <TabsContent value="sources" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.response.papers.map((source, sourceIndex) => {
                      const queryParams = new URLSearchParams({
                        pdfUrl: source.pdfUrl!,
                        title: source.title,
                        publicationInfo: source.publicationInfo,
                        year: source.year.toString(),
                        citedBy: source.citedBy || "2",
                        link: source.link,
                      });
                      return (
                        <Card
                          key={sourceIndex}
                          className="bg-white border-silver/30 overflow-hidden hover:border-silver/50 transition-colors flex flex-col"
                          style={{ height: "220px" }}
                        >
                          <div className="p-4 flex flex-col h-full">
                            <div>
                              <h3 className="font-medium text-deep-graphite mb-2 line-clamp-2">
                                {source.title}
                              </h3>
                              <p className="text-sm text-deep-graphite/70 line-clamp-2">
                                {source.abstract}
                              </p>
                            </div>
                            <div className="mt-auto pt-3 flex justify-between">
                              <a
                                href={source.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View Paper
                                </Button>
                              </a>
                              <Link
                                href={
                                  source.pdfUrl
                                    ? `/paper?${queryParams.toString()}`
                                    : "#"
                                }
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs"
                                  disabled={!source.pdfUrl}
                                >
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  Overview
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Input Component */}
      <div
        ref={floatingInputRef}
        className={`fixed bottom-6 left-0 right-0 z-50 px-4 hover:cursor-text ${
          isInputExpanded ? "mb-0" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-white rounded-xl shadow-lg border border-silver/50 ${
              isInputExpanded ? "p-4" : "p-3 hover:shadow-xl cursor-pointer"
            }`}
            onClick={!isInputExpanded ? handleInputFocus : undefined}
          >
            {!isInputExpanded ? (
              <div className="flex items-center">
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
                      disabled={isPending}
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-deep-graphite text-white hover:bg-deep-graphite/90"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
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
