const { verifyToken } = require('../helpers/jwt.js');
const { User } = require('../models');

module.exports = {
    authenticate: (req, res, next) => {
        console.log(req.headers);
        const { token } = req.headers;

        try {
            const decode = verifyToken(token);
            const { id } = decode;

            User.findByPk(id)
                .then(user => {
                    if(user) {
                        req.uid = user.id;
                        next();
                    } else {
                        throw{
                            msg: 'You dont have the authority to do this action',
                            code: 401
                        }
                    }
                })
                .catch(err => {
                    next(err);
                })
        } catch (error) {
            next(error);
        }
    }
}