'use client';

import { useI18n } from '@/hooks/useI18n';

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'fr' : 'en';
    setLang(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-xs text-[#4A4A4A] font-medium bg-transparent border border-[#E8E0D8] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:ring-opacity-50 hover:text-[#2D5A27] hover:border-[#2D5A27] transition-all duration-150 px-2 py-1"
      aria-label={lang === 'en' ? 'Change language' : 'Changer la langue'}
      title={`${lang === 'en' ? 'FR' : 'EN'}`}
    >
      {lang === 'en' ? 'EN' : 'FR'}
    </button>
  );
}
