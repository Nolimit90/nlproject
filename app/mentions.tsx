import React from "react";

const sections = [
  {
    id: "privacy",
    title: "Politique de confidentialité",
    content: (
      <>
        <p>
          Chez <strong>NL Project</strong>, nous accordons une importance primordiale à la confidentialité de vos données.
        </p>
        <p>
          Les informations que vous nous fournissez via le formulaire de contact (nom, email, message) sont utilisées exclusivement pour répondre à vos demandes. Ces données ne sont jamais vendues, partagées ou utilisées à d'autres fins commerciales.
        </p>
        <p>
          Vos données sont stockées en toute sécurité et uniquement accessibles à l’administrateur du site.
        </p>
        <p>
          Pour toute demande liée à la gestion de vos données, vous pouvez nous écrire à : <strong>contact@nlproject.site</strong>
        </p>
      </>
    ),
  },
  {
    id: "terms",
    title: "Conditions d’utilisation",
    content: (
      <>
        <p>
          En accédant au site <strong>nlproject.site</strong>, vous acceptez les conditions suivantes :
        </p>
        <p>
          Ce site a pour vocation de proposer des services liés à la création de sites web et d’outils numériques. L’utilisation de ce site doit se faire dans un cadre légal et respectueux. Il est interdit d’en perturber le fonctionnement ou de tenter d’y accéder de manière non autorisée.
        </p>
        <p>
          Les contenus du site (textes, visuels, offres) sont la propriété de NL Project. Toute reproduction ou réutilisation est interdite sans accord écrit préalable.
        </p>
        <p>
          Ces conditions peuvent être mises à jour à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
        </p>
      </>
    ),
  },
];

export default function Mentions() {
  return (
    <main className="mentions-main">
      <div className="mentions-container">
        <h1 className="mentions-title">Mentions légales</h1>
        <nav className="mentions-nav">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mentions-sections">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mentions-section">
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
      <style>{`
        .mentions-main {
          min-height: 100vh;
          background: #fafbfc;
          padding: 32px 0;
          font-family: system-ui, sans-serif;
        }
        .mentions-container {
          max-width: 700px;
          margin: 0 auto;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          padding: 32px 24px;
        }
        .mentions-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .mentions-nav {
          margin-bottom: 2rem;
          text-align: center;
        }
        .mentions-nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        .mentions-nav a {
          color: #1a202c;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .mentions-nav a:hover {
          color: #2563eb;
        }
        .mentions-sections {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .mentions-section h2 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .mentions-section p {
          margin-bottom: 0.8rem;
          line-height: 1.7;
          color: #222;
        }
        @media (max-width: 600px) {
          .mentions-container {
            padding: 18px 6vw;
          }
          .mentions-title {
            font-size: 1.3rem;
          }
          .mentions-nav ul {
            gap: 1rem;
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
} 