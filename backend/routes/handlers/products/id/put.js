const { Product, Version, Log } = require("../../../../models");

module.exports = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId, {
            include: [Version, Log],
        });

        const { productName, versionId, keterangan } = req.body;
        const userId = req.user.id;

        if (!productName || !versionId || !userId || !keterangan) {
            return res.status(400).json({
                success: false,
                message: "productName, versionId, and keterangan are required fields",
            });
        }

        await product.update({
            productName,
            versionId,
            keterangan
        });

        if (req.body.qty) {
            await Log.create({
                productId,
                userId,
                qty: req.body.qty,
            });
        }

        const updatedProduct = await Product.findByPk(productId, {
            include: [Version, Log],
        });

        return res.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};