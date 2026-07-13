const TYPE_COLORS = [
  "var(--type-fire)",
  "var(--type-electric)",
  "var(--type-grass)",
  "var(--type-water)",
  "var(--type-psychic)",
  "var(--type-dragon)",
]

/**
 * Franja decorativa de 6 segmentos, uno por "tipo" de referencia.
 * Es puramente visual (aria-hidden) y no reproduce ningún asset oficial de
 * Pokémon: son colores propios usados como acento, en línea con el futuro
 * Competitive Analyzer (v1.2) donde el color por tipo sí tendrá significado.
 */
export default function TypeStripe() {
  return (
    <div className="flex h-1.5 w-full" aria-hidden="true">
      {TYPE_COLORS.map((color) => (
        <span key={color} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}
