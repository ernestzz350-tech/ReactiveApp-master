# Chef's Menu Manager

A mobile application built with **React Native (Expo) and expo-router** that lets a chef manage a restaurant menu: add, edit and delete dishes, search and filter the menu, and view menu statistics.

This is the final part of the Portfolio of Evidence (POE), building on the Part 2 application.


Then choose how to view the app:

| Key | Opens in |
| --- | --- |
| `w` | Web browser (easiest; press F12 and use the device toolbar for a phone view) |
| `a` | Android emulator (needs Android Studio) |
| `i` | iOS simulator (Mac only, needs Xcode) |
| QR code | Expo Go on a phone (same Wi-Fi; the Expo Go version must support SDK 57) |

---

## Features (mapped to the POE requirements)

### 1. Manage menu items
- **Edit / update:** tap **Edit** on a menu card. The Add tab opens pre-filled with the dish; change the details and tap **Save Changes**.
- **Delete:** tap **Delete** on a card and confirm in the dialog.
- Every change shows on the Menu tab immediately, together with a success message.

### 2. Search and filter
- Search dishes by **name** (case-insensitive, updates as you type).
- Filter by course using the chips: **All, Starter, Main Course, Dessert**.
- Search and filter work together. **Clear search & filter** shows every item again.
- A counter shows "Showing X of Y menu items".

### 3. Menu statistics (Stats tab)
- Total number of menu items
- Average price of all items
- Number of items in each course (Starter, Main Course, Dessert)
- Statistics update automatically whenever the menu changes.

### 4. Enhancements compared to Part 2
- **Reusable components:** `AppButton`, `FormField`, `CourseChips`, `MenuItemCard`, `SearchBar`, `StatCard`, `ConfirmDialog`, `NoticeBanner`, `ScreenContainer`.
- **Reusable functions** in `src/utils/menu-utils.ts`: `filterMenuItems`, `calculateStats`, `validateMenuForm`, `parsePrice`, `formatPrice`.
- **Shared state** in `src/context/menu-context.tsx`, so all screens use one source of truth.
- **Organised code:** types, utilities, context, components and screens are separated into their own folders.
- **Meaningful names** for variables and functions, with short comments on shared code.
- **Central theme** (`src/constants/theme.ts`) for colours, spacing and accent colours, with light and dark mode support.

### 5. User experience
- Three clearly labelled tabs: **Menu, Add, Stats**.
- Same look and feel on every screen (shared container, buttons, inputs, cards).
- **Validation with clear messages:**
  - dish name required (max 50 characters)
  - description required (max 200 characters)
  - a course must be selected
  - price required, must be a valid number (up to 2 decimals) and greater than zero
- **Feedback messages:** success banners after adding, updating and deleting (tap to dismiss, they also disappear automatically).
- Empty-state messages when the menu is empty or a search has no results.
- Delete confirmation dialog that works on both mobile and web.





## Assumptions and notes

- A menu item has: **name, description, course and price** (prices shown in rand, e.g. R85.00).
- The menu starts with five sample dishes so the features can be tried straight away.
- Data is kept **in memory**, so the menu resets when the app is restarted. Persistent storage (e.g. AsyncStorage or a database) could be added as a future improvement.
- Styling uses React Native `StyleSheet` objects (not CSS files). To change colours and spacing, edit `src/constants/theme.ts`; to change one component, edit the `styles` block at the bottom of its file.

---

## Technologies

- React Native 0.86 and Expo SDK 57
- expo-router (file-based navigation, tabs)
- TypeScript
