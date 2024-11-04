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
            <div class="col-md-6">
                    <div class="content-box">
                        <h4>Quiz Performance</h4>
                        <canvas id="quizPerformanceChart"></canvas>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="content-box">
                        <h4>Quiz Completion Rate</h4>
                        <canvas id="quizCompletionChart"></canvas>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="content-box">
                        <h4>Recent Quiz Results</h4>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Quiz Name</th>
                                    <th>Date Taken</th>
                                    <th>Score</th>
                                    <th>Time Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>General Knowledge</td>
                                    <td>2024-10-18</td>
                                    <td>85%</td>
                                    <td>10 minutes</td>
                                </tr>
                                <tr>
                                    <td>Science Quiz</td>
                                    <td>2024-10-17</td>
                                    <td>92%</td>
                                    <td>15 minutes</td>
                                </tr>
                                <tr>
                                    <td>History Trivia</td>
                                    <td>2024-10-16</td>
                                    <td>78%</td>
                                    <td>12 minutes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        `;

        mainContent.appendChild(analyticsContainer);

        renderCharts();
    }

    function renderCharts() {
        const performanceCtx = document.getElementById('quizPerformanceChart').getContext('2d');
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Score',
                    data: [75, 82, 88, 85],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        const completionCtx = document.getElementById('quizCompletionChart').getContext('2d');
        new Chart(completionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Incomplete'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Quiz Completion Rate'
                    }
                }
            }
        });
    }
});