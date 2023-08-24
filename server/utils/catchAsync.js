// This serves as an async wrapper so we don't need to wrap routes in try/catch blocks
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}