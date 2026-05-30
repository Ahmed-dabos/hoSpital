import Link from "next/link";
import React from "react";

interface GradientButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean
}

export default function GradientButton({
  href,
  type = "button",
  onClick,
  className = "",
  children,
  disabled = false
}: GradientButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 hover:shadow-rose-500/35 hover:-translate-y-0.5 transition-all duration-300 select-none";

  if (href) {
    return (
      <Link 
        href={href} 
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
