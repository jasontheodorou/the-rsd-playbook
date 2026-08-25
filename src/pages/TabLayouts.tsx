import { TShapedTabs, type TShapedVariant } from './patterns/TShapedTabs'
import './TabLayouts.css'

/* A standalone, ungated review page. Sits outside the access gate so it can be
   shared by URL with colleagues — see the short-circuit in App(). */

type Option = {
  num: string
  name: string
  note: string
  variant: TShapedVariant
}

const OPTIONS: Option[] = [
  {
    num: 'T01',
    name: 'Sliding underline',
    note: 'An orange rule slides along under the tabs. The most restrained of the five.',
    variant: 'underline',
  },
  {
    num: 'T02',
    name: 'Morphing pill',
    note: 'The orange pill travels to whichever tab you pick, and the text slides in from the side you came from.',
    variant: 'pill',
  },
  {
    num: 'T03',
    name: 'Filmstrip rail',
    note: 'All four panels sit on one track that slides sideways. The box never changes height, so nothing on the page jumps.',
    variant: 'rail',
  },
  {
    num: 'T04',
    name: 'Stacked depth',
    note: 'A navy header with a segmented control. Panels come forward out of a stack rather than sliding across.',
    variant: 'stack',
  },
  {
    num: 'T05',
    name: 'Editorial wipe',
    note: 'The boldest. A large number changes behind the copy, which is revealed by a wipe with an orange leading edge.',
    variant: 'wipe',
  },
]

export function TabLayouts() {
  return (
    <div className="tabl">
      <div className="tabl__inner">
        <header className="tabl__head">
          <span className="tabl__brand">
            <span className="tabl__dot" aria-hidden="true" />
            The RSD Playbook
          </span>
          <h1 className="tabl__title">T-shaped skills — pick a tab pattern</h1>
          <p className="tabl__lede">
            Five ways to present the four practices on the T-shaped skills page. They all hold
            exactly the same words; only the box and the movement differ.
          </p>
          <p className="tabl__lede">
            Click through the tabs on each one, then tell Jason which number you prefer.
          </p>
        </header>

        {OPTIONS.map((o) => (
          <section key={o.num} className="tabl__item">
            <div className="tabl__label">
              <span className="tabl__num">{o.num}</span>
              <h2 className="tabl__name">{o.name}</h2>
            </div>
            <p className="tabl__note">{o.note}</p>
            <TShapedTabs variant={o.variant} />
          </section>
        ))}

        <footer className="tabl__foot">
          <p>Internal review page — not part of the live playbook.</p>
        </footer>
      </div>
    </div>
  )
}
