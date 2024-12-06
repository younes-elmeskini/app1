const prisma = require('../utils/PrismaClients');
const bcrypt = require('bcrypt');

async function signupUser (req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser  = await prisma.users.findUnique({ where: { email } });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User  created successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function loginUser (req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    signupUser ,
    loginUser ,
};
