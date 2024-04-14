# PineappleStudios

Software Engineering Group 2 for SCSG

## Get Started

Find the instructions in `./docs/get_started/README.md`

## Commands you often use

> On Windows Powershell, there maybe some errors with pnpm, then you just use npm as well.

```sh
git add <files>
git push
git fetch
git pull

fnm use           # to use the current node version

# On Windows Powershell, there maybe some errors with pnpm, then you just use npm as well.

pnpm install      # install dependencies
pnpm i            # short for pnpm install

# if you are using npm, you need to use npm run.
#   npm run dev
#   npm run format:lint
# etc.

pnpm dev          # starting a dev server
pnpm build        # build for production
pnpm start        # preview for production
pnpm format       # formatting code
pnpm lint         # linting code
pnpm format:lint  # formatting and linting code

# Or for npm

npm install

npm run dev
npm run build
npm run start
npm run format
npm run lint
npm run foramt:lint
```

## Folder explanation
```
.
├── docs            # Docs for development
├── prisma          # prisma schema and migrations
├── public          # static assets
└── src             # source folder
    ├── app         # app directory
    │   └── routes  # routes
    ├── components  # components
    ├── database    # database
    └── ml          # machine learning
```
## Starting Recommendation engine
Head over to recommendation_engine file for the server and scripts

```
.
├── docs            # Docs for development
├── prisma          # prisma schema and migrations
... 
├── recommendation_engine       # directory containing all essential files for recommendation system to function
    │  
    ├── Recommendation_System.py
    ├── Recommendation_System_server.py 
    ├── .env file
    ├── .joblib files and .pkl files in google drive link (must be loaded into the same directory where the  Recommendation_System.py, Recommendation_System_server.py and .env files are located)
```
ues google drive link for .joblib files and .pkl files 


### To run server
```
pip install flask
python Recommendation_Server.py
```




## Check out the links

- `prisma`: [Prisma with Remix](https://github.com/prisma/prisma-examples/tree/latest/typescript/remix)
  - `schema.prisma`: [Prisma Schema](https://www.prisma.io/docs/getting-started/quickstart#2-model-your-data-in-the-prisma-schema)
- `public`
- `src`
  - `app`
    - `routes`: (folder) [Routes Naming](https://remix.run/docs/en/main/file-conventions/routes)
    - `entry.client.tsx`: [Client Entry](https://remix.run/docs/en/main/file-conventions/entry.client)
    - `entry.server.tsx`: [Server Entry](https://remix.run/docs/en/main/file-conventions/entry.server)
    - `root.tsx`: [Root Route](https://remix.run/docs/en/main/file-conventions/root)
    - `tailwind.css`: [Tailwind entry](https://remix.run/docs/en/main/styling/tailwind)
  - `components`: [React Components](https://react.dev/learn/your-first-component)
  - `database`: [Prisma with Remix](https://github.com/prisma/prisma-examples/tree/latest/typescript/remix)
  - `ml`
- `package.json`
- `PineappleStudios.code-workspace`
- `production.env`: [Check out paragraph 3: Because the SQLite...](https://www.prisma.io/docs/getting-started/quickstart#3-run-a-migration-to-create-your-database-tables-with-prisma-migrate)
- `README.md`
- `remix.config.js`: [Remix Config](https://remix.run/docs/en/main/file-conventions/remix-config)
- `remix.env.d.ts`
- `tailwind.config.ts`: [Tailwind Configuration](https://tailwindcss.com/docs/configuration)
- `tsconfig.json`: [tsconfig](https://www.typescriptlang.org/tsconfig)



## Technologies we are using

- `Remix.run`: Full stack framework
  - Website: [Remix.run](https://remix.run/)
  - Learn it at:
    - [Quick Start](https://remix.run/docs/en/main/start/quickstart)
    - [Tutorial](https://remix.run/docs/en/main/start/tutorial)
- `React`: UI Framework
  - Website: [React.dev](https://react.dev/)
  - Learn it at:
    - [Quick Start](https://react.dev/learn)
    - [Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
  - It may be confusing what is the relationship between React and Remix.run, to be simple: React is the UI part(HTML + CSS + some interactions with UI); Remix.run is full stack, which provides server, routing, data fetch, etc.
- `TailwindCSS`: CSS framework
  - Website: [Tailwindcss.com](https://tailwindcss.com/)
- `DaisyUI`: UI components library
  - Website: [DaisyUI.com](https://daisyui.com/)
  - Tutorial:
    - [How to use](https://daisyui.com/docs/use/)
  - This library is based on TailwindCSS, so that means we can use its components with original TailwindCSS.
  - What you need to know: in `.jsx/tsx`, it is `className` instead of `class`
- `Prisma`: For database, and ORM
  - Website: [Prisma.io](https://www.prisma.io/)
  - Learn it at:
    - [Quick Start](https://www.prisma.io/docs/getting-started/quickstart)
    - [Prisma with Remix](https://github.com/prisma/prisma-examples/tree/latest/typescript/remix)
    - [Tutorial](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
      - This tutorial is based on postgresql, but the main concept is the same.
  - `sqlite`: We are using sqlite database, because it is just a file, need no outside database server.
    - More info at: [Prima + sqlite](https://www.prisma.io/docs/orm/overview/databases/sqlite)
  - Create a file called `.env`, write `DATABASE_URL="file:./dev.db"`.
  - For now(Feb 2nd), `prisma` is just initialized, but not using in the codebase, because we are not yet implemented our database schema yet.
