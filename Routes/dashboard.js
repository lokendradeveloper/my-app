
const dashboardController = async (req, res) => {
    res.json({
        error: null,
        data: {
            title: "My dashboard",
            content: "dashboard conten",
            user: req.user,
        },
    });
}

module.exports = {dashboardController};