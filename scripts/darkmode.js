const toggleButton = document.getElementById('dark-mode-toggle');

// Verificar preferência salva
if(localStorage.getItem('darkMode') === 'enabled'){
  document.body.classList.add('dark-mode');
  toggleButton.textContent = '☀️';
}

// Alternar modo dark ao clicar
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if(document.body.classList.contains('dark-mode')){
    localStorage.setItem('darkMode', 'enabled');
    toggleButton.textContent = '☀️'; // sol no modo dark
  } else {
    localStorage.setItem('darkMode', 'disabled');
    toggleButton.textContent = '🌙'; // lua no modo claro
  }
});