"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

interface ContactFormProps {
  preSelectedPack?: string | null;
}

export function scrollToContactForm() {
  const header = document.querySelector("header.sticky");
  const form = document.getElementById("contact-form");
  if (form) {
    setTimeout(() => {
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const y = form.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  }
}

export function ContactForm({ preSelectedPack }: ContactFormProps) {
  const [selectedPack, setSelectedPack] = useState(preSelectedPack || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (preSelectedPack) {
      setSelectedPack(preSelectedPack);
    }
  }, [preSelectedPack]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      nom,
      email,
      telephone,
      pack: selectedPack,
      message,
    };
    try {
      const res = await fetch("https://automation.nlproject.site/webhook/nl-project-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur HTTP: " + res.status);
      router.push("/merci");
    } catch (error) {
      alert("Erreur lors de l'envoi, réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="w-full flex flex-col justify-center items-center bg-muted scroll-mt-24 py-16">
      <div className="container px-4 md:px-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Contact
        </h2>
        <p className="text-center max-w-xl mx-auto mb-8 text-muted-foreground">
          N'hésitez pas à nous contacter pour toute question ou demande d'information.
        </p>
        <form
          ref={formRef}
          id="contact-form"
          onSubmit={handleSubmit}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-xl p-6 mx-auto flex flex-col gap-4 mb-6"
        >
          <div className="col-span-2 flex flex-col gap-1">
            <label className="font-medium" htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Votre nom"
              required
              className="p-2 border rounded"
              value={nom}
              onChange={e => setNom(e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              required
              className="p-2 border rounded"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="font-medium" htmlFor="telephone">Téléphone</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              placeholder="Votre numéro"
              className="p-2 border rounded"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="font-medium" htmlFor="pack">Pack</label>
            <Select value={selectedPack} onValueChange={setSelectedPack} name="pack" required>
              <SelectTrigger className="bg-white border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Choisissez un pack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pack Essentiel">Pack Essentiel</SelectItem>
                <SelectItem value="Pack Complet">Pack Complet</SelectItem>
                <SelectItem value="Projet sur mesure">Projet sur mesure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label className="font-medium" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message"
              required
              className="p-2 border rounded min-h-[100px]"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="col-span-2 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
}
