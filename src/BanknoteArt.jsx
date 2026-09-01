const ARTWORK = {
  city: '/art/agent71-city-purple.png',
  rural: '/art/agent71-rural-green.png',
  sahara: '/art/agent71-sahara-brown.png',
  sea: '/art/agent71-sea-blue.png',
}

export default function BanknoteArt({ variant, className = '' }) {
  const source = ARTWORK[variant]

  if (!source) return null

  return (
    <div className={`currency-art currency-art--${variant} ${className}`} aria-hidden="true">
      <img src={source} alt="" width="1672" height="940" decoding="async" />
    </div>
  )
}
