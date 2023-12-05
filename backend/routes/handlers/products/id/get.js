const { Product, Log } = require("../../../../models")

module.exports = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByPk(productId, {include: Log});

    if (!product)
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
        let totalQty = 0;
        product.Logs.forEach((log) => {
        totalQty += log.qty;
        })
        product.setDataValue('totalQty', totalQty);
        console.log(totalQty) 
        console.log(product.Logs);
    return res.json(product)    
}

