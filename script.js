const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

registerLink.onclick = () => {
  wrapper.classList.add('active');
}

loginLink.onclick = () => {
  wrapper.classList.remove('active');
}

// Function to check if a user exists
function checkUserExists(email) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(user => user.email === email);
}

// Function to handle the signup process
function signup(username, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (!checkUserExists(email)) {
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true; // Signup successful
  }
  return false; // User already exists
}

// Function to handle the login process
function login(emailOrUsername, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => (user.email === emailOrUsername || user.username === emailOrUsername));

  if (user && user.password === password) {
    return user; // Returns the user object if login is successful
  }
  return 'error'; // Returns an error message if login fails
}

// Event listener for signup form submission
document.querySelector('#signup-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const password = this.querySelector('input[type="password"]').value;

  const signupResult = signup(username, email, password);

  if (signupResult) {
    const successMessage = document.getElementById('success-message1');
    successMessage.style.display = 'block';
    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 5000);
  } else {
    const errorMessage = document.getElementById('error-message1');
    errorMessage.style.display = 'block';
    setTimeout(function() {
      errorMessage.style.display = 'none';
    }, 5000);
  }
});



// Event listener for login form submission
document.querySelector('#login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const emailOrUsername = this.querySelector('input[type="text"]').value;
  const password = this.querySelector('input[type="password"]').value;

  const loginResult = login(emailOrUsername, password);

  if (loginResult === 'error') {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    setTimeout(function() {
      errorMessage.style.display = 'none';
    }, 5000);
  } else {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 5000);
  }
});
