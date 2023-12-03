// Ensure that the user is authenticated
function ensureAuthenticated(req, res, next) {
    // console.log("ensureAuthenticated: ", req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

// Ensure that the user is authenticated and is an admin
function ensureAuthenticatedAndAdmin(req, res, next) {
    console.log("ensureAuthenticated: ", req.isAuthenticated());
    console.log("user.role: ", req.user.role);
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

module.exports = { ensureAuthenticated, ensureAuthenticatedAndAdmin };