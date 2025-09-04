const List = require('../models/list'); // Import the List model

// Create a new list
exports.getnewList = async (req, res) => {
    try {
        const { text, description, completed } = req.body;

        const newList = new List({
            text,
            description,
            completed
        });

        await newList.save();

        res.status(201).json({
            message: "List created successfully",
            data: newList
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all lists
exports.getALLList = async (req, res) => {
    try {
        const allList = await List.find();
        res.status(200).json({
            message: 'All list retrieved from the database',
            data: allList
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get one list by ID
exports.getOneList = async (req, res) => {
    try {
        const { id } = req.params;

        const foundList = await List.findById(id);

        if (!foundList) {
            return res.status(404).json({
                message: 'List not found'
            });
        }

        res.status(200).json({
            message: 'List found',
            data: foundList
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update a list by ID
exports.updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, description, completed } = req.body;

        const updatedList = await List.findByIdAndUpdate(
            id,
            { text, description, completed },
            { new: true, runValidators: true }
        );

        if (!updatedList) {
            return res.status(404).json({
                message: "List not found",
            });
        }

        res.status(200).json({
            message: "List updated successfully",
            data: updatedList,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete a list by ID
exports.deleteList = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedList = await List.findByIdAndDelete(id);

        if (!deletedList) {
            return res.status(404).json({
                message: "List not found",
            });
        }

        res.status(200).json({
            message: "List deleted successfully",
            data: deletedList,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};