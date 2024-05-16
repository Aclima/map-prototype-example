This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The goal of this repo is to be a template that can be cloned and modified to provide a good standard base for geospatial product prototypes. To that end we've included some example code and set up what we think are reasonable defaults for:
- a map & map layers
- charts
- mobile-first styling
- a component library
- linting
- fetching data
- analytics
- filtering

## Getting Started
Make sure you have node 18 installed. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage npm versions, but you can also install node 18 [here](https://nodejs.org/en/download/package-manager).

Install the project dependencies:
```bash
npm i
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel
The example app will be deployed on vercel automatically -- you'll see a link in github to preview deployments when you open a PR, and production will be deployed automatically on commits to `main`.
