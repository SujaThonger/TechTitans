
// Function to handle profile photo upload when "Change Photo" is clicked
    document.getElementById('change-photo').addEventListener('click', function () {
        // Trigger the hidden file input click to change the photo
        document.getElementById('file-input').click();
});

    document.getElementById('file-input').addEventListener('change', function (event) {
    // Get the selected file
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

    reader.onload = function (e) {
        // Set the profile image src to the uploaded image
        document.getElementById('profile-img').src = e.target.result;

    // Save the image to localStorage
    localStorage.setItem('profileImage', e.target.result);
        };

    // Read the file as a Data URL (Base64)
    reader.readAsDataURL(file);
    }
});

    // Load the saved profile photo on page load
    document.addEventListener('DOMContentLoaded', function () {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        document.getElementById('profile-img').src = savedImage;
    }
});

