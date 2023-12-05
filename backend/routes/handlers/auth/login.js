const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const { User } = require('../../../models')

module.exports = async (req, res) => {
    const { body } = req;

    if (!body.email || !body.password)
        return res.status(401).json({ error: 'Missing email or password' });

    const user = await User.findOne({
        where: {
            email: body.email
        },
    });

    if (!user)
        return res.status(404).json({
            message: "Email is not found!"
        })

    const isPasswordCorrect = compareSync(body.password, user.password)

    if (!isPasswordCorrect)
        return res.status(400).json(
            {
                message: 'Password is incorrect'
            })
    
    const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign({data}, 'secretKey', {
        expiresIn: "24h"
    })

    return res.json({token});
}