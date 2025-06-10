function registerUser(username, email, password) {
  const formData = new URLSearchParams();
  formData.append('registerUsername', username);
  formData.append('registerEmail', email);
  formData.append('registerPassword', password);

  fetch('/MusicalInstruments/login/includes/signuphandler.inc.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(response => {
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      return response.text();
    }
    console.log("Successfully registered!");
  })
  .catch(err => {
    console.error('Registration failed:', err);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get('success');

  if (success === 'registered') {
    const errorBox = document.getElementById('messages');
    if (errorBox) {
      errorBox.textContent = 'Successfully registered!';
      errorBox.style.color = 'green'; 
    }
  }
});