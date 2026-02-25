import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Gender = 'male' | 'female' | null;

interface GenderContextValue {
  gender: Gender;
  setGender: (g: Gender) => void;
}

const GenderContext = createContext<GenderContextValue>({
  gender: null,
  setGender: () => { },
});

export const useGender = () => useContext(GenderContext);

export const GenderProvider = ({ children }: { children: ReactNode }) => {
  const [gender, setGenderState] = useState<Gender>(() => {
    try {
      const stored = localStorage.getItem('glam-gender');
      return stored === 'male' || stored === 'female' ? stored : null;
    } catch {
      return null;
    }
  });

  const setGender = (g: Gender) => {
    setGenderState(g);
    try {
      if (g) {
        localStorage.setItem('glam-gender', g);
      } else {
        localStorage.removeItem('glam-gender');
      }
    } catch { }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (gender) {
      root.setAttribute('data-theme', gender);
    } else {
      root.removeAttribute('data-theme');
    }
  }, [gender]);

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
};
