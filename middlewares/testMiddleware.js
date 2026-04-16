const testMiddleware = (req, res, next) =>{

    const date = new Date().getFullYear();
    const url = req.url;
    const method = req.method;

    console.log(date, url, method);

    // send back response from the middleware:
    // res.send("Hello world");

    // passing it to the next function (middleware)
    next();
}

function apiMiddlewares (req, res, next){
        const url = req.url;
        const method = req.method;

        console.log(url, method);
        next();
}
module.exports = {testMiddleware, apiMiddlewares};