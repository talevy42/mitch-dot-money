# ryu.money

## Quick Start

Edit vars in src/config.js
Change names and possibly the description in public/index.html
Edit public/manifest.json

```
npm install
npm start
```

## Utilities

Convert donors CSV to JSON. Assumes CSV is saved at `csv/donors.csv`:

```
make convert-donors-csv
```

Build latest and deploy on server:

```
make deploy
```

## Set up Google Analytics tracking

Create `.env.development.local` and `.env.production.local` files containing tracking IDs. See example files `.env.development.local.example` and `.env.production.local.example`.
