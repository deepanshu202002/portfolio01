"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    anchor?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export function BorderBeam({
    className,
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
}: BorderBeamProps) {
    return (
        <div
            style={
                {
                    "--size": size,
                    "--duration": duration,
                    "--anchor": anchor,
                    "--border-width": borderWidth,
                    "--color-from": colorFrom,
                    "--color-to": colorTo,
                    "--delay": delay,
                } as React.CSSProperties
            }
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

                // mask styles
                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
                className,
            )}
        >
            <motion.div
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: delay,
                }}
                style={
                    {
                        "--background": `linear-gradient(to left, var(--color-from), var(--color-to), transparent)`,
                    } as React.CSSProperties
                }
                className={cn(
                    "absolute aspect-square w-[calc(var(--size)*1px)]",
                    "rounded-full", // Ensure the beam itself is round if it's large
                    "[background:var(--background)]",
                    "[offset-anchor:calc(var(--anchor)*1%)_50%]",
                    "[offset-path:inset(0px_round_9999px)]",
                )}
            />
        </div>
    );
}
