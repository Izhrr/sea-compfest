const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      isApproved: true,
      isVisible: true
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// GET all testimonials for admin
router.get('/admin', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching testimonials',
      error: error.message
    });
  }
});

// POST create testimonial
router.post('/', async (req, res) => {
  try {
    const { customerName, reviewMessage, rating } = req.body;

    // Validasi input
    if (!customerName || !reviewMessage || !rating) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (customerName.length < 2 || customerName.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Customer name must be between 2 and 50 characters'
      });
    }

    if (reviewMessage.length < 5 || reviewMessage.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Review message must be between 5 and 500 characters'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const testimonial = new Testimonial({
      customerName,
      reviewMessage,
      rating: Number(rating)
    });

    const savedTestimonial = await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: savedTestimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating testimonial',
      error: error.message
    });
  }
});

// PUT approve testimonial
router.put('/:id/approve', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: true, updatedAt: Date.now() },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial approved successfully',
      data: testimonial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving testimonial',
      error: error.message
    });
  }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting testimonial',
      error: error.message
    });
  }
});

module.exports = router;