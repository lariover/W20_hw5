const storageItems = require('./storage');

module.exports = (req,res) => {
    const {body} = req;
    const {storage} = storageItems;
    const {customers} = storage;
    const customerRecord = Object.assign({id: storage.customerID}, body);
    customers.push(customerRecord);
    storage.lastModified = new Date();

    res.statusCode = 201;
    res.setHeader('Location',`/customers/${storage.customerID++}`);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(customerRecord));
};