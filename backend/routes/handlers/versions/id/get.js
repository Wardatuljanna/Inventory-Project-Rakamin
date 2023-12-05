const { Version } = require("../../../../models")

module.exports = async (req, res) => {
    const { versionId } = req.params;
    const data = await Version.findByPk(versionId);

    if (!data)
        return res.status(404).json({
            success: false,
            message: "versions not found"
        });

    return res.json(data)
}