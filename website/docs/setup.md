---
id: setup
title: Installation
sidebar_label: Installation
---

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
