# Into the Buffyverse - a Project by Team Kitten-Poker 


This is a Node.js template for the Makers final engineering project.

It uses:

- [Express](https://expressjs.com/) web framework for Node.js.
- [Nodemon](https://nodemon.io/) to reload the server automatically.
- [Handlebars](https://handlebarsjs.com/) to render view templates.
- [Mongoose](https://mongoosejs.com) to model objects in MongoDB.
- [ESLint](https://eslint.org) for linting.
- [Jest](https://jestjs.io/) for testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.

## Card wall
https://trello.com/b/i8kn5ccu/to-do

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then update your `~/.bash_profile`, with the `source ~/.zshrc_file` command if you have OhMyZSH installed.
   
   If you already have nvm, you can update with the following cURL command:
   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash` (see https://github.com/nvm-sh/nvm) - you may need to restart your terminal.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.10.0`.
   ```
   nvm install node
   ```
   (check version with `node --version`)
4. Update npm with `npm install -g npm@latest` (You may need to prefix these commands with sudo, especially on Linux, or OS X if you installed Node using its default installer - see https://docs.npmjs.com/try-the-latest-stable-version-of-npm.)

### Set up your project

1. Fork this repository
2. Rename your fork to `BuffyverseClone-<selected_name>`
3. Clone your fork to your local machine
4. Install Node.js dependencies
   ```
   npm install
   ```
5. Install an ESLint plugin for your editor. For example: [linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.
6. Install or update MongoDB (see https://github.com/mongodb/homebrew-brew)
   ```
   brew tap mongodb/brew
   brew install mongodb-community
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
   (You can check your version with the `mongod --version` command.)
7. Start MongoDB
   ```
   brew services start mongodb-community
   ```

### Start

1. Start the server
   ```
   npm start
   ```
2. Browse to [http://localhost:3000](http://localhost:3000)

#### Start test server

The server must be running locally with test configuration for the
integration tests to pass.

```
npm run start:test
```

This starts the server on port `3030` and uses the `acebook_test` MongoDB database,
so that integration tests do not interact with the development server.

### Test

- Run all tests
  ```
  npm test
  ```
- Run a check
  ```bash
  npm run lint              # linter only
  npm run test:unit         # unit tests only
  npm run test:integration  # integration tests only
  ```

## MongoDB Connection Errors?

You may experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips that might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`
