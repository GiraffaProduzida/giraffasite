import type { NextConfig } from "next";

/**
 * Configuração para publicar como site estático no GitHub Pages.
 *
 * Este repositório é espelhado em dois lugares (mesmo código, dois
 * remotes git): https://github.com/Libraleones/girafaproduzida e
 * https://github.com/GiraffaProduzida/giraffasite — ver docs/DEPLOY.md.
 *
 * `output: "export"` faz o `next build` gerar HTML/CSS/JS puros na
 * pasta `out/`, sem precisar de servidor Node rodando — é isso que o
 * GitHub Pages consegue hospedar. Ver docs/DEPLOY.md para o fluxo
 * completo e node_modules/next/dist/docs/01-app/02-guides/static-exports.md
 * para a documentação oficial desta versão do Next.js sobre o que tem
 * suporte em export estático (ex: não dá pra usar Server Actions, API
 * Routes dinâmicas, cookies, etc. — ver seção "Unsupported Features").
 *
 * O GitHub Pages de um repositório de projeto (não do tipo
 * "usuario.github.io") publica o site em
 * https://<org>.github.io/<nome-do-repo>/ — ou seja, o site NÃO fica na
 * raiz do domínio. Por isso precisamos de `basePath`/`assetPrefix` com
 * o nome do repositório. Como o mesmo código é publicado em dois
 * repositórios com nomes diferentes, o nome não pode ser fixo no
 * código — pegamos do `GITHUB_REPOSITORY` (formato "dono/repo"),
 * variável definida automaticamente pelo GitHub Actions em qualquer
 * repositório onde o workflow rodar. Em `npm run dev`/`npm run build`
 * local essa variável não existe, então o site continua servido a
 * partir da raiz, sem prefixo, pra não atrapalhar o desenvolvimento do
 * dia a dia.
 */
const isGithubActionsBuild = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "girafaproduzida";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubActionsBuild ? `/${repoName}` : "",
  assetPrefix: isGithubActionsBuild ? `/${repoName}/` : "",
  images: {
    // Export estático não suporta o otimizador de imagem padrão (ele
    // precisa de um servidor). Quando fotos reais entrarem via
    // next/image (ver docs/CONTENT_GUIDE.md), elas continuam
    // funcionando, só que sem otimização automática de tamanho/formato.
    unoptimized: true,
  },
};

export default nextConfig;
