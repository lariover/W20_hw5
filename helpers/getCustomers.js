const storage = require('./storage');
const {weakEtac, strongEtac} = require('./etacHelper');

module.exports = (req, res) => {
    const {headers} = req;
    const ifModified = headers['if-modified-since'];
    const ifNoneMatch = headers['if-none-match'];

    const {customers} = storage.storage;
    const {storage: items} = storage;

    const etac = weakEtac();
//const etac = strongEtac()
    if (!items.lastModified) {
        items.lastModified = new Date();
    }
    if (!ifModified && !ifNoneMatch) {

        res.setHeader('Last-Modified', items.lastModified.toString());
        res.setHeader('ETag', etac);
        return res.end(JSON.stringify({customers}))

    }
//prefer etac ower ifModifiedSince
    if (ifNoneMatch) {
        if (etac === ifNoneMatch) {
            res.setHeader('Last-Modified', items.lastModified.toString());
            res.setHeader('ETag', etac);
            res.statusCode = 304;
            return res.end();
        } else {
            res.setHeader('Last-Modified', items.lastModified.toString());
            res.setHeader('ETag', etac);
            return res.end(JSON.stringify({customers}))
        }
    } else {
        const modifiedSinceDate = new Date(ifModified);
        if (items.lastModified > modifiedSinceDate) {
            res.setHeader('Last-Modified', items.lastModified.toString());
            res.setHeader('ETag', etac);
            return res.end(JSON.stringify({customers}))
        } else {

            res.setHeader('Last-Modified', items.lastModified.toString());
            res.setHeader('ETag', etac);
            res.statusCode = 304;
            return res.end();
        }


    }


};