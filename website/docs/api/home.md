# API Reference

- [Products](./products.md)
- Orders
- Order Statuses
- Customers
- Settings

## Overview

There are two types of exposed APIs, one that is public and does not need authentication.
This can be used to build the store functionality for not registered users. For example, you can issue this request to get the products without authentication e.g `GET http://localhost:3001/ajax/products`.
The second API, is basically every the whole API available for the application. This needs authentication ofcourse.

### Authentication

Authentication is done using HTTP cookies. To authenticate, send a login post request with correct email and password and pass the option to includes the credentials like the following:

```
await fetch("http://localhost:3001/ajax/login", {
    method: "POST",
    body: {"email": "admin@capi.com", "password": "admin"},
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include"
});
```

After that, cookies will be saved in your browser and whenever you need to send them again you with any other request, just append `credentials: "include"` to that request.
