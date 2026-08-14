"use client";

/**
 * Formulário de newsletter. Puramente visual por enquanto — o <form>
 * não tem `action`/handler conectado a nenhum provedor de e-mail.
 * Para ativar de verdade, integre com o provedor escolhido (ex:
 * Mailchimp, Klaviyo, RD Station) e adicione um handler de submit
 * (Server Action ou API Route). Ver docs/ARCHITECTURE.md.
 *
 * "use client" é necessário aqui só porque o <form> tem um handler
 * onSubmit inline (preventDefault). Componentes de servidor não podem
 * receber funções como props em elementos DOM.
 */
export default function Newsletter() {
  return (
    <div>
      <h2 className="text-display text-2xl text-paper">Fique por dentro</h2>
      <p className="mt-1 max-w-sm text-sm text-paper/70">
        Lançamentos, shows e produtos novos direto no seu e-mail.
      </p>
      <form className="mt-4 flex max-w-sm flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          required
          placeholder="Seu e-mail"
          className="border border-paper/30 bg-transparent px-3 py-2 text-sm text-paper placeholder:text-paper/50 focus:border-paper focus:outline-none"
        />
        <button type="submit" className="text-meta bg-paper px-4 py-2 text-sm text-ink hover:bg-paper/85">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
