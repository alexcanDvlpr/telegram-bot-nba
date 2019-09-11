'use strict'

exports.config = () => {
    const varENV = require('./env.variables.json');
    const node_env = process.env.NODE_ENV || 'development';
    return varENV[node_env];
}
