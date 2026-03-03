# Caffeine Tracker — Design System

## Product Context
A personal caffeine intake tracker. Single-page web app with a grid showing dates (Y-axis) x hours (X-axis). Users click cells to log caffeine intake. The grid uses heatmap-style coloring (like GitHub contribution graphs) to show consumption intensity.

## Key Page: Main Dashboard (only page)
- Full-width caffeine grid
- Simple header with app title
- Dates run down the left side (Y-axis), most recent at top
- Hours 0-23 run across the bottom (X-axis)
- Daily totals in rightmost column
- Hourly totals in bottom row
- Clicking a cell opens a simple add-intake modal

## Visual Direction: Data-Focused Dashboard
- Clean, minimal chrome — the grid IS the product
- High information density
- Heatmap cells inspired by GitHub contribution graph
- Light background with colored cells for data

## Color Palette
- Background: #FAFAFA (off-white)
- Surface/cards: #FFFFFF
- Borders: #E5E7EB (light gray)
- Text primary: #111827 (near black)
- Text secondary: #6B7280 (gray)
- Heatmap scale (caffeine intensity):
  - Empty/zero: #EBEDF0 (lightest gray)
  - Low (1-74mg): #9BE9A8 (light green)
  - Medium (75-149mg): #40C463 (green)
  - High (150-249mg): #30A14E (dark green)
  - Very high (250mg+): #216E39 (darkest green)
- Accent/interactive: #2563EB (blue)
- Totals background: #F3F4F6

## Typography
- Font: Inter (system fallback: -apple-system, sans-serif)
- Header: 20px semibold
- Grid labels (dates, hours): 12px medium, text-secondary
- Cell values: 11px medium
- Totals: 12px bold

## Grid Specifications
- Cell size: ~44px square (touch-friendly)
- Cell border-radius: 3px (like GitHub squares)
- Cell gap: 3px
- Date column width: 100px
- Hour labels: centered below each column
- Total column/row: slightly wider, bold text, subtle background

## Spacing
- Page padding: 24px
- Header margin-bottom: 16px
- Grid container: full available width, horizontally scrollable

## Modal (Add Intake)
- Centered overlay with backdrop blur
- White card, rounded-lg, shadow-xl
- Compact form: date (readonly), time, amount input
- Single primary action button (blue)

## Layout Structure
- No sidebar, no complex navigation
- Simple top bar: app title left-aligned, minimal
- Main content: the caffeine grid, taking up remaining viewport
- Grid scrolls both horizontally (24 hours) and vertically (30 days)
