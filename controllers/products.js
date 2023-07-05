const Product = require('../modelSchema/productSchema');

const listController = async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
}

const createController = async (req,resp) =>{
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result)  
}

const updateController = async (req,resp) =>{
    let data = await Product.updateOne(
        req.params,
        { $set: req.body }
    );
    resp.send(data);
}

const deleteController = async (req,resp) =>{
    let data = await Product.deleteOne(req.params);
    resp.send(data);
}

const searchController = async (req,resp) =>{
    try {
        let data = await Product.find({
            "$or": [
                { title: { $regex: new RegExp(req.params.key, "i") } },
                // { price: { $regex: new RegExp(req.params.key, "i") } },
                { category: { $regex: new RegExp(req.params.key, "i") } },
            ]
        })
        resp.send(data)
    } catch (error) {
       console.log(error); 
    }   
}

module.exports = {
    listController,
    createController,
    updateController,
    deleteController,
    searchController
}