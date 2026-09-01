export function LogoMark({ className = '' }) {
  return <img className={`agent71-mark ${className}`} src="/agent71-mark.svg" alt="" width="64" height="64" />
}

export function BrandLockup({ className = '' }) {
  return <span className={`agent71-lockup ${className}`}><LogoMark /><span>Agent 71</span></span>
}
