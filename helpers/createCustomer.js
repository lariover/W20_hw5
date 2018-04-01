const storageItems = require('./storage');

module.exports = (req,res) => {
    const {body} = req;
    const {storage} = storageItems;
    const {customers} = storage;
    const customerRecord = Object.assign({id:  storageItems.customerID}, body);
    customers.push(customerRecord);
    storage.lastModified = new Date();

    res.statusCode = 201;
    res.setHeader('Location',`/customers/${ storageItems.customerID++}`);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(customerRecord));
};