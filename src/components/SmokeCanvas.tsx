import { useEffect, useRef } from 'react';
import { useGender } from '@/contexts/GenderContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
}

const SmokeCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { gender } = useGender();
    const mouse = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number;
        let height: number;
        let animationFrameId: number;
        const particles: Particle[] = [];
        const particleCount = 40;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const colors = {
            blue: '59, 130, 246',
            pink: '244, 63, 94',
            gold: '255, 215, 0'
        };

        const createParticle = (isInit = false): Particle => {
            const colorKey = gender === 'female' ? 'pink' : gender === 'male' ? 'blue' : 'gold';

            return {
                x: Math.random() * width,
                y: isInit ? Math.random() * height : height + 100,
                vx: (Math.random() - 0.5) * 1,
                vy: -Math.random() * 1.5 - 0.5,
                size: Math.random() * 400 + 200,
                color: colors[colorKey as keyof typeof colors],
                alpha: Math.random() * 0.2,
                maxLife: Math.random() * 300 + 200,
                life: isInit ? Math.random() * 200 : 0
            };
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle(true));
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'screen';

            particles.forEach((p, i) => {
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                // Mouse interaction
                if (mouse.current.active) {
                    const dx = p.x - mouse.current.x;
                    const dy = p.y - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 400) {
                        const force = (400 - dist) / 4000;
                        p.vx += dx * force * 0.5;
                        p.vy += dy * force * 0.5;
                    }
                }

                // Drifting effect
                p.vx += Math.sin(p.life * 0.01) * 0.02;

                const lifeRatio = p.life / p.maxLife;
                const currentAlpha = p.alpha * (1 - Math.abs(lifeRatio - 0.5) * 2);

                if (currentAlpha > 0) {
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                    gradient.addColorStop(0, `rgba(${p.color}, ${currentAlpha})`);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                if (p.life >= p.maxLife || p.y < -p.size) {
                    particles[i] = createParticle();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.active = true;
        };

        const handleMouseLeave = () => {
            mouse.current.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gender]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ filter: 'blur(40px)' }}
        />
    );
};

export default SmokeCanvas;
