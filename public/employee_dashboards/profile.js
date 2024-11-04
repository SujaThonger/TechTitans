document.getElementById("save-profile").addEventListener("click", function () {
    const profileData = {
        name: document.getElementById("profile-name").value,
        id: document.getElementById("profile-id").value,
        email: document.getElementById("profile-email").value,
        phone: document.getElementById("profile-phone").value,
        address: document.getElementById("profile-address").value,
        gender: document.getElementById("profile-gender").value,
        designation: document.getElementById("profile-designation").value,
        photo: document.getElementById("profile-photo").src
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile Updated Successfully!");
    window.location.href = "index.html"; // Redirect back to the main admin page
});

document.getElementById("update-photo").addEventListener("change", function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("profile-photo").src = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});

function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem("profileData"));
    if (profileData) {
        document.getElementById("profile-name").value = profileData.name;
        document.getElementById("profile-id").value = profileData.id;
        document.getElementById("profile-email").value = profileData.email;
        document.getElementById("profile-phone").value = profileData.phone;
        document.getElementById("profile-address").value = profileData.address;
        document.getElementById("profile-gender").value = profileData.gender;
        document.getElementById("profile-designation").value = profileData.designation;
        document.getElementById("profile-photo").src = profileData.photo;
    }
}

// Load profile data when page loads
document.addEventListener("DOMContentLoaded", loadProfileData);
