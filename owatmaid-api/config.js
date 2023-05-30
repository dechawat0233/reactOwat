//const url = 'mongodb://localhost:27017/users';
const url = 'mongodb://172.17.0.2:27017/users';

const username = 'admin';
const password = 'friendlydev214';
const host = '172.17.0.2';
const port = '27017';
// const database = 'users';
const database = 'admin';

const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`;


module.exports = connectionString;