const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    //Si no existe no se autoriza
    if(!req.headers.authorization) {
        res.status(401).send("Acceso denegado")
    } else {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, "secret", (err) => {
            if(err) {
                res.status(500).send("Acceso denegado")
            } else {
                next()
            }
        })
    }
}