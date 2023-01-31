module.exports = (app, upload) => {
    const authJwt  = require("../middlewares/auth-jwt.js");
    const controller = require("../controllers/admin/worker-controller.js");
    const router = require("express").Router();
 
    app.use(function(req,res, next){
        res.header(
            "Acces-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });




    router.post("/", [authJwt.verifyUserToken], controller.create);
    router.get("/", [authJwt.verifyUserToken], controller.findAll);  
    router.get("/:id", [authJwt.verifyUserToken], controller.findOne);  
    router.put("/:id", [authJwt.verifyUserToken], controller.update);  
    router.delete("/:id", [authJwt.verifyUserToken], controller.delete);    
    app.use('/api/admin/workers', router);
};