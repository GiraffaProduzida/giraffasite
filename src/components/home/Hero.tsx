import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Banner de destaque da home, em tela cheia — inspirado na estrutura
 * de hero banners "split" observada na pesquisa de referência
 * (ver docs/DESIGN_SYSTEM.md). Em produção, o conteúdo aqui viria de
 * um campo "destaque da home" gerenciável (CMS), não hardcoded.
 */
export default function Hero() {
  return (
    <section className="grid sm:grid-cols-2">
      <PlaceholderImage
        label="destaque: novo álbum"
        tone="gold"
        aspect="wide"
        className="sm:aspect-auto sm:h-[420px]"
      />
      <div className="flex flex-col justify-center gap-4 bg-ink px-6 py-10 text-paper sm:h-[420px] sm:px-10">
        <p className="text-meta text-xs text-paper/60">Lançamento em destaque</p>
        <h1 className="text-display text-4xl sm:text-5xl">
          Luna Cerrado
          <br />
          Cerrado Aberto
        </h1>
        <p className="max-w-sm text-sm text-paper/70">
          O novo álbum já está disponível em vinil, com encarte exclusivo
          de 8 páginas. Edição limitada da primeira prensagem.
        </p>
        <div>
          <ButtonLink href="/loja/produto/luna-cerrado-vinil-cerrado-aberto" variant="secondary" className="border-paper text-paper hover:bg-paper hover:text-ink">
            Comprar agora
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
