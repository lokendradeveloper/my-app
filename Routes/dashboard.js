
const dashboardController = async (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: "dashboard contents",
            user: req.user,
        },
    });
}

module.exports = {dashboardController};