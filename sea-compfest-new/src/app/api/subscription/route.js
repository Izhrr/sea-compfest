const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// GET all subscriptions
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscriptions',
      error: error.message
    });
  }
});

// POST create subscription
router.post('/', async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      selectedPlan,
      mealTypes,
      deliveryDays,
      allergies,
      totalPrice
    } = req.body;

    // Validasi input
    if (!name || !phoneNumber || !selectedPlan || !mealTypes || !deliveryDays) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const subscription = new Subscription({
      name,
      phoneNumber,
      selectedPlan,
      mealTypes,
      deliveryDays,
      allergies: allergies || '',
      totalPrice
    });

    const savedSubscription = await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: savedSubscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subscription',
      error: error.message
    });
  }
});

// GET subscription by ID
router.get('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subscription',
      error: error.message
    });
  }
});

// PUT update subscription status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'active', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      message: 'Subscription status updated successfully',
      data: subscription
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating subscription',
      error: error.message
    });
  }
});

module.exports = router;