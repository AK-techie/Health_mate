# HealthMate — Welcome and navigation checkpoint

HealthMate is a mobile health-record coursework project built with React Native, Expo and TypeScript.

## Repository history

This repository begins with an existing local Welcome/navigation checkpoint. The application had already progressed further locally before this checkpoint was prepared for GitHub. This is a staged import and review of that work. Commit dates record when imports, reviews and subsequent changes are committed.

The screen source in this checkpoint comes from the earlier Welcome/navigation milestone. Project configuration, launcher icons and the dependency lockfile have been assembled so the checkpoint can run independently with the existing project's Expo SDK 58 environment.

AI assistance was used to generate substantial parts of the initial application code and to assist with setup and troubleshooting. Personal review, changes and device testing should be recorded as they are actually completed, in line with the coursework's AI policy.

## Current scope

- Welcome screen with the HealthMate logo and heart illustration.
- Get Started button.
- Typed React Navigation stack containing Welcome and Home.
- A Home placeholder displaying “Your daily health journey starts here.”
- Shared colours, a reusable button, safe-area handling and default device fonts.

The dashboard, forms, SQLite CRUD and history screens belong to later local checkpoints. The dependency list is retained from the existing SDK 58 project, so it includes packages used by those later features as well.

## Run locally

Use Node.js and npm compatible with the existing Expo SDK 58 project, and Android Expo Go with SDK 58 support.

From the folder containing `package.json`:

```powershell
npm ci
npm run typecheck
npm run lint
npx expo start --clear
```

Open the QR code in Expo Go. Welcome should appear first, and Get Started should open the Home placeholder.

## Source files

| File | Purpose |
| --- | --- |
| `App.tsx` | Sets up the safe-area provider, status bar and navigator. |
| `src/navigation/AppNavigator.tsx` | Registers the two checkpoint routes. |
| `src/navigation/types.ts` | Defines valid route names and parameters. |
| `src/features/welcome/WelcomeScreen.tsx` | Displays the Welcome layout and button. |
| `src/features/records/HomeScreen.tsx` | Provides the Home navigation destination. |
| `src/components/PrimaryButton.tsx` | Shared gradient button with typed props. |
| `src/theme/colors.ts` | Shared colour values. |

## Testing and evidence

Use `docs/welcome-test-record.md` to record your own actual device results. Fill it in after performing each check. Local compiler and bundle checks do not replace a phone interaction test.

## Design and documentation

- User-supplied Figma design: <https://www.figma.com/design/eLtmASnJXWFFdpqCQWKcjh/Untitled?node-id=7-76>
- Expo SDK 58: <https://docs.expo.dev/versions/v58.0.0/>
- React Navigation setup: <https://reactnavigation.org/docs/getting-started/>
- React Navigation TypeScript: <https://reactnavigation.org/docs/typescript/>

See `TODAY_IMPORT_GUIDE.md` for the Windows folder, testing, commit and GitHub publishing steps.
