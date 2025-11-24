# 🎓 StudyLodz – Your Student Essentials

Welcome to **StudyLodz**, a mobile application designed for every student in Łódź! 🇵🇱 This app aims to be your main source of information and guidance for navigating student life, from academic matters to social activities.

## 📜 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Available Scripts](#-available-scripts)

## 🌟 About the Project

### Theme and Purpose

The main goal of the **"Study in Łódź"** app is to create a central, easily accessible source of information for students in Łódź. Its purpose is to simplify adapting to a new academic and city environment and make everyday student life easier.

### Why Was This App Created?

The idea for the app came from observing the challenges students face, especially those coming to Łódź from other cities. Information about universities, city life, available discounts, scholarships, or cultural events is often scattered across many sources. The "Study in Łódź" app was created to solve this problem by aggregating all essential information in a single, intuitive mobile platform.

### Who Is This App For?

The app is designed for:

* **Prospective students:** Helps choose the right university and study program in Łódź.
* **New students:** Serves as a guide and assistant during the first weeks and months in a new city.
* **Current students:** Provides easy access to information about discounts, events, scholarships, and academic life, helping students make the most of what Łódź has to offer.

## ✨ Features

* 🏠 **Home Screen:** Your command center for quick access to all app features.
* 📖 **University Guide:** A comprehensive guide to universities in Łódź.
* 🏙️ **About Łódź:** Explore the city, its attractions, and why it’s a great place to study.
* 💰 **Scholarships & Student Life:** Find information about available scholarships and student life tips.
* 💸 **Cost of Living Calculator:** Estimate your monthly expenses with our handy calculator.
* 🏷️ **Student Discounts:** A database of places offering student discounts.

## 🚀 Tech Stack

The project uses modern technologies to ensure the best user experience:

* **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Routing:** [Expo Router](https://expo.github.io/router/)
* **Navigation:** [React Navigation](https://reactnavigation.org/)
* **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* **Icons:** [Lucide React Native](https://lucide.dev/) & [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
* **Styling:** StyleSheet, Expo Linear Gradient
* **Linting:** [ESLint](https://eslint.org/)

## 📂 Project Structure

The project has a clear and scalable folder structure that makes development and maintenance easier:

```
StudyInLodz/
├── app/                # Main app logic and file-based routing
│   ├── (tabs)/         # Screens available in the bottom navigation
│   │   ├── index.tsx   # Home screen
│   │   ├── study.tsx   # University guide
│   │   ├── lodz.tsx    # About Łódź
│   │   ├── scholarship.tsx # Scholarships & student life
│   │   ├── costs.tsx   # Cost calculator
│   │   └── discounts.tsx # Student discounts
│   └── _layout.tsx     # Main app layout
├── assets/             # Images, fonts, and other static resources
├── components/         # Reusable UI components
├── constants/          # Constants (themes, university data, etc.)
├── hooks/              # Custom React hooks
└── ...                 # Configuration files
```

## 🏁 Getting Started

Follow these steps to run a local copy of the project.

### Requirements

Make sure you have [Node.js](https://nodejs.org/) (LTS version) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1. Clone the repository (if you haven’t already):

   ```sh
   git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
   cd StudiujWLodzi
   ```
2. Install all project dependencies:

   ```sh
   npm install
   ```

### Running the App

After installing dependencies, you can start the app:

```sh
npm start
```

This will open the Expo developer tools in your browser. Then you can run the app on:

* Android emulator or device (requires Android Studio)
* iOS simulator or device (requires Xcode on macOS)
* Web browser

## 📜 Available Scripts

The following scripts are available in the project:

* `npm start`: Starts the Expo development server.
* `npm run android`: Runs the app on an Android emulator/device.
* `npm run ios`: Runs the app on an iOS simulator/device.
* `npm run web`: Runs the app in a web browser.
* `npm run lint`: Runs ESLint to find and fix code issues.
* `npm run reset-project`: Resets the project state (custom script).
