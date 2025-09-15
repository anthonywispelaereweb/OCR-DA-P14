# HRnet React

Une application de gestion des employés moderne développée en React avec Vite, permettant de créer et de consulter les employés d'une entreprise.

## 📋 Description

HRnet est une application web de gestion des ressources humaines qui permet de :
- Créer de nouveaux employés avec leurs informations personnelles et professionnelles
- Consulter la liste des employés existants
- Gérer les données d'adresse et de département

Cette application remplace l'ancienne version jQuery par une version moderne en React, offrant une meilleure performance et une meilleure expérience utilisateur.

## 🚀 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour construire l'interface utilisateur
- **Vite** - Outil de build rapide et serveur de développement
- **React Router** - Gestion de la navigation entre les pages
- **Redux Toolkit** - Gestion d'état globale de l'application
- **React-Redux** - Intégration de Redux avec React

- **ESLint** - Linting du code pour maintenir la qualité

## 📁 Structure du projet

```
OCR-DA-P14/
├── AnalyseLighthouse/
│   ├── AppJquery/
│   │   ├── formulaire-app-jquery.pdf
│   │   ├── formulaire.json
│   │   ├── hrnet-employee-list-app-jquery.pdf
│   │   └── hrnet-employee-list.json
│   └── AppReact/
│       ├── formulaire-app-react.pdf
│       ├── formulaire.json
│       ├── hrnet-employee-list-app-react.pdf
│       └── hrnet-employee-list.json
├── cypress/
│   ├── e2e/
│   │   └── createEmployee.cy.js
│   ├── fixtures/
│   │   └── example.json
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── downloads/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── routing.jsx
│   ├── assets/
│   ├── components/
│   │   ├── AppDatePicker.jsx
│   │   ├── AppInput.jsx
│   │   ├── AppSelectGeneric.jsx
│   │   └── AppTable.jsx
│   ├── __tests__/
│   │   ├── AppDatePicker.test.jsx
│   │   ├── AppInput.test.jsx
│   │   └── AppSelectGeneric.test.jsx
│   ├── pages/
│   │   ├── CreateEmployeesPage/
│   │   │   └── index.jsx
│   │   ├── CurrentEmployeesPage/
│   │   │   └── index.jsx
│   │   └── Errors/
│   │       └── index.jsx
│   ├── store/
│   │   ├── employeesSlice.js
│   │   └── store.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── initalData.js
├── cypress.config.js
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── setupTests.ts
└── vite.config.js
```

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/anthonywispelaereweb/OCR-DA-P14.git
cd OCR-DA-P14
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez votre navigateur sur `http://localhost:5173`

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎯 Fonctionnalités

### Page de création d'employé
- Formulaire complet avec validation
- Champs obligatoires : prénom, nom, date de naissance, date de début, adresse complète, département
- Validation côté client et serveur
- Réinitialisation automatique après soumission
- États réactifs avec React hooks

### Page de consultation des employés
- Liste complète des employés créés
- Tableau responsive avec toutes les informations
- Compteur d'employés
- Navigation facile entre les pages
- Données récupérées depuis le store Redux

### Navigation
- Routing avec React Router
- Pages d'erreur gérées
- Interface utilisateur intuitive

## 🔧 Configuration

### Redux Store
Le projet utilise Redux Toolkit pour la gestion d'état :
- Store centralisé pour les employés
- Actions : ajout, suppression, mise à jour d'employés
- Selectors pour récupérer les données
- Intégration avec React via React-Redux

### Vite
Le projet utilise Vite avec la configuration suivante :
- Plugin React avec Fast Refresh
- Hot Module Replacement (HMR)
- Build optimisé pour la production

### ESLint
Configuration ESLint incluse pour maintenir la qualité du code :
- Règles React recommandées
- Détection des hooks React
- Standards de code JavaScript modernes

## 🌟 Améliorations par rapport à l'ancienne version

- **Performance** : React et Vite offrent des temps de chargement plus rapides
- **Maintenabilité** : Code modulaire et composants réutilisables
- **Gestion d'état** : Redux pour une gestion centralisée et prévisible des données
- **Expérience développeur** : Hot reload, debugging amélioré avec Redux DevTools
- **Moderne** : Utilisation des dernières technologies web
- **Validation** : Validation de formulaire robuste côté client
- **Persistance** : Les employés créés sont stockés dans le store Redux

## 🚀 Déploiement

Pour déployer l'application :

1. Construisez le projet :
```bash
npm run build
```

2. Le dossier `dist` contient les fichiers prêts pour la production

## 🤝 Contribution

Ce projet fait partie du parcours de formation OpenClassrooms "Développeur d'Applications JavaScript React".

## 📄 Licence

Ce projet est développé dans un cadre éducatif pour OpenClassrooms.

## 👨‍💻 Auteur

**Anthony Wispelaere**
- GitHub: [@anthonywispelaereweb](https://github.com/anthonywispelaereweb)

---

*Projet 14 - Faites passer une librairie jQuery vers React - OpenClassrooms*
