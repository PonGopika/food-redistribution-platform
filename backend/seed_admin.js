const registerAdmin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Admin",
                email: "sivadharaneesh017@gmail.com",
                password: "admin123",
                role: "Admin",
                phone: "0000000000",
                address: "Admin HQ",
                ngoRegNumber: "ADMIN001"
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Admin registered successfully:", data);
        } else {
            console.error("Error:", data);
        }
    } catch (err) {
        console.error("Network Error:", err.message);
    }
};

registerAdmin();
