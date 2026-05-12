import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "pause-on-hover": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
            style={{ 
              gap: "var(--gap)",
              paddingRight: !vertical ? "var(--gap)" : undefined,
              paddingBottom: vertical ? "var(--gap)" : undefined
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
