# FARI-assignment

This is a simple chatbot that uses OpenAI GPT-4 in the background.

It can take a series of commands and use them to perform actions on the page, such as rendering different content, navigation, etc. 

To add more features to the language model, go to the commands.ts inside the /store directory.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
### Open a separate terminal window/tab and go to /backend

* Add a .env file and add OPENAI_API_KEY= (add your own api key or ask me for one)

```sh
npm install
```

then

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Format with Prettier

```sh
npm run format
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
