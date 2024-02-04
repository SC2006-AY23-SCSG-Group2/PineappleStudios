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
```

## Technologies we are using

- `Remix.run`: Full stack framework
  - Website: [Remix.run](https://remix.run/)
  - Learn it at: [Quick Start](https://remix.run/docs/en/main/start/quickstart) or [Tutorial](https://remix.run/docs/en/main/start/tutorial)
- `React`: UI Framework
  - Website: [React.dev](https://react.dev/)
  - Learn it at: [Quick Start](https://react.dev/learn) or [Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
  - It may be confusing what is the relationship between React and Remix.run, to be simple: React is the UI part(HTML + CSS + some interactions with UI); Remix.run is full stack, which provides server, routing, data fetch, etc.
- `TailwindCSS`: CSS framework
  - Website: [Tailwindcss.com](https://tailwindcss.com/)
- `DaisyUI`: UI components library
  - Website: [DaisyUI.com](https://daisyui.com/)
  - Tutorial: [How to use](https://daisyui.com/docs/use/)
  - This library is based on TailwindCSS, so that means we can use its components with original TailwindCSS.
  - What you need to know: in `.jsx/tsx`, it is `className` instead of `class`
- `Prisma`: For database, and ORM
  - Website: [Prisma.io](https://www.prisma.io/)
  - Learn it at: [Quick Start](https://www.prisma.io/docs/getting-started/quickstart) or [Tutorial](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
    - The tutorial is based on postgresql, but the main concept is the same.
  - `sqlite`: We are using sqlite database, because it is just a file, need no outside database server.
    - More info at: [Prima + sqlite](https://www.prisma.io/docs/orm/overview/databases/sqlite)
  - Create a file called `.env`, write `DATABASE_URL="file:./dev.db"`.
  - For now(Feb 2nd), `prisma` is just initialized, but not using in the codebase, because we are not yet implemented our database schema yet.
