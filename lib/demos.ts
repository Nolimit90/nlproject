export interface Demo {
  id: string;
  title: string;
  highlights: string[];
  url: string;
}

export const demos: Demo[] = [
  {
    id: 'restaurant',
    title: 'Restaurant Gastronomique',
    highlights: [
      'Header transparent avec navigation centrée',
      'Menu overlay beige avec animations fluides',
      'Images WebP optimisées et responsive',
      'UX premium pour la gastronomie'
    ],
    url: '/demos/restaurant'
  },
  {
    id: 'aurora-bay',
    title: 'Aurora Bay Resort',
    highlights: [
      'Design ultra-minimal et épuré',
      'Performances élevées et SEO optimisé',
      'Palette beige/sea avec typographie élégante',
      'Navigation intuitive et accessible'
    ],
    url: '/demos/aurora-bay'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Nike x Patta',
    highlights: [
      'Design hybride créatif et moderne',
      'Navigation responsive et intuitive',
      'Recherche fonctionnelle et filtres avancés',
      'Style streetwear authentique'
    ],
    url: '/demos/ecommerce'
  },
  {
    id: 'bakery',
    title: 'Boulangerie Artisanale',
    highlights: [
      'Style editorial luxury et premium',
      'Header transparent avec overlay',
      'Menu centré avec animations',
      'Images optimisées et responsive'
    ],
    url: '/demos/restaurant'
  },
  {
    id: 'audio',
    title: 'Portfolio Audio',
    highlights: [
      'Design audacieux et créatif',
      'Portfolio audio avec contrôles',
      'Navigation responsive et moderne',
      'Style urbain et contemporain'
    ],
    url: '/demos/ecommerce'
  }
];
