function loginAdmin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Regular expression to match "TTS" followed by 5 digits
    const emailPattern = /^TTS\d{5}@\w+\.\w+$/;

    if (email && password) {
        // Validate email pattern
        if (!emailPattern.test(email)) {
            alert('Invalid email format. Email must start with "TTS" followed by 5 digits.');
            return;
        }

        fetch('http://localhost:4000/login/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Login successful!');
                    window.location.href = 'emp_Dashboard.html'; // Redirect after successful login
                } else {
                    alert('Login failed: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    } else {
        alert('Please fill in both email and password');
    }
}