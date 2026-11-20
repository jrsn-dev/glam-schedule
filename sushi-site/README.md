# Hanami Sushi — site cinematográfico

Projeto independente dentro do repositório `glam-schedule`. O sistema original da raiz (Vite/React e backend) permanece intacto.

## Executar
```bash
cd sushi-site
npm install
npm run dev
```
Abra http://localhost:3000.

## Tecnologia
Next.js 15 (App Router), React 19, TypeScript, GSAP, ScrollTrigger e Lenis.

## Seções
Hero com camadas/parallax; História; manifesto; cardápio com 4 pratos e seção fixada por scroll no desktop; Eventos; Ingredientes em convergência; faixa de Reservas; Rodapé.

## Importante
Marca Hanami e textos são provisórios. As fotos demonstrativas são URLs externas de Unsplash; substitua por imagens autorizadas do cliente em /public/img. E-mail de reservas é placeholder, não um sistema real de reservas.

## Acessibilidade e responsividade
Para larguras menores que 900px, o cardápio vira lista (sem pin). Em prefers-reduced-motion, a coreografia é desativada e o conteúdo permanece visível.

## Publicação na Vercel
Crie um projeto associado a este repositório e configure **Root Directory = sushi-site**; framework Next.js. Não aponte a implantação atual do glam-schedule para esta pasta sem decidir substituir seu site.

## Estado de validação
A implantação/compilação em runtime ainda precisa ser validada em ambiente com npm acessível. Este código não deve ser considerado uma reprodução idêntica do vídeo: faltam recortes PNG/WebP com alfa, rastro real de partículas e digitação de texto.


## Assets fotográficos da Hero (novembro de 2026)
A Hero usa oito PNGs transparentes de alta resolução que precisam existir em `sushi-site/public/img/hero/`:
`board.png`, `salmon.png`, `tuna.png`, `uramaki.png`, `wasabi.png`, `ginger.png`, `chopsticks.png` e `soy-sauce.png`.

O código com os caminhos e as animações está no repositório; os PNGs foram gerados separadamente e **precisam ser enviados como arquivos binários** para essa pasta antes de executar o deploy completo. Não publique pensando que estão presentes se o diretório ainda não contém os oito arquivos.

A sequência de animação começa com `board.png` já visível e monta o prato conforme o scroll (salmão, atum, uramaki, demais peças, wasabi, gengibre, shoyu, hashi). A timeline é reversível e dá suporte a `prefers-reduced-motion`; em mobile usa scroll sem `pin`.

A versão de demonstração offline, com todas as imagens incluídas, está disponível no arquivo de entrega `hanami-hero-preview.zip`. O pacote `hanami-hero-png.zip` contém a pasta `public/img/hero/` já organizada para ser copiada para dentro de `sushi-site/`.
