const Product = require('../modelSchema/productSchema');
const paginatedResults = async (req, res) => {
    // let { page = 1, limit = 10 } = req.query
  let page = parseInt(req.query.page)
   let limit = parseInt(req.query.limit)
    const query = {}
    const totalData = await Product.find().countDocuments()
    const data = await Product.find(query).skip((page - 1) * limit).limit(limit).sort({})
    
    const pageNumber = Math.ceil(totalData / limit)
    const results = {
        currentPage: page,
        prevPage: page <= 1 ? null : page - 1,
        nextPage: page >= pageNumber ? null : page + 1,
        data,
        totalData,
    }
   return res.json(results)
}
module.exports = { paginatedResults }
