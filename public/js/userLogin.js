// Collect values from the login form and make POST requests
const loginFormHandler = async (e) => {
    e.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Invalid login');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.');
      }
    } else {
      alert('Please provide a username and password.');
    }
  };
  
  // Collect values from the signup form and make POST requests
  const signupFormHandler = async (e) => {
    e.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Invalid signup');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up. Please try again.');
      }
    } else {
      alert('Please provide a username, email, and password.');
    }
  };
  
  // Add event listeners to login and signup forms
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
