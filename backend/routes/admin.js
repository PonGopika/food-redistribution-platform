import express from 'express';
import auth from '../middlewares/auth.js';
import User from '../models/User.js';
import FoodListing from '../models/FoodListing.js';

const router = express.Router();

// Middleware to check if user is Admin
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'Admin') {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
        next();
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/admin/users
// @desc    Get all users (with optional role filter)
router.get('/users', auth, adminAuth, async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};
        if (role) query.role = role;

        const users = await User.find(query).select('-password').sort({ date: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/verify/:id
// @desc    Verify a user (NGO/Donor)
router.put('/verify/:id', auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isVerified = true;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/ban/:id
// @desc    Ban or Unban a user
router.put('/ban/:id', auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isBanned = !user.isBanned; // Toggle ban status
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/stats
// @desc    Get platform statistics for Admin Dashboard
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDonors = await User.countDocuments({ role: 'Donor' });
        const totalNGOs = await User.countDocuments({ role: 'NGO' });
        const pendingVerifications = await User.countDocuments({ isVerified: false, role: { $in: ['NGO', 'Donor'] } });

        const totalListings = await FoodListing.countDocuments();
        const activeListings = await FoodListing.countDocuments({ status: 'Available' });
        const claimedListings = await FoodListing.countDocuments({ status: 'Claimed' });
        const deliveredListings = await FoodListing.countDocuments({ status: 'Delivered' });

        // Calculate total food saved (quantity)
        const allDelivered = await FoodListing.find({ status: 'Delivered' });
        const totalFoodSaved = allDelivered.reduce((acc, item) => acc + (item.quantity || 0), 0);

        res.json({
            users: { total: totalUsers, donors: totalDonors, ngos: totalNGOs, pending: pendingVerifications },
            listings: { total: totalListings, active: activeListings, claimed: claimedListings, delivered: deliveredListings },
            impact: { foodSaved: totalFoodSaved }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/reports
// @desc    Get reported listings or low-rated users (Safety Monitoring)
router.get('/reports', auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find({ role: 'Donor' });
        const riskyUsers = [];

        for (const user of users) {
            const listings = await FoodListing.find({ donor: user._id, rating: { $gt: 0 } });
            if (listings.length > 0) {
                const avg = listings.reduce((acc, item) => acc + item.rating, 0) / listings.length;
                if (avg < 3) {
                    riskyUsers.push({ user, avgRating: avg });
                }
            }
        }

        const cancelledListings = await FoodListing.find({ status: 'Cancelled' })
            .populate('donor', 'name email')
            .sort({ date: -1 })
            .limit(10);

        res.json({ riskyUsers, cancelledListings });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
