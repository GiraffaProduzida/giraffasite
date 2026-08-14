import type { Artist } from "@/lib/types";

/**
 * Dados de exemplo (placeholder) dos artistas da Girrafa Produzida.
 *
 * Isto é um protótipo: os dados vivem direto no código para facilitar
 * o desenvolvimento inicial. Quando o catálogo real estiver definido,
 * o caminho recomendado é mover isto para um CMS (Sanity, Contentful,
 * Payload...) ou para o mesmo backend que vai alimentar a loja —
 * mantendo o tipo `Artist` (src/lib/types.ts) como contrato.
 *
 * Ver docs/CONTENT_GUIDE.md para o passo a passo de como adicionar
 * um novo artista.
 */
export const artists: Artist[] = [
  {
    slug: "luna-cerrado",
    name: "Luna Cerrado",
    genre: "MPB",
    shortBio: "Voz e violão que misturam MPB tradicional com produção contemporânea.",
    bio: "Luna Cerrado começou compondo em violões emprestados no interior de Goiás e hoje é uma das vozes mais marcantes da nova MPB. Seu primeiro álbum pela Girrafa Produzida uniu arranjos de cordas com batidas eletrônicas discretas, criando uma ponte entre gerações.",
    featured: true,
    accent: "gold",
  },
  {
    slug: "bloco-alto",
    name: "Bloco Alto",
    genre: "Hip Hop",
    shortBio: "Coletivo de rap com letras afiadas e produção pesada.",
    bio: "Formado por três MCs e um produtor, o Bloco Alto nasceu nas batalhas de rima da zona leste e se tornou referência em shows de assinatura enérgica. Trabalham com a Girrafa Produzida desde o segundo EP.",
    featured: true,
    accent: "red",
  },
  {
    slug: "onda-sintetica",
    name: "Onda Sintética",
    genre: "Eletrônica",
    shortBio: "Duo de música eletrônica com influência de música brasileira de raiz.",
    bio: "Onda Sintética reinterpreta ritmos brasileiros através de sintetizadores modulares e samples de campo gravados pelo Brasil. Seus sets ao vivo já passaram por festivais em três continentes.",
    featured: true,
    accent: "blue",
  },
  {
    slug: "ferrovia",
    name: "Ferrovia",
    genre: "Rock",
    shortBio: "Power trio de rock com raízes no rock brasileiro dos anos 80.",
    bio: "Ferrovia toca um rock direto, sem enfeites — guitarra, baixo e bateria em faixas que raramente passam dos três minutos. Referência confessa: o rock nacional que tocava nas rádios AM.",
    accent: "gold",
  },
  {
    slug: "batuque-real",
    name: "Batuque Real",
    genre: "Samba/Pagode",
    shortBio: "Roda de samba contemporânea com pé na tradição e na cara nova do gênero.",
    bio: "Batuque Real reúne músicos de diferentes rodas de samba de São Paulo em um projeto que preserva a tradição do partido-alto mas não tem medo de arranjos ousados.",
    accent: "red",
  },
  {
    slug: "mc-vertigem",
    name: "MC Vertigem",
    genre: "Funk",
    shortBio: "Uma das vozes mais ouvidas do funk paulista na última temporada.",
    bio: "MC Vertigem transformou vídeos gravados no quintal de casa em uma carreira que já soma dezenas de milhões de streams. Seu segundo single pela Girrafa Produzida foi trilha de campanha publicitária nacional.",
    featured: true,
    accent: "blue",
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug);
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter((artist) => artist.featured);
}
