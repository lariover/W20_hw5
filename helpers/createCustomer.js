const storage = require('./storage');

module.exports = (req,res) => {
    const {body} = req;
    const {storage} = storage;
    const {customers} = storage;
    const customerRecord = Object.assign({id: storage.customerID}, body);
    customers.push(customerRecord);

    res.statusCode = 201;
    res.setHeader('Location',`/customers/${storage.customerID++}`);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(customerRecord));
};