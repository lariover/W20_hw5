const http = require('http');
const Router = require('router');
const finalhandler = require('finalhandler');

const dataMiddleware = require('./middlewares/dataMiddleware');
const deleteCustomer = require('./helpers/customerAsyncDelete');
const updateTask = require('./helpers/taskUpdate');
const getTask= require('./helpers/taskGet');
const getCustomer = require('./helpers/getCustomer');

const server = http.createServer(function(req, res) {
    const router = initRouter();
    router(req, res, finalhandler(req, res));
});

server.listen(3000);



const initRouter = () => {
    const router = Router();
    router.use(dataMiddleware);
    router.get('/customers',getCustomer);
    router.put('/customers/:id',updateTask);
    router.post('/customers',getTask);
    return router;

};