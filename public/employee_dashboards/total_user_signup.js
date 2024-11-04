async function fetchEmployeeCount() {
    try {
        const response = await fetch('/employeeCount');  // API route we'll define in the backend
        const data = await response.json();
        document.getElementById('total-logins').textContent = data.count;  // Update the DOM
    } catch (error) {
        console.error('Error fetching employee count:', error);
        document.getElementById('total-logins').textContent = 'Error';
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', fetchEmployeeCount);


