# Eventra Design System Guidelines

## 1. Color Palette (Tailwind Configuration)
To avoid generic AI/Bootstrap layouts, Eventra uses a vibrant, modern, and high-contrast color scheme:

- **Primary (Action & Highlights):** Coral/Tangerine (`#FF5A36` -> `tailwindcss: orange-600` equivalent or custom)
- **Secondary/Text:** Deep Charcoal (`#1F2937` -> `tailwindcss: gray-800`)
- **Background Base:** Soft Light Gray (`#F9FAFB` -> `tailwindcss: gray-50`)
- **Card/Surface Background:** Pure White (`#FFFFFF`)
- **Success/Valid Accent:** Emerald (`#10B981` -> `tailwindcss: emerald-500`)

## 2. Typography & Hierarchy
- **Font Family:** Inter / Sans-serif (Clean, modern, highly readable).
- **Headings (Titles, Event Names):** Bold or Extra Bold (`font-bold` / `font-extrabold`), Deep Charcoal color, slightly tighter letter spacing (`tracking-tight`).
- **Body Text:** Regular or Medium (`font-normal` / `font-medium`), Light Charcoal (`text-gray-600`) for secondary text.

## 3. Component Style Rules (Anti-Generic UI)
- **Borders & Corners:** Use soft rounded corners (`rounded-xl` or `rounded-2xl`). Avoid sharp corners or overly rounded pill shapes for main cards.
- **Shadows:** Use subtle, soft shadows (`shadow-sm` or custom low-opacity shadows). Avoid heavy dark borders or high-contrast box shadows.
- **Buttons (Call to Action):** 
  - Primary ("Book Ticket", "Publish Event"): Solid Primary Color, white text, bold, with a subtle scale-up effect on hover (`hover:scale-[1.02] transition-transform`).
  - Secondary ("Cancel", "Save Draft"): Outline or soft gray background, never dark or fully colored.
- **Tables & Dashboards:** Clean borderless look with light gray dividers (`divide-y divide-gray-100`). Header rows should use a very soft tint of gray or primary color.

## 4. UI States Guidelines
- **Empty States (e.g., "No Events Found"):** Centered minimalist custom illustration or icon, soft gray text, and a primary action button right below it to keep the user engaged.
- **Error States:** Soft pastel red background with deep red text (`bg-red-50 text-red-700`), rounded-lg, with clean iconography. Avoid harsh, bright red alert boxes.