import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  href,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
}) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-2.5 transition";
  const styles = {
    primary: "bg-nl-accent text-white hover:bg-nl-accent2",
    secondary: "border-2 border-nl-accent2 text-nl-accent2 hover:bg-nl-accent2 hover:text-nl-primary",
    ghost: "text-white/85 hover:text-white",
  };
  const Comp: any = href ? "a" : "button";
  return (
    <Comp href={href} className={clsx(base, styles[variant], className)}>
      {children}
    </Comp>
  );
}

