const initializeAllRoute = (app) => {
    app.use('/user',require('./authRouter'));
    app.use('/products', require('./productRouter'));
}

module.exports = initializeAllRoute;