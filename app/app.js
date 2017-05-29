const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

module.exports = function() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(port, () => console.log('Listening on port', port))

    return app;
}()