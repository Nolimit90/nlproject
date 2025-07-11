"use client";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLang = () => {
    const nextLang = lang === "fr" ? "en" : "fr";
    // Remplace le segment de langue dans l’URL
    const segments = pathname.split("/");
    segments[1] = nextLang;
    const newPath = segments.join("/");
    router.push(newPath);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLang", nextLang);
    }
  };

  return (
    <button
      onClick={switchLang}
      aria-label="Changer de langue"
      style={{
        width: 56,
        height: 56,
        fontSize: 32,
        background: 'white',
        borderRadius: '50%',
        border: '2px solid #222',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        color: '#222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        zIndex: 99999
      }}
      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.28)')}
      onMouseOut={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)')}
    >
      <span role="img" aria-label="Langue">🌍</span>
    </button>
  );
} 