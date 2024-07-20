// scripts.js
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
    } else {
        errorMessage.textContent = '';

        // Here you can add your logic to handle the form submission,
        // for example, sending the data to the server.

        // Example:
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: password
        };
        
        console.log('Form data:', formData);
        // Submit the form data to the server or perform desired actions.
    }
});

function togglePassword(fieldId, toggleIcon) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
        toggleIcon.innerHTML = '&#128065;&#xFE0E;'; // Eye icon
    } else {
        field.type = 'password';
        toggleIcon.innerHTML = '&#128065;&#xFE0E;'; // Cancelled eye icon 
    }
}
