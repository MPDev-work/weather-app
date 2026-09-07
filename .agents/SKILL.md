# UI DESIGN SYSTEM AND CODING STYLE

Follow these rules consistently when creating or modifying frontend UI.

## 1. SPACING

- Use 10px as the default spacing when spacing is needed.
- Prefer Tailwind:
  - `p-2.5`
  - `px-2.5`
  - `py-2.5`
  - `gap-2.5`

- Keep layouts compact and clean.
- Avoid unnecessary padding and excessive whitespace.
- For cards, `gap-2.5` is usually enough.
- For product grids:
  - Prefer `gap-x-2.5` or `gap-x-5`.
  - Set `gap-y` to approximately 2x the horizontal gap.
  - Example: `gap-x-2.5 gap-y-5`
  - Example: `gap-x-5 gap-y-10`

### Root / page-level wrapper

The outermost page wrapper should stay bare.

- Do not add `p-2.5`, `gap-2.5`, or other spacing utilities to the root wrapper by default.
- Put spacing on sections and components inside the root wrapper.
- Do not add `font-sans` when the font is already configured globally.
- Do not add `min-h-screen` unless full viewport height is genuinely required.

Bad:

```jsx
<div className="min-h-screen bg-[#0f0f12] text-gray-100 font-sans p-2.5 flex flex-col gap-2.5">
```

Good:

```jsx
<div className="bg-[#0f0f12] text-gray-100 flex flex-col">
```

## 2. TYPOGRAPHY

- Use one Google Font consistently throughout the application.
- Prefer Poppins, Inter, or another clean Google Font selected according to the project.
- Font weight is unrestricted. Choose `font-normal`, `font-medium`, `font-semibold`, or `font-bold` based on hierarchy.
- Keep all text large enough to read comfortably.
- Do not shrink body text, labels, prices, headings, or card text purely to save space.
- Avoid `font-extrabold` and `font-black` unless heavy display typography is intentional.
- Avoid vague marketing copy.
- Hero headings must clearly explain the product, service, or page.
- Avoid generic AI sounding copy and unnecessary buzzwords.
- Keep copy specific to the actual product and functionality.

## 3. ICONS

- Use Lucide Icons as the first choice.
- In React, prefer `lucide-react`.
- Use Bootstrap Icons when Lucide does not provide a suitable icon.
- Do not create custom SVG icons when an appropriate library icon exists.
- Keep icon sizes and stroke weights consistent.
- Do not use emoji as UI icons.
- Do not use emoji as brand icons.

## 4. BORDER RADIUS

- Large parent containers: `rounded-[35px]`
- Child components: `rounded-[25px]`
- Buttons: `rounded-full`
- Small controls: `rounded-[25px]` or `rounded-full` when appropriate.
- Follow an existing component's established radius when a deliberate smaller radius already exists.

### Full-bleed sections

A `w-full` or `w-screen` section running edge to edge inside its parent should not receive a large container radius.

Bad:

```jsx
<section className="w-full bg-[#18181d] rounded-[35px] p-6 md:p-10">
```

Good:

```jsx
<section className="w-full bg-[#18181d] p-6 md:p-10">
```

Only round a full-width section when the section visibly sits inside a wider frame.

### Concentric radius

Nested rounded elements must maintain visually concentric corners.

Rule:

```text
parent radius > child radius + parent padding
```

Example:

```text
parent padding = 20px
child radius = 25px
minimum parent radius > 45px
```

Use `rounded-[50px]` or higher instead of `rounded-[35px]` in this case.

If the relationship does not work:

- Reduce child radius.
- Reduce parent padding.
- Increase parent radius.

## 5. BORDERS

Never add borders to large containers or cards.

Do not use borders on:

- Product cards
- Large content containers
- Sections
- Product grids
- Main panels
- Large modals

Borders are appropriate for small controls when a visible boundary improves usability.

Examples:

- Filter buttons
- Navigation controls
- Discount tags
- Brand tags
- Category buttons
- Selectable filters
- Small action controls

### Border color rules

When using a `color-500` background:

```text
color-500 background → color-300 border
```

Examples:

```text
red-500 → border-red-300
amber-500 → border-amber-300
emerald-500 → border-emerald-300
```

For white:

```text
bg-white → border-gray-300
```

For black:

```text
bg-black → no border preferred
```

If a black surface requires a border:

