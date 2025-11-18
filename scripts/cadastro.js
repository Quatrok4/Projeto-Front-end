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


// Seleciona os inputs de senha
const senhaInput = document.querySelector('input[placeholder="Senha"]');
const confirmarSenhaInput = document.querySelector('input[placeholder="Confirmar senha"]');

// Cria o box de validação visual
const validatorBox = document.createElement('div');
validatorBox.classList.add('validator-box');
validatorBox.innerHTML = `
  <p id="val-maiuscula">❌ Pelo menos 1 letra maiúscula</p>
  <p id="val-minuscula">❌ Pelo menos 1 letra minúscula</p>
  <p id="val-numero">❌ Pelo menos 1 número</p>
  <p id="val-especial">❌ Pelo menos 1 caractere especial (!@#$%&*)</p>
  <p id="val-tamanho">❌ Mínimo de 8 caracteres</p>
`;
senhaInput.insertAdjacentElement("afterend", validatorBox);

// Função de validação
function validarSenha() {
  const senha = senhaInput.value;

  // Verificações
  const maiuscula = /[A-Z]/.test(senha);
  const minuscula = /[a-z]/.test(senha);
  const numero = /[0-9]/.test(senha);
  const especial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  const tamanho = senha.length >= 8;

  // Atualiza visual
  document.getElementById("val-maiuscula").textContent = (maiuscula ? "✔" : "❌") + " Pelo menos 1 letra maiúscula";
  document.getElementById("val-minuscula").textContent = (minuscula ? "✔" : "❌") + " Pelo menos 1 letra minúscula";
  document.getElementById("val-numero").textContent = (numero ? "✔" : "❌") + " Pelo menos 1 número";
  document.getElementById("val-especial").textContent = (especial ? "✔" : "❌") + " Pelo menos 1 caractere especial (!@#$%&*)";
  document.getElementById("val-tamanho").textContent = (tamanho ? "✔" : "❌") + " Mínimo de 8 caracteres";

  // Retorna se tudo passou
  return maiuscula && minuscula && numero && especial && tamanho;
}

senhaInput.addEventListener("input", validarSenha);

form.addEventListener("submit", function(e) {
  if (!validarSenha()) {
    e.preventDefault();
    alert("A senha não atende todos os requisitos!");
    return;
  }

  // Validação da confirmação de senha
  if (senhaInput.value !== confirmarSenhaInput.value) {
    e.preventDefault();
    alert("As senhas não coincidem!");
  }
});
