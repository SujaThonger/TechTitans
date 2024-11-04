// Replace 'ss13082003' with the actual id or dynamically obtain it as needed
const adminId = 'ss13082003';

// Function to fetch admin name and update the UI
async function fetchAdminName() {
    try {
        const response = await fetch(`/admin/${adminId}`);
        const data = await response.json();

        if (response.ok && data.name) {
            document.querySelector('.name').textContent = data.name;  // Replace the "Admin Name"
        } else {
            console.error('Admin not found or error in fetching');
        }
    } catch (error) {
        console.error('Error fetching admin details:', error);
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', fetchAdminName);
