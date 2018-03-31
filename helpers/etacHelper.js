const {storage} = require('./storage');
const crypto = require('crypto');

const weakEtac = () => {
    const {customers} = storage;
    const stringForEtac = (customers.map((c) => c.id + c.name)).join();
    return crypto.createHash('md5').update(stringForEtac).digest("hex");
};
const strongEtac = () => {
    const {customers} = storage;
    const stringForEtac = (customers.map((c) => JSON.stringify(c))).join();
    return crypto.createHash('md5').update(stringForEtac).digest("hex");
};

module.exports = {weakEtac,strongEtac};