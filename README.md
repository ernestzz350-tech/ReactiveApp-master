# Chef's Menu Manager

React Native (Expo + expo-router) app for a chef to manage a restaurant menu.

Run: `npm install` then `npx expo start`.

## Structure
- `src/app/` – screens: `index` (menu list, search, filter, edit, delete), `add` (add / edit form), `stats` (menu statistics)
- `src/components/` – reusable UI (buttons, form fields, cards, dialogs, banners, chips)
- `src/context/menu-context.tsx` – shared menu state (add / update / delete) and success messages
- `src/utils/menu-utils.ts` – reusable pure functions: filtering, statistics, validation, price formatting
- `src/types/menu.ts` – shared types and course list
