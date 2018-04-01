const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');

const dataMiddleware = require('./middlewares/dataMiddleware');

const updateCustomer = require('./helpers/updateCustomer');
const createCustomer = require('./helpers/createCustomer');
const getCustomers = require('./helpers/getCustomers');

const server = http.createServer(function(req, res) {
    const router = initRouter();
    router(req, res, finalhandler(req, res));
});

server.listen(3333);



const initRouter = () => {
    const router = Router();
    router.use(dataMiddleware);
    router.get('/customers',getCustomers);
    router.put('/customers/:id',updateCustomer);
    router.post('/customers',createCustomer);
    return router;

};