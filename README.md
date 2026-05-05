# Strivora &middot; ![Status](https://img.shields.io/badge/status-in%20development-orange) ![License](https://img.shields.io/badge/license-MIT-blue) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

> A mobile app that helps you take control of your life — tasks, finances, personal statistics, and AI-powered advice in one place.

> [!WARNING]
> 🚧 This project is currently **under active development**. Features may be incomplete or subject to change. Contributions and feedback are welcome!

---

## Contents

- [About](#-about)
- [MVP Features](#-mvp-features)
- [Full Feature Set](#-full-feature-set)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Settings](#-settings)
- [Contributing](#-contributing)

---

## 📱 About

**Strivora** is a personal productivity app that brings together task management (including voice input), finance tracking, phone usage analysis, and personal statistics. Based on all this data, the app builds conclusions and gives personalized advice on improving your schedule and habits.

---

## ✅ MVP Features

### 1. Tasks
- Create tasks by text or voice
- Assign to time horizons: tomorrow, week, month, year, or a specific date
- After voice recording — a transcription is shown with the ability to edit it
- AI-powered automatic time horizon suggestion based on task content

### 2. Finances
- Manual input of income and expenses
- Expenses: shown for today and for the current month
- Income: shown for the current month
- Animated charts and graphs
- Basic bank integration (NFC reading, receipt photo, or screenshot)

### 3. Personal Statistics *(basic)*
- User profile breakdown by week, month, and year
- Built on top of completed tasks and financial data

---

## 🗺 Full Feature Set

| # | Feature | Description |
|---|---------|-------------|
| 1 | Tasks | Voice + text input, smart date suggestion |
| 2 | Finances | Animated charts, bank integrations, NFC, receipt photo |
| 3 | Personal Stats | User characteristic for any time period |
| 4 | Phone Screen Time | App usage analysis (TikTok etc.), daily conclusion |
| 5 | AI Advice | Recommendations on schedule, tasks, finances, and activity |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.81.5 | Core framework |
| Expo | ~54.0 | Build platform |
| Expo Router | ~6.0 | File-based navigation |
| Zustand | ^5.0 | Global state management |
| React Native Reanimated | ~4.1 | Animations |
| React Native SVG | 15.12 | Charts & graphics |
| i18next | ^26.0 | Internationalization |
| MMKV | ^4.3 | Local storage |
| TypeScript | ^5.9 | Type safety |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | ^11.0 | Core framework |
| Prisma | ^7.6 | ORM / database layer |
| PostgreSQL | — | Database |
| JWT + Passport | — | Authentication |
| bcrypt | ^6.0 | Password hashing |
| Winston | ^3.19 | Logging |
| TypeScript | ^5.7 | Type safety |

---

## 📁 Project Structure

```
strivora-mobile/
├── Frontend/                   # React Native / Expo app
│   ├── app/                    # Screens (file-based routing)
│   ├── components/             # Reusable UI components
│   ├── store/                  # Zustand stores
│   ├── hooks/                  # Custom hooks
│   ├── constants/              # Colors, sizes, etc.
│   └── package.json
│
├── Backend/                    # NestJS REST API
│   ├── src/
│   │   ├── auth/               # Authentication
│   │   ├── tasks/              # Tasks module
│   │   ├── finance/            # Finance module
│   │   └── main.ts
│   ├── prisma/                 # Database schema & migrations
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

1. [Git](https://git-scm.com/downloads)
1. [Node.js](https://nodejs.org/) *(version 18 or greater)*
1. [Expo Go](https://expo.dev/go) on your phone *(for testing)*
1. PostgreSQL running locally or in the cloud

### Frontend

1. `cd Frontend` to go into the frontend directory
1. Run `npm install` to install dependencies
1. Run `npm start` to start the Expo dev server
1. Scan the QR code in Expo Go or run in a simulator:

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
```

### Backend

1. `cd Backend` to go into the backend directory
1. Run `npm install` to install dependencies
1. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

1. Apply database migrations:

```bash
npx prisma migrate dev
```

1. Start the development server:

```bash
npm run start:dev
```

---

## ⚙️ Settings

| Setting | Description |
|---------|-------------|
| Region | For correct currency and finance display |
| Name & Date of Birth | Personalization |
| Language | App interface language |
| Status | Work, family, studies |
| Notifications | Push notification preferences |
| Bank Connections | Link your bank accounts |
| FAQ | Frequently asked questions |
| Sign Out | Login via Google account |

---

## 👏 Contributing

### Create a branch

1. `git checkout main` from any folder in your local repository
1. `git pull origin main` to ensure you have the latest code
1. `git checkout -b the-name-of-my-branch` to create a branch
   > replace `the-name-of-my-branch` with a suitable name, such as `feature/voice-input`

### Make your changes

1. Follow the [Getting Started](#-getting-started) instructions
1. Make your changes and test them on device or simulator

### Push it

1. `git add . && git commit -m "your message"` to stage and commit your changes
1. `git push origin the-name-of-my-branch`
1. Open a Pull Request on GitHub and describe your changes

---

## 📄 License

Strivora is [MIT licensed](./LICENSE).