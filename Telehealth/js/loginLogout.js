// document.getElementById('logoutButton').addEventListener('click', function() {
//     localStorage.removeItem('token');
//     alert('You have been logged out.');
//     window.location.href = '/login'; // Redirect to login page
//   });

//   document.getElementById('loginButton').addEventListener('click', function() {
//     window.location.href = '/login'; // Redirect to login page
//   });
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (token) {
      // User is logged in
      loginButton.style.display = 'none';
      signupButton.style.display = 'none';
      logoutButton.style.display = 'inline';
    } else {
      // User is not logged in
      loginButton.style.display = 'inline';
      signupButton.style.display = 'inline';
      logoutButton.style.display = 'none';
    }
  
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('token');
      alert('You have been logged out.');
      // Optionally, you can also redirect to the home page or login page
      window.location.href = '/';
    });
  
    loginButton.addEventListener('click', function() {
      window.location.href = '/login';
    });
  
    signupButton.addEventListener('click', function() {
      window.location.href = '/signup';
    });
  });
  