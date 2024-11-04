function loginAdmin() {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // RegEx pattern for 'VTU' followed by 5 digits and any valid email domain
    const emailPattern = /^VTU\d{5}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !password) {
        alert('Please fill in both email and password');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Invalid email! Use format like VTU12345@gmail.com');
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
                window.location.href = 'trainer_Dashboard.html'; // Redirect after successful login
            } else {
                alert('Login failed: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
}