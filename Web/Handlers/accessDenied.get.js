function accessDenied(deps, params) {
    params.res.send('Access denied.');
}

module.exports.accessDenied = accessDenied;