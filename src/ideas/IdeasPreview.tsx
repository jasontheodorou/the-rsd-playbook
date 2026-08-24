import './IdeasPreview.css'

type IdeaProps = {
  num: string
  name: string
  caption: string
  children: React.ReactNode
}

function Idea({ num, name, caption, children }: IdeaProps) {
  return (
    <section className="ip-idea">
      <header className="ip-idea__head">
        <span className="ip-idea__num">{num}</span>
        <h2 className="ip-idea__name">{name}</h2>
      </header>
      <p className="ip-idea__caption">{caption}</p>
      <div className="ip-idea__demo">{children}</div>
    </section>
  )
}

/**
 * Live-rendered preview of the 15 text-only visual treatments described
 * in `ideas/text-only-visual-treatments.md`. One long scroll, each idea
 * shown at real size in real page context (paper background, Open Sans,
 * body reading measure).
 */
export function IdeasPreview({ onReturnHome: _ }: { onReturnHome: () => void }) {
  return (
    <div className="ideas-preview">
      <header className="ip-intro">
        <span className="pilot-marker">
          <span className="pilot-marker__num">·</span>
          <span className="pilot-marker__rule" aria-hidden="true" />
          <span>Ideas · text-only visual treatments</span>
        </span>
        <h1 className="ip-intro__headline">Fifteen ways to give text a beat.</h1>
        <p className="ip-intro__lede">
          Ranged from most subtle typographic to more decorative. Every treatment
          uses only the tokens already in the pathway 1 palette + type stack — no
          new colours, no new fonts, no new libraries.
        </p>
      </header>

      {/* ── Group A — Pure typographic ─────────────────────────────────────── */}
      <div className="ip-group-label">Group A · Pure typographic</div>

      <Idea num="01" name="Ink-drop initial" caption="Drop-cap on the first letter. Navy #213D59, weight 800, 3.5em, float left.">
        <p className="ip-prose ip-demo-dropcap">
          Design earns trust when we design with people, not for them.
          The distance between "consultation" and "co-creation" is the whole
          game — and it's covered in one shift of posture, one line of
          eye contact, one shared marker on the wall.
        </p>
      </Idea>

      <Idea num="02" name="Kerned display lede" caption="Semi-headline: 1.375rem, weight 500, ink black, tight letter-spacing.">
        <p className="ip-demo-lede">
          This module unpacks how we design at Transform — the tools,
          the tradecraft, and the ethics that make it work.
        </p>
        <p className="ip-prose">
          Below it, regular body prose reads as its natural next step: quieter,
          smaller, at the standard reading measure.
        </p>
      </Idea>

      <Idea num="03" name="Kicker line + gap" caption="Small orange eyebrow above a paragraph. 10.5px, 700, tracking 0.24em.">
        <div className="ip-demo-kicker">
          <span className="ip-demo-kicker__eyebrow">In practice</span>
          <p className="ip-prose">
            We start every project by mapping the humans, systems and constraints
            already in the room. The room shapes the design as much as the brief does.
          </p>
        </div>
      </Idea>

      <Idea num="04" name="Numbered stanzas" caption="One paragraph broken into three, each preceded by an orange 01 · 02 · 03.">
        <div className="ip-demo-stanzas">
          <div className="ip-demo-stanzas__item">
            <span className="ip-demo-stanzas__num">01</span>
            <p className="ip-prose">Design earns trust when we design with people, not for them.</p>
          </div>
          <div className="ip-demo-stanzas__item">
            <span className="ip-demo-stanzas__num">02</span>
            <p className="ip-prose">That means starting with lived experience — not a brief.</p>
          </div>
          <div className="ip-demo-stanzas__item">
            <span className="ip-demo-stanzas__num">03</span>
            <p className="ip-prose">And ending with something the people we designed with can actually use.</p>
          </div>
        </div>
      </Idea>

      <Idea num="05" name="Question / answer pair" caption="Display question in navy, prose answer underneath. Cognitive rhythm without new blocks.">
        <div className="ip-demo-qa">
          <h3 className="ip-demo-qa__q">What makes design "good"?</h3>
          <p className="ip-prose">
            Design is good when it quietly changes behaviour in the direction of
            a better outcome — for the person using the service, and for the
            institution running it.
          </p>
        </div>
      </Idea>

      <Idea num="06" name="Statement ladder" caption="Short statements with orange arrows, sizes step down toward a conclusion.">
        <div className="ip-demo-ladder">
          <div className="ip-demo-ladder__step ip-demo-ladder__step--1">
            <span className="ip-demo-ladder__arrow" aria-hidden="true">→</span>
            <span>Design deeply.</span>
          </div>
          <div className="ip-demo-ladder__step ip-demo-ladder__step--2">
            <span className="ip-demo-ladder__arrow" aria-hidden="true">→</span>
            <span>Design fairly.</span>
          </div>
          <div className="ip-demo-ladder__step ip-demo-ladder__step--3">
            <span className="ip-demo-ladder__arrow" aria-hidden="true">→</span>
            <span>Design well.</span>
          </div>
        </div>
      </Idea>

      {/* ── Group B — Micro-accents ────────────────────────────────────────── */}
      <div className="ip-group-label">Group B · Micro-accents</div>

      <Idea num="07" name="Threshold rule" caption="A short vertical orange rule left of the paragraph — 2px × 24px. Marks a load-bearing statement.">
        <p className="ip-prose ip-demo-threshold">
          In every project one paragraph carries the weight. This is that
          paragraph — everything else scaffolds it, references it, or defers to it.
        </p>
      </Idea>

      <Idea num="08" name="Rule-braced pull-line" caption="Centred sentence with two short orange rules to either side. A section breath.">
        <div className="ip-demo-braced">
          <span className="ip-demo-braced__rule" aria-hidden="true" />
          <span className="ip-demo-braced__text">A shared understanding is the only sustainable moat.</span>
          <span className="ip-demo-braced__rule" aria-hidden="true" />
        </div>
      </Idea>

      <Idea num="09" name="Bracketed anchor" caption="Short phrase wrapped in oversized orange Georgia brackets ⟨ … ⟩.">
        <div className="ip-demo-brackets">
          <span className="ip-demo-brackets__mark ip-demo-brackets__mark--l" aria-hidden="true">⟨</span>
          <span className="ip-demo-brackets__text">Design is a service. It exists for someone.</span>
          <span className="ip-demo-brackets__mark ip-demo-brackets__mark--r" aria-hidden="true">⟩</span>
        </div>
      </Idea>

      <Idea num="10" name="Marginal cross-reference" caption="Two-column: prose on the left, small right-margin eyebrow linking to another chapter.">
        <div className="ip-demo-crossref">
          <p className="ip-prose">
            Participatory design isn't a workshop technique. It's the
            difference between something that lands and something that
            gathers dust on a shared drive.
          </p>
          <aside className="ip-demo-crossref__aside">
            <span className="ip-demo-crossref__label">→ See also · s13 Participation</span>
          </aside>
        </div>
      </Idea>

      <Idea num="11" name="Handwritten margin note" caption="Caveat note in muted grey, offset right of a paragraph. Optional orange pointer line.">
        <div className="ip-demo-margin">
          <p className="ip-prose">
            We reduced onboarding drop-off by <span className="ip-demo-margin__anchor">42%</span> by
            rewriting the second sentence of the welcome email.
          </p>
          <span className="ip-demo-margin__note">one sentence.</span>
        </div>
      </Idea>

      <Idea num="12" name="Vertical eyebrow rail" caption="Narrow 60px left column with rotated 90° terracotta eyebrow, tracked out.">
        <div className="ip-demo-vrail">
          <span className="ip-demo-vrail__label">Why it matters</span>
          <p className="ip-prose">
            Because the alternative is a service that works on paper and
            fails in the wild — one that passes every internal test and
            still leaves people confused.
          </p>
        </div>
      </Idea>

      {/* ── Group C — Small surfaces ───────────────────────────────────────── */}
      <div className="ip-group-label">Group C · Small surfaces</div>

      <Idea num="13" name="Tinted paper strip" caption="Prose-width block with a very subtly warmer tint (#F4F0E8). No border, no chrome.">
        <div className="ip-demo-tinted">
          <p className="ip-prose">
            A minimum viable service is the smallest thing that keeps a
            promise. Not the smallest thing you can ship.
          </p>
        </div>
      </Idea>

      <Idea num="14" name="Terminology chips" caption="Row of 2–3 pill chips. Term bold navy on mist background — reuses an existing brand secondary.">
        <div className="ip-demo-chips">
          <span className="ip-demo-chips__chip">Consultation</span>
          <span className="ip-demo-chips__chip">Co-creation</span>
          <span className="ip-demo-chips__chip">Delivery</span>
        </div>
      </Idea>

      <Idea num="15" name="Diptych card without image" caption="Reuses the .p1v2__card grammar. Left column a big orange numeral, right column a short paragraph.">
        <aside className="ip-demo-diptych">
          <span className="ip-demo-diptych__num">48%</span>
          <div className="ip-demo-diptych__body">
            <span className="ip-demo-diptych__label">Retention uplift</span>
            <p className="ip-prose">
              The measured lift in three-month retention when a service is
              shipped alongside the people it was designed for.
            </p>
          </div>
        </aside>
      </Idea>

      <footer className="ip-outro">
        <p className="ip-prose">
          Full spec, tokens and combinability rules in{' '}
          <code>ideas/text-only-visual-treatments.md</code>.
        </p>
      </footer>
    </div>
  )
}
