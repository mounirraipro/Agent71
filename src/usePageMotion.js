import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PAGE_SELECTORS = {
  home: {
    hero: '.hero',
    title: '.hero-copy h1',
    copy: '.hero-copy > p, .hero-actions',
    visual: '.hero-dashboard-wrap',
  },
  product: {
    hero: '.start-hero',
    title: '.start-hero-copy h1',
    copy: '.start-hero-copy > p, .start-hero-copy > div',
    visual: '.start-hero-console',
  },
  einvoice: {
    hero: '.einvoice-page-hero',
    title: '.einvoice-hero-copy h1',
    copy: '.einvoice-hero-copy > p, .einvoice-hero-copy > div, .einvoice-hero-copy > small',
    visual: '.readiness-flow',
  },
  legal: {
    hero: '.legal-hero',
    title: '.legal-hero h1',
    copy: '.legal-hero p, .legal-hero small',
    visual: '.legal-hero-icon',
  },
}

export function usePageMotion(scopeRef, page) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    const selectors = PAGE_SELECTORS[page]
    if (!scope || !selectors) return undefined

    const mm = gsap.matchMedia()
    const context = gsap.context(() => {
      mm.add({
        desktop: '(min-width: 981px)',
        mobile: '(max-width: 980px)',
        motion: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      }, ({ conditions }) => {
        const { desktop, motion, reduced } = conditions
        if (reduced || !motion) {
          gsap.set('[data-motion], [data-motion-card]', { clearProps: 'all' })
          return undefined
        }

        const header = scope.querySelector('.site-header, .start-header, .info-header')
        const hero = scope.querySelector(selectors.hero)
        const title = scope.querySelector(selectors.title)
        const copy = gsap.utils.toArray(selectors.copy, scope)
        const visual = scope.querySelector(selectors.visual)

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        if (header) intro.fromTo(header, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7 })
        if (title) intro.fromTo(title, { yPercent: 28, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }, { yPercent: 0, autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.15 }, '-=.35')
        if (copy.length) intro.fromTo(copy, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .75, stagger: .09 }, '-=.72')
        if (visual) intro.fromTo(visual, { y: 52, scale: .965, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1.1 }, '-=.8')

        if (hero && desktop) {
          const heroArt = hero.querySelector('.currency-art img, [data-motion-art]')
          if (heroArt) gsap.to(heroArt, { yPercent: 9, scale: 1.035, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 } })
          if (visual) gsap.to(visual, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: hero, start: '45% center', end: 'bottom top', scrub: 1 } })
        }

        gsap.utils.toArray('[data-motion="section"]', scope).forEach((section) => {
          const heading = section.querySelector('[data-motion="heading"]')
          const items = gsap.utils.toArray('[data-motion-card]', section)
          if (heading) gsap.fromTo(heading, { y: 52, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 86%', once: true } })
          if (items.length) gsap.fromTo(items, { y: 58, autoAlpha: 0, rotate: desktop ? .8 : 0 }, { y: 0, autoAlpha: 1, rotate: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: items[0], start: 'top 88%', once: true } })
        })

        gsap.utils.toArray('[data-parallax]', scope).forEach((art) => {
          gsap.fromTo(art, { yPercent: -4 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: art.closest('section') || art, start: 'top bottom', end: 'bottom top', scrub: 1.15 } })
        })

        if (desktop) {
          const horizontalSection = scope.querySelector('[data-horizontal-section]')
          const pin = horizontalSection?.querySelector('[data-horizontal-pin]')
          const viewport = horizontalSection?.querySelector('[data-horizontal-viewport]')
          const track = horizontalSection?.querySelector('[data-horizontal-track]')
          if (horizontalSection && pin && viewport && track) {
            const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: 'none',
              scrollTrigger: {
                trigger: horizontalSection,
                pin,
                start: 'top top',
                end: () => `+=${Math.max(distance() + window.innerHeight * .65, window.innerHeight)}`,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            })
            const cards = gsap.utils.toArray('[data-prepare-card]', track)
            cards.forEach((card, index) => gsap.fromTo(card, { y: index % 2 ? 34 : -20 }, { y: index % 2 ? -18 : 14, ease: 'none', scrollTrigger: { trigger: horizontalSection, start: 'top top', end: () => `+=${distance()}`, scrub: 1 } }))
            return () => tween.kill()
          }
        }
        return undefined
      })
    }, scope)

    const refresh = () => ScrollTrigger.refresh()
    const images = [...scope.querySelectorAll('img')]
    images.forEach((image) => image.complete || image.addEventListener('load', refresh, { once: true }))
    document.fonts?.ready.then(refresh)

    return () => {
      images.forEach((image) => image.removeEventListener('load', refresh))
      mm.revert()
      context.revert()
    }
  }, [page, scopeRef])
}
