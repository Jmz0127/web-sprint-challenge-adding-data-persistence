
const validateTask = async (req, res, next) => {
    try {
        const description = req.body.task_description
        !description ? next({ status: 400, message: " task_description is required!!" }) : next()
    } catch (err) {
        next(err)
    }
} 

module.exports = { validateTask }