import { useEffect, useState } from 'react'
import { findPattern } from './registry'
import { Chrome, type Route } from './Chrome'
import { PatternsIndex } from './PatternsIndex'
import { PatternPage } from './PatternPage'
import { PathwayPage } from './PathwayPage'
import { AboutPage } from './AboutPage'

// The pathway's stylesheets, in the same order Pathway1.tsx loads them
// (Pathway1.tsx:18–19). The demos mount real pathway components, which depend
// on both — .ly-* for media and planes, .p1v2__* for the page slots. Neither
// file defines global selectors, so importing them here is side-effect free.
import '../pages/Layouts.css'
import '../pathway1/Pathway1.css'
import './patterns.css'

const BASE = '/patterns'

/** Reserved so a section slug can never be mistaken for a pattern id. */
const SECTIONS = { pathway: true, about: true } as const

function routeFromPath(pathname: string): Route {
  if (!pathname.startsWith(BASE)) return { view: 'patterns' }
  const slug = pathname.slice(BASE.length).replace(/^\/+|\/+$/g, '')
  if (slug === '') return { view: 'patterns' }
  if (slug in SECTIONS) return { view: slug as 'pathway' | 'about' }
  return { view: 'pattern', id: slug }
}

function pathFromRoute(route: Route): string {
  switch (route.view) {
    case 'patterns': return BASE
    case 'pathway':  return `${BASE}/pathway`
    case 'about':    return `${BASE}/about`
    case 'pattern':  return `${BASE}/${route.id}`
  }
}

/**
 * /patterns — the RSD Playbook pattern library.
 *
 * Reachable by URL without the site password, like /tab-layouts, so it can be
 * shared with a colleague. Deep-linkable: /patterns/<id> opens that pattern,
 * /patterns/pathway and /patterns/about open the other two views. vercel.json's
 * catch-all rewrite makes all of these work in production with no extra config.
 */
export function PatternsLibrary() {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { view: 'patterns' } : routeFromPath(window.location.pathname)
  )

  // robots.txt covers crawlers that respect it; this covers the ones that
  // execute JS. The tag can't live in index.html — every route shares it.
  // Same approach as src/pages/TabLayouts.tsx.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => { meta.remove() }
  }, [])

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (next: Route) => {
    const url = pathFromRoute(next)
    if (window.location.pathname !== url) window.history.pushState(null, '', url)
    setRoute(next)
    window.scrollTo({ top: 0 })
  }

  const pattern = route.view === 'pattern' ? findPattern(route.id) : undefined

  // An unrecognised id (a stale link, a typo) falls back to the index rather
  // than a dead end, and corrects the URL on the way.
  useEffect(() => {
    if (route.view === 'pattern' && !pattern) go({ view: 'patterns' })
  }, [route, pattern])

  const openPattern = (id: string) => go({ view: 'pattern', id })

  return (
    <div className="pl-root">
      <Chrome route={route} onNavigate={go}>
        {route.view === 'pattern' && pattern && (
          <PatternPage pattern={pattern} onBack={() => go({ view: 'patterns' })} />
        )}
        {route.view === 'patterns' && <PatternsIndex onOpen={openPattern} />}
        {route.view === 'pathway' && <PathwayPage onOpen={openPattern} />}
        {route.view === 'about' && <AboutPage onOpen={() => go({ view: 'patterns' })} />}
      </Chrome>
    </div>
  )
}
