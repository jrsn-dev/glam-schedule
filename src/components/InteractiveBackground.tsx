import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useGender } from "@/contexts/GenderContext";
import SmokeCanvas from "./SmokeCanvas";

const InteractiveBackground = () => {
    const { gender } = useGender();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the light rays following the mouse
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Color logic based on gender
    const lightColor =
        gender === "female" ? "rgba(244, 63, 94, 0.15)" :
            gender === "male" ? "rgba(59, 130, 246, 0.15)" :
                "rgba(255, 215, 0, 0.15)";

    return (
        <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-[#020202]">
            {/* Smoke Background - Main visibility layer */}
            <div className="absolute inset-0 z-0 opacity-60">
                <SmokeCanvas />
            </div>

            {/* Interactive Rays (Multiple beams) - Reduced blur for performance */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[1000px] h-[400px] rounded-full opacity-[0.15]"
                    style={{
                        left: springX,
                        top: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                        background: `radial-gradient(ellipse at center, ${lightColor} 0%, transparent 80%)`,
                        filter: "blur(80px)",
                        rotate: i * 90,
                    }}
                    animate={{
                        rotate: [i * 90, i * 90 + 360],
                    }}
                    transition={{
                        duration: 25 + i * 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Primary Glow Follower - Balanced blur */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full opacity-20"
                style={{
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: `radial-gradient(circle at center, ${lightColor} 0%, transparent 70%)`,
                    filter: "blur(60px)",
                }}
            />

            {/* Fixed ambient gradients - Optimization: remove blur from small particles, keep large ones subtle */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-primary/3 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/2 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
    );
};

export default InteractiveBackground;
