import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/85",
  secondary: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
};

const baseClasses =
  "text-meta inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors";

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
}

/** Botão de ação usado em CTAs (ex: "Comprar", "Ver loja"). Sempre navega — para ações sem navegação, use um <button> com as mesmas classes. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} cursor-pointer ${className}`}
      {...props}
    />
  );
}
