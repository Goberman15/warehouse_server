const { User } = require('../models');
const { generateToken } = require('../helpers/jwt.js');
const { compareHash } = require('../helpers/bcrypt.js');

class UserController {
    static async register (req, res, next) {
        const { username, password } = req.body;

        try {
            await User.create({ username, password });
    
            res.status(201).json({
                message: 'Success Create User'
            })
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    static async login (req, res, next) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ where: { username }});

            if (user) {
                const { id, username, password: hashPassword } = user;
                const compare = compareHash(password, hashPassword);

                if (compare) {
                    const payload = {
                        id
                    };

                    const token = generateToken(payload);

                    res.status(200).json({
                        token
                    })
                } else {
                    throw {
                        msg: 'Invalid Username / Password',
                        code: 400
                    }
                }
            } else {
                throw {
                    msg: 'Invalid Username / Password',
                    code: 400
                }
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

module.exports = UserController;
