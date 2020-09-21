<p align="center">
  <a href="https://verto.exchange">
    <img src="https://raw.githubusercontent.com/useverto/design/master/logo/logo_light.svg" alt="Verto logo (light version)" width="110" />
  </a>

  <h3 align="center">Verto Utils</h3>

  <p align="center">
    Testing scripts for the Verto Exchange Network
  </p>

</p>

## About

This repository contains all testing scripts for the Verto APIs, and backend.

> Important Notice: Verto is in its Alpha stage. If you have a suggestion, idea, or find a bug, please report it! The Verto team will not be held accountable for any funds lost.

## Getting Started

Clone the repository:

```sh
git clone https://github.com/useverto/utils
```

...and install the dependecies.

### Usage

Build the files first with `yarn run build`.

#### Set a test wallet

Run `yarn run:generate-wallet` or paste your own keyfile into `assets/keyfile.json`.

#### Deploy a test PST

Execute `yarn run:deploy-pst`.

#### Transfer a PST

Execute `yarn run:pst-transfer`.

## Special Thanks

- [Sam Williams](https://github.com/samcamwilliams)
- [Cedrik Boudreau](https://github.com/cedriking)
- [Aidan O'Kelly](https://github.com/aidanok)

## License

The code contained within this repository is licensed under the MIT license.
See [`./LICENSE`](https://github.com/useverto/utils/blob/master/LICENSE) for more information.
