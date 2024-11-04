
async function fetchTotalSales() {
    try {
        // Fetch the total subscription fees from the API
        const response = await fetch('/prime-members/subscription-sum');
        const data = await response.json();

        // Update the text inside the <p> element with the fetched total
        document.getElementById('total-sales').textContent = `₹${data.total}`;
    } catch (error) {
        console.error('Error fetching total sales:', error);
    }
}

// Call the function when the page loads
fetchTotalSales();
