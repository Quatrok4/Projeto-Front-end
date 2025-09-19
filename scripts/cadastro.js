// Seleciona o formulário
const form = document.querySelector("form");

// Função para pegar usuários salvos no localStorage
function getUsuarios() {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
}

// Função para salvar usuários no localStorage
function setUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Manipulação do submit
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = form.querySelector("input[type='text']").value.trim();
  const email = form.querySelector("input[type='email']").value.trim();
  const senha = form.querySelector("input[type='password']").value;
  const confirmarSenha = form.querySelectorAll("input[type='password']")[1].value;

  // Valida senhas
  if (senha !== confirmarSenha) {
    mostrarErro("As senhas não conferem!");
    return;
  }

  // Verifica se o e-mail já está cadastrado
  const usuarios = getUsuarios();
  if (usuarios.find(u => u.email === email)) {
    mostrarErro("E-mail já cadastrado!");
    return;
  }

  // Salva usuário
  usuarios.push({ nome, email, senha });
  setUsuarios(usuarios);

  // Mensagem de sucesso e redireciona
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
});

// Função para mostrar erro dentro do formulário
function mostrarErro(msg) {
  let erro = form.querySelector(".erro");
  if (!erro) {
    erro = document.createElement("p");
    erro.className = "erro";
    erro.style.color = "red";
    form.appendChild(erro);
  }
  erro.textContent = msg;
}