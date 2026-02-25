import { useState } from 'react';
import { useGender } from '@/contexts/GenderContext';
import { Scissors } from 'lucide-react';
import heroMale from '@/assets/hero-male.jpg';
import heroFemale from '@/assets/hero-female.jpg';

const Hero = () => {
  const { gender, setGender } = useGender();
  const [hovered, setHovered] = useState<'male' | 'female' | null>(null);

  const getMaleFlex = () => {
    if (gender === 'male') return 3;
    if (gender === 'female') return 1;
    if (hovered === 'male') return 2;
    return 1;
  };

  const getFemaleFlex = () => {
    if (gender === 'female') return 3;
    if (gender === 'male') return 1;
    if (hovered === 'female') return 2;
    return 1;
  };

  const transition = 'flex 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  return (
    <section className="flex flex-col md:flex-row h-[92vh] relative pt-16">
      {/* Male Side */}
      <div
        className="relative overflow-hidden cursor-pointer min-h-0"
        style={{ flex: getMaleFlex(), transition }}
        onMouseEnter={() => !gender && setHovered('male')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setGender(gender === 'male' ? null : 'male')}
      >
        <div className="absolute inset-0">
          <img src={heroMale} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.12) 0%, transparent 60%)' }}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="w-[2px] h-10 bg-male mb-6 opacity-70" />
          <span className="text-male text-xs tracking-[0.3em] uppercase mb-3 font-body">♂</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-foreground mb-3">
            Para Ele
          </h2>
          <p className="text-male text-sm md:text-base tracking-[0.15em] font-light mb-8">
            Barba. Cabelo. Estilo.
          </p>
          <button
            className="px-6 py-3 border border-male text-male rounded-lg text-sm tracking-wider hover:bg-male hover:text-background transition-all duration-300"
            onClick={(e) => { e.stopPropagation(); setGender('male'); }}
          >
            Explorar serviços →
          </button>
        </div>
      </div>

      {/* Center Divider */}
      {!gender && (
        <div className="hidden md:flex w-px relative z-20 items-center justify-center bg-border/50">
          <div className="absolute bg-background p-2 rounded-full">
            <Scissors size={14} className="text-muted-foreground rotate-90" />
          </div>
        </div>
      )}

      {/* Female Side */}
      <div
        className="relative overflow-hidden cursor-pointer min-h-0"
        style={{ flex: getFemaleFlex(), transition }}
        onMouseEnter={() => !gender && setHovered('female')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setGender(gender === 'female' ? null : 'female')}
      >
        <div className="absolute inset-0">
          <img src={heroFemale} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(225deg, rgba(212,130,154,0.12) 0%, transparent 60%)' }}
          />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
          <div className="w-[2px] h-10 bg-female mb-6 opacity-70" />
          <span className="text-female text-xs tracking-[0.3em] uppercase mb-3 font-body">♀</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-foreground mb-3">
            Para Ela
          </h2>
          <p className="text-female text-sm md:text-base tracking-[0.15em] font-light mb-8">
            Beleza. Cuidado. Arte.
          </p>
          <button
            className="px-6 py-3 border border-female text-female rounded-lg text-sm tracking-wider hover:bg-female hover:text-background transition-all duration-300"
            onClick={(e) => { e.stopPropagation(); setGender('female'); }}
          >
            Explorar serviços →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
