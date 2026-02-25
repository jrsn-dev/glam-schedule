import { useEffect, useRef } from 'react';
import { useGender } from '@/contexts/GenderContext';

const AuroraCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { gender } = useGender();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number;
        let height: number;
        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Aurora wave parameters - Increased opacity for visibility
        const waves = [
            { amplitude: 100, frequency: 0.002, speed: 0.01, color: "rgba(255, 215, 0, 0.15)" },
            { amplitude: 150, frequency: 0.001, speed: 0.008, color: "rgba(218, 165, 32, 0.12)" },
            { amplitude: 80, frequency: 0.003, speed: 0.012, color: "rgba(255, 223, 0, 0.1)" },
            { amplitude: 120, frequency: 0.0015, speed: 0.005, color: "rgba(255, 255, 255, 0.08)" }
        ];

        const getColors = () => {
            if (gender === 'female') {
                return [
                    { amplitude: 100, frequency: 0.002, speed: 0.01, color: "rgba(244, 63, 94, 0.2)" },
                    { amplitude: 150, frequency: 0.001, speed: 0.008, color: "rgba(190, 24, 93, 0.15)" },
                    { amplitude: 80, frequency: 0.003, speed: 0.012, color: "rgba(157, 23, 77, 0.18)" },
                    { amplitude: 120, frequency: 0.0015, speed: 0.005, color: "rgba(255, 192, 203, 0.1)" }
                ];
            }
            return waves;
        };

        const animate = () => {
            time += 0.3;
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'screen';

            const currentWaves = getColors();

            currentWaves.forEach((wave, i) => {
                ctx.beginPath();

                // Large gradient to simulate aurora softness without CSS blur
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.5, wave.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.strokeStyle = gradient;
                // Thicker lines for better visibility and fewer draw calls
                ctx.lineWidth = 15;

                // Optimization: Draw every 40px instead of 5px
                for (let x = 0; x < width + 40; x += 40) {
                    const yOffset = Math.sin(x * wave.frequency + time * wave.speed + i) * wave.amplitude;

                    const beamHeight = height * 2.5;
                    ctx.moveTo(x, height / 2 + yOffset - beamHeight / 2);
                    ctx.lineTo(x, height / 2 + yOffset + beamHeight / 2);
                }
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gender]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-80"
        />
    );
};

export default AuroraCanvas;
