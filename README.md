# Prisma Repo

#### Generating repository pattern for Prisma ORM faster and easier

---

## :warning: Change to Class Base From Function Base :warning:

Starting from version 0.3.0 instead of extending the class by creating the instance for each models, we decide to create an abstract class that use a lot of static functions/method so it can be use without creating the instance.

## What is this?

A package that will make your life easier for using Repository Pattern while using Prisma ORM

## Why make this?

I like to use repository pattern in Sequelize, but when I saw Prisma support TypeScript I fell in love with it. Unfortunately, it's hard to use a repository pattern in prisma and to fix those issue this package exists.

## Should I use this?

Depends on what you need, if you doesnt care to have a lot of hassle to code almost a same things for all your services, then you dont need this package. But, if you are someone who doesn't want to struggle to build your own way to use the repository pattern in Prisma or if you just as lazy as me to generate the same repository for each models, then this package is for you.

## How to use

1. Install prisma-repo as dev dependencies

```
npm i -D prisma-repo
```

2. Generate all the repositories

```
npx prisma-repo --repositories
```

## Flags

- Generate all repositories

```
npx prisma-repo --repositories
```

- Generate model structures files

```
npx prisma-repo --model-structures
```

- Generate the base repository only

```
npx prisma-repo --base-repository
```

- Generate specific model repository

```
npx prisma-repo --modelname <model-name>
```

## Config files

### Accepted File Name/Formats

```
repository.setting.json

repository.setting.js

repository.setting.ts
```

### Config files settings (JavaScript)

```js
// Language: javascript
// Path: repository.setting.js

const config = {
  extendExpress: false, // default false
  overwrite: false, // default false
  repositoryPath: 'src/repository', // default 'src/repository'
  typesPath: 'src/types', // default 'src/types'
  prismaLogger: true, // default false
};

module.exports = config;
```

### Config files settings (TypeScript)

```ts
// Language: typescript
// Path: repository.setting.ts

import { PrismaRepoConfig } from 'prisma-repo';

const config: PrismaRepoConfig = {
  extendExpress: false, // default false
  overwrite: false, // default false
  repositoryPath: 'src/repository', // default 'src/repository'
  typesPath: 'src/types', // default 'src/types'
  prismaLogger: true, // default false
};

export default config;
```

### Config files settings (JSON)

```json
// Path: repository.setting.json

{
  "extendExpress": false, // default false
  "overwrite": false, // default false
  "repositoryPath": "src/repository", // default 'src/repository'
  "typesPath": "src/types", // default 'src/types'
  "prismaLogger": true // default false
}
```

### Problem with extendExpress options

When this enabled, it will extends request object in `express`. Problem that will happen if this was triggered is that it will conflict with other modules, if it was reserved words like `file` and `files` which conflicting with `multer`. Other thing to consider as well is that if you use `include` options in prisma and it will conflict with the types that we extend with `extendExpress` options.

### Possible values

Will extends express Request interface so it can be extends with the models name like `req.user` or `req.users`

```ts
extendExpress: boolean | {
  include: string[]; // model types to Include
  exclude: string[]; // model types to Exclued
}
```

Determnie whether `prisma-repo` should overwrite the existed files or not

<h5>`models.ts` are automatically updated everytime you `npx` the package with one of the available flags</h5>

```ts
overwrite: boolean | {
  repository: boolean;
  baseRepository: boolean;
}
```

Determine where to put the repository files. By default it will be in `src/repository`

```ts
repositoryPath: string;
```

Determine where to put the extended express definition files. By default it will be in `src/types`

```ts
typesPath: string;
```

Will enable logging in prisma instance in `models.ts`. By default it will not show any logger (`false`)

```ts
prismaLogger: boolean | {
  query: boolean;
  info: boolean;
  warn: boolean;
  error: boolean;
} | ('query' | 'info' | 'warn' | 'error')[];
```
