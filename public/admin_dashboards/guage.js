// Set up the initial chart configuration
let speedData = {
    labels: [], // X-axis labels (time or intervals)
    datasets: [{
        label: 'Internet Speed (Mbps)',
        borderColor: 'rgba(52, 152, 219, 1)',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        data: [] // Speed data points
    }]
};

let speedChartOptions = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Speed (Mbps)'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Time (s)'
            }
        }
    }
};

// Create the chart
let ctx = document.getElementById('speedChart').getContext('2d');
let speedChart = new Chart(ctx, {
    type: 'line',
    data: speedData,
    options: speedChartOptions
});

// Function to simulate and update speed data
function checkSpeed() {
    let speed = Math.random() * 100; // Simulate random speed (replace with actual speed fetching logic)

    // Update the chart with new data
    let currentTime = new Date().toLocaleTimeString(); // Current time as label
    speedData.labels.push(currentTime); // Add new time point to X-axis
    speedData.datasets[0].data.push(speed); // Add new speed value to Y-axis

    // Limit the number of data points shown to the last 10
    if (speedData.labels.length > 10) {
        speedData.labels.shift(); // Remove the first label (oldest)
        speedData.datasets[0].data.shift(); // Remove the first data point (oldest)
    }

    // Update the chart
    speedChart.update();

    // Update the text output
    document.getElementById('speed-output').textContent = `Current Speed: ${speed.toFixed(2)} Mbps`;
}
