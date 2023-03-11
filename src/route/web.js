import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    
    router.get("/trang-chu", (req, res) => {
        return res.send("this is home page");
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;