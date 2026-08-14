interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}

/** Cabeçalho padrão usado no topo de cada seção/faixa de conteúdo (ex: "New Legends" no site de referência). */
export default function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
      <div>
        {eyebrow ? (
          <p className="text-meta text-xs text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="text-display text-3xl sm:text-4xl">{title}</h2>
      </div>
      {action ? <div className="text-meta shrink-0 text-xs">{action}</div> : null}
    </div>
  );
}
