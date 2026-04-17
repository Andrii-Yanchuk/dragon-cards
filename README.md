# Dragon Cards

Dragon Cards is a small React + TypeScript betting game where you rearrange a row of dragon cards, place a bet, and reveal the top row to see how many positions you matched.

![Screenshot](/public/images/screenshot.png)

## How It Works

- Drag the bottom row to arrange the dragons in your predicted order.
- Choose a bet amount and a risk level.
- Start the round and watch the top row flip one card at a time.
- Matching slots award their multiplier.
- If any matched slot lands on `LOST`, the round pays out `0`.

## Features

- Drag-and-drop card ordering with `@dnd-kit`
- Four risk presets: `Low`, `Medium`, `High`, and `Classic`
- Animated card reveal flow
- Sound effects for round start, card flips, wins, and losses
- Persistent balance and settings with Zustand
- Responsive layout for desktop and smaller screens

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- `@dnd-kit`
- `use-sound`

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run In Development

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` runs TypeScript checks and creates a production build
- `npm run lint` runs ESLint
- `npm run preview` serves the built app locally

## Project Structure

```text
src/
  components/        UI building blocks and game sections
  components/cards/  card rows, drag-and-drop card, multiplier grid
  constans/          static dragon card data
  lib/               Zustand game state and round logic
  types/             shared TypeScript types
```

## Game State

The core game logic lives in `src/lib/gameStore.ts` and manages:

- balance and bet amount
- risk selection and multipliers
- shuffled top row and player order
- round reveal timing
- payout calculation
- persisted sound and balance settings

## Notes

- Balance and some settings are persisted in local storage.
- The project currently uses local image and audio assets from the repo.
