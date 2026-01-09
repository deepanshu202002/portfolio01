"use client";

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

export function MagicCard({
    children,
    className,
    gradientSize = 200,
    gradientColor = "#262626",
    gradientOpacity = 0.8,
    onClick
}: MagicCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mouseX, setMouseX] = useState(-gradientSize);
    const [mouseY, setMouseY] = useState(-gradientSize);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cardRef.current) {
                const { left, top } = cardRef.current.getBoundingClientRect();
                setMouseX(e.clientX - left);
                setMouseY(e.clientY - top);
            }
        };

        const handleMouseLeave = () => {
            setMouseX(-gradientSize);
            setMouseY(-gradientSize);
        };

        const card = cardRef.current;
        if (card) {
            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (card) {
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [gradientSize]);

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className={cn(
                "group relative flex size-full overflow-hidden rounded-xl border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white",
                className,
            )}
        >
            <div className="relative z-10 flex size-full flex-col p-6">
                {children}
            </div>
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition group-hover:opacity-100"
                style={{
                    background: `radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`,
                    opacity: gradientOpacity,
                }}
            />
        </div>
    );
}
