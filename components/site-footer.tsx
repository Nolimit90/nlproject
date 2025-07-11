"use client";

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:px-6">
        <p>
          &copy; 2024 NL Project. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
