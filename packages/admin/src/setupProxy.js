const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "http://localhost:3001",
      pathRewrite: { "^/api": "/api/v1" }
    })
  );
  app.use(proxy("/ajax", { target: "http://localhost:3001" }));
};
