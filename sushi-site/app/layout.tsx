import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Hanami Sushi | Uma experiência em cada detalhe', description: 'Sushi premium e experiência gastronômica japonesa.' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
