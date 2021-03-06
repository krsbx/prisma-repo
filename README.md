# Prisma Repo
#### Generating repository pattern for Prisma ORM faster and easier

---

# What is this?
A package that will make your life easier for using Repository Pattern while using Prisma ORM

# Why make this?
I like to use repository pattern in Sequelize, but when I saw Prisma support TypeScript I fell in love with it. Unfortunately, it's hard to use a repository pattern in prisma and to fix those issue this package exists.

# Should I use this?
Depends on what you need, if you doesnt want to have a lot of hassle to code almost a same things for all your services, then you dont need this package. But, if you are someone who doesn't want to struggle to build your own way to use the repository pattern in Prisma or if you just as lazy as me to generate the same repository for each models, then this package is for you.


# How to use
1. Install prisma-repo as dev dependencies
```
npm i -D prisma-repo
```
2. Generate all the repositories
```
npx prisma-repo --repositories
```

# Flags
* Generate all repositories
```
npx prisma-repo --repositories
```

* Generate model structures files
```
npx prisma-repo --model-structures
```

* Generate the base repository only
```
npx prisma-repo --base-repository
```

* Generate specific model repository
```
npx prisma-repo --modelname <model-name>
```


# Config files
## Accepted File Name/Formats
```
repository.setting.json

repository.setting.js

repository.setting.ts
```

## Config files settings (JavaScript)
```js
// Language: javascript
// Path: repository.setting.js

const config = {
  extendExpress: true, // default false
  overwrite: false, // default false
  repositoryPath: 'src/repository', // default 'src/repository'
  typesPath: 'src/types', // default 'src/types'
  prismaLogger: true, // default false
};

module.exports = config;
```

## Config files settings (TypeScript)
```ts
// Language: typescript
// Path: repository.setting.ts

import { PrismaRepoConfig } from 'prisma-repo';

const config: PrismaRepoConfig = {
  extendExpress: true, // default false
  overwrite: false, // default false
  repositoryPath: 'src/repository', // default 'src/repository'
  typesPath: 'src/types', // default 'src/types'
  prismaLogger: true, // default false
};

export default config;
```

## Config files settings (JSON)
```json
// Path: repository.setting.json

{
  "extendExpress": true, // default false
  "overwrite": false, // default false
  "repositoryPath": "src/repository", // default 'src/repository'
  "typesPath": "src/types", // default 'src/types'
  "prismaLogger": true, // default false
}
```

## Possible values
Will extends express Request interface so it can be extends with the models name like `req.user` or `req.users`
``` ts
extendsExpress: boolean
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
repositoryPath: string
```
Determine where to put the extended express definition files. By default it will be in `src/types`

```ts
typesPath: string
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
