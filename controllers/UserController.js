const prisma = require('../utils/PrismaClients');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function loginUser  (req, res) {
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
        
        // Stocker l'ID de l'utilisateur dans la session
        req.session.userId = user.id;
        
        // Generate a token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // 1 hour
        });
        
        // Successful login
        res.status(200).json({ message: 'Login successful', userId: user.id, token }); // Ajout du token dans la réponse
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function logoutUser (req, res) {
    req.session = null; // Si vous utilisez des sessions
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    signupUser ,
    loginUser ,
    logoutUser
};
