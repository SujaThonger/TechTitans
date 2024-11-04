function loginAdmin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    if (email && password) {
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
                    window.location.href = 'admin_Dashboard.html'; // Redirect after successful login
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
