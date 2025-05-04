import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Finding papers",
    description: "Searching through research papers on Google Scholar...",
    icon: "📚",
  },
  {
    title: "Extracting information",
    description: "Reading and analyzing the papers...",
    icon: "🔍",
  },
  {
    title: "Creating response",
    description: "Generating a comprehensive research summary...",
    icon: "✍️",
  },
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsSliding(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-12">
      <div className="relative h-32">
        <div
          className={cn(
            "absolute w-full transition-all duration-500 ease-in-out",
            isSliding
              ? "transform -translate-x-full opacity-0"
              : "transform translate-x-0 opacity-100"
          )}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-4xl">{steps[currentStep].icon}</div>
            <div>
              <h3 className="text-lg font-medium text-deep-graphite mb-1">
                {steps[currentStep].title}
              </h3>
              <p className="text-sm text-light-graphite">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full bg-silver/20 h-2 rounded-full overflow-hidden">
          <div
            className="bg-deep-graphite h-full transition-all duration-300 ease-out"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-light-graphite">
          <span>Finding papers</span>
          <span>Extracting info</span>
          <span>Creating response</span>
        </div>
      </div>
    </div>
  );
}
