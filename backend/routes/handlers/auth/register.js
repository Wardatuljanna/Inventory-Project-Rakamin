const bcrypt = require('bcrypt');
const { User } = require('../../../models');

module.exports = async (req, res) => {
    const { body } = req;

    // Validation User Input
    if (!body.name || !body.email || !body.password || !body.role) {
        return res.status(400).json({
            message: "Name, email, and password must be provided"
        });
    }

    // Check if email already exists
    const existingUser = await User.findOne({
        where: {
            email: body.email
        }
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Email is already registered"
        });
    }

    // Encrypt the password
    const password = await bcrypt.hashSync(body.password, 10);

    // Create new user
    const user = await User.create({
        name: body.name,
        email: body.email,
        role: body.role,
        password
    });

    return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
};
