const router = require('express').Router();
const {getnewList, getALLList, getOneList, updateList, deleteList} = require('..//controller/taskController');

// Routes for list management
router.post('/lists', getnewList);    // Create a new list
router.get('/lists', getALLList);     // Get all lists
router.get('/lists/:id', getOneList);  // Get a single list by ID
router.put('/lists/:id', updateList);  // Update a list by ID
router.delete('/lists/:id', deleteList); // Delete a list by ID

module.exports = router;