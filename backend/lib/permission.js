function RequestPermission(Permission) {
    console.log(Permission)
    return function (req, res, next) {
        next();
    }
}