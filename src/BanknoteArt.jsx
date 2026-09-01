const ART_COPY = {
  city: ['20', 'City'],
  rural: ['50', 'Rural'],
  sahara: ['100', 'Sahara'],
  sea: ['200', 'Sea'],
}

function CityArtwork() {
  return <>
    <path className="currency-art__fine" d="M24 260h952M92 225h95v35h-95zm122-52h44v87h-44zm62 26h73v61h-73zm98-69h18v130h-18zm27 42h72v88h-72zm99-19h42v107h-42zm70 37h92v70h-92zm120-61h20v131h-20zm37 28h110v103H727z" />
    <path className="currency-art__line" d="M0 247c117-4 183-44 278-105 96-62 184-57 273 7 98 70 192 98 449 98" />
    <path className="currency-art__line" d="M148 247V137m0 0 134 110m-134-110 154 73m-20 37V115m0 0 118 132m-118-132 136 87m-18 45V96m0 0 130 151m-130-151 149 104" />
    <path className="currency-art__solid" d="M690 260h76v-10h-14v-92h-14v-28h-20v28h-14v92h-14z" />
    <path className="currency-art__fine" d="M711 205h34m-34 16h34m-17-91V96m-7 12h14" />
  </>
}

function RuralArtwork() {
  return <>
    <path className="currency-art__fine" d="M0 246c120-12 216-53 330-35 99 15 172 65 282 41 95-21 176-75 388-41M0 270c130-15 226-37 337-23 128 16 190 53 302 37 108-16 203-63 361-49" />
    <path className="currency-art__line" d="M184 256c8-49 11-89 6-145m1 45c-29-31-57-42-94-38m93 58c36-41 69-55 112-52m-111 77c-47-22-86-24-127-9m130-37c36-22 77-27 120-11" />
    <path className="currency-art__fine" d="M88 111c16-37 53-47 93-15 19-38 76-37 96 2 38-11 71 10 73 41-38 25-80 30-126 7-41 31-90 22-136-5-10-9-10-20 0-30Z" />
    <path className="currency-art__line" d="M586 87c27 28 37 62 30 102-5 28-23 48-27 78m58-183c24 34 29 70 16 108-9 26-29 43-39 72m63-167c17 35 18 68 2 101-11 23-29 38-41 61" />
    <path className="currency-art__solid" d="M792 102c29-30 67-37 112-20-32 2-51 13-61 31 31-2 54 5 70 22-48-12-88-2-121 30 14-25 14-46 0-63Z" />
  </>
}

function SaharaArtwork() {
  return <>
    <path className="currency-art__line" d="M0 213c132-84 250-86 359-6 99 72 191 75 300 9 106-64 211-72 341-15M0 251c157-52 277-49 397 8 97 46 185 49 287 8 92-37 186-42 316-10" />
    <path className="currency-art__solid" d="m194 222 86-91 95 91h-26l-68-67-61 67z" />
    <path className="currency-art__fine" d="M223 222h126m-67-67-1 67m-59-1 58-28 68 28" />
    <g className="currency-art__line">
      <path d="M663 228V111m0 0-48 25m48-25 2-54m-2 54 49 24M802 237V143m0 0-39 19m39-19 2-45m-2 45 40 20" />
      <circle cx="663" cy="111" r="6"/><circle cx="802" cy="143" r="5"/>
    </g>
    <path className="currency-art__fine" d="M468 199c29-23 62-26 99-7m-80 18c25-13 49-13 73 0" />
  </>
}

function SeaArtwork() {
  return <>
    <path className="currency-art__fine" d="M0 220c67-28 133-28 200 0s133 28 200 0 133-28 200 0 133 28 200 0 133-28 200 0M0 251c67-28 133-28 200 0s133 28 200 0 133-28 200 0 133 28 200 0 133-28 200 0M0 282c67-28 133-28 200 0s133 28 200 0 133-28 200 0 133 28 200 0 133-28 200 0" />
    <path className="currency-art__solid" d="M155 230h86l-13-22h-12V96h-36v112h-12zm18-134 25-33 25 33z" />
    <path className="currency-art__line" d="M180 123h36m-36 24h36m-36 24h36M350 220V105h101m-101 35h89m-44-35v115m117 0V131h130m-130 35h112m-55-35v89" />
    <path className="currency-art__fine" d="M710 214h191l-29-39H747zM741 175v-51h122v51m-93-51V86m45 38V99" />
  </>
}

const artwork = { city: CityArtwork, rural: RuralArtwork, sahara: SaharaArtwork, sea: SeaArtwork }

export default function BanknoteArt({ variant, className = '' }) {
  const Artwork = artwork[variant]
  const [number, theme] = ART_COPY[variant]
  return (
    <div className={`currency-art currency-art--${variant} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 320" preserveAspectRatio="xMidYMid slice">
        <g><Artwork /></g>
        <text className="currency-art__number" x="28" y="72">{number}</text>
        <text className="currency-art__theme" x="30" y="96">{theme}</text>
        <path className="currency-art__thread" d="M934 32v256" />
        <path className="currency-art__thread currency-art__thread--short" d="M946 62v196" />
      </svg>
    </div>
  )
}
