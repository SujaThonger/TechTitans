document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/trainers/count');
        const data = await response.json();

        // Update the total trainers count in the HTML
        document.getElementById('total-trainers').textContent = data.count;
    } catch (error) {
        console.error('Error fetching trainers count:', error);
        document.getElementById('total-trainers').textContent = 'Error loading data';
    }
});