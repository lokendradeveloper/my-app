const express = require('express');
const app = express();
app.use(express.json())
// app.use(cors());
Port = 4001

const mainRoute = require('./Routes/mainRoute')

mainRoute(app);

app.listen(Port, () => {
    console.log('Server is listening on');
});

