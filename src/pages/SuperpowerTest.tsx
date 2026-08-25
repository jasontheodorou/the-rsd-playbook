import { useState } from 'react'
import {
  ConnectorExecution, GhostExecution, PopoverExecution, SidebarExecution, StepperExecution,
} from './superpower/executions'
import './superpower/superpower.css'

type Bg = 'cream' | 'white'

const CASES = [
  {
    num: 'S01',
    name: 'Sidebar dossier',
    note: 'Click an icon and its story fills the panel alongside. Nothing covers the artwork, and the panel holds as much text as you like — the steadiest option, and the one that would survive longer copy.',
    render: () => <SidebarExecution />,
  },
  {
    num: 'S02',
    name: 'Popover pinned to the icon',
    note: 'The message springs out of the thing you clicked, with a tail pointing back at it. The tightest link between icon and words, but the card sits over the drawing and the space is limited.',
    render: () => <PopoverExecution />,
  },
  {
    num: 'S03',
    name: 'Guided walk-through',
    note: 'These four are a sequence — invite, listen, make, take root — so this one walks it in order, with a Play that advances on its own. Best if you want everyone to receive the whole story rather than pick at it.',
    render: () => <StepperExecution />,
  },
  {
    num: 'S04',
    name: 'Ghost and reveal',
    note: 'Starts drained of colour and comes back to life under the cursor, one icon at a time, with a soft halo behind it. The most alive of the five — and the only one whose resting state is deliberately incomplete, which is what makes people reach for it.',
    render: () => <GhostExecution />,
  },
  {
    num: 'S05',
    name: 'Drawn connector',
    note: 'A line draws itself from the icon down into a strip below, so the message stays visibly tethered to its source without anything overlapping the drawing.',
    render: () => <ConnectorExecution />,
  },
]

export function SuperpowerTest() {
  const [bg, setBg] = useState<Bg>('cream')

  return (
    <div className="spw" data-bg={bg}>
      <div className="spw__inner">
        <header>
          <span className="spw__brand"><i aria-hidden="true" />The RSD Playbook</span>
          <h1 className="spw__title">Participation, brought to life</h1>
          <p className="spw__lede">
            Five ways to make <code>part2.svg</code> interactive. The artwork is untouched and
            transparent throughout — each execution only changes how the four coloured icons
            respond and where their message appears.
          </p>
          <p className="spw__lede">
            The hand, the speech bubbles, the pencils and the flower are the four moments of the
            participation model. Hover or click each one.
          </p>

          <div className="spw__switch" role="group" aria-label="Page background">
            <button className={bg === 'cream' ? 'is-on' : ''} onClick={() => setBg('cream')}>
              Cream #FAF8F6
            </button>
            <button className={bg === 'white' ? 'is-on' : ''} onClick={() => setBg('white')}>
              White #FFFFFF
            </button>
          </div>
        </header>

        {CASES.map((c) => (
          <section className="spw__case" key={c.num}>
            <div className="spw__caseHead">
              <span className="spw__caseNum">{c.num}</span>
              <h2 className="spw__caseName">{c.name}</h2>
            </div>
            <p className="spw__caseNote">{c.note}</p>
            {c.render()}
          </section>
        ))}

        <footer className="spw__foot">Internal test page — not part of the live playbook.</footer>
      </div>
    </div>
  )
}
