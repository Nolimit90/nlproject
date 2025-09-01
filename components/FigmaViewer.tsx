"use client";
import { useState, useEffect } from 'react';

interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  style_type: string;
  created_at: string;
  updated_at: string;
}

interface FigmaData {
  file: string;
  components: FigmaComponent[];
  images: any[];
  lastUpdated: string;
}

export default function FigmaViewer() {
  const [figmaData, setFigmaData] = useState<FigmaData | null>(null);
  const [styles, setStyles] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFigmaData();
  }, []);

  const loadFigmaData = async () => {
    try {
      setLoading(true);
      
      // Charger les composants
      const componentsResponse = await fetch('/figma-assets/components.json');
      if (componentsResponse.ok) {
        const componentsData = await componentsResponse.json();
        setFigmaData(componentsData);
      }
      
      // Charger les styles
      const stylesResponse = await fetch('/figma-assets/styles.json');
      if (stylesResponse.ok) {
        const stylesData = await stylesResponse.json();
        setStyles(stylesData);
      }
      
    } catch (err) {
      setError('Failed to load Figma data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nl-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">❌ {error}</div>
        <button 
          onClick={loadFigmaData}
          className="px-4 py-2 bg-nl-accent text-white rounded-lg hover:bg-nl-accent2 transition"
        >
          Retry
        </button>
      </div>
    );
  }

                if (!figmaData && !styles) {
                return (
                  <div className="text-center p-8">
                    <div className="text-gray-500 mb-4">No Figma data found</div>
                    <p className="text-sm text-gray-400">
                      Run <code className="bg-gray-100 px-2 py-1 rounded">npm run figma:import</code> to import your design
                    </p>
                  </div>
                );
              }

              // Si pas de composants ni de styles, afficher un message informatif
              if (figmaData && figmaData.components.length === 0 && (!styles || (styles.colors && styles.colors.length === 0 && styles.typography && styles.typography.length === 0))) {
                return (
                  <div className="text-center p-8">
                    <div className="text-2xl mb-4">🎨</div>
                    <div className="text-gray-500 mb-4">Design Figma importé avec succès !</div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="font-semibold text-green-800">Fichier : {figmaData.file}</div>
                      <div className="text-green-600 text-sm">Dernière mise à jour : {new Date(figmaData.lastUpdated).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Votre design a été importé mais ne contient pas encore de composants ou de styles définis.
                    </p>
                    <div className="text-left bg-gray-50 rounded-lg p-4 max-w-2xl mx-auto">
                      <h4 className="font-semibold mb-2">Prochaines étapes :</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Créez des composants dans votre design Figma</li>
                        <li>• Définissez des styles de couleur et de typographie</li>
                        <li>• Relancez <code className="bg-gray-200 px-1 rounded">npm run figma:import</code></li>
                      </ul>
                    </div>
                  </div>
                );
              }

  return (
    <div className="space-y-8">
                        {/* File Info */}
                  {figmaData && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-card p-6 ring-1 ring-blue-200">
                      <h2 className="text-2xl font-bold mb-4 text-blue-900">📁 Fichier Figma : {figmaData.file}</h2>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white/60 rounded p-3">
                          <span className="font-semibold text-blue-800">Composants :</span> 
                          <span className="ml-2 text-blue-600">{figmaData.components.length}</span>
                        </div>
                        <div className="bg-white/60 rounded p-3">
                          <span className="font-semibold text-blue-800">Images :</span> 
                          <span className="ml-2 text-blue-600">{figmaData.images?.length || 0}</span>
                        </div>
                        <div className="bg-white/60 rounded p-3">
                          <span className="font-semibold text-blue-800">Mise à jour :</span> 
                          <span className="ml-2 text-blue-600">{new Date(figmaData.lastUpdated).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  )}

      {/* Components */}
      {figmaData && figmaData.components.length > 0 && (
        <div className="bg-white rounded-card p-6 ring-1 ring-black/10">
          <h3 className="text-xl font-bold mb-4">🧩 Components ({figmaData.components.length})</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {figmaData.components.map((component) => (
              <div key={component.key} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold mb-2">{component.name}</div>
                {component.description && (
                  <div className="text-sm text-gray-600 mb-2">{component.description}</div>
                )}
                <div className="text-xs text-gray-500">
                  Updated: {new Date(component.updated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Styles */}
      {styles && (
        <div className="bg-white rounded-card p-6 ring-1 ring-black/10">
          <h3 className="text-xl font-bold mb-4">🎨 Styles</h3>
          
          {/* Color Styles */}
          {styles.colors && styles.colors.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Colors ({styles.colors.length})</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {styles.colors.map((style: any) => (
                  <div key={style.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div>
                      <div className="font-medium">{style.name}</div>
                      <div className="text-xs text-gray-500">{style.style_type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Styles */}
          {styles.typography && styles.typography.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Typography ({styles.typography.length})</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {styles.typography.map((style: any) => (
                  <div key={style.key} className="p-3 bg-gray-50 rounded">
                    <div className="font-medium">{style.name}</div>
                    <div className="text-xs text-gray-500">{style.style_type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

                        {/* Document Structure */}
                  {figmaData && 'document' in figmaData && figmaData.document && (
                    <div className="bg-white rounded-card p-6 ring-1 ring-black/10">
                      <h3 className="text-xl font-bold mb-4">📄 Structure du Document</h3>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                        <div className="text-gray-600 mb-2">Document: {(figmaData.document as any)?.name || 'Unknown'}</div>
                        {(figmaData.document as any)?.children && (figmaData.document as any).children.map((page: any, i: number) => (
                          <div key={i} className="ml-4 mb-2">
                            <div className="text-blue-600">📄 {page.name}</div>
                            {page.children && page.children.map((frame: any, j: number) => (
                              <div key={j} className="ml-6 mb-1">
                                <div className="text-green-600">🖼️ {frame.name}</div>
                                {frame.children && frame.children.slice(0, 3).map((child: any, k: number) => (
                                  <div key={k} className="ml-8 text-gray-600">
                                    • {child.name} ({child.type})
                                  </div>
                                ))}
                                {frame.children && frame.children.length > 3 && (
                                  <div className="ml-8 text-gray-500 text-xs">
                                    ... et {frame.children.length - 3} autres éléments
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Import Button */}
                  <div className="text-center">
                    <button
                      onClick={loadFigmaData}
                      className="px-6 py-3 bg-nl-accent text-white rounded-lg hover:bg-nl-accent2 transition"
                    >
                      🔄 Refresh Figma Data
                    </button>
                  </div>
    </div>
  );
}
