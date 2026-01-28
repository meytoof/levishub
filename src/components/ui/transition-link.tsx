"use client";

import { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { LinkPreview } from "./link-preview";

interface TransitionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

export const startTransitionTo = (href: string) => {
  const start = (window as any).startPageTransition as
    | ((to: string) => void)
    | undefined;

  if (start) {
    start(href);
  } else {
    // fallback si jamais l’overlay n’est pas monté
    window.location.href = href;
  }
};

export const TransitionLink = ({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (onClick) onClick(e);

    startTransitionTo(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

// LinkPreview + page-transition, pour les liens marketing
interface MarketingPreviewLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  urlOverride?: string;
}

const MARKETING_BASE_URL = "https://levisweb.net";

export const MarketingPreviewLink = ({
  href,
  children,
  className,
  style,
  urlOverride,
}: MarketingPreviewLinkProps) => {
  const url = urlOverride || `${MARKETING_BASE_URL}${href}`;

  return (
    <LinkPreview url={url}>
      {/* On applique les classes visuelles sur l’enfant,
          pour que le conteneur relatif du preview ne soit pas coupé par un overflow-hidden */}
      <span
        className={className}
        onClick={(e) => {
          e.preventDefault();
          startTransitionTo(href);
        }}
        style={{ ...(style || {}), display: "inline-block" }}
      >
        {children}
      </span>
    </LinkPreview>
  );
};
