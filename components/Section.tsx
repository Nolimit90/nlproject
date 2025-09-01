import clsx from "clsx";

export default function Section({
  children,
  variant = "light",
  id,
  className,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-16 px-6 md:px-10",
        variant === "dark" ? "bg-[#0F1428] text-white" : "bg-nl-light text-nl-primary",
        className
      )}
    >
      <div className="mx-auto max-w-[1100px]">{children}</div>
    </section>
  );
}

