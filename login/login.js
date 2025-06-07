function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append('loginUsername', username);
  formData.append('loginPassword', password);

  fetch('/MusicalInstruments/login/includes/loginhandler.inc.php', {
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
    console.log("Successfully logged in!");
  })
  .catch(err => {
    console.error('Login failed:', err);
  });
}
