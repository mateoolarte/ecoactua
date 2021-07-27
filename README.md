# Ecoactua

This project is building currently with Nodejs, ExpressJS, Sequelize

## Getting started

Install dependencies from `client` and `server` projects

```bash
  yarn install
```

Run simultaneously `client` and `server` projects

```bash
  yarn dev
```

Create a `.env` file inside `server` folder with these variables:

```env
PORT=5000
JWT_TOKEN=mypasstoken
DATABASE_URL=postgres://localhost:5432/postgres
REACT_APP_API_GOOGLE_MAPS=API_KEY_GOOGLE
```
