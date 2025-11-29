// js/auth.js

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Chamada REAL à API
    const result = await request('/auth/login', 'POST', { email, password, name});

    if (result && result.success) {
      localStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = 'dashboard.html';
    } else {
      alert(result.message || 'Login falhou!');
    }
  });
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function checkAuth() {
  const user = localStorage.getItem('user');
  if (!user) {
    window.location.href = 'index.html';
  }
}