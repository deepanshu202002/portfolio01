"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}

function hexToRgb(hex: string): number[] {
    hex = hex.replace("#", "");
    const hexInt = parseInt(hex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
}

export default function Particles({
    className,
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
}: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({
        w: 0,
        h: 0,
    });
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [circles, setCircles] = useState<Circle[]>([]);
    const [dpr, setDpr] = useState(1);
    const rafID = useRef<number | null>(null);
    const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            setContext(canvasRef.current.getContext("2d"));
        }
    }, []);

    useEffect(() => {
        // Only access window on client side
        if (typeof window !== "undefined") {
            setDpr(window.devicePixelRatio || 1);
        }
    }, []);

    useEffect(() => {
        const initCanvas = () => {
            resizeCanvas();
            drawParticles();
        };

        initCanvas();

        const handleResize = () => {
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current);
            }
            resizeTimeout.current = setTimeout(initCanvas, 100); // Debounce resize
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafID.current) {
                cancelAnimationFrame(rafID.current);
            }
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current);
            }
        };
    }, [color, quantity, staticity, ease, size, refresh, dpr, context]);

    useEffect(() => {
        const onMouseMove = () => {
            if (refresh) {
                initParticles();
            }
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [refresh]);

    type Circle = {
        x: number;
        y: number;
        translateX: number;
        translateY: number;
        size: number;
        alpha: number;
        targetAlpha: number;
        dx: number;
        dy: number;
        magnetism: number;
    };

    const initParticles = () => {
        const newCircles: Circle[] = [];
        const { w, h } = canvasSize; // use state dimensions
        for (let i = 0; i < quantity; i++) {
            const x = Math.floor(Math.random() * w);
            const y = Math.floor(Math.random() * h);
            newCircles.push({
                x,
                y,
                translateX: 0,
                translateY: 0,
                size: Math.floor(Math.random() * 2) + size,
                alpha: 0,
                targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
                dx: (Math.random() - 0.5) * 0.1,
                dy: (Math.random() - 0.5) * 0.1,
                magnetism: 0.1 + Math.random() * 4,
            });
        }
        setCircles(newCircles);
    };

    const drawCircle = (circle: Circle, update = false) => {
        if (context) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.translate(translateX, translateY);
            context.beginPath();
            context.arc(x, y, size, 0, 2 * Math.PI);
            context.fillStyle = `rgba(${hexToRgb(color).join(", ")}, ${alpha})`;
            context.fill();
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!update) {
                setCircles((circles) => [...circles, circle]);
            }
        }
    };

    const clearContext = () => {
        if (context && canvasRef.current) {
            // Clear based on actual canvas dimensions, not style/client dimensions if scaling.
            // Or simpler: context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.clearRect(0, 0, canvasSize.w, canvasSize.h);
        }
    };

    const drawParticles = () => {
        clearContext();
        for (let i = 0; i < circles.length; i++) {
            const circle = circles[i];
            // We're updating active circles here
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            circle.x += circle.dx + vx;
            circle.y += circle.dy + vy;
            circle.translateX += (0 - circle.translateX) / ease; // staticity effect?
            circle.translateY += (0 - circle.translateY) / ease;

            // Wrap around
            if (circle.x < -circle.size) circle.x = canvasSize.w + circle.size;
            if (circle.x > canvasSize.w + circle.size) circle.x = -circle.size;
            if (circle.y < -circle.size) circle.y = canvasSize.h + circle.size;
            if (circle.y > canvasSize.h + circle.size) circle.y = -circle.size;

            drawCircle(circle, true);
        }

        rafID.current = window.requestAnimationFrame(drawParticles);
    };

    const resizeCanvas = () => {
        if (canvasRef.current && canvasRef.current.parentElement) {
            const { clientWidth, clientHeight } = canvasRef.current.parentElement;
            setCanvasSize({ w: clientWidth, h: clientHeight });
            canvasRef.current.width = clientWidth * dpr;
            canvasRef.current.height = clientHeight * dpr;
            canvasRef.current.style.width = `${clientWidth}px`;
            canvasRef.current.style.height = `${clientHeight}px`;
            if (context) context.scale(dpr, dpr);

            // Re-init particles on resize to fit new bounds
            const newCircles: Circle[] = [];
            for (let i = 0; i < quantity; i++) {
                const x = Math.floor(Math.random() * clientWidth);
                const y = Math.floor(Math.random() * clientHeight);
                newCircles.push({
                    x,
                    y,
                    translateX: 0,
                    translateY: 0,
                    size: Math.floor(Math.random() * 2) + size,
                    alpha: 0,
                    targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
                    dx: (Math.random() - 0.5) * 0.1,
                    dy: (Math.random() - 0.5) * 0.1,
                    magnetism: 0.1 + Math.random() * 4,
                });
            }
            setCircles(newCircles);
        }
    };

    const remapValue = (
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ): number => {
        const remapped =
            ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    };

    return (
        <div className={cn("pointer-events-none", className)} aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
