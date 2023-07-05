const express = require('express');
require('../config');
const products = express.Router();
const { paginatedResults } = require('../comman-api/paginatedResult');
const { upload } = require('../comman-api/fileUpload');

const { listController,createController, updateController, deleteController, searchController } = require('../controllers/products')

//get api
products.get("/list", listController)

//create api 
products.post('/create',createController)

// update api 
products.put("/update/:_id",updateController)

//delete api 
products.delete("/delete/:_id",deleteController)


// search api 
products.get("/search/:key",searchController)

// upload file api 
products.post("/upload", upload, (req, resp) => {
    resp.send("file upload")
})

// get paginated api 
products.get("/paginate", paginatedResults);

module.exports = products;




