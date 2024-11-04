// Function to load user options dynamically
function loadUserOptions() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h2>Select User Type</h2>
        
        <button id="trainer-btn">B.Tech Students</button>
        <button id="prime-member-btn">M.Tech Students</button>
        <div id="user-details"></div>
    `;

    // Event Listeners for Trainer and Prime Member buttons
    document.getElementById('trainer-btn').addEventListener('click', loadTrainerDetails);
    document.getElementById('prime-member-btn').addEventListener('click', loadPrimeMemberDetails);
}

// Function to load Trainer details dynamically from the server and create dynamic table
async function loadTrainerDetails() {
    const userDetailsDiv = document.getElementById('user-details');

    try {
        const response = await fetch('/trainers');  // Fetch trainer data from server
        const trainers = await response.json();     // Parse JSON data

        if (trainers.length === 0) {
            userDetailsDiv.innerHTML = "<p>No trainers found.</p>";
            return;
        }

        let tableHeaders = Object.keys(trainers[0]).map(field => `<th>${field}</th>`).join('');

        let tableRows = trainers.map(trainer => {
            const rowData = Object.values(trainer).map(value => `<td>${value}</td>`).join('');
            return `<tr>${rowData}</tr>`;
        }).join('');

        const trainerTable = `
            <h3>Trainer Details</h3>
            <table border="1">
                <tr>${tableHeaders}</tr>
                ${tableRows}
            </table>
        `;

        userDetailsDiv.innerHTML = trainerTable;
    } catch (error) {
        console.error('Error loading trainer data:', error);
        userDetailsDiv.innerHTML = `<p>Error loading trainer data.</p>`;
    }
}

// Function to load Prime Member details dynamically from the server and create dynamic table
async function loadPrimeMemberDetails() {
    const userDetailsDiv = document.getElementById('user-details');

    try {
        const response = await fetch('/prime-members');  // Fetch prime member data from server
        const primeMembers = await response.json();      // Parse JSON data

        if (primeMembers.length === 0) {
            userDetailsDiv.innerHTML = "<p>No prime members found.</p>";
            return;
        }

        let tableHeaders = Object.keys(primeMembers[0]).map(field => `<th>${field}</th>`).join('');

        let tableRows = primeMembers.map(member => {
            const rowData = Object.values(member).map(value => `<td>${value}</td>`).join('');
            return `<tr>${rowData}</tr>`;
        }).join('');

        const primeMemberTable = `
            <h3>Prime Member Details</h3>
            <table border="1">
                <tr>${tableHeaders}</tr>
                ${tableRows}
            </table>
        `;

        userDetailsDiv.innerHTML = primeMemberTable;
    } catch (error) {
        console.error('Error loading prime member data:', error);
        userDetailsDiv.innerHTML = `<p>Error loading prime member data.</p>`;
    }
}