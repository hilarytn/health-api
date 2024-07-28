// // scripts.js
// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
//     const errorMessage = document.getElementById('error-message');

//     if (password !== confirmPassword) {
//         errorMessage.textContent = 'Passwords do not match';
//     } else {
//         errorMessage.textContent = '';

//         // Here you can add your logic to handle the form submission,
//         // for example, sending the data to the server.

//         // Example:
//         const formData = {
//             username: document.getElementById('username').value,
//             email: document.getElementById('email').value,
//             password: password
//         };
        
//         console.log('Form data:', formData);
//         // Submit the form data to the server or perform desired actions.
//     }
// });

// function togglePassword(fieldId, toggleIcon) {
//     const field = document.getElementById(fieldId);
//     if (field.type === 'password') {
//         field.type = 'text';
//         toggleIcon.innerHTML = '&#128065;&#xFE0E;'; // Eye icon
//     } else {
//         field.type = 'password';
//         toggleIcon.innerHTML = '&#128065;&#xFE0E;'; // Cancelled eye icon 
//     }
// }


document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('error-message').innerText = 'Passwords do not match';
        return;
    }

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.status === 201) {
        alert('Registration successful!');
        window.location.href = '/login';
    } else {
        document.getElementById('error-message').innerText = data.message;
    }
});

function togglePassword(fieldId, toggleElement) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
        toggleElement.innerHTML = '&#128064;'; // 👀 (eye open)
    } else {
        field.type = 'password';
        toggleElement.innerHTML = '&#128065;'; // 👁️ (eye closed)
    }
}
