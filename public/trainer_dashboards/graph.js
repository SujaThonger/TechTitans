

document.addEventListener('DOMContentLoaded', function () {
    const ctxAnalytics = document.getElementById('analytics-chart').getContext('2d');

    // Initialize the Chart.js bar chart
    const analyticsChart = new Chart(ctxAnalytics, {
        type: 'bar',
        data: {
            labels: [
                'Memory Usage (MB)',
                'DOM Load Time (ms)',
                'Network Latency (ms)',
                'First Contentful Paint (ms)',
                'Time to Interactive (ms)',
                'JS Heap Size (MB)',
                'Frame Rate (FPS)'
            ],
            datasets: [{
                label: 'System Performance',
                data: [0, 0, 0, 0, 0, 0, 0], // Placeholder values to be updated dynamically
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(99, 255, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(99, 255, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to get browser performance data
    function getPerformanceData() {
        const performanceTiming = window.performance.timing;
        const memoryUsage = window.performance.memory ? window.performance.memory.usedJSHeapSize / (1024 * 1024) : 0; // Convert to MB
        const domLoadTime = performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart;
        const networkLatency = performanceTiming.responseEnd - performanceTiming.requestStart;
        const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
        const timeToInteractive = performanceTiming.domInteractive - performanceTiming.navigationStart;
        const jsHeapSize = window.performance.memory ? window.performance.memory.totalJSHeapSize / (1024 * 1024) : 0;
        const frameRate = calculateFrameRate();

        return {
            memoryUsage: memoryUsage.toFixed(2),         // Memory usage in MB
            domLoadTime: domLoadTime.toFixed(2),         // Time to DOM content load in ms
            networkLatency: networkLatency.toFixed(2),   // Network latency in ms
            firstContentfulPaint: firstContentfulPaint.toFixed(2), // Time to first contentful paint
            timeToInteractive: timeToInteractive.toFixed(2),       // Time to interactive in ms
            jsHeapSize: jsHeapSize.toFixed(2),           // JS Heap size in MB
            frameRate: frameRate.toFixed(2)              // Frame rate in FPS
        };
    }

    // Function to calculate frame rate (FPS)
    function calculateFrameRate() {
        let frameTimes = [];
        let lastFrameTime = performance.now();

        function updateFrameRate() {
            const currentFrameTime = performance.now();
            const frameTime = currentFrameTime - lastFrameTime;
            lastFrameTime = currentFrameTime;
            frameTimes.push(frameTime);

            if (frameTimes.length > 100) {
                frameTimes.shift();
            }

            const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
            return 1000 / avgFrameTime; // Convert to frames per second (FPS)
        }

        return updateFrameRate();
    }

    // Function to update the chart with performance data every 5 seconds
    function updateChart() {
        const performanceData = getPerformanceData();

        // Update the chart data
        analyticsChart.data.datasets[0].data = [
            performanceData.memoryUsage,
            performanceData.domLoadTime,
            performanceData.networkLatency,
            performanceData.firstContentfulPaint,
            performanceData.timeToInteractive,
            performanceData.jsHeapSize,
            performanceData.frameRate
        ];

        // Refresh the chart
        analyticsChart.update();
    }

    // Set interval to update the chart every 5 seconds
    setInterval(updateChart, 1000);
});
