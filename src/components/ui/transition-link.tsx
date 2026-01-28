"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";

interface TransitionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export const TransitionLink = ({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const start = (window as any).startPageTransition as
      | ((to: string) => void)
      | undefined;

    if (onClick) onClick(e);

    if (start) {
      start(href);
    } else {
      // fallback si jamais l’overlay n’est pas monté
      window.location.href = href;
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};