document.addEventListener('DOMContentLoaded', function () {
    const analyticsLink = document.getElementById('analytics-section');

    analyticsLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        loadAnalyticsPage();     // Load analytics content
    });

    function loadAnalyticsPage() {
        const mainContent = document.getElementById('main-content');

        // Clear the current content
        mainContent.innerHTML = '';

        // Create a container for the analytics charts
        const analyticsContainer = document.createElement('div');
        analyticsContainer.className = 'analytics-container';

        // Add HTML for analytics page dynamically
        analyticsContainer.innerHTML = `
            <h3>Employee and Prime Customer Analytics</h3>
            <div class="employee-metrics">
                <h4>Employee Metrics</h4>
                <canvas id="employee-chart"></canvas>
            </div>
            <div class="prime-member-metrics">
                <h4>Prime Member Metrics</h4>
                <canvas id="prime-member-chart"></canvas>
            </div>
        `;

        mainContent.appendChild(analyticsContainer);

        // Fetch data and load charts initially
        fetchEmployeeAndPrimeMemberData();

        // Set auto-refresh every 30 seconds
        setInterval(fetchEmployeeAndPrimeMemberData, 10000);
    }

    // Fetch data for both employees and prime members from the server
    async function fetchEmployeeAndPrimeMemberData() {
        try {
            const employeeResponse = await fetch('http://localhost:4000/employees');
            const primeMemberResponse = await fetch('http://localhost:4000/prime-members/count');

            const employees = await employeeResponse.json();
            const primeMembers = await primeMemberResponse.json();

            console.log("Employees Data:", employees);
            console.log("Prime Members Data:", primeMembers);

            const employeeData = processEmployeeData(employees);
            const primeMemberData = processPrimeMemberData(primeMembers);

            loadEmployeeChart(employeeData); // Load employee chart
            loadPrimeMemberChart(primeMemberData); // Load prime member chart
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Process employee data for chart plotting (same logic as before)
    function processEmployeeData(employees) {
        const labels = [];
        const employeeAdditions = [];
        const employeeRemovals = [];

        employees.forEach(employee => {
            labels.push(employee.createdAt.substring(0, 10));
            employeeAdditions.push(1);
            if (employee.leftDate) {
                employeeRemovals.push(-1);
            } else {
                employeeRemovals.push(0);
            }
        });

        return { labels, employeeAdditions, employeeRemovals };
    }

    // Process prime member data for chart plotting
    function processPrimeMemberData(primeMemberData) {
        const labels = ['Prime Members'];
        const primeMemberAdditions = [primeMemberData.count]; // Use the total prime members count
        return { labels, primeMemberAdditions };
    }

    function loadEmployeeChart(data) {
        const ctx = document.getElementById('employee-chart').getContext('2d');

        // Destroy previous chart if it exists to prevent overlap
        if (window.employeeChart) {
            window.employeeChart.destroy();
        }

        // Create gradient for line color transition
        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
        gradient.addColorStop(0, 'rgba(255, 206, 86, 1)'); // Start with yellow
        gradient.addColorStop(0.5, 'rgba(75, 192, 192, 1)'); // Transition to green
        gradient.addColorStop(1, 'rgba(54, 162, 235, 1)'); // End with blue

        // Prepare dataset for cumulative changes
        const cumulativeChanges = [];
        let currentTotal = 0;

        // Process cumulative data
        data.employeeAdditions.forEach((addition, index) => {
            currentTotal += addition + data.employeeRemovals[index]; // Update total
            cumulativeChanges.push(currentTotal);
        });

        // Define chart configuration
        window.employeeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Employee Count',
                        data: cumulativeChanges,
                        backgroundColor: gradient, // Use gradient for fill
                        borderColor: gradient, // Use gradient for line
                        borderWidth: 2,
                        fill: false, // No fill, just line
                        tension: 0.4, // Smooth curve
                        pointRadius: 4, // Points on the line
                        pointHoverRadius: 6, // Increase on hover
                        borderDash: [5, 5], // Apply dashed line effect
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 1000, // Smooth transition
                    easing: 'easeInOutCubic'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cumulative Employee Count',
                            color: '#666',
                            font: {
                                size: 16
                            }
                        },
                        ticks: {
                            precision: 0, // Whole numbers only
                            color: '#333'
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            lineWidth: 1
                        }
                    },
                    x: {
                        ticks: {
                            color: '#333'
                        },
                        grid: {
                            display: false // Hide vertical grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#444',
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: gradient,
                        borderWidth: 1
                    }
                }
            }
        });

        // Dynamically update chart every few seconds
        async function updateEmployeeChart() {
            try {
                const response = await fetch('http://localhost:4000/employee');
                const employees = await response.json();

                // Calculate new additions or removals
                const newData = processEmployeeData(employees);
                const updatedTotal = cumulativeChanges[cumulativeChanges.length - 1] + (newData.employeeAdditions[0] + newData.employeeRemovals[0]);

                // Add new data point
                const newLabel = `Update ${data.labels.length + 1}`;
                data.labels.push(newLabel);
                cumulativeChanges.push(updatedTotal);

                // If more than 10 data points, remove the oldest one
                if (data.labels.length > 10) {
                    data.labels.shift();
                    cumulativeChanges.shift();
                }

                // Update chart
                window.employeeChart.update();
            } catch (error) {
                console.error('Error updating employee chart:', error);
            }
        }

        // Auto-update the chart periodically (every 5 seconds)
        setInterval(updateEmployeeChart, 5000);
    }


    function loadPrimeMemberChart(data) {
        const ctx = document.getElementById('prime-member-chart').getContext('2d');

        // Destroy previous chart if it exists to prevent overlap
        if (window.primeMemberChart) {
            window.primeMemberChart.destroy();
        }

        // Gradient color setup
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75, 192, 192, 0.6)');
        gradient.addColorStop(1, 'rgba(153, 102, 255, 0.6)');

        // Border and hover color setup
        const borderColor = 'rgba(75, 192, 192, 1)';
        const hoverColor = 'rgba(75, 192, 192, 0.8)';

        // Initialize chart data
        const chartData = {
            labels: [], // X-axis labels
            datasets: [{
                label: 'Prime Members Count',
                data: [], // This will hold the actual count
                backgroundColor: gradient, // Apply gradient
                borderColor: borderColor,
                borderWidth: 1,
                hoverBackgroundColor: hoverColor,
                hoverBorderColor: borderColor
            }]
        };

        // Dynamically add data points to the chart
        async function updateChart() {
            try {
                // Fetch the latest prime member count from the server
                const primeMemberResponse = await fetch('http://localhost:4000/prime-members/count');
                const primeMembers = await primeMemberResponse.json();
                const newPrimeMemberCount = primeMembers.count; // Get the real-time prime member count

                const newLabel = `Update ${chartData.labels.length + 1}`; // Label for the new data point

                // Add the new data and corresponding color
                chartData.labels.push(newLabel); // Add a new label for the X-axis
                chartData.datasets[0].data.push(newPrimeMemberCount); // Add the real-time data value

                // If there are more than 10 data points, remove the oldest one
                if (chartData.labels.length > 10) {
                    chartData.labels.shift();
                    chartData.datasets[0].data.shift();
                }

                // Update the chart with new data
                window.primeMemberChart.update();
            } catch (error) {
                console.error('Error fetching prime member data:', error);
            }
        }

        // Create the initial chart
        window.primeMemberChart = new Chart(ctx, {
            type: 'bar', // Bar chart
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true, // Maintain the aspect ratio
                animation: {
                    duration: 1000, // Smooth animations
                    easing: 'easeInOutQuad'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Prime Members Count',
                            color: '#666',
                            font: {
                                size: 16
                            }
                        },
                        ticks: {
                            precision: 0, // Ensure whole numbers on Y-axis
                            color: '#333'
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)',
                            lineWidth: 1
                        }
                    },
                    x: {
                        ticks: {
                            color: '#333'
                        },
                        grid: {
                            display: false // Hide vertical grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom', // Move the legend to the bottom
                        labels: {
                            color: '#444', // Darker text color
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker tooltip background
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: borderColor,
                        borderWidth: 1
                    }
                }
            }
        });

        // Simulate adding new data every 3 seconds (adjust the interval as needed)
        setInterval(updateChart, 1000);
    }
});