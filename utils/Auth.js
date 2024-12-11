const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Récupérer le token du cookie

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = decoded.userId; // Sauvegarder userId dans la requête pour l'utiliser dans d'autres routes
        next(); // Passer au middleware ou au gestionnaire de route suivant
    });
};

module.exports = { isAuthenticated };