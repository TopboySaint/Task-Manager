const express = require('express');
const router = express.Router();
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/task.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getTasks);
router.delete('/:id', authenticateToken, deleteTask);
router.put('/:id', authenticateToken, updateTask);

module.exports = router;
