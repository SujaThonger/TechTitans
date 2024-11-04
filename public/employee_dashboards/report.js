// Function to create and show the modal for selecting format
function showFormatModal(callback) {
    // Create the modal HTML elements
    const modal = document.createElement('div');
    modal.id = 'formatModal';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.textAlign = 'center';

    const title = document.createElement('h2');
    title.textContent = 'Download CSV Report';
    modalContent.appendChild(title);

    // Create button for CSV only
    const button = document.createElement('button');
    button.textContent = 'CSV';
    button.style.margin = '10px';
    button.addEventListener('click', () => {
        document.body.removeChild(modal);  // Remove modal on format selection
        callback('csv');  // Call the callback with the selected format (CSV only)
    });
    modalContent.appendChild(button);

    // Append content to the modal and modal to the body
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Function to handle downloading based on the selected report and format
function downloadReport(type) {
    showFormatModal(async (format) => {
        switch (type) {
            case 'sales':
                await downloadSalesReport(format);
                break;
            case 'collections':  // New case to download all collections from Employee DB
                await downloadCollectionsReport(format);
                break;
            default:
                console.error('Unknown report type');
        }
    });
}

// Function to download the Sales Report (CSV only)
async function downloadSalesReport(format) {
    try {
        const response = await fetch('http://localhost:4000/reports/sales', {
            headers: {
                'Accept': 'text/csv'  // CSV only
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch sales report: ${response.statusText}`);
        }

        const blob = await response.blob();
        downloadFile(blob, `Sales_Report.csv`);
    } catch (error) {
        console.error('Error generating sales report:', error.message);
    }
}

// New Function to download all collections from Employee DB (CSV only)
async function downloadCollectionsReport(format) {
    try {
        const response = await fetch('http://localhost:4000/collections', {
            headers: {
                'Accept': 'text/csv'  // CSV only
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch collections: ${response.statusText}`);
        }

        const blob = await response.blob();
        downloadFile(blob, `Collections_Report.csv`);
    } catch (error) {
        console.error('Error generating collections report:', error.message);
    }
}

// Utility function to download the file (CSV)
function downloadFile(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}
