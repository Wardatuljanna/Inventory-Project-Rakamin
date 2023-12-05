const { Log } = require("../../../../models")

module.exports = async (req, res) => {
    const { id } = req.params;
    const log = await Log.findByPk(id);

    if (!log)
        return res.status(404).json({
            success: false,
            message: "logs not found"
        });

    return res.json(log)
}