import type { ReactNode } from 'react'
import { Media } from '../pages/Layouts'
import '../pages/Layouts.css'
import './expansions.css'

/**
 * Pathway 1 · per-page expansions.
 *
 * Renders below the default page body as a continuous editorial column of
 * prose. Layouts from /layouts appear sparingly as accents (pull-quotes,
 * images, boxouts) — the writing carries the page, not the containers.
 *
 * Reading rhythm inspired by minaab.com/the-siblinghood-theory:
 *   · narrow reading measure (~680px)
 *   · generous line-height (1.7) and paragraph spacing
 *   · accents break to a wider column (~900px) as pause points
 */

/* ── Reusable pieces ─────────────────────────────────────────────────── */

/**
 * A wider "break-out" accent. Wrap L32/L36/L58 elements in this so they sit
 * wider than the prose column and read as visual punctuation.
 */
function Accent({ children }: { children: ReactNode }) {
  return <div className="p1exp__accent">{children}</div>
}

/** A boxed list (L32-style) — orange tab + bordered card + orange dot bullets. */
function Boxout({ label, items }: { label: string; items: string[] }) {
  return (
    <Accent>
      <div className="ly-tabbed__box p1exp__boxout">
        <span className="ly-tabbed__tab" aria-hidden="true" />
        <span className="ly-tabbed__label">{label}</span>
        <ul className="ly-tabbed__list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </Accent>
  )
}

/** A pull-quote (L58-style) — oversized terracotta speech mark + display line. */
function PullQuote({ text }: { text: string }) {
  return (
    <Accent>
      <div className="ly-qblock p1exp__quote">
        <span className="ly-qblock__mark ly-qblock__mark--terracotta" aria-hidden="true">&ldquo;</span>
        <div className="ly-qblock__body">
          <p className="ly-qblock__text">{text}</p>
        </div>
      </div>
    </Accent>
  )
}

type Tone = 'blue' | 'terracotta' | 'yellow' | 'warmgrey' | 'paleblue'
type Dir = 'tl' | 'tr' | 'br' | 'bl'

/** A 16:9 image with an offset accent plane behind it (L36 / L41 style). */
function ImagePlane({ seed, tone = 'blue', direction = 'tl' }: {
  seed: string
  tone?: Tone
  direction?: Dir
}) {
  return (
    <Accent>
      <div className={`ly-layered ly-layered--${direction} ly-layered--${tone}`}>
        <span className="ly-layered__plane" aria-hidden="true" />
        <Media shape="16-9" seed={seed} />
      </div>
    </Accent>
  )
}

/** A wide 21:9 cinematic image with an offset plane (L46 style). */
function CinemaImage({ seed, tone = 'terracotta', direction = 'br' }: {
  seed: string
  tone?: Tone
  direction?: Dir
}) {
  return (
    <Accent>
      <div className={`ly-layered ly-layered--${direction} ly-layered--${tone}`}>
        <span className="ly-layered__plane" aria-hidden="true" />
        <Media shape="21-9" seed={seed} />
      </div>
    </Accent>
  )
}

/** Portrait-tall + square asymmetric pair with mixed planes (L47 style). */
function AsymPair({ seedTall, seedSq }: { seedTall: string; seedSq: string }) {
  return (
    <Accent>
      <div className="ly-asympair">
        <div className="ly-layered ly-layered--tl ly-layered--blue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="portrait-tall" seed={seedTall} />
        </div>
        <div className="ly-asympair__side">
          <div className="ly-layered ly-layered--br ly-layered--yellow">
            <span className="ly-layered__plane" aria-hidden="true" />
            <Media shape="square" seed={seedSq} />
          </div>
        </div>
      </div>
    </Accent>
  )
}

/** Circle avatar + 16:9 context, side-by-side (L48 style). */
function AvatarContext({ seedFace, seedContext }: { seedFace: string; seedContext: string }) {
  return (
    <Accent>
      <div className="ly-avatarrow">
        <div className="ly-layered ly-layered--br ly-layered--warmgrey ly-avatarrow__avatar">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="circle" seed={seedFace} />
        </div>
        <div className="ly-avatarrow__context">
          <div className="ly-layered ly-layered--tl ly-layered--paleblue">
            <span className="ly-layered__plane" aria-hidden="true" />
            <Media shape="16-9" seed={seedContext} />
          </div>
        </div>
      </div>
    </Accent>
  )
}

/** 16:9 landscape with a diagonal double plane (L49 style). */
function DiagonalPlanes({ seed }: { seed: string }) {
  return (
    <Accent>
      <div className="ly-layered ly-layered--tl ly-layered--blue">
        <span className="ly-layered__plane" aria-hidden="true" />
        <span className="ly-layered__plane ly-layered__plane--yellow ly-layered__plane--br" aria-hidden="true" />
        <Media shape="landscape" seed={seed} />
      </div>
    </Accent>
  )
}

