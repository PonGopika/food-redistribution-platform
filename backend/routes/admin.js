import express from 'express';
import User from '../models/User.js';
import FoodListing from '../models/FoodListing.js';
import auth from '../middlewares/auth.js';
import Activity from '../models/Activity.js';

const router = express.Router();

// Middleware to check if user is Admin
const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'Admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
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
        const users = await User.find().select('-password').sort({ date: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/admin/verify/:id
// @desc    Toggle user verification status
router.put('/verify/:id', auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.id || req.params.id); // checking both just in case
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.isVerified = !user.isVerified; // Toggle
        await user.save();

        // LOG ACTIVITY
        const newActivity = new Activity({
            action: user.isVerified ? 'USER_VERIFIED' : 'USER_UNVERIFIED',
            user: req.user.id, // Admin who performed action
            target: user._id,
            targetModel: 'User',
            details: `Admin ${user.isVerified ? 'verified' : 'unverified'} user ${user.name} (${user.email})`
        });
        await newActivity.save();

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

        user.isBanned = !user.isBanned; // Toggle
        await user.save();

        // LOG ACTIVITY
        const newActivity = new Activity({
            action: user.isBanned ? 'USER_BANNED' : 'USER_UNBANNED',
            user: req.user.id,
            target: user._id,
            targetModel: 'User',
            details: `Admin ${user.isBanned ? 'banned' : 'unbanned'} user ${user.name}`
        });
        await newActivity.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/stats
// @desc    Get detailed platform stats
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDonors = await User.countDocuments({ role: 'Donor' });
        const totalNGOs = await User.countDocuments({ role: 'NGO' });
        const totalVolunteers = await User.countDocuments({ role: 'Volunteer' });

        const listings = await FoodListing.find();
        const totalByStatus = {
            Available: 0,
            Claimed: 0,
            InTransit: 0,
            Delivered: 0,
            Cancelled: 0
        };

        listings.forEach(item => {
            const statusKey = item.status.replace(' ', ''); // 'In Transit' -> 'InTransit'
            if (totalByStatus[statusKey] !== undefined) {
                totalByStatus[statusKey]++;
            } else if (item.status === 'In Transit') {
                totalByStatus.InTransit++;
            }
        });

        res.json({
            users: { total: totalUsers, donors: totalDonors, ngos: totalNGOs, volunteers: totalVolunteers },
            listings: totalByStatus
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/admin/activity
// @desc    Get recent activity logs
router.get('/activity', auth, adminAuth, async (req, res) => {
    try {
        const activities = await Activity.find()
            .populate('user', 'name role')
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
