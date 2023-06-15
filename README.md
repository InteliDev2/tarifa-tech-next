# tarifa-tech-next

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the (UI) development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

After that run the Express server:

```bash
npm run server
```

Also we use MongoDB Database, so we need to create DB at [MongoDB website](https://account.mongodb.com/account/login), then you may create free shared Cluster. To connect to the DB we need to use MongoDB Compass, while installation you will have such string mongodb+srv://username:password@cluster0.xduyh.mongodb.net/, here username and password the same that you used when you were configuring MongoDB Cluster. Finally create and place .env file in the server directory and add the following variable DATABASE_URL=mongodb+srv://username:password@cluster0.xduyh.mongodb.net/ replacing with your credentials. 

Next, open [http://localhost:3000](http://localhost:3000) with your browser and you will see a progressbar at the bottom of the page and the first form; you will need to fill in all the fields correctly in order to submit them to the server. Also you can click on Show all entries button if DB already has any data sent before.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
