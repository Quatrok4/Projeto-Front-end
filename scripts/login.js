
const form = document.querySelector("form");
const container = document.querySelector(".form-box");

// Função para gerar código 2FA (6 dígitos)
function gerarCodigo2FA() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Variáveis globais
let codigoAtual2FA = null;
let usuarioAtual = null;

// Cria o modal de 2FA
const modal2FA = document.createElement("div");
modal2FA.id = "modal2FA";
modal2FA.style.display = "none";
modal2FA.innerHTML = `
  <div class="modal2FA-content">
    <h2>Autenticação de Dois Fatores</h2>
    <p>Digite o código enviado para seu e-mail (simulado no console)</p>
    <input type="text" id="codigo2FA" placeholder="Código 2FA" required>
    <div class="botoes">
      <button id="btnConfirmar2FA">Confirmar</button>
      <button id="btnCancelar2FA">Cancelar</button>
    </div>
    <p id="erro2FA" style="color:red; display:none;">Código inválido. Tente novamente.</p>
  </div>
`;
container.appendChild(modal2FA);

// Estilos básicos para o modal (pode ajustar no CSS)
const style = document.createElement("style");
style.textContent = `
#modal2FA {
  position: fixed;
  top:0; left:0;
  width:100%; height:100%;
  background: rgba(0,0,0,0.6);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index: 9999;
}
.modal2FA-content {
  background:#fff;
  padding:2rem;
  border-radius:10px;
  text-align:center;
  width:300px;
}
.modal2FA-content input {
  width:80%;
  padding:0.5rem;
  margin:1rem 0;
  border-radius:5px;
  border:1px solid #ccc;
}
.modal2FA-content .botoes button {
  margin:0 0.5rem;
  padding:0.5rem 1rem;
  border:none;
  border-radius:5px;
  cursor:pointer;
}
.modal2FA-content .botoes button:hover {
  opacity:0.9;
}
`;
document.head.appendChild(style);

// Login com 2FA
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = form.querySelector("input[type='email']").value;
  const senha = form.querySelector("input[type='password']").value;

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    showErro("Usuário ou senha inválidos!");
    return;
  }

  usuarioAtual = usuario;
  codigoAtual2FA = gerarCodigo2FA();
  console.log("Código 2FA (simulado):", codigoAtual2FA);

  // Exibe modal 2FA
  modal2FA.style.display = "flex";
});

// Botões do modal 2FA
document.getElementById("btnConfirmar2FA").addEventListener("click", () => {
  const codigoInserido = document.getElementById("codigo2FA").value;
  const erroMsg = document.getElementById("erro2FA");

  if (codigoInserido === codigoAtual2FA.toString()) {
    modal2FA.style.display = "none";
    container.innerHTML = `<h2 style="color:green;">✅ Login bem-sucedido! Bem-vindo, ${usuarioAtual.email}</h2>`;
    setTimeout(() => window.location.href = "index.html", 1500); // redireciona
  } else {
    erroMsg.style.display = "block";
  }
});

// Cancelar 2FA
document.getElementById("btnCancelar2FA").addEventListener("click", () => {
  modal2FA.style.display = "none";
});

// Função para exibir erro no login
function showErro(mensagem) {
  let erro = container.querySelector(".erroLogin");
  if (!erro) {
    erro = document.createElement("p");
    erro.className = "erroLogin";
    erro.style.color = "red";
    container.appendChild(erro);
  }
  erro.textContent = mensagem;
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const inputEmail = form.querySelector("input[type='email']");
const inputSenha = form.querySelector("input[type='password']");
const btnEsqueci = document.getElementById("btnEsqueci");

// Função para buscar usuários
function getUsuarios() {
  const usuarios = localStorage.getItem("usuarios");
  return usuarios ? JSON.parse(usuarios) : [];
}



const modalSenha = document.getElementById("modalSenha");
const mensagemSenha = document.getElementById("mensagemSenha");
const fecharModal = document.getElementById("fecharModal");

// Esqueci minha senha
btnEsqueci.addEventListener("click", function() {
  const email = prompt("Digite seu e-mail cadastrado:");
  if (!email) return;

  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.email === email.trim());

  if (!usuario) {
    mensagemSenha.textContent = "E-mail não encontrado!";
  } else {
    mensagemSenha.textContent = `Sua senha é: ${usuario.senha}`;
  }

  modalSenha.style.display = "flex";
});

// Fechar modal
fecharModal.addEventListener("click", () => {
  modalSenha.style.display = "none";
});

// Fechar modal clicando fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modalSenha) {
    modalSenha.style.display = "none";
  }
});
;