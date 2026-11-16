/**
 * Three delicate calligraphic strokes that follow real strands of hair in the portrait.
 *
 * Coordinates are in the portrait's own 520×852 space (the photo is stretched 100%×100%
 * over its container), so the SVG scales and rotates together with the photo.
 * The control points were traced from the photo's own strand directions
 * (structure-tensor flow field) — nothing here is a free-hand or random wave.
 */

type Pt = [number, number]

interface Stroke {
  id: string
  points: Pt[]
  /** maximum width, in portrait units */
  width: number
  /** where along the stroke the widest point sits (0–1; <1 pushes it later) */
  peak: number
  /** opacity at the most visible part of the stroke */
  opacity: number
  /** stroke colour (defaults to soft pearl grey) */
  color?: string
}

const PEARL = '#dcd8d1' // soft pearl grey, not pure white
const GRAPHITE = '#2c2c2f' // muted graphite, never pure black

const STROKES: Stroke[] = [
  {
    // graphite: short inner bend of the fringe, as close to the face as the hair allows
    id: 'graphite-fringe',
    width: 2.2,
    peak: 0.9,
    opacity: 0.45,
    color: GRAPHITE,
    points: [
      [368, 212], [378, 225], [387, 238], [398, 250], [409, 261], [421, 272], [431, 285],
    ],
  },
  {
    // graphite: slightly longer side strand falling beside the left of the face
    id: 'graphite-side',
    width: 3.5,
    peak: 1.1,
    opacity: 0.43,
    color: GRAPHITE,
    points: [
      [158, 185], [150, 196], [145, 209], [141, 222], [139, 236], [137, 250], [136, 264],
      [136, 278], [136, 292],
    ],
  },
  {
    // fringe strand falling from the forehead along the right cheek (longer)
    id: 'right-long',
    width: 3.8,
    peak: 0.75,
    opacity: 0.38,
    points: [
      [322, 146], [334, 156], [346, 167], [356, 180], [366, 192], [376, 205], [386, 217],
      [397, 229], [407, 241], [417, 253], [428, 266], [438, 278], [447, 291], [457, 304],
      [465, 317], [472, 332], [478, 347],
    ],
  },
  {
    // shorter strand hugging the right contour of the face
    id: 'right-short',
    width: 2.8,
    peak: 1.3,
    opacity: 0.32,
    points: [
      [395, 335], [398, 351], [402, 366], [406, 382], [411, 397], [416, 412], [420, 427],
      [423, 443], [424, 459], [424, 475],
    ],
  },
  {
    // short strand beside the left cheek
    id: 'left-short',
    width: 3.0,
    peak: 1.2,
    opacity: 0.34,
    points: [
      [133, 338], [134, 354], [135, 370], [136, 386], [140, 401], [145, 416], [151, 432],
      [156, 447], [159, 462], [159, 474],
    ],
  },
]

/** Catmull-Rom spline sampled into N+1 points. */
function sample(pts: Pt[], n: number): Pt[] {
  const out: Pt[] = []
  const seg = pts.length - 1
  for (let i = 0; i <= n; i++) {
    const u = (i / n) * seg
    const k = Math.min(seg - 1, Math.floor(u))
    const t = u - k
    const p0 = pts[k - 1] ?? pts[k]
    const p1 = pts[k]
    const p2 = pts[k + 1]
    const p3 = pts[k + 2] ?? p2
    const f = (a: number, b: number, c: number, d: number) =>
      0.5 *
      (2 * b +
        (-a + c) * t +
        (2 * a - 5 * b + 4 * c - d) * t * t +
        (-a + 3 * b - 3 * c + d) * t * t * t)
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])])
  }
  return out
}

/** Closed outline of a stroke that is hair-thin at both ends and widest at `peak`. */
function outline({ points, width, peak }: Stroke): string {
  const N = 100
  const c = sample(points, N)
  const normals = c.map((_, i) => {
    const a = c[Math.max(0, i - 1)]
    const b = c[Math.min(N, i + 1)]
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy) || 1
    return [-dy / len, dx / len]
  })
  const half = c.map((_, i) => (width / 2) * Math.pow(Math.sin(Math.PI * Math.pow(i / N, peak)), 1.5))
  const left = c.map((p, i) => [p[0] + normals[i][0] * half[i], p[1] + normals[i][1] * half[i]])
  const right = c
    .map((p, i) => [p[0] - normals[i][0] * half[i], p[1] - normals[i][1] * half[i]])
    .reverse()
  return 'M' + left.concat(right).map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join('L') + 'Z'
}

export default function HairLines() {
  return (
    <svg
      className="hair-lines"
      viewBox="0 0 520 852"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        {STROKES.map((s) => {
          const a = s.points[0]
          const b = s.points[s.points.length - 1]
          return (
            <linearGradient
              key={s.id}
              id={`hair-${s.id}`}
              gradientUnits="userSpaceOnUse"
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
            >
              {/* emerges from the photo, then dissolves again */}
              <stop offset="0" stopColor={s.color ?? PEARL} stopOpacity="0" />
              <stop offset="0.3" stopColor={s.color ?? PEARL} stopOpacity={s.opacity} />
              <stop offset="0.65" stopColor={s.color ?? PEARL} stopOpacity={s.opacity} />
              <stop offset="1" stopColor={s.color ?? PEARL} stopOpacity="0" />
            </linearGradient>
          )
        })}
      </defs>
      {STROKES.map((s) => (
        <path key={s.id} d={outline(s)} fill={`url(#hair-${s.id})`} />
      ))}
    </svg>
  )
}
