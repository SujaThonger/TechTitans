// Optionally replace this with logic to obtain adminId dynamically from URL, localStorage, etc.
const adminId = getAdminId() || 'defaultAdminId'; 

// Function to fetch admin name and update the UI
async function fetchAdminName() {
    try {
        const response = await fetch(`/admin/${adminId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch admin details: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.name) {
            document.querySelector('.name').textContent = data.name;  // Replace with Admin Name
        } else {
            console.error('Admin name not found in the response');
        }
    } catch (error) {
        console.error('Error fetching admin details:', error);
    }
}

// Helper function to dynamically get adminId (e.g., from URL or localStorage)
function getAdminId() {
    // Example: From URL parameter ?adminId=ss13082003
    const params = new URLSearchParams(window.location.search);
    return params.get('adminId') || localStorage.getItem('adminId');  // Fallback to localStorage
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', fetchAdminName);