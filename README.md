# HealthMate — Daily tracking and SQLite checkpoint

HealthMate is a mobile health-record coursework project built with React Native, Expo and TypeScript.

## Repository history

This repository began with an existing local Welcome/navigation checkpoint. This checkpoint imports the existing Home dashboard, Add Record form and SQLite storage from the saved Step 3 milestone. The full application had already progressed further locally. Commit dates record when imports, reviews and subsequent changes are committed.

The daily-entry and database source is retained from that saved milestone. Home incorporates the later dashboard layout and the blue hydration/red calorie gradients. Its cards and goal banner open the existing Add Record form, which also updates a saved date. The existing Expo SDK 58 configuration and dependency lockfile are retained so this checkpoint can run independently.

AI assistance was used to generate substantial parts of the initial application code and to assist with setup and troubleshooting. Personal review, changes and device testing should be recorded as they are actually completed, in line with the coursework's AI policy.

## Current scope

- Welcome screen with the HealthMate logo and heart illustration.
- Typed navigation between Welcome, Home and Add Record.
- Home dashboard showing today's saved steps, calories burned and water intake.
- Redesigned greeting, large open steps ring, goal banner and Add today's activity button.
- Blue hydration and red calorie gradient cards, with hydration displayed in litres on Home.
- An Add Record form with a native date picker and whole-number validation.
- Local SQLite storage in `healthmate.db`.
- One record per date; saving the same date updates its daily totals and retains its identifier.
- Loading and error states, retry actions and a Home refresh after saving.
- Shared components, green styling, default device fonts and safe-area handling.

This checkpoint contains Welcome, Home and Add Record. History, Daily Record, the separate Edit Record screen and the Home/History bottom navigation belong to the next screen import. Steps and calories are entered manually. Water is entered and stored in millilitres, while Home displays litres; 2,300 ml is shown as 2.3 L. The fixed display targets of 10,000 steps and 2,500 ml are interface defaults for the assignment.

## Run locally

Use Node.js and npm compatible with the existing Expo SDK 58 project, and Android Expo Go with SDK 58 support.

From the folder containing `package.json`:

```powershell
npm ci
npm run typecheck
npm run lint
npx expo start --clear
```

Open the QR code in Expo Go. Tap Get Started, then Add today's activity. After saving, Home reloads the selected day's totals when that day is today. Past dates can be reviewed by selecting them again in Add Record.

## Source organisation

| Path | Responsibility |
| --- | --- |
| `src/navigation` | Typed routes and the three-screen navigator. |
| `src/features/welcome` | Welcome screen. |
| `src/features/records/HomeScreen.tsx` | Today's dashboard and the Add/Update activity action. |
| `src/features/records/AddRecordScreen.tsx` | Form, calendar and validation feedback. |
| `src/features/records/hooks` | Form state, database reads, save logic and loading/error states. |
| `src/features/records/data/recordRepository.ts` | Parameterised SQLite reads and saves. |
| `src/database` | Connection setup, table constraints and insert-or-update SQL. |
| `src/features/records/components` | Metric cards, numeric inputs and progress ring. |
| `src/components`, `src/hooks`, `src/utils`, `src/theme` | Shared presentation, clock updates, local date helpers and colours. |

## Device review

On Android, check saving today's values, updating the same date, selecting a past date, rejecting invalid values and retaining records after closing and reopening the same project. Record actual results only after performing the checks. Compiler, database and bundle checks do not replace device interaction tests.

## Design and documentation

- User-supplied Figma design: <https://www.figma.com/design/eLtmASnJXWFFdpqCQWKcjh/Untitled>
- Expo SDK 58: <https://docs.expo.dev/versions/v58.0.0/>
- Expo SQLite: <https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/>
- React Navigation setup: <https://reactnavigation.org/docs/getting-started/>
