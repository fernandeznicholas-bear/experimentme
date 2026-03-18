'use client'

const fonts = [
  // Elegant Serifs
  { name: 'DM Serif Display', category: 'Elegant Serif' },
  { name: 'Cormorant Garamond', weight: '600', category: 'Elegant Serif' },
  { name: 'Libre Caslon Display', category: 'Elegant Serif' },
  { name: 'Playfair Display', weight: '700', category: 'Elegant Serif' },
  { name: 'Fraunces', weight: '600', category: 'Elegant Serif' },
  { name: 'Spectral', weight: '600', category: 'Elegant Serif' },
  { name: 'Lora', weight: '600', category: 'Elegant Serif' },
  { name: 'Merriweather', weight: '700', category: 'Elegant Serif' },
  { name: 'Source Serif 4', weight: '600', category: 'Elegant Serif' },
  { name: 'Crimson Text', weight: '600', category: 'Elegant Serif' },
  { name: 'Noto Serif Display', weight: '600', category: 'Elegant Serif' },
  { name: 'EB Garamond', weight: '600', category: 'Elegant Serif' },

  // Display & Editorial Serifs
  { name: 'Abril Fatface', category: 'Display Serif' },
  { name: 'Bodoni Moda', weight: '600', category: 'Display Serif' },
  { name: 'Cormorant', weight: '700', category: 'Display Serif' },
  { name: 'Cormorant Infant', weight: '600', category: 'Display Serif' },
  { name: 'Cormorant SC', weight: '600', category: 'Display Serif' },
  { name: 'Sorts Mill Goudy', category: 'Display Serif' },
  { name: 'Cardo', weight: '700', category: 'Display Serif' },
  { name: 'Libre Baskerville', weight: '700', category: 'Display Serif' },
  { name: 'Bitter', weight: '600', category: 'Display Serif' },
  { name: 'Domine', weight: '600', category: 'Display Serif' },

  // Modern Sans-Serif
  { name: 'Nunito Sans', weight: '600', category: 'Modern Sans' },
  { name: 'Inter', weight: '600', category: 'Modern Sans' },
  { name: 'Raleway', weight: '600', category: 'Modern Sans' },
  { name: 'Montserrat', weight: '600', category: 'Modern Sans' },
  { name: 'Poppins', weight: '600', category: 'Modern Sans' },
  { name: 'DM Sans', weight: '600', category: 'Modern Sans' },
  { name: 'Outfit', weight: '600', category: 'Modern Sans' },
  { name: 'Sora', weight: '600', category: 'Modern Sans' },
  { name: 'Plus Jakarta Sans', weight: '600', category: 'Modern Sans' },
  { name: 'Figtree', weight: '600', category: 'Modern Sans' },
  { name: 'Albert Sans', weight: '600', category: 'Modern Sans' },
  { name: 'Manrope', weight: '600', category: 'Modern Sans' },
  { name: 'Space Grotesk', weight: '600', category: 'Modern Sans' },
  { name: 'General Sans', weight: '600', category: 'Modern Sans' },

  // Geometric Sans
  { name: 'Jost', weight: '500', category: 'Geometric Sans' },
  { name: 'Quicksand', weight: '600', category: 'Geometric Sans' },
  { name: 'Comfortaa', weight: '600', category: 'Geometric Sans' },
  { name: 'Nunito', weight: '700', category: 'Geometric Sans' },
  { name: 'Rubik', weight: '600', category: 'Geometric Sans' },
  { name: 'Lexend', weight: '600', category: 'Geometric Sans' },
  { name: 'Red Hat Display', weight: '600', category: 'Geometric Sans' },

  // Unique / Warm Character
  { name: 'Josefin Sans', weight: '600', category: 'Unique' },
  { name: 'Tenor Sans', category: 'Unique' },
  { name: 'Philosopher', weight: '700', category: 'Unique' },
  { name: 'Marcellus', category: 'Unique' },
  { name: 'Cinzel', weight: '600', category: 'Unique' },
  { name: 'Forum', category: 'Unique' },
  { name: 'Belleza', category: 'Unique' },
  { name: 'Poiret One', category: 'Unique' },
  { name: 'Julius Sans One', category: 'Unique' },
  { name: 'Cormorant Upright', weight: '600', category: 'Unique' },
  { name: 'Gilda Display', category: 'Unique' },
  { name: 'Italiana', category: 'Unique' },
  { name: 'Oranienbaum', category: 'Unique' },
  { name: 'Yeseva One', category: 'Unique' },
  { name: 'Pridi', weight: '600', category: 'Unique' },
]

export default function FontPickerPage() {
  // Build Google Fonts URL for all fonts
  const families = fonts
    .map(f => {
      const name = f.name.replace(/ /g, '+')
      const wght = f.weight || '400'
      return `family=${name}:wght@${wght}`
    })
    .join('&')
  const googleUrl = `https://fonts.googleapis.com/css2?${families}&display=swap`

  const categories = [...new Set(fonts.map(f => f.category))]

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href={googleUrl} />

      <main className="min-h-screen bg-warm-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-brown-deep mb-2 font-[family-name:var(--font-heading)]">
            Font Picker — Experiment Me
          </h1>
          <p className="text-text-muted mb-8">
            {fonts.length} fonts loaded. Pick your favorite for the logo / splash screen.
          </p>

          {categories.map(cat => (
            <div key={cat} className="mb-12">
              <h2 className="text-sm font-bold text-sage uppercase tracking-widest mb-6 border-b border-sage/20 pb-2">
                {cat}
              </h2>
              <div className="grid gap-1">
                {fonts
                  .filter(f => f.category === cat)
                  .map(f => (
                    <div
                      key={f.name}
                      className="flex items-center justify-between py-4 px-6 rounded-xl hover:bg-cream/60 transition-colors group"
                    >
                      <div
                        className="text-4xl md:text-5xl text-terracotta"
                        style={{
                          fontFamily: `'${f.name}', serif`,
                          fontWeight: f.weight || '400',
                        }}
                      >
                        Experiment Me
                      </div>
                      <span className="text-xs text-text-muted opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                        {f.name}
                        {f.weight && f.weight !== '400' ? ` (${f.weight})` : ''}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
