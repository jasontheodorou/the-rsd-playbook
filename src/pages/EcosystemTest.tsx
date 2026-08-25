import {
  PinsExecution, RippleExecution, SpotlightExecution, StrataExecution, ZoomExecution,
} from './ecosystem/executions'
import './ecosystem/ecosystem.css'

const CASES = [
  {
    num: 'E01',
    name: 'Contour ripple',
    note: 'The drawing is already concentric, so this reads it outward: a ring ripples from the centre to the layer you pick, and the rail keeps the inside-out order visible. Nothing is dimmed — the ring does the work.',
    render: () => <RippleExecution />,
  },
  {
    num: 'E02',
    name: 'Spotlight',
    note: 'The raster-native one. The plate is drained of colour, and a full-strength copy is masked to a soft circle over whatever you hover. Two copies of one file, so the second comes from cache.',
    render: () => <SpotlightExecution />,
  },
  {
    num: 'E03',
    name: 'Push in',
    note: 'The file is 4638px wide, so there is real detail to spend. Choosing a layer scales the plate about that zone — an optical zoom rather than a crop, with the resolution to hold up.',
    render: () => <ZoomExecution />,
  },
  {
    num: 'E04',
    name: 'Pin map',
    note: 'The most literal reading: it is a map, so it gets pins. They drop in on a stagger, and the live one opens a callout tethered to its own pin.',
    render: () => <PinsExecution />,
  },
  {
    num: 'E05',
    name: 'Strata lift',
    note: 'The plate is drawn in perspective already, so this leans into it. Choosing a layer tips the board and floats a tinted pane over that zone, as if the stratum had been lifted off.',
    render: () => <StrataExecution />,
  },
]

export function EcosystemTest() {
  return (
    <div className="eco">
      <div className="eco__inner">
        <header>
          <span className="eco__brand"><i aria-hidden="true" />The RSD Playbook</span>
          <h1 className="eco__title">The ecosystem, layer by layer</h1>
          <p className="eco__lede">
            Five ways to make <code>ecosystem_001.png</code> interactive. Unlike{' '}
            <code>part2.svg</code>, this one is a raster — there are no paths or ids inside it,
            so every region is defined by coordinates measured off the artwork. Two of these
            treatments lean into that rather than fight it.
          </p>
          <p className="eco__lede">
            The drawing is concentric: one figure at the centre, contours rippling out to the
            city edge. That is the five layers of context — individual, service, organisation,
            community, wider system — so the zones run inside-out in that order.
          </p>
        </header>

        {CASES.map((c) => (
          <section className="eco__case" key={c.num}>
            <div className="eco__caseHead">
              <span className="eco__caseNum">{c.num}</span>
              <h2 className="eco__caseName">{c.name}</h2>
            </div>
            <p className="eco__caseNote">{c.note}</p>
            {c.render()}
          </section>
        ))}

        <footer className="eco__foot">Internal test page — not part of the live playbook.</footer>
      </div>
    </div>
  )
}
