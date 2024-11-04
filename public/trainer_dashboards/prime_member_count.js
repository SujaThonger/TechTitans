async function updatePrimeMembersCount() {
    try {
        const response = await fetch('/prime-members/count');
        const data = await response.json();

        if (data && data.count !== undefined) {
            console.log('Prime members count:', data.count); // Added for debugging
            document.getElementById('prime-members-count').innerText = data.count;
        } else {
            console.error('Invalid response format:', data);
            document.getElementById('prime-members-count').innerText = 'Error loading count';
        }
    } catch (error) {
        console.error('Error fetching prime members count:', error);
        document.getElementById('prime-members-count').innerText = 'Error fetching data';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updatePrimeMembersCount();
    setInterval(updatePrimeMembersCount, 30000); // Refresh every 30 seconds
});
