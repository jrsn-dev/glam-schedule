import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'MT Sushi Arte | Sushi artesanal', description: 'Uma experiência de sushi artesanal com combinações especiais.' , icons: { icon: '/images/mt-sushi-logo.svg' }};
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
