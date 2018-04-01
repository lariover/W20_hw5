const storageItems = require('./storage');
const {strongEtac} = require('./etacHelper');


modules.export = (req, res) => {
    const {params, body, headers} = req;
    const idNum = parseInt(params.id || '');

    const {customers} = storageItems.storage;
    const {storage} = storageItems;
    if (!idNum) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({error: 'invalid request', message: 'The id of customer is invalid'}));
    }

    const customer = customers.find((c) => c.id == idNum);
    if (!customer) {
        res.statusCode = 404;
        return res.end();
    }

    const ifUnmodified = headers['if-unmodified-since'];
    const ifMatch = headers['if-match'];
    if (!ifMatch && !ifUnmodified) { //no conditions - simply put the changes
        const updatedCustomer = Object.assign(customer, body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(updatedCustomer));
    }
    const etac = strongEtac();
    if (ifMatch) {
        if (etac == ifMatch) {
            const updatedCustomer = Object.assign(customer, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(updatedCustomer));
        } else {
            res.statusCode = 412;
            return res.end();
        }
    } else {
        const dateSince = new Date(ifUnmodified);
        if (storage.lastModified > dateSince) {
            res.statusCode = 412;
            return res.end();
        } else {
            const updatedCustomer = Object.assign(customer, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(updatedCustomer));
        }
    }


};