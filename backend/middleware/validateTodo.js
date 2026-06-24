const validateTodo = (req, res, next) => {

    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: "Please enter a todo"
        });
    }

    next();
};

module.exports = validateTodo;