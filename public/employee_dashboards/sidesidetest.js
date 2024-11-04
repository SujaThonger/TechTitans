document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const mainContent = document.getElementById('main-content');
    const dashboardLink = document.getElementById('dashboard-link');
    const contactsLink = document.getElementById('contacts-link');
    const aboutLink = document.getElementById('about-link');

    // Event Listeners
    dashboardLink.addEventListener('click', function () {
        loadDashboard();
    });

    contactsLink.addEventListener('click', function () {
        loadContacts();
    });

    aboutLink.addEventListener('click', function () {
        loadAbout();
    });

    // Load Default Page (Dashboard)
    loadDashboard();

    // Function to load Dashboard content
    function loadDashboard() {
        mainContent.innerHTML = `
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard!</p>
        `;
    }

    // Function to load Contacts content
    function loadContacts() {
        mainContent.innerHTML = `
            <h1>Contacts</h1>
            <p>This is the Contacts page.</p>
            <ul>
                <li>John Doe: john@example.com</li>
                <li>Jane Smith: jane@example.com</li>
            </ul>
        `;
    }

    // Function to load About content
    function loadAbout() {
        mainContent.innerHTML = `
            <h1>About</h1>
            <p>This is the About page. Here you can find information about our services.</p>
        `;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const mainContent = document.getElementById('main-content');
    const dashboardLink = document.getElementById('dashboard-link');
    const contactsLink = document.getElementById('contacts-link');
    const aboutLink = document.getElementById('about-link');

    // Event Listeners
    dashboardLink.addEventListener('click', function () {
        loadDashboard();
    });

    contactsLink.addEventListener('click', function () {
        loadContacts();
    });

    aboutLink.addEventListener('click', function () {
        loadAbout();
    });

    // Load Default Page (Dashboard)
    loadDashboard();

    // Function to load Dashboard content
    function loadDashboard() {
        mainContent.innerHTML = `
            <h1>Dashboard</h1>
            <p>Welcome to the Dashboard!</p>
        `;
    }

    // Function to load Contacts content
    function loadContacts() {
        mainContent.innerHTML = `
            <h1>Contacts</h1>
            <p>This is the Contacts page.</p>
            <ul>
                <li>John Doe: john@example.com</li>
                <li>Jane Smith: jane@example.com</li>
            </ul>
        `;
    }

    // Function to load About content
    function loadAbout() {
        mainContent.innerHTML = `
            <h1>About</h1>
            <p>This is the About page. Here you can find information about our services.</p>
        `;
    }
});
