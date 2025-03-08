const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your_stripe_secret_key');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Create Stripe Payment Intent
router.post('/create-payment-intent', auth, async (req, res) => {
    const { amount, projectId } = req.body;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'usd'
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Confirm Payment
router.post('/confirm-payment', auth, async (req, res) => {
    const { paymentIntentId, projectId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(404).json({ msg: 'Project not found' });
            }
            project.currentAmount += paymentIntent.amount / 100; // amount in dollars
            project.backers.push(req.user.id);
            await project.save();
            res.json({ msg: 'Payment successful' });
        } else {
            res.status(400).json({ msg: 'Payment not confirmed' });
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;