function logout() {
    // Clear session data (localStorage, sessionStorage, or cookies if applicable)
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage
    sessionStorage.clear(); // Clear all session data

    // Optionally, clear cookies (if you use them for authentication)
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to login page or home
    window.location.href = '/login'; // Change to your login page path
}