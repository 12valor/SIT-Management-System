# Design

## Aesthetic: Archival/Editorial
A high-fidelity, authoritative design system that balances institutional rigor with premium interactivity. The aesthetic avoids generic "SaaS" patterns in favor of a document-driven, archival feel.

## Colors (HSL)
Primary tokens are centered around TUP Maroon (H: 348, S: 83%).
- **Ink (Foreground)**: `hsl(348 83% 10%)` — A deep, warm maroon-black.
- **Paper (Background)**: `hsl(0 0% 100%)` — Pure white for high contrast.
- **Accent (Crimson)**: `hsl(348 83% 40%)` — Refined TUP Maroon for primary actions.
- **Deep Crimson Gradient**: From `primary` to `primary/60` for floating interactive components.

## Typography
- **Heading**: Montserrat — For structural clarity and authoritative headers.
- **Body**: Poppins — For modern, legible interface text.
- **Premium**: Outfit — For specific high-impact interactive elements.
- **Serif**: Instrumental Serif — For specialized archival sections.

## Spacing & Interaction
- **Grid**: Strict baseline with dot-pattern and grid-line background overlays for a technical/procedural feel.
- **Borders**: Refined `0.75rem` (12px) radius for cards, providing a modern but structured container.
- **Motion**: Sophisticated micro-animations via Framer Motion. Floating components use custom deep-crimson gradients to signify interactivity.
- **Elevation**: Minimal. High-contrast borders and subtle background shifts are preferred over heavy shadows.

## Components
- **Buttons**: Rounded (0.75rem), high-contrast, with hover states driven by crimson gradients.
- **Cards**: Document-like blocks with clear typographic hierarchy and grid-based internal layouts.
- **Floating Islands**: Interactive UI elements that use crimson gradients and spring-based entry animations.
