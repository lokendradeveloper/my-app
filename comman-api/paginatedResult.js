const Product = require('../modelSchema/productSchema');

const paginatedResults = async (req, res) => {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)

    let orederBy = req.query.type
    let sort = req.query.sort
    let sortObject = {}
    if (sort) {
        sortObject['sort'] = orederBy === 'asc' ? 1 : -1
    }
    // const query = {}
    const totalData = await Product.find().countDocuments()
    const data = await Product.find().skip((page - 1) * limit).limit(limit).sort(sortObject)

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
