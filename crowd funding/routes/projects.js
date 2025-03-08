const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Create Project
router.post('/', auth, async (req, res) => {
    const { title, description, goalAmount } = req.body;
    try {
        const newProject = new Project({
            title,
            description,
            goalAmount,
            creator: req.user.id
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get All Projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('creator', ['username', 'email']);
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get Project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('creator', ['username', 'email']);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update Project
router.put('/:id', auth, async (req, res) => {
    const { title, description, goalAmount } = req.body;
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        project.title = title || project.title;
        project.description = description || project.description;
        project.goalAmount = goalAmount || project.goalAmount;
        project.updatedAt = Date.now();
        project = await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete Project
router.delete('/:id', auth, async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await project.remove();
        res.json({ msg: 'Project removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;