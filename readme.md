[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/OmranAbazid/Capi">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h1 align="center">CAPI</h1>

  <p align="center">
    CAPI is a commerce API and an admin panel to make it easy for developers to create custom ecommerce applications for any platform.
    <br />
    <!-- <a href="https://github.com/OmranAbazid/Capi"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/OmranAbazid/Capi">View Demo</a>
    ·
    <a href="https://github.com/OmranAbazid/Capi/issues">Capirt Bug</a>
    ·
    <a href="https://github.com/OmranAbazid/Capi/issues">Request Feature</a> -->
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#why-capi)
  - [Why Capi](#why-capi)
  - [Features](#features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## Why Capi?

Most of the already available ecommerce application are huge and hard to customize. Sometimes, you build an ecommerce application using woocommerce/shopify and then the customer asks for a feature that is very hard or not even possible to implement which forces you to move to another solution. Therefore, it is much easier to start with something very simple and add the features that you need along the way and that is exactly what Capi provides.
Capi is very simple yet very powerfull ecommerce API. Developers who know JavaScript can easily understand the codebase since it is written entirly in JavaScript using the most common and proven technologies. Since themes are hard to buid, Capi is headless which means just use the API and build whatever type of store you want.

## Features

- **Headless commerce**: Build mobile apps, customize storefronts and externalize processes
- **Dashboard**: Administrators have good control of orders, and products
- **Products**: Options, variants, attributes, Product categories, Inventory and stock management
- **Cart**: Advanced payment and tax options
- **Users**: User authentication and roles are already implemented
- **Multivendor**: Capi can be used as a marketplace with multiple stores

If you like the software, please give us a star! 🌟

![CAPI Screenshot](https://i.imgur.com/3iLsUXD.png)

### Built With

### API

- [Express](https://github.com/expressjs/express)
- [MongoDB](https://github.com/mongodb/mongo)

### Admin

- [React](https://github.com/facebook/react)
- [Ant Design](https://ant.design/)
  <!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

MongoDB is installed on your machine and the credentials matches serverConfig.js available in the root directory

### Installation

1. Clone the Capi

```sh
git clone https://github.com/OmranAbazid/Capi.git
```

2. Install NPM packages

```sh
yarn install
```

3. Initialize the database with some data

```sh
yarn setup
```

4. Start the API and the admin panel in two seperate terminals

```sh
yarn start-api
yarn start-admin
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/OmranAbazid/Capi/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

The admin panel is still in the early stage of development and there are alot of stuff to be done. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Omran Abazid - [@omran_abazid](https://twitter.com/omran_abazid)

Project Link: [https://github.com/OmranAbazid/Capi](https://github.com/OmranAbazid/Capi)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

Part of the ecommerce API was ported from another open source project called [Cezirn](https://github.com/cezerin/cezerin)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/OmranAbazid/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/OmranAbazid/Best-README-Template/blob/master/LICENSE.txt