/** Two overlapping images — portrait + landscape (L53 style). */
function OverlapPair({ seedA, seedB }: { seedA: string; seedB: string }) {
  return (
    <Accent>
      <div className="ly-overlap-pair">
        <div className="ly-overlap-pair__a">
          <Media shape="portrait" seed={seedA} />
        </div>
        <div className="ly-overlap-pair__b">
          <Media shape="landscape" seed={seedB} />
        </div>
      </div>
    </Accent>
  )
}

/** A run of paragraphs — the default prose column. */
function Prose({ children }: { children: ReactNode }) {
  return <div className="p1exp__prose">{children}</div>
}

/* ── Router ──────────────────────────────────────────────────────────── */

export function PageExpansion({ pageId }: { pageId: string }) {
  const content = EXPANSIONS[pageId]
  if (!content) return null
  return <article className="p1exp">{content}</article>
}

const EXPANSIONS: Record<string, ReactNode> = {

  // ══════════════════════════════════════════════════════════════════════
  // Page 2 · Purpose-driven north star
  // ══════════════════════════════════════════════════════════════════════
  's2-north-star': (
    <>
      <Prose>
        <p>
          Our purpose is to enable better, collective decisions through deep understanding of people,
          place, systems and contexts — creating environments for design to thrive.
        </p>
        <p>
          Through evidence, empathy and iteration, we design with purpose. The aim is to deliver
          real-world outcomes that are meaningful, equitable and sustainable.
        </p>
        <p>
          That means going beyond the visible product or service. We look at lived experience,
          systemic dynamics and the unintended consequences that more traditional approaches can
          overlook.
        </p>
      </Prose>

      <Boxout
        label="Our role is to"
        items={[
          'Expand understanding — surface lived experiences, systemic dynamics and unintended consequences.',
          'Enable sensemaking — use visualisation, prototyping and collaborative tools to help people hold more information and perspectives at once.',
          'Reframe problems — open up different interpretations and unlock new solutions.',
          'Design responsibly — ground our practice in rigour, ethics and transparency.',
          'Build trust and accountability — balance participatory and iterative approaches with clarity, scrutiny and traceability.',
        ]}
      />


      <Prose>
        <p>
          Design thrives through skilled people, but also through supportive organisational
          environments, leadership and culture. We need to shape the conditions for good design, as
          well as the capability to deliver it.
        </p>
      </Prose>
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 3 · Good design matters
  // ══════════════════════════════════════════════════════════════════════
  's3-good-design-matters': (
    <>
      <Prose>
        <p>
          Researchers and designers act as a bridge between citizens and institutions. Done well,
          human-centred design builds trust in the final service as something created with people,
          not to them.
        </p>
      </Prose>

      <ImagePlane seed="rsd-p3-bridge" tone="terracotta" direction="br" />

      <Prose>
        <p>
          Well-designed services solve real problems, not symptoms. They are built on insight and
          evidence, increasing the likelihood that what we create actually addresses people's needs.
        </p>
      </Prose>

      <Boxout
        label="Good design can"
        items={[
          'Improve effectiveness by addressing root causes.',
          'Enhance efficiency and reduce waste by removing duplication, simplifying interactions and preventing failure demand.',
          'Build trust and legitimacy by making services clear, fair and easy to use.',
          'Strengthen organisational learning and adaptability through feedback and iteration.',
          'Enable prevention and long-term value, rather than simply fixing today’s problems.',
          'Cultivate collaboration and systemic change across professions, agencies and communities.',
        ]}
      />

    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 4 · When design gets it wrong
  // ══════════════════════════════════════════════════════════════════════
  's4-design-wrong': (
    <>
      <Prose>
        <p>
          But human-centred design can get things wrong too.
        </p>
        <p>
          Ambiguity about what &ldquo;design&rdquo; means creates misalignment and superficial
          practice. Endless research and design loops without delivery create scepticism. And teams
          can copy the rituals of design — Post-its, workshops and prototypes — without the
          underlying purpose or discipline.
        </p>
      </Prose>

      <PullQuote
        text="Good design needs contextual grounding, clarity and delivered outcomes. It is substance over theatre."
      />

    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 5 · When services go wrong
  // ══════════════════════════════════════════════════════════════════════
  's5-services-wrong': (
    <>
      <Prose>
        <p>
          When human-centred design is absent, services tend to be designed around systems and
          organisational constraints rather than people and the complexities of real life.
        </p>
      </Prose>

      <Prose>
        <p>
          Design becomes peripheral. Fixed and compliance-driven mindsets dominate, and continuous
          learning disappears from the development process.
        </p>
      </Prose>

    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 6 · Enabling good design
  // ══════════════════════════════════════════════════════════════════════
  's6-enabling': (
    <>
      <Prose>
        <p>
          Design cannot succeed in a vacuum.
        </p>
        <p>
          Good design listens deeply, tests ideas with real people and builds empathy into every
          level of decision-making.
        </p>
        <p>
          For design to thrive, it needs to be embedded into the DNA of an organisation. Leadership
          and culture need to value experimentation, learning and human-centred decision-making,
          rather than treating design as something peripheral to delivery.
        </p>
      </Prose>

      <AsymPair seedTall="rsd-p6-dna" seedSq="rsd-p6-culture" />

      <Boxout
        label="Four important conditions"
        items={[
          'Embed design into the DNA — a culture where experimentation, learning and human-centred decisions are encouraged.',
          'Enable systems thinking and cross-boundary collaboration — multidisciplinary teams empowered to co-own outcomes.',
          'Create clear definitions and shared language — a common understanding of what design is and what it is for.',
          'Provide structures, resources and mandates that support design — shared standards, frameworks, skills and continuous evaluation.',
        ]}
      />

    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 7 · Connective creativity
  // ══════════════════════════════════════════════════════════════════════
  's7-connective': (
    <>
      <Prose>
        <p>
          At Transform, we describe the role of design as connective creativity.
        </p>
      </Prose>

      <PullQuote
        text="Great design is about making sense of complex problems and creating solutions that are desirable, feasible, viable and sustainable."
      />


      <Prose>
        <p>
          Researchers and designers bridge these different elements. Through creativity, robust
          evidence and the participation of users, business owners, managers, frontline staff and
          industry experts, our work can deliver project objectives, de-risk implementation, build
          legitimacy and create value.
        </p>
      </Prose>
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 8 · T-shaped skills
  // ══════════════════════════════════════════════════════════════════════
  's8-tshaped': (
    <>
      <Prose>
        <p>
          It takes highly skilled, empathetic researchers, creative experimenters, strategic
          collaborators and ethical stewards of change.
        </p>
        <p>
          Our researchers&rsquo; and designers&rsquo; expertise is built not just on what they
          design, but on how they enable others to see, understand and adapt to the needs of those
          who experience their products and services.
        </p>
        <p>
          We think of these people as T-shaped specialists. They bring deep disciplinary expertise,
          while also being able to work across a wider set of human-centred transformation skills.
        </p>
      </Prose>

      <Boxout
        label="Skills across the practice"
        items={[
          'Human insight',
          'Data and statistical analysis',
          'Behavioural science',
          'Systems thinking',
          'Experimentation & prototyping',
          'Policy design',
          'Service design',
          'Strategic design',
          'Organisational design',
          'Interaction design',
          'Innovation',
        ]}
      />


      <AvatarContext seedFace="rsd-p8-face" seedContext="rsd-p8-context" />

      <Prose>
        <p>
          Different specialists contribute in different ways.
        </p>
        <p>
          <strong>Researchers</strong> provide the foundation. They help us understand needs, wants,
          motivations, barriers and systems through the eyes of users. They frame problems, create
          hypotheses, test and evidence ideas before implementation.
        </p>
        <p>
          <strong>Service designers</strong> are the bridge between research, UX, technology,
          operations, business and policy. They make visible how services function across the front
          and back stage, creating shared understanding.
        </p>
        <p>
          <strong>UX and interaction designers</strong> make digital interactions clear, inclusive
          and evidence-driven, ensuring people can use products and services easily, safely and with
          confidence.
        </p>
        <p>
          <strong>Content designers</strong> translate complexity into plain language and structure
          information so services are understandable, useful and accessible to all.
        </p>
        <p>
          Designing best-in-class, future-facing products and services is a team sport. The value
          comes from bringing these capabilities together in collaborative, multidisciplinary teams.
        </p>
      </Prose>
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 9 · Head, heart and hands (framework)
  // ══════════════════════════════════════════════════════════════════════
  's9-hhh-framework': (
    <>
      <Prose>
        <p>
          We are passionate about building services that truly transform lives and make the world a
          better place through design.
        </p>
        <p>
          That is captured in our research and design philosophy: <strong>Head, Heart, Hands.</strong>
        </p>
      </Prose>

      <Accent>
        <ul className="p1exp__hhh">
          <li><span className="p1exp__hhh-term">Head</span><span className="p1exp__hhh-def">is how we think and frame our work.</span></li>
          <li><span className="p1exp__hhh-term">Heart</span><span className="p1exp__hhh-def">is all the things we care about most.</span></li>
          <li><span className="p1exp__hhh-term">Hands</span><span className="p1exp__hhh-def">is how we deliver and get the job done.</span></li>
        </ul>
      </Accent>


      <Prose>
        <p>
          Together, they help organisations establish cultures of expert and empathic
          problem-solving.
        </p>
      </Prose>
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 10 · Head
  // ══════════════════════════════════════════════════════════════════════
  's10-head': (
    <>
      <Prose>
        <p>
          We use human-centred frameworks to shape how we think. Those who use, deliver and manage
          services do not exist in a vacuum, so we need to understand the wider factors that shape
          the success or failure of a service.
        </p>
        <p>
          That means taking a whole-system view.
        </p>
      </Prose>

      <CinemaImage seed="rsd-p10-system" tone="paleblue" direction="tl" />

      <Boxout
        label="We consider"
        items={[
          'Individual needs, capability, motivation and opportunity.',
          'The service context — barriers, technology and implementation.',
          'Organisational goals, commercial priorities, capability and culture.',
          'Community influence and relationships.',
          'The wider environmental context influencing adoption and scale.',
        ]}
      />


      <Prose>
        <p>
          Understanding how a service exists within this ecosystem is essential when designing
          end-to-end and front-to-back services.
        </p>
      </Prose>
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 11 · Heart
  // ══════════════════════════════════════════════════════════════════════
  's11-heart': (
    <>
      <Prose>
        <p>
          Heart is the &ldquo;why&rdquo; behind what we do — the things that get us out of bed in
          the morning.
        </p>
        <p>
          It comes down to making an impact: improving lives, supporting people and making the world
          better.
        </p>
        <p>
          Our approach is built around three core principles.
        </p>
      </Prose>

      <ImagePlane seed="rsd-p11-heart" tone="terracotta" direction="br" />

      <Boxout
        label="Three core principles"
        items={[
          'Solve the right problem — a product or service can only ever be as good as the understanding of the problem it addresses.',
          'Co-location underpins collaboration — when we’re together, we can design better, deliver quicker and adapt as new insight emerges.',
          'We’re human first — as technological and physical worlds converge, people must stay at the centre of our work.',
        ]}
      />

    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 12 · Hands
  // ══════════════════════════════════════════════════════════════════════
  's12-hands': (
    <>
      <Prose>
        <p>
          Working alongside colleagues, clients and partners, we incrementally turn ideas, service
          concepts and prototypes into real working services.
        </p>
        <p>
          We focus relentlessly on the elements that deliver the greatest value. We test
          assumptions, learn and enhance designs throughout the process.
        </p>
        <p>
          Where assumptions or hypotheses fall short, we can pivot — returning to the research and
          insight and changing direction.
        </p>
      </Prose>

      <DiagonalPlanes seed="rsd-p12-hands" />

      <Boxout
        label="Levels of experimentation"
        items={[
          'Proof of concept — testing whether an idea can become a real service or product.',
          'Prototype — testing the broader end-to-end journey and simulating real interactions.',
          'Pilot — testing a feature-rich service in an environment that mirrors the real world, with clearly defined outcomes for evaluation.',
        ]}
      />


      <PullQuote
        text="Head, Heart and Hands work together. We understand the world, stay focused on what matters, and make ideas tangible enough to test, learn from and improve."
      />
    </>
  ),

  // ══════════════════════════════════════════════════════════════════════
  // Page 13 · Participation
  // ══════════════════════════════════════════════════════════════════════
  's13-participation': (
    <>
      <Prose>
        <p>
          That is why participatory design is our default.
        </p>
        <p>
          We want our work to be embedded into the culture of a project, programme and organisation,
          so it can live on and create positive change that everyone wants to sustain.
        </p>
        <p>
          Our participation model demonstrates value and builds knowledge through doing. We invite
          and guide participants to experience the process themselves.
        </p>
      </Prose>

      <OverlapPair seedA="rsd-p13-a" seedB="rsd-p13-b" />

      <Boxout
        label="That might mean"
        items={[
          'Walking through scenarios in each other’s shoes.',
          'Developing future journeys.',
          'Creating service maps.',
          'Exploring future roles and structures.',
          'Bringing concepts to life.',
          'Testing ideas together.',
        ]}
      />


      <Prose>
        <p>
          Participation isn&rsquo;t simply consultation. It&rsquo;s about people becoming active
          contributors to the design process.
        </p>
        <p>
          By working openly and building knowledge through doing, we create greater shared
          understanding and ownership. The aim is not only to create a better service, but to
          strengthen the capability of the people and organisations who will continue to shape it.
        </p>
      </Prose>

      <PullQuote
        text="Participation helps surface hidden user groups, bring their insight into focus and nurture in-house skills so innovation can continue."
      />
    </>
  ),

}
