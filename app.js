/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const httpProxy = require('http-proxy-middleware');
var cors = require('cors');
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8080";
const targetUrl = 'http://cse.hcmut.edu.vn/ura-nmt/translate';
/**
 *  App Configuration
 */
 app.use(cors());

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Vietnamese - Bahnaric neural machine translation API !");
});

const options = {
    target: targetUrl, // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
       [`^/translate`]: '',
    }, // rewrites our endpoints to '' when forwarded to our target
}

app.post("/translate", httpProxy.createProxyMiddleware(options))

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});