import "module-alias/register";
import express from "express";
import {setupRouter} from "./router"
const port = 8085;
const app = express();
app.listen(port, () => {
    app.set("view engine", "ejs");
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
        res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
        next();
    });
    setupRouter(app);
    console.log("runServer");
});
