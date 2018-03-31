

const dataMiddleware = (req,res,next) => {
    req.body = "";
    console.log('Data read called');
    // get the data of the body
    req.on('data',  (chunk) => {
        req.body += chunk;
        console.log(chunk + req.body);
    });

    //all data
    req.on('end', () => {
        // log request object
        console.log(req.body);
        req.body = JSON.parse(req.body||'{}');
        next();
    });

};

module.exports = dataMiddleware;