<picture class="github-only">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/75e522ad-09c9-4d2e-99b4-bd6f6ea158b7">
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/75e522ad-09c9-4d2e-99b4-bd6f6ea158b7">
  <img alt="KO'DJ Logo" src="https://github.com/user-attachments/assets/75e522ad-09c9-4d2e-99b4-bd6f6ea158b7" width="15%">
</picture>

<div>
  <br>
</div>

<div align="left"> 
 <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> 
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ant_Design-0170FE?style=flat-square&logo=ant-design&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</div>

<div>
  <br>
</div>

KO'DJ - ya'ni Koreyadagi O'zbek Dasturchilar Jamiyati bo'lib KO'DJ web sahifasi orqali dev uchrashuvlar, uchrashuvlarni topish va ularga ro'yhatdan o'tish va uchrashuvlar bo'yicha sarhisoblarni yoritib boruvchi va KO'DJ jamiyatini ravnaqi yo'lida xizmat qiluvchi web safiha hisoblanadi.

## 🚀 Getting Started

### Prerequisites

- npm (v8 or higher)
- Node.js (v18 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/kodjdev/kodj_web_react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application in Vite's dev server.

## 🕹️ Main Features

- **Events**: Browse and register for developer meetups and events
- **News**: Stay updated with the latest community news
- **Home**: Community overview and highlights
- **About**: Information about KO'DJ community and its mission and purpose
- **Speakers**: Form to apply as a speaker for events
- **Login/Authentication**: Secure user authentication

## 🔧 Technical Stack

### Frontend Architecture:

- **[Atomic Design Principles](https://atomicdesign.bradfrost.com/chapter-2/)**: We follow `Brad Frost's methodology` for component hierarchy:
    - **Atoms**: Fundamental UI components like buttons, inputs, and labels that serve as the building blocks
    - **Molecules**: Simple groups of UI elements functioning together (search forms, menu items)
    - **Organisms**: Complex UI components composed of molecules and atoms that form distinct sections of the interface
    - **Templates**: Page-level structures that arrange organisms into layouts
    - **Pages**: Specific instances of templates with real content representing the final UI

Based on our project structure and requirements, we have implemented the `Atomic Design Principles` to ensure a modular and scalable architecture but with a slightly different approach to make sure the project is easy to understand and maintain.

### Frontend Core:

- <img src="https://reactjs.org/favicon.ico" width="20" height="20" alt="React" valign="middle"> **React 18**
- <img src="https://www.typescriptlang.org/favicon-32x32.png" width="20" height="20" alt="TypeScript" valign="middle"> **TypeScript**
- <img src="https://vitejs.dev/logo.svg" width="20" height="20" alt="Vite" valign="middle"> **Vite**
- <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" width="20" height="20" alt="Ant Design" valign="middle"> **Ant Design**
- <img src="https://styled-components.com/logo.png" width="20" height="20" alt="Styled Components" valign="middle"> **Styled Components**
- <img src="https://user-images.githubusercontent.com/7850794/164965523-3eced4c4-6020-467e-acde-f11b7900ad62.png" width="20" height="20" alt="Framer Motion" valign="middle"> **Framer Motion**
- <img src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" width="20" height="20" alt="React Hook Form" valign="middle"> **React Hook Form**

### State Management & Data Fetching

- **Recoil**: Atomic state management
- **Axios**: HTTP client

### Internationalization

- **i18next**: Internationalization for language support
- **react-i18next**: React integration for i18next

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript-ESLint**: TypeScript-specific linting

## 📁 Project Structure

```
kodj_web_react/
├── cypress/           # End-to-end testing
├── node_modules/
├── src/               # Application source code
│   ├── @types/        # i18n types
│   ├── atoms/         # Recoil atoms
│   ├── components/    # Atom, Molecule, and Organism components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Error/     # Error handling components
│   │   ├── Event/
│   │   ├── Footer/
│   │   └── ...
│   ├── context/       # React contexts
│   ├── i18n/          # i18n configuration
│   ├── utils/         # Constants and utils functions
│   ├── static/        # Static assets
│   ├── hooks/         # Custom React hooks
│   ├── i18n/          # Internationalization
│   ├── pages/         # Application pages
│   │   ├── About/
│   │   ├── Events/
│   │   ├── Home/
│   │   └── ...
│   ├── tools/         # Predefined Colors and Styles
│   └── router/        # Routing configuration
└── vite.config.ts     # Vite configuration
```

## 🔄 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## 📚 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Lint code with ESLint
npm run format      # Format code with Prettier
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/comment-feature`)
3. Commit your changes (`git commit -m 'feat: added real time commenting feature'`)
4. Push to the branch (`git push -u feature/comment-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
