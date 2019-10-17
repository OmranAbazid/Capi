// config used by server side only
const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME || "shop";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";
const dbCred =
  dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@` : "";

const dbUrl =
  process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;

module.exports = {
  // used by Store (server side)
  apiBaseUrl: `http://localhost:3001/api/v1`,

  // used by Store (server and client side)
  ajaxBaseUrl: `http://localhost:3001/ajax`,

  // Access-Control-Allow-Origin
  storeBaseUrl: `http://localhost:4000`,

  // used by API
  adminLoginUrl: "/admin/login",

  apiListenPort: 3001,
  storeListenPort: 4000,

  // used by API
  mongodbServerUrl: dbUrl,

  smtpServer: {
    host: "",
    port: 0,
    secure: true,
    user: "",
    pass: "",
    fromName: "",
    fromAddress: ""
  },

  // key to sign tokens
  jwtSecretKey: "-",

  // path to uploads
  categoriesUploadPath: "../admin/public/images/categories",
  productsUploadPath: "../admin/public/images/products",
  filesUploadPath: "../admin/public",
  themeAssetsUploadPath: "theme/assets/images",

  // url to uploads
  categoriesUploadUrl: "/images/categories",
  productsUploadUrl: "/images/products",
  filesUploadUrl: "",

  // store UI language
  language: "en",

  // used by API
  orderStartNumber: 1000,

  developerMode: true
};