```text
border-gray-400
```

Do not automatically add borders.

## 6. COLOR SYSTEM

Do not force the entire application into one fixed palette.

Choose colors based on:

- Brand identity
- Product type
- Visual hierarchy
- Light mode
- Dark mode
- Accessibility
- Existing project design

### Light mode

- Keep the interface clean and bright.
- When a neutral gray background is needed, prefer `#f2f2f6`.
- Choose gray text based on contrast and hierarchy.
- Do not force every text element to use `gray-500`.
- Maintain sufficient contrast.
- Use colors consistently.

### Dark mode

- Choose dark surfaces according to readability and hierarchy.
- Avoid pure black unless the design benefits from it.
- Maintain clear separation between background, surfaces, text, and interactive elements.

### General rules

- Do not introduce random colors.
- Every color should have a visual or functional reason.
- `color-500` background uses `color-300` border when a border is required.
- White uses `border-gray-300` when a border is required.
- Black prefers no border, or `border-gray-400` when required.
- Large containers and cards should not have borders.

## 7. BUTTONS

- Prefer `rounded-full` for buttons.
- Buttons with background colors should never have borders.
- This applies to:
  - Login buttons
  - Signup buttons
  - Navigation buttons
  - Primary buttons
  - CTA buttons
  - Colored filter buttons

- Use borders primarily for small controls without background colors.
- Keep button typography stable across hover, focus, and active states.
- Prefer changing:
  - Background
  - Text color
  - Opacity
  - Border color
  - Scale

- Do not change font styling simply to create an interaction effect.

Pill shaped controls should not be used everywhere outside actual buttons. Tags, filters, inputs, cards, and containers should follow their own radius rules.

## 8. PRODUCT CARDS

The product-card parent should generally use:

```text
relative flex flex-col items-center justify-center gap-2.5 overflow-hidden
```

Rules:

- Never add padding to the parent card.
- Never add a background color to the parent card.
- Never add a border to the parent card.
- Never add a shadow to the parent card.
- Use `gap-2.5` as the default card gap.
- Keep the card visually open and compact.
- Keep product title, price, and supporting text readable.

### Product image

Prefer:

```text
w-full aspect-[3/4] object-cover overflow-hidden
```

The image container should follow the established card radius.

Product information may have its own padding and spacing.

The parent card must remain without padding and without a background color.

## 9. PRODUCT GRID

For product grids:

- Prefer `gap-x-2.5` or `gap-x-5`.
- Use approximately 2x the horizontal gap for vertical spacing.

Examples:

```text
gap-x-2.5 gap-y-5
```

```text
gap-x-5 gap-y-10
```

Do not use excessive grid spacing.

## 10. ABSOLUTE POSITIONED ELEMENTS

When an absolute child sits inside a rounded parent, keep the child approximately 10px from the parent's corners.

Prefer:

```text
top-2.5
right-2.5
bottom-2.5
left-2.5
```

Example:

```jsx
absolute top-2.5 right-2.5
```

This applies to:

- Brand badges
- Discount badges
- Wishlist buttons
- Favorite buttons
- Status indicators
- Image overlays
- Small action controls

Do not place these elements directly against the parent's edge unless the design requires it.

## 11. BADGES AND TAGS

For compact tags:

- Discount tags
- Brand tags
- Category tags
- Status badges
- Small labels

Use approximately 2x horizontal padding compared with vertical padding.

Examples:

```text
py-1 px-2
py-1.5 px-3
py-2 px-4
```

Keep tags compact.

Do not use equal horizontal and vertical padding unless the design requires it.

## 12. FREE DELIVERY

- Use a suitable green or emerald tone for free-delivery indicators.
- Prefer `emerald-700` when following the existing design system.
- Keep free-delivery labels compact and subtle.

## 13. DISCOUNT TAGS

- Use the project's selected primary or action color.
- When using `color-500`, use `color-300` for the border.
- Keep the tag compact.
- Use approximately 2x horizontal padding compared with vertical padding.

## 14. BRAND TAGS

Brand badges are small controls.

Use:

- A suitable theme-based background.
- A suitable contrasting text color.
- `border-gray-300` with white backgrounds when a border is needed.
- Approximately 2x horizontal padding compared with vertical padding.
- Approximately 10px distance from rounded parent corners when positioned absolutely.

## 15. MODALS

Large modals should generally use approximately half the viewport width.

