document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role')
    
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const logoutButton = document.getElementById('logoutButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const dashboardButton = document.getElementById('dashboardButton');
    
    if (token && username) {
      // User is logged in
      loginButton.style.display = 'none';
      signupButton.style.display = 'none';
      logoutButton.style.display = 'inline';
      welcomeMessage.appendChild = ` ${username}`;
      dashboardButton.style.display = 'inline';
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

    dashboardButton.addEventListener('click', function() {
      if (role == 'user') window.location.href = '/patient';
      else { window.location.href = '/doctor';}
    });
  });
  