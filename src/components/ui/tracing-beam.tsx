"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useTransform,
    useScroll,
    useVelocity,
    useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setSvgHeight(contentRef.current.offsetHeight);
        }
    }, []);

    const y1 = useSpring(
        useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
        {
            stiffness: 500,
            damping: 90,
        }
    );
    const y2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
        {
            stiffness: 500,
            damping: 90,
        }
    );

    // Override y1 to simulate growing from top if user implies "top to bottom" filling.
    // However, the user said "beam should be from top to bottom not work bottom to top".
    // If usage of standard TracingBeam is 'slug', maybe they want it to FILL the line as they scroll?
    // Let's try to pin y1 to near 0.

    // Actually, looking at the code I read earlier:
    // y1 maps to [50, svgHeight]
    // y2 maps to [50, svgHeight - 200]
    // This actually makes y1 (gradient start) move FASTER/Further than y2 (gradient end).
    // If y1 > y2, the gradient is inverted or behaves weirdly in SVG linearGradient depending on userSpaceOnUse.
    // I will SWAP them so it grows properly.
    // Let's make y1 (Top of gradient) stay at 0 or move slowly.
    // Let's make y2 (Bottom of gradient) track the scroll.

    const y1_fixed = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 50]), // Stays near top
        { stiffness: 500, damping: 90 }
    );
    const y2_moving = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, svgHeight]), // Moves to bottom
        { stiffness: 500, damping: 90 }
    );

    return (
        <motion.div
            ref={ref}
            className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
        >
            <div className="absolute -left-4 md:-left-20 top-3">
                <motion.div
                    transition={{
                        duration: 0.2,
                        delay: 0.5,
                    }}
                    animate={{
                        backgroundColor: scrollYProgress.get() > 0 ? "white" : "white",
                        borderColor: scrollYProgress.get() > 0 ? "white" : "var(--neutral-200)",
                    }}
                    className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
                >
                    <motion.div
                        transition={{
                            duration: 0.2,
                            delay: 0.5,
                        }}
                        animate={{
                            backgroundColor: scrollYProgress.get() > 0 ? "#ef4444" : "white",
                            borderColor: scrollYProgress.get() > 0 ? "white" : "var(--neutral-200)",
                        }}
                        className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
                    />
                </motion.div>
                <svg
                    viewBox={`0 0 20 ${svgHeight}`}
                    width="20"
                    height={svgHeight} // Set the SVG height
                    className=" ml-4 block"
                    aria-hidden="true"
                >
                    <motion.path
                        d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                        fill="none"
                        stroke="#9091A0"
                        strokeOpacity="0.16"
                        transition={{
                            duration: 10,
                        }}
                    ></motion.path>
                    <motion.path
                        d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="5"
                        className="motion-reduce:hidden"
                        transition={{
                            duration: 10,
                        }}
                    ></motion.path>
                    <defs>
                        <motion.linearGradient
                            id="gradient"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2="0"
                            y1="0" // Force start at top
                            y2={y2_moving} // Moves to bottom
                        >
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0"></stop>
                            <stop offset="10%" stopColor="#ef4444" stopOpacity="1"></stop>
                            <stop offset="90%" stopColor="#ef4444" stopOpacity="1"></stop>
                            <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>
            <div ref={contentRef}>{children}</div>
        </motion.div>
    );
};
