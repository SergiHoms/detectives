const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const config = require("../../config/auth-config");
const Worker = db.Worker;

exports.signin = (req, res) => {

    Worker.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(worker => {

        if (!worker) {

            return res.status(404).send({ message: "Usuario o contraseña incorrecta" });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            worker.password
        );

        if (!passwordIsValid) {

            return res.status(404).send({
                accessToken: null,
                message: "Usuario o contraseña incorrecta"
            });
        }

        let token = jwt.sign({ id: worker.id }, config.worker.secret, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: worker.id,
            name: worker.name,
            email: worker.email,
            accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};