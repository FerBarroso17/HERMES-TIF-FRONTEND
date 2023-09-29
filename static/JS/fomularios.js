document.addEventListener("DOMContentLoaded", () => {
    const userProfileButtons = document.querySelectorAll(".user-button");
    const userPopup = document.querySelector(".user-popup");

    userProfileButtons.forEach(button => {
        button.addEventListener("click", () => {
            
            console.log(`Se hizo clic en el botón del usuario con ID ${usuarioID}`);
            
            userPopup.style.display = "block";
        });
    });

    
    const closeUserProfileButton = document.getElementById("closeUserProfile");
    closeUserProfileButton.addEventListener("click", () => {
        userPopup.style.display = "none";
    });
});
