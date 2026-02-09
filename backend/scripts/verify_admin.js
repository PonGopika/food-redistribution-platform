import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testAdminFlow() {
    try {
        const uniqueId = Date.now();
        const adminUser = {
            name: `Admin Test ${uniqueId}`,
            email: `admin${uniqueId}@test.com`,
            password: 'password123',
            role: 'Admin',
            permissions: 'all' // Just to trace
        };

        console.log("1. Registering Admin User...");
        const regRes = await axios.post(`${API_URL}/auth/register`, adminUser);
        console.log("   ✅ Registered: ", regRes.data.user.email);

        console.log("2. Logging in...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: adminUser.email,
            password: adminUser.password
        });
        const token = loginRes.data.token;
        console.log("   ✅ Logged in. Token received.");

        const config = { headers: { 'x-auth-token': token } };

        console.log("3. Fetching Admin Stats...");
        const statsRes = await axios.get(`${API_URL}/admin/stats`, config);
        console.log("   ✅ Stats received:", statsRes.data);

        console.log("4. Fetching Users...");
        const usersRes = await axios.get(`${API_URL}/admin/users`, config);
        console.log(`   ✅ Users fetched: ${usersRes.data.length} users found.`);

        console.log("\n🎉 Admin Flow Verification Successful!");

    } catch (err) {
        console.error("❌ Verification Failed:");
        if (err.response) {
            console.error(`   Status: ${err.response.status}`);
            console.error(`   Data:`, err.response.data);
        } else {
            console.error(err.message);
        }
    }
}

testAdminFlow();
