import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodListing from './models/FoodListing.js';

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB_CONNECTED");

        const listings = await FoodListing.find({});
        const now = Date.now();

        console.log(`\n--- LISTING REPORT ---`);
        listings.forEach(l => {
            const created = new Date(l.createdAt).getTime();
            const expiresAt = created + (l.expiry_hours * 3600000);
            const expired = now > expiresAt;

            console.log(`Title: ${l.title}`);
            console.log(`Status: ${l.status}`);
            console.log(`Expired: ${expired}`);
            console.log(`ExpiryHours: ${l.expiry_hours}`);
            console.log(`TimeLeft(h): ${((expiresAt - now) / 3600000).toFixed(2)}`);
            console.log(`----------------------`);
        });

        mongoose.disconnect();
    } catch (e) {
        console.log(e);
    }
};
run();
