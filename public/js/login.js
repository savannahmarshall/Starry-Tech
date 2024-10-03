const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('Login form submitted');

  const username = document.querySelector('#login-form input[name="username"]').value.trim();
  const password = document.querySelector('#login-form input[name="password"]').value.trim();
  console.log('Username:', username);
  console.log('Password:', password);

  if (username && password) {
      try {
          console.log('Sending login request...');

          // Log the payload before sending the request
          const payload = { username, password };
          console.log('Payload:', JSON.stringify(payload));

          // Send a POST request to the API endpoint
          const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: { 'Content-Type': 'application/json' },
          });

          console.log('Response status:', response.status);
          if (response.ok) {
              console.log('Login successful, redirecting to dashboard');
              document.location.replace('/dashboard'); 
          } else {
              const errorResponse = await response.json();
              console.error('PASSWORD STILL DOESN"T WORK', errorResponse);
              alert('Error: ' + (errorResponse.errorMessage || 'PASSWORD STILL DOESN"T WORK'));
          }
      } catch (error) {
          console.error('Error during login:', error); 
          alert('An unexpected error occurred. Please try again.');
      }
  } else {
      console.log('Username or password is empty');
      alert('Please fill in both fields');
  }
};

// Signup Form Handler
const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('Signup form submitted');

  const username = document.querySelector('#signup-form input[name="username"]').value.trim();
  const password = document.querySelector('#signup-form input[name="password"]').value.trim();
  console.log('Signup Username:', username);
  console.log('Signup Password:', password);

  if (username && password) {
      try {
          console.log('Sending signup request...');
          const response = await fetch('/api/users/signup', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          console.log('Signup response status:', response.status);
          if (response.ok) {
              console.log('Signup successful, redirecting to dashboard');
              document.location.replace('/dashboard');
          } else {
              const errorResponse = await response.json();
              console.error('Error response:', errorResponse); 
              alert('Error: ' + (errorResponse.errorMessage || 'Error signing up. Please try again.'));
          }
      } catch (error) {
          console.error('Error during signup:', error); 
          alert('An unexpected error occurred. Please try again.');
      }
  } else {
      console.log('Signup Username or password is empty');
      alert('Please fill in both fields');
  }
};

// Attach form event listeners
document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);