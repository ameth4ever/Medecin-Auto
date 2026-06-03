# Design System — MÉDECIN AUTO

> Category: Automotive
> Premium automotive services. Dark editorial luxury, Electric Blue accent, photography-first.

## 1. Visual Theme & Atmosphere

MÉDECIN AUTO is a premium automotive service platform that communicates trust, precision, and African excellence. The design language blends the dark editorial luxury of automotive heritage brands with the warmth and vitality of Senegalese craftsmanship.

The visual rhythm alternates between deep Bleu Nuit sections (full-bleed automotive photography with dark overlays) and clean Blanc Premium content panels, creating a cinematic pace reminiscent of a luxury showroom. Each section is a curated vignette: a mechanic at work in dramatic lighting, a vehicle emerging from shadow, a testimonial rendered as editorial portraiture. The Bleu Électrique accent appears with surgical precision — used exclusively for CTAs, interactive elements, and brand moments that demand attention. Rouge Performance is reserved for urgency signals (limited offers, warnings, highlights).

The interface is deliberately uncluttered. Whitespace is treated as a luxury signal. Every element earns its place through clarity and purpose. Photography carries the emotional weight — workshop scenes, vehicle details, and team portraits are art-directed to convey professionalism and passion.

**Key Characteristics:**
- Dark/Light alternation: Bleu Nuit sections followed by white content panels
- Bleu Électrique (#0EA5E9) as singular accent for CTAs and interactivity
- Rouge Performance (#DC2626) reserved for urgency and emphasis
- Photography-first storytelling with editorial-quality imagery
- Spacious layout with generous vertical rhythm
- Sharp corners with subtle rounding (4px) on interactive elements
- Consistent 0.3s transitions for all interactive states
- Premium typography with distinct heading/body hierarchy

## 2. Color Palette & Roles

### Primary Brand
- **Bleu Nuit** (`#0F172A`): Primary surface for hero sections, header, footer, and dark content panels. Conveys depth, luxury, and technical precision.
- **Blanc Premium** (`#F8FAFC`): Primary background for editorial content areas. Slightly warm white that reduces eye strain and adds sophistication.
- **Bleu Électrique** (`#0EA5E9`): Primary accent and CTA color. Used exclusively for primary buttons, interactive elements, and brand highlights.

### Secondary & Accent
- **Rouge Performance** (`#DC2626`): High-emphasis accent for urgency signals, limited offers, warnings, and featured badges. Used sparingly to maintain impact.
- **Noir Profond** (`#020617`): Deepest dark surface for footer, overlays, and modal backdrops. Darker than Bleu Nuit for depth layering.

### Surface & Background
- **White Card** (`#FFFFFF`): Card surfaces, dropdown panels, and elevated containers.
- **Light Muted** (`oklch(0.97 0 0)`): Subtle alternate section backgrounds for visual separation.
- **Dark Overlay** (`rgba(2, 6, 23, 0.7)`): Semi-transparent Noir Profond for hero image overlays.

### Neutrals & Text
- **Noir Profond** (`#020617`): Primary heading text — the darkest value.
- **Slate Dark** (`#1E293B`): Body text on light backgrounds.
- **Slate Medium** (`#64748B`): Secondary text, metadata, captions.
- **Slate Light** (`#94A3B8`): Placeholder text, disabled states.
- **Argent Métallique** (`#CBD5E1`): Light borders, dividers, and tertiary text on dark backgrounds.

### Semantic Colors
- **Success Green** (`#22C55E`): Confirmation states and positive indicators.
- **Warning Amber** (`#F59E0B`): Caution and attention states.
- **Error Red** (`#EF4444`): Error states and destructive actions.

### Gradient System
- **Hero Gradient**: `linear-gradient(to right, #0F172A 0%, rgba(15, 23, 42, 0.85) 50%, rgba(15, 23, 42, 0.7) 100%)` — used on hero overlay.
- **Electric Glow**: `radial-gradient(ellipse at top right, rgba(14, 165, 233, 0.08), transparent 60%)` — subtle atmospheric glow on dark sections.

## 3. Typography Rules

### Font Families
- **Heading**: `Plus Jakarta Sans`, -apple-system, Arial, sans-serif — used for all headings, display text, and navigation. A modern geometric sans-serif with a warm personality.
- **Body**: `Manrope`, -apple-system, Arial, sans-serif — used for body copy, UI text, and paragraphs. Optimized for readability at text sizes.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Hero Title | Plus Jakarta Sans | 56px (3.5rem) | 700 | 1.10 | Bleu Nuit text on light; white on dark |
| Section Heading | Plus Jakarta Sans | 36px (2.25rem) | 700 | 1.15 | Major section titles |
| Subheading | Plus Jakarta Sans | 24px (1.5rem) | 600 | 1.25 | Card titles, section intros |
| Card Title | Plus Jakarta Sans | 20px (1.25rem) | 600 | 1.30 | Feature/service card headings |
| Body Large | Manrope | 18px (1.125rem) | 400 | 1.65 | Lead paragraphs |
| Body | Manrope | 16px (1rem) | 400 | 1.60 | Standard body text |
| Body Small | Manrope | 14px (0.875rem) | 400 | 1.55 | Captions, metadata |
| Nav Link | Plus Jakarta Sans | 14px (0.875rem) | 500 | 1.20 | Navigation items |
| Button | Plus Jakarta Sans | 15px (0.938rem) | 600 | 1.20 | CTA and action buttons |
| Label Small | Manrope | 12px (0.75rem) | 600 | 1.30 | Uppercase labels, badges, tags |

### Principles
- **3 weights max**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold). No extremes — controlled confidence.
- **Heading=Plus Jakarta Sans, Body=Manrope**: Clear typographic register separation.
- **Relaxed body**: 1.60–1.65 line-height for body text ensures comfortable reading.
- **Compact headings**: 1.10–1.30 line-height for headlines creates impact.
- **Letter-spacing**: Normal for all text except uppercase labels (0.05em tracking).

## 4. Component Stylings

### Buttons
All buttons use 4px border-radius — precise, not pill-shaped.

**Primary CTA** (Bleu Électrique):
- Default: bg `#0EA5E9`, text `#FFFFFF`, 15px Plus Jakarta Sans weight 600, padding 10px 20px
- Hover: bg `#0284C7` (darker blue)
- Active: bg `#0369A1`
- Transition: all 0.3s ease

**Secondary CTA** (Outline):
- Default: border `1px solid #0EA5E9`, bg transparent, text `#0EA5E9`
- Hover: bg `rgba(14, 165, 233, 0.08)`
- Active: bg `rgba(14, 165, 233, 0.15)`

**Ghost Button** (on dark surfaces):
- Default: border `1px solid rgba(255, 255, 255, 0.2)`, text `#CBD5E1`
- Hover: bg `rgba(255, 255, 255, 0.08)`, text `#FFFFFF`

### Cards
- Background: `#FFFFFF` on light sections, `rgba(255, 255, 255, 0.05)` on dark sections
- Border: `1px solid` border color matching context
- Border-radius: 12px
- Shadow: `0 1px 3px rgba(0, 0, 0, 0.06)` at rest, `0 10px 25px rgba(0, 0, 0, 0.1)` on hover
- Hover: translateY(-4px) with shadow elevation

### Navigation
- Background: transparent over hero, `rgba(248, 250, 252, 0.95)` with backdrop-blur on scroll
- Bleu Nuit top bar with contact info (phone, email, address)
- Links: Plus Jakarta Sans 14px weight 500
- Active indicator: underline with Bleu Électrique

### Stats Display
- Large numbers in Plus Jakarta Sans bold
- Icon container: 64px rounded-2xl with Bleu Électrique on dark, electric/10 on light
- Label in Argent Métallique or Slate Medium
- Hover: icon container fills with Bleu Électrique

### Process Steps
- Numbered steps (01–04) with large numeral watermark
- Icon in gradient container (electric/20 to electric/5)
- Connected by ChevronRight arrows on desktop
- Card layout with subtle border

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px
- **Section padding**: 96px (py-24) for major sections
- **Card padding**: 32px (p-8) for feature cards
- **Container max-width**: 1280px

### Grid & Container
- **Container**: max-width 1280px, centered with auto margins
- **Content grid**: 12-column implicit grid via Tailwind
- **Hero**: Full-bleed, min-height 92vh, content centered
- **Card grids**: 3-column (desktop), 2-column (tablet), 1-column (mobile)

### Whitespace Philosophy
Generous vertical spacing between sections creates a gallery-like browsing rhythm. Each section is isolated with enough breathing room to be considered independently. Cards within grids use 24–32px gaps. Section headers include 64px margin-bottom to the content below, creating clear visual separation.

### Border Radius Scale
| Value | Context |
|-------|---------|
| 0px | Sharp containers, full-bleed images |
| 4px | Buttons, inputs, small interactive elements |
| 8px | Default card radius |
| 12px | Large cards, feature blocks |
| 16px | Section containers, CTA blocks |
| 24px | Full-width decorative containers |
| 9999px | Pills, badges, avatars |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow | Default surface state |
| Level 1 (Subtle) | `0 1px 3px rgba(0,0,0,0.06)` | Cards at rest |
| Level 2 (Elevated) | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, hovered cards |
| Level 3 (Prominent) | `0 10px 25px rgba(0,0,0,0.10)` | Modals, hovered feature cards |
| Level 4 (Overlay) | `rgba(2,6,23,0.7)` backdrop | Modal overlays |

### Depth Philosophy
Depth is created through three strategies:
1. **Card elevation**: Subtle shadows at rest, elevated on hover with translateY
2. **Surface contrast**: Bleu Nuit sections vs white sections create unmistakable layering
3. **Photographic depth**: Full-bleed imagery provides natural visual dimensionality

## 7. Do's and Don'ts

### Do
- Use Bleu Électrique (#0EA5E9) for primary CTAs and interactive elements only
- Alternate between dark (Bleu Nuit) and light (Blanc Premium) sections
- Use Plus Jakarta Sans for headings, Manrope for body text
- Apply 4px border-radius to all interactive elements
- Let photography carry emotional weight
- Use generous whitespace (96px section padding)
- Keep transitions at 0.3s ease
- Use the Argent Métallique (#CBD5E1) for tertiary text on dark surfaces
- Apply Rouge Performance (#DC2626) sparingly for urgency signals

### Don't
- Use Bleu Électrique as a surface/background color — it's an accent only
- Add excessive shadows — the dark/light contrast provides depth
- Use pill-shaped buttons (>8px radius)
- Mix Heading and Body fonts within the same text block
- Use bright/neon colors outside the defined palette
- Create cluttered layouts — each section needs breathing room
- Use low-quality imagery — every photo should be professional
- Override the typographic hierarchy with arbitrary sizes

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single-column, hero text 32px, stacked CTAs, 16px padding |
| Tablet | 640–1024px | 2-column grids, hero text 40px, reduced vertical spacing |
| Desktop | 1024–1280px | Full layout, 3-column grids, 96px section padding |
| Wide | >1280px | Max-width container, generous whitespace |

### Collapsing Strategy
- **Navigation**: Full horizontal → hamburger on mobile with contact info in drawer
- **Hero**: Side-by-side layout → stacked text then stats on mobile
- **Card grids**: 3-col → 2-col → 1-col
- **CTA pairs**: Side-by-side → stacked on mobile

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: "Bleu Électrique (#0EA5E9)"
- Surface Dark: "Bleu Nuit (#0F172A)"
- Surface Light: "Blanc Premium (#F8FAFC)"
- Urgency: "Rouge Performance (#DC2626)"
- Heading text: "Noir Profond (#020617)"
- Body text: "Slate Dark (#1E293B)"
- Secondary text: "Slate Medium (#64748B)"
- On-dark text: "Argent Métallique (#CBD5E1)"
- Deepest dark: "Noir Profond (#020617)"

### Example Component Prompts
- "Create a hero section on Bleu Nuit gradient overlay with a full-bleed automotive background image. Badge 'Premium Auto Services' in Bleu Électrique border. Heading in Plus Jakarta Sans 56px bold white. Two CTAs: primary Bleu Électrique button and secondary outline white button. Stats grid on right side with glass-morphism cards."
- "Design a feature card with Bleu Électrique icon container, Plus Jakarta Sans heading 20px weight 600, Manrope body 14px, 12px border-radius, white background, subtle shadow. On hover: translateY(-4px) with elevated shadow."
- "Build a dark stats section on Bleu Nuit gradient. 4-column grid with 80px icon containers (Bleu Électrique on white/10), Plus Jakarta Sans numbers 48px bold white, labels in Argent Métallique."
- "Create a working process step card with gradient icon container, large '01' watermark, Plus Jakarta Sans title, Manrope description, ChevronRight connector between steps."
- "Design a pricing card with Bleu Électrique border for featured plan. Badge 'Populaire' with Bleu Électrique background. CheckCircle2 icons in Bleu Électrique for features. Button: Bleu Électrique primary or outline."
