import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
        // e.g., 'USER_VERIFIED', 'LISTING_CREATED', 'USER_BANNED'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'targetModel'
        // Optional: Reference to the object being acted upon (e.g., the User being verified, or the Listing being created)
    },
    targetModel: {
        type: String,
        enum: ['User', 'FoodListing'], // dynamic reference
    },
    details: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Activity', ActivitySchema);
