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

// Function to measure download speed
// Function to measure download speed using a locally hosted image
async function measureDownloadSpeed() {
    let startTime, endTime;
    const imageSize = 150 * 1024; // Approximate size of image in bytes (150 KB)
    const testImageUrl = '/img/ADMIN.png'; // Local image

    // Start measuring time
    startTime = new Date().getTime();

    try {
        // Fetch the image from your server
        const response = await fetch(testImageUrl, { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Wait for the image to fully load
        await response.blob();

        // End measuring time after download
        endTime = new Date().getTime();

        // Calculate speed (in Mbps)
        const duration = (endTime - startTime) / 1000; // Time taken in seconds
        const speedMbps = (imageSize * 8) / (duration * 1024 * 1024); // Speed in Mbps

        // Update the chart with new data
        let currentTime = new Date().toLocaleTimeString(); // Current time as label
        speedData.labels.push(currentTime); // Add new time point to X-axis
        speedData.datasets[0].data.push(speedMbps); // Add new speed value to Y-axis

        // Limit the number of data points shown to the last 10
        if (speedData.labels.length > 10) {
            speedData.labels.shift(); // Remove the first label (oldest)
            speedData.datasets[0].data.shift(); // Remove the first data point (oldest)
        }

        // Update the chart
        speedChart.update();

        // Update the text output
        document.getElementById('speed-output').textContent = `Current Speed: ${speedMbps.toFixed(2)} Mbps`;
    } catch (error) {
        document.getElementById('speed-output').textContent = "Error measuring speed: " + error.message;
        console.error("Speed test error:", error);
    }
}


// Function to start speed checking when button is clicked
function checkSpeed() {
    document.getElementById('speed-output').textContent = "Checking speed...";
    measureDownloadSpeed(); // Call the function to measure actual download speed

    // Call measureDownloadSpeed periodically to update the chart every 30 seconds
    setInterval(measureDownloadSpeed, 3000); // Fetch speed every 30 seconds
}