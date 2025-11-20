# Canadian Immigration Patterns and Languages Visualization Project

## Project Overview

This project explores Canadian immigration patterns in major cities, with a focus on the languages spoken by immigrant communities. By combining demographic and linguistic datasets, it provides a visual narrative of how immigrant communities cluster across Canada's key urban centers, highlighting the unique cultural and linguistic profiles of each city.

### Live Deployment

- AWS: http://16.52.46.206/
- Render: https://five20-project-safari-chiru-dunbar.onrender.com/

## Selected cities 

| Region                | Cities           |
| --------------------- | ---------------- |
| Atlantic / East       | Halifax          |
| Central / Francophone | Montreal         |
| Central / Anglophone  | Toronto          |
| Prairies              | Calgary/Edmonton |
| Pacific / West        | Vancouver        |

## Screenshots

Below are previews of the project interface showing the landing (Hero) section and the interactive Data Explorer.

### Hero Section

<img src="./assets/HeroSection.png" alt="Hero Section Screenshot" width="800"/>

### Data Explorer

<img src="./assets/DataExplorer.png" alt="Data Explorer Screenshot" width="800"/>

## Setup Instructions

### Prerequisites
- **Node.js**
- **npm**
- **MongoDB Atlas account** or a local MongoDB instance

---

### 1. Clone the Repository

```bash
git clone https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar.git
cd 520-project-safari-chiru-dunbar
```
---

### 2. Install Dependencies

From the project root:

```bash
npm install
```

---

### 3. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example server/.env
```

Edit `.env` to include your MongoDB database name and connection string.
Copy the complete `.env` into the directory with the database seeding script:

```bash
cp server/.env server/db/utils/.env
```

---

### 4. Seed the Database

Seed your MongoDB database with the project data:

```bash
node server/db/utils/seed.mjs
```

---

### 5. Build the Project

From the root directory, build the frontend for production:

```bash
npm run build
```

---

### 6. Start the Production Server

```bash
npm run start
```

The server will start on http://localhost:3000/index.html

---

### 7. Optional: Development Mode

If you’d like to run the backend and frontend separately during development:

```bash
# In one terminal (backend)
cd server
npm run dev

# In another terminal (frontend)
cd client
npm run dev
```

- Frontend (Vite) will run on: http://localhost:5173
- Backend API runs on: http://localhost:3000
- Visit http://localhost:3000/docs for the API route documentation.

## Attributions

### Dataset Sources

- **Custom 2021 Census Immigration Data**: [Statistics Canada](https://www150.statcan.gc.ca/t1/tbl1/en/cv!recreate.action?pid=9810034901&selectedNodeIds=1D12,1D37,1D100,1D123,1D126,1D166,4D1&checkedLevels=1D1,2D1,4D5,5D1,5D2&refPeriods=20210101,20210101&dimensionLayouts=layout3,layout3,layout3,layout3,layout3,layout3,layout2&vectorDisplay=false) - [Licensed under the Open Government Licence - Canada.](https://open.canada.ca/en/open-government-licence-canada)
- **Custom 2021 Census Language Data**: [Statistics Canada](https://www150.statcan.gc.ca/t1/tbl1/en/cv!recreate.action?pid=9810019201&selectedNodeIds=4D4,4D5,4D7,4D115,4D127,4D145,4D149,4D159,4D177,4D178,4D184,4D187,4D197,4D203,4D214,4D218,4D219,4D220,4D229,4D233,4D242,4D243,4D248,4D249,4D250,4D251,4D254,4D255,4D294,4D298,4D317,4D324&checkedLevels=0D3,0D4,1D1,2D1,4D1&refPeriods=20210101,20210101&dimensionLayouts=layout3,layout3,layout3,layout3,layout3,layout2&vectorDisplay=false) - [Licensed under the Open Government Licence - Canada.](https://open.canada.ca/en/open-government-licence-canada)

### Visual Asset Sources

- **Canada SVG Icon**: [svgrepo.com](https://www.svgrepo.com/svg/406564/maple-leaf)
- **Map of Canada Image**: [fla-shop.com/svg/canada](https://www.fla-shop.com/svg/canada/)

### External Libraries

#### Client (Frontend)

- **Data Visualization**: [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)
- **Lazy Loading**: [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer)

#### Server (Backend)

- **CSV Parsing**: [csv-parse](https://www.npmjs.com/package/csv-parse)

### Code Reference Sources

- **Dependency Injection Reference**: [Stack Overflow](https://stackoverflow.com/questions/75843342/typeerror-es-modules-cannot-be-stubbed-sinon)
- **Execution Guarding Reference**: [Stack Overflow](https://stackoverflow.com/questions/57838022/detect-whether-es-module-is-run-from-command-line-in-node)
- **CI Rules**: Jaya’s Assignment 2 repository
- **ESLint Rules**: Jaya’s Assignment 2 repository
- **Database Class**: Jaya’s Exercise 8.2 solution code

### AI Assistance

- **ChatGPT - Assisted with**:
  - Regex pattern creation.
  - Refining CSS styling.
  - Initial creation of Swagger JSDoc comments *(all information double checked/manually refined)*.
  - Polishing up text presented to users *(all information given was double checked)*.