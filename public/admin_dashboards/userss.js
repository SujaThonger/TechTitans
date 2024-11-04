// Function to load user options dynamically
function loadUserOptions() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h2>Select User Type</h2>
        <button id="employee-btn">B.TECH Student</button>
        <button id="trainer-btn">M.TECH Student</button>
        <button id="prime-member-btn">P.HD Student</button>
        <div id="user-details"></div>
    `;

    // Event Listeners for Employee, Trainer, and Prime Member buttons
    document.getElementById('employee-btn').addEventListener('click', loadEmployeeDetails);
    document.getElementById('trainer-btn').addEventListener('click', loadTrainerDetails);
    document.getElementById('prime-member-btn').addEventListener('click', loadPrimeMemberDetails);
}

// Function to load Employee details dynamically from the server and create dynamic table
async function loadEmployeeDetails() {
    const userDetailsDiv = document.getElementById('user-details');

    try {
        const response = await fetch('/employees');  // Fetch employee data from server
        const employees = await response.json();     // Parse JSON data

        if (employees.length === 0) {
            userDetailsDiv.innerHTML = "<p>No employees found.</p>";
            return;
        }

        let tableHeaders = Object.keys(employees[0]).map(field => `<th>${field}</th>`).join('');
        tableHeaders += '<th>Actions</th>';  // Add Actions column

        let tableRows = employees.map(employee => {
            const rowData = Object.values(employee).map(value => `<td>${value}</td>`).join('');
            return `<tr>${rowData}<td><button onclick="removeEmployee('${employee._id}')">Remove</button></td></tr>`;
        }).join('');

        const employeeTable = `
            <h3>Employee Details</h3>
            <table border="1">
                <tr>${tableHeaders}</tr>
                ${tableRows}
            </table>
            <button onclick="addEmployee()">Add New Employee</button>
        `;

        userDetailsDiv.innerHTML = employeeTable;
    } catch (error) {
        console.error('Error loading employee data:', error);
        userDetailsDiv.innerHTML = `<p>Error loading employee data.</p>`;
    }
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
        tableHeaders += '<th>Actions</th>';  // Add Actions column

        let tableRows = trainers.map(trainer => {
            const rowData = Object.values(trainer).map(value => `<td>${value}</td>`).join('');
            return `<tr>${rowData}<td><button onclick="removeTrainer('${trainer._id}')">Remove</button></td></tr>`;
        }).join('');

        const trainerTable = `
            <h3>Trainer Details</h3>
            <table border="1">
                <tr>${tableHeaders}</tr>
                ${tableRows}
            </table>
            <button onclick="addTrainer()">Add New Trainer</button>
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
        tableHeaders += '<th>Actions</th>';  // Add Actions column

        let tableRows = primeMembers.map(member => {
            const rowData = Object.values(member).map(value => `<td>${value}</td>`).join('');
            return `<tr>${rowData}<td><button onclick="removePrimeMember('${member._id}')">Remove</button></td></tr>`;
        }).join('');

        const primeMemberTable = `
            <h3>Prime Member Details</h3>
            <table border="1">
                <tr>${tableHeaders}</tr>
                ${tableRows}
            </table>
            <button onclick="addPrimeMember()">Add New Prime Member</button>
        `;

        userDetailsDiv.innerHTML = primeMemberTable;
    } catch (error) {
        console.error('Error loading prime member data:', error);
        userDetailsDiv.innerHTML = `<p>Error loading prime member data.</p>`;
    }
}

// Functions to handle adding/removing of Employees, Trainers, and Prime Members

// Add new employee
async function addEmployee() {
    const name = prompt('Enter employee name:');
    const email = prompt('Enter employee email:');
    const phone = prompt('Enter employee phone:');
    const password = prompt('Enter employee password:');

    if (name && email && phone && password) {
        try {
            const response = await fetch('/signup/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeName: name, employeeEmail: email, employeePhone: phone, employeePassword: password })
            });

            if (response.ok) {
                alert('Employee added successfully');
                loadEmployeeDetails();  // Reload employee details after adding
            } else {
                alert('Error adding employee');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    }
}

// Remove employee by ID
async function removeEmployee(id) {
    if (confirm('Are you sure you want to remove this employee?')) {
        try {
            const response = await fetch(`/employees/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Employee removed successfully');
                loadEmployeeDetails();  // Reload employee details after removal
            } else {
                alert('Error removing employee');
            }
        } catch (error) {
            console.error('Error removing employee:', error);
        }
    }
}

// Add new trainer
async function addTrainer() {
    const name = prompt('Enter trainer name:');
    const specialization = prompt('Enter trainer specialization:');

    if (name && specialization) {
        try {
            const response = await fetch('/signup/trainer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trainerName: name, trainerSpecialization: specialization })
            });

            if (response.ok) {
                alert('Trainer added successfully');
                loadTrainerDetails();  // Reload trainer details after adding
            } else {
                alert('Error adding trainer');
            }
        } catch (error) {
            console.error('Error adding trainer:', error);
        }
    }
}

// Remove trainer by ID
async function removeTrainer(id) {
    if (confirm('Are you sure you want to remove this trainer?')) {
        try {
            const response = await fetch(`/trainers/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Trainer removed successfully');
                loadTrainerDetails();  // Reload trainer details after removal
            } else {
                alert('Error removing trainer');
            }
        } catch (error) {
            console.error('Error removing trainer:', error);
        }
    }
}

// Add new prime member
async function addPrimeMember() {
    const name = prompt('Enter prime member name:');
    const email = prompt('Enter prime member email:');
    const phone = prompt('Enter prime member phone number:');
    const password = prompt('Enter prime member password:');
    const subscription_fees = prompt('Enter subscription fees:');
    const createdAt = new Date();  // Automatically set the current date as the createdAt field

    if (name && email && phone && password && subscription_fees) {
        try {
            const response = await fetch('/signup/prime-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    createdAt: createdAt,
                    subscription_fees: subscription_fees
                })
            });

            if (response.ok) {
                alert('Prime member added successfully');
                loadPrimeMemberDetails();  // Reload prime member details after adding
            } else {
                alert('Error adding prime member');
            }
        } catch (error) {
            console.error('Error adding prime member:', error);
        }
    } else {
        alert('All fields are required.');
    }
}



// Remove prime member by ID
async function removePrimeMember(id) {
    if (confirm('Are you sure you want to remove this prime member?')) {
        try {
            const response = await fetch(`/prime-members/${id}`, { method: 'DELETE' });

            if (response.ok) {
                alert('Prime member removed successfully');
                loadPrimeMemberDetails();  // Reload prime member details after removal
            } else {
                alert('Error removing prime member');
            }
        } catch (error) {
            console.error('Error removing prime member:', error);
        }
    }
}