Prefer:

```text
w-1/2
```

Large modals:

- No border.
- No shadow.
- `rounded-[35px]`.
- Use 10px padding when padding is needed.
- Use `rounded-[25px]` for child components.
- Follow the current light or dark color system.

Remember the concentric radius rule when a rounded child sits inside a rounded modal.

## 16. SHADOWS

Never use shadows.

Do not use:

```text
shadow-sm
shadow
shadow-md
shadow-lg
shadow-xl
```

Do not use CSS `box-shadow`.

Create hierarchy through:

- Spacing
- Color
- Radius
- Typography
- Small-control borders
- Contrast

## 17. HOVER AND ANIMATIONS

Use smooth interactions for interactive elements.

Prefer:

```text
transition-all duration-500 ease-out
```

Suitable effects include:

- Scale
- Translate
- Opacity
- Background color
- Text color
- Border color
- Icon movement

Use animation for meaningful interaction and feedback.

Avoid:

- Excessive scroll animations
- Cursor-following animations
- Constant animation loops
- Large movement
- Distracting effects
- Animation on every page section

Animations should remain subtle and clearly connected to the user's interaction.

Respect `prefers-reduced-motion`.

## 18. FOCUS STATES

Focus states should communicate state without redesigning the component.

For filters and similar controls:

- Keep the same font size.
- Keep the same font style.
- Prefer background, text color, opacity, border color, or subtle scale changes.
- Do not use font styling as the primary focus effect.

## 19. NAVBAR

For SaaS-style navbars:

- Use `uppercase` for navigation links.
- Use `tracking-wide` or `tracking-wider` when appropriate.
- Use `text-base` or `text-lg`.
- Do not use navigation text smaller than `text-base`.
- Do not give nav links a background on hover or focus.
- Change the link to the opposite or strongest available contrast color instead.

Example:

```text
inactive: muted gray
hover/focus: white
```

### Glass navbar

When using blur or glass styling:

```text
backdrop-blur-[50px]
```

### Navbar height

Prefer:

```text
h-12
```

or:

```text
h-14
```

Elements inside the navbar that need their own height should be 2 Tailwind spacing units shorter.

Examples:

```text
navbar h-12 → inner control h-10
navbar h-14 → inner control h-12
```

## 20. HERO SECTIONS

- Do not use vague hero text.
- Clearly explain what the product or service does.
- Keep the main heading specific.
- Use a clear hierarchy:
  - Eyebrow or category
  - Main heading
  - Supporting description
  - Primary action

- Avoid exaggerated claims.
- Do not use generic AI generated marketing copy.
- Do not add decorative gradients purely to make the hero look impressive.
- Do not use oversized typography purely for visual impact.

## 21. CONTENT INTEGRITY

Never fabricate information.

Do not create:

- Fake reviews
- Fake testimonials
- Fake statistics
- Fake metrics
- Fake ratings
- Fake customer counts
- Fake revenue
- Fake downloads
- Fake user activity
- Fake urgency
- Fake company logos
- Fake case studies

Only display metrics backed by real application data.

During development, use clearly identifiable placeholder content.

## 22. TRUST AND AUTHENTICITY

The UI must represent the actual product.

- Do not make the product appear more popular than it is.
- Do not create fake social proof.
- Do not create fake activity indicators.
- Do not create fake ratings.
- Do not create fake scarcity.
- Do not make unsupported performance claims.
- Every visible claim should correspond to real functionality or real data.

## 23. BRANDING

- Always provide a proper site favicon.
- Use the project's actual logo or brand mark.
- Keep the favicon, logo, title, and application branding consistent.
- Do not use emoji as brand marks.
- Do not create unnecessary decorative logos.
- Use the project's actual identity throughout the interface.

## 24. AI GENERATED VISUALS

- Do not use AI generated images by default.
- Prefer real product imagery, screenshots, illustrations, or intentionally designed graphics.
- Use AI generated imagery only when the project benefits from it.
- Generated visuals must match the product's actual identity.
- Do not add an "Made with AI" label automatically.
- Do not add AI attribution badges unless the product specifically requires them.

## 25. RESPONSIVE DESIGN

Every interface must work across:

- Mobile
- Tablet
- Desktop

Rules:

