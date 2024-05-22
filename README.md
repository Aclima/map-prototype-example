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

You can clone this template from Github or using the create-next-app CLI.

### Github Template

Use the following [instructions](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) to create a new repository from this template.

### create-next-app

Create a clone of the repository with:

```bash
npx create-next-app@latest -e https://github.com/Aclima/map-prototype-example
```

Add a .env file and the necessary environment variables.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deploy on Vercel

The example app will be deployed on vercel automatically -- you'll see a link in github to preview deployments when you open a PR, and production will be deployed automatically on commits to `main`.

## Analytics

### Google Anaytics

Google Analytics is set up for the Prototype Template site, but follow the following [steps](https://support.google.com/analytics/answer/9304153?hl=en) to set it up for the prototype you are building from this template.

Once the property is set up in Google Analytics, copy the measurment ID. Add an environment variable to the Vercel project (settings -> environment variables) with the key `GA_TRACKING_ID` and the value of the measurement ID. The ID will be picked up in the next deployment.

### Mixpanel

`mixpanel-browser` is installed in the template but needs to be commented back in for usage. To use Mixpanel, follow these [instructions](https://docs.mixpanel.com/docs/orgs-and-projects/managing-projects#creating-projects) to create a new Mixpanel project.

Once you have a mixpanel project, copy the project token, and add it as an environment variable to your Vercel project under the key `MIXPANEL_PROJECT_TOKEN`. Uncomment the code in `_app.tsx` and `analytics.ts`. Use the `logEvent` function to log events to Mixpanel.
