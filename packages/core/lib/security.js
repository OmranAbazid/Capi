import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import settings from "./settings";
import SecurityTokensService from "../services/security/tokens";

const DEVELOPER_MODE = settings.developerMode === true;
const SET_TOKEN_AS_REVOKEN_ON_EXCEPTION = true;

const PATHS_WITH_OPEN_ACCESS = [
  "/api/v1/authorize",
  /\/api\/v1\/notifications/i,
  /\/ajax\//i
];

const scope = {
  ADMIN: "admin",
  USER: "user",
  DASHBOARD: "dashboard",
  READ_PRODUCTS: "read:products",
  WRITE_PRODUCTS: "write:products",
  READ_PRODUCT_CATEGORIES: "read:product_categories",
  WRITE_PRODUCT_CATEGORIES: "write:product_categories",
  READ_ORDERS: "read:orders",
  WRITE_ORDERS: "write:orders",
  READ_CUSTOMERS: "read:customers",
  WRITE_CUSTOMERS: "write:customers",
  READ_CUSTOMER_GROUPS: "read:customer_groups",
  WRITE_CUSTOMER_GROUPS: "write:customer_groups",
  READ_PAGES: "read:pages",
  WRITE_PAGES: "write:pages",
  READ_ORDER_STATUSES: "read:order_statuses",
  WRITE_ORDER_STATUSES: "write:order_statuses",
  READ_THEME: "read:theme",
  WRITE_THEME: "write:theme",
  READ_SITEMAP: "read:sitemap",
  READ_SHIPPING_METHODS: "read:shipping_methods",
  WRITE_SHIPPING_METHODS: "write:shipping_methods",
  READ_PAYMENT_METHODS: "read:payment_methods",
  WRITE_PAYMENT_METHODS: "write:payment_methods",
  READ_SETTINGS: "read:settings",
  WRITE_SETTINGS: "write:settings",
  READ_FILES: "read:files",
  WRITE_FILES: "write:files"
};

const checkUserScope = (requiredScope, req, res, next) => {
  // console.log(req.params.id);
  // console.log(req.user.jti);
  //||
  //(req.user.scopes.includes(scope.USER) && req.parms.id === req.user.id)
  // if (DEVELOPER_MODE === true) {
  // 	next();
  // } else

  console.log(req.user);

  if (
    req.user &&
    req.user.scopes &&
    req.user.scopes.length > 0 &&
    (req.user.scopes.includes(scope.ADMIN) ||
      req.user.scopes.includes(requiredScope) ||
      (req.user.scopes.includes(scope.USER) &&
        req.params.customerId === req.user.customerId))
  ) {
    next();
  } else {
    res.status(403).send({ error: true, message: "Forbidden" });
  }
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, settings.jwtSecretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // check on blacklist
        resolve(decoded);
      }
    });
  });
};

const checkTokenInBlacklistCallback = async (req, payload, done) => {
  try {
    const jti = payload.jti;
    const blacklist = await SecurityTokensService.getTokensBlacklist();
    const tokenIsRevoked = blacklist.includes(jti);
    return done(null, tokenIsRevoked);
  } catch (e) {
    done(e, SET_TOKEN_AS_REVOKEN_ON_EXCEPTION);
  }
};

const applyMiddleware = app => {
  // if (DEVELOPER_MODE === false) {
  app.use(
    expressJwt({
      secret: settings.jwtSecretKey,
      isRevoked: checkTokenInBlacklistCallback,
      getToken: function fromHeaderOrQuerystring(req) {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        } else if (req.cookies.token) {
          return req.cookies.token;
        }
        return null;
      }
    }).unless({ path: PATHS_WITH_OPEN_ACCESS, method: "OPTIONS" })
  );
  // }
};

const getAccessControlAllowOrigin = () => {
  return settings.storeBaseUrl || "*";
};

export default {
  checkUserScope: checkUserScope,
  scope: scope,
  verifyToken: verifyToken,
  applyMiddleware: applyMiddleware,
  getAccessControlAllowOrigin: getAccessControlAllowOrigin,
  DEVELOPER_MODE: DEVELOPER_MODE
};