- Prevent horizontal overflow.
- Keep text readable on small screens.
- Scale hero typography responsively.
- Keep buttons usable on touch screens.
- Do not rely on desktop-only layouts.
- Keep spacing proportional across breakpoints.
- Avoid unnecessarily large mobile whitespace.

## 26. CODE STYLE

- Never leave comments in the code.
- Do not add TODO comments.
- Do not add explanation comments.
- Do not add temporary developer notes.
- Keep code production-ready.
- Avoid unnecessary wrappers.
- Avoid unnecessary abstractions.
- Preserve existing component structures.
- Reuse existing components and utilities where appropriate.
- Do not redesign unrelated components.
- Do not introduce code unrelated to the requested change.

## 27. DESIGN CONSISTENCY

When modifying an existing interface:

- Preserve the existing component structure.
- Follow the established visual language.
- Reuse existing spacing.
- Reuse existing typography.
- Reuse existing colors.
- Reuse existing radius values.
- Reuse existing animation patterns.
- Treat an existing approved component design as the source of truth.
- Do not introduce unrelated styling patterns.
- Do not redesign a component when the request requires only a small modification.

## 28. GENERAL QUALITY RULES

Before adding any visual effect, check:

1. Does this improve usability?
2. Does this communicate useful information?
3. Does this match the product identity?
4. Does this improve hierarchy or interaction?

If the answer is no, do not add the effect.

Prioritize:

- Real content
- Real functionality
- Clear typography
- Consistent spacing
- Consistent icons
- Subtle animation
- Authentic metrics
- Authentic imagery
- Accessible interactions
- Responsive layouts
- Professional visual hierarchy

Avoid:

- Purple gradients as a default style
- Vague hero copy
- Fake reviews
- Fake metrics
- Excessive scroll animation
- Cursor animations
- Emoji UI icons
- Unnecessary pill-shaped controls
- AI sounding copy
- AI imagery by default
- AI attribution labels
- Unnecessary visual effects
- Excessive whitespace
- Shadows
- Borders on large containers

## 29. PRIORITY RULES

When multiple styling decisions are possible, follow this priority order:

1. Preserve the existing component structure.
2. Preserve the established visual language.
3. Use one consistent Google Font.
4. Use Lucide Icons first.
5. Use 10px spacing when spacing is needed.
6. Keep the root/page wrapper bare.
7. Do not add `min-h-screen` unless genuinely required.
8. Do not round full-bleed edge-to-edge sections.
9. Keep nested rounded corners concentric.
10. Use `gap-2.5` for product cards.
11. Use `gap-x-2.5` or `gap-x-5` for product grids.
12. Use approximately 2x vertical spacing for grid `gap-y`.
13. Use approximately 2x horizontal padding compared with vertical padding for tags.
14. Never use shadows.
15. Never add borders to cards or large containers.
16. Use borders only for small controls when appropriate.
17. Never add padding to the product-card parent.
18. Never add a background to the product-card parent.
19. Keep absolute positioned children approximately 10px from rounded parent corners.
20. Use `rounded-[35px]` for large parent containers.
21. Use `rounded-[25px]` for child components.
22. Prefer `rounded-full` for buttons.
23. Let the AI choose suitable colors based on the project and theme.
24. Use `#f2f2f6` for light-mode gray backgrounds when a neutral gray background is needed.
25. `color-500` background uses `color-300` border when a border is required.
26. White backgrounds use `border-gray-300` when a border is required.
27. Black backgrounds prefer no border, or `border-gray-400` when required.
28. Buttons with background colors should not have borders.
29. Keep all text readable, especially product-card text.
30. Use `transition-all duration-500 ease-out` for interactive transitions.
31. Avoid excessive scroll and cursor animations.
32. Do not use fake reviews, fake metrics, fake ratings, or fake social proof.
33. Do not use emoji as UI icons.
34. Do not use AI generated imagery by default.
35. Do not add AI attribution labels by default.
36. Keep hero copy specific and meaningful.
37. SaaS navbar links use `uppercase`, `text-base` or `text-lg`.
38. SaaS navbar links should not receive background fills on hover or focus.
39. SaaS navbar blur uses `backdrop-blur-[50px]`.
40. Navbar height uses `h-12` or `h-14`.
41. Navbar inner controls are 2 Tailwind spacing units shorter than the navbar.
42. Never leave comments in the code.
43. Keep code clean and production-ready.
44. Keep the interface clean, compact, authentic, consistent, and readable.
