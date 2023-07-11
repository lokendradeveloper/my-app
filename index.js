const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path");
const PORT = process.env.PORT || 4001

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
const mainRoute = require('./Routes/mainRoute')

mainRoute(app);

app.listen(PORT, () => {
    console.log('Server running on http://localhost:'+PORT+'/')
});

