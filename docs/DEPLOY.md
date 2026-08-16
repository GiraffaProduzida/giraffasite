# Deploy no GitHub Pages

O site é publicado como **export estático** (`output: "export"` em
`next.config.ts`) via GitHub Pages, e este código é **espelhado em dois
repositórios** (dois remotes git, mesmo histórico):

- [Libraleones/girafaproduzida](https://github.com/Libraleones/girafaproduzida)
  → publica em https://libraleones.github.io/girafaproduzida/
- [GiraffaProduzida/giraffasite](https://github.com/GiraffaProduzida/giraffasite)
  → publica em https://giraffaproduzida.github.io/giraffasite/

`next.config.ts` detecta o nome do repositório automaticamente em
tempo de build (via `GITHUB_REPOSITORY`), então o mesmo código funciona
sem alteração nos dois — ver comentário no topo do arquivo.

## Como funciona

1. Todo push na branch `main` dispara o workflow
   `.github/workflows/deploy.yml` (GitHub Actions) **no repositório em
   que o push foi feito**.
2. O workflow instala as dependências, roda `npm run build` (que gera a
   pasta `out/` com HTML/CSS/JS puros) e publica essa pasta no GitHub
   Pages.
3. O site fica disponível na URL correspondente àquele repositório (ver
   lista acima).

Como são dois remotes independentes, um push em `git push origin main`
só atualiza o repositório configurado como `origin`. Para manter os
dois em dia, é preciso dar push nos dois remotes (ver
`git remote -v` para ver os nomes configurados localmente).

Não é preciso rodar nenhum comando de deploy manualmente além do push —
o workflow cuida do resto. Também dá pra disparar manualmente: na aba
**Actions** de cada repositório no GitHub → workflow "Deploy para o
GitHub Pages" → botão **Run workflow**.

## Configuração única (só precisa fazer 1 vez, em CADA repositório)

No GitHub, em **Settings → Pages** de cada um dos dois repositórios:

- Em **Source**, selecione **GitHub Actions** (não "Deploy from a
  branch"). Sem isso o workflow não tem permissão de publicar.

Depois do primeiro push com o workflow, a URL do site aparece nessa
mesma tela de Settings → Pages, e também no resumo da execução do
workflow na aba Actions.

## Por que o site "quebra" se eu rodar só `npm run build` localmente e abrir os arquivos direto?

Não quebra — mas os links internos (`/artistas`, `/_next/...` etc.)
são gerados como caminho absoluto a partir da raiz. Localmente
(`npm run dev` ou abrindo `out/index.html` direto) isso funciona numa
raiz `/`. Já no GitHub Pages, um repositório de projeto como este fica
publicado em `/<nome-do-repo>/`, não na raiz do domínio — por isso
`next.config.ts` adiciona automaticamente o prefixo `/<nome-do-repo>` a
todos os links e assets, **mas só quando o build roda dentro do GitHub
Actions** (variável de ambiente `GITHUB_ACTIONS=true`, definida
automaticamente pela plataforma, junto com `GITHUB_REPOSITORY` no
formato "dono/repo", de onde o nome é extraído — por isso funciona
igual nos dois repositórios espelhados, sem precisar trocar nada no
código). Rodando localmente, sem essas variáveis, tudo continua na
raiz — é assim de propósito, pra não atrapalhar `npm run dev`.

Se precisar simular o build de produção localmente (pra debugar algo
específico do GitHub Pages), rode (troque `girafaproduzida` pelo nome
do repositório que quiser simular):

```bash
GITHUB_ACTIONS=true GITHUB_REPOSITORY=dono/girafaproduzida npm run build
```

E sirva a pasta `out/` a partir de um subcaminho `/girafaproduzida/`
(por exemplo, copiando `out/` para dentro de uma pasta chamada
`girafaproduzida/` e servindo o diretório pai) — do contrário os
caminhos com prefixo não vão bater com os arquivos servidos na raiz.

## O que NÃO funciona nesta configuração (export estático)

Isto é uma limitação da hospedagem (GitHub Pages só serve arquivos
estáticos), não do código em si. Se qualquer um destes recursos vier a
ser necessário, o site vai precisar migrar para uma hospedagem com
servidor Node (Vercel, Netlify, etc.) — ver
`node_modules/next/dist/docs/01-app/02-guides/static-exports.md`
("Unsupported Features") na versão do Next.js instalada:

- Server Actions (ex: formulário de contato/newsletter processado no
  servidor do próprio Next.js — vai precisar de um serviço externo, ver
  `docs/ARCHITECTURE.md`).
- Route Handlers dinâmicos (API routes que leem a requisição).
- Middleware, cookies, headers, rewrites/redirects no servidor.
- `next/image` com o otimizador padrão (já configuramos
  `images.unoptimized: true` para não quebrar quando fotos reais forem
  adicionadas — ver `docs/CONTENT_GUIDE.md`).
- Revalidação incremental (ISR) — o conteúdo só atualiza quando um novo
  build é publicado.
