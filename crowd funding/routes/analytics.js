const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Get Analytics for a Project
router.get('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('creator', ['username', 'email']);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const analytics = {
            totalBackers: project.backers.length,
            totalAmount: project.currentAmount,
            goalAmount: project.goalAmount,
        };
        res.json(analytics);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;