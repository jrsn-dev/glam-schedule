import { useEffect, useRef } from 'react';
import { useGender } from '@/contexts/GenderContext';

const FluidCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { gender } = useGender();
    const mouse = useRef({ x: 0, y: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width: number;
        let height: number;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Particle system for the "smoke"
        const particles: any[] = [];
        const particleCount = 60;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            opacity: number;
            life: number;
            maxLife: number;

            constructor(x: number, y: number, color: string) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 80 + 40;
                this.color = color;
                this.opacity = Math.random() * 0.15;
                this.maxLife = Math.random() * 200 + 100;
                this.life = this.maxLife;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;

                // Mouse reaction
                if (mouse.current.active) {
                    const dx = this.x - mouse.current.x;
                    const dy = this.y - mouse.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        const force = (200 - dist) / 2000;
                        this.vx += dx * force;
                        this.vy += dy * force;
                    }
                }

                // Keep within bounds of edges (mostly edges as per image)
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Friction
                this.vx *= 0.99;
                this.vy *= 0.99;
            }

            draw() {
                const alpha = (this.life / this.maxLife) * this.opacity;
                ctx!.beginPath();
                const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, `rgba(${this.color}, ${alpha})`);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx!.fillStyle = gradient;
                ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            const colors = gender === 'female'
                ? ['244, 63, 94', '190, 24, 93', '157, 23, 77', '124, 58, 237']
                : ['59, 130, 246', '99, 102, 241', '139, 92, 246', '79, 70, 229'];

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() < 0.4 ? Math.random() * 300 : width - Math.random() * 300;
                const y = height - Math.random() * height * 0.8;
                const color = colors[Math.floor(Math.random() * colors.length)];
                particles.push(new Particle(x, y, color));
            }
        };

        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'screen';

            particles.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.life <= 0) {
                    const colors = gender === 'female'
                        ? ['244, 63, 94', '190, 24, 93', '157, 23, 77', '124, 58, 237']
                        : ['59, 130, 246', '99, 102, 241', '139, 92, 246', '79, 70, 229'];
                    const x = Math.random() < 0.4 ? Math.random() * 300 : width - Math.random() * 300;
                    const y = height - Math.random() * 200;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    particles[i] = new Particle(x, y, color);
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
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{ filter: 'blur(30px)' }}
        />
    );
};

export default FluidCanvas;
