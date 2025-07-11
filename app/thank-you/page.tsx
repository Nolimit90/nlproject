export default function ThankYouPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Merci pour votre message !</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">Je vous répondrai dans les plus brefs délais. Vous pouvez revenir à l'accueil si vous le souhaitez.</p>
      <a href="/" className="mt-8 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
        Retour à l'accueil
      </a>
    </div>
  );
} 