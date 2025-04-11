# Privy Delegation Access Example

This is a minimal example for delegate user wallet to server

## Setup:

1. Clone this repository and open it in your terminal.
```
git clone https://github.com/gokuseii/delegate-wallets-example
```

2. Install the necessary dependencies (including [Privy Auth](https://www.npmjs.com/package/@privy-io/react-auth)) with `npm`.
```sh
npm i 
```

3. Initialize your environment variables by copying the `.env.example` file to an `.env` file. Then, [paste your Privy App ID from the console](https://docs.privy.io/guide/console/api-keys) in `.env`.
```sh
# In your terminal, create .env from .env.example
cp .env.example .env

# Add your Privy App ID to .env
REACT_APP_PRIVY_APP_ID=<your-privy-app-id>
```

## Privy App Settings:

To activate delegation access:

1. Go to [Privy Dashboard - Apps](https://dashboard.privy.io/apps)
2. Navigate to:  
   `Authentication > Advanced > Server-side access (offline access)`

## Building locally:

In your project directory, run `npm run start`. You can now visit http://localhost:3000 to see your app and login with Privy!

## Check out:

- `src/index.js` for how to use the `PrivyProvider` and initialize it with your Privy App ID
- `src/App.js` for how to use the `usePrivy()` hook, fields like `authenticated` and `user`, and methods like `login` and `logout`
- `config-overrides.js` for how to [handle common issues with Webpack 5](https://docs.privy.io/guide/troubleshooting/webpack)

**Check out [our docs](https://docs.privy.io/) for more guidance around using Privy in your app!**
