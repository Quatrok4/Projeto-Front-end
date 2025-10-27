// Rola até a seção de produtos
function verProdutos() {
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}

// Exemplo de alerta ao clicar em comprar
document.addEventListener("DOMContentLoaded", () => {
  const botoesComprar = document.querySelectorAll(".card button");

  botoesComprar.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Produto adicionado ao carrinho!");
    });
  });
});



const chatContainer = document.getElementById("chat-container");
const chatIcon = document.getElementById("chat-icon");
const closeChat = document.getElementById("close-chat");
const chatBox = document.getElementById("chat-box");
const select = document.getElementById("question-select");
const sendBtn = document.getElementById("send-btn");

const respostas = {
  frete: "🚚 Trabalhamos com Correios e transportadora. O frete é calculado conforme o CEP e o peso do pedido.",
  tamanhos: "📏 Temos tamanhos do PP ao GG. Alguns modelos contam também com numeração especial.",
  troca: "🔄 As trocas podem ser feitas em até 7 dias após o recebimento, desde que o produto esteja sem uso.",
  pagamento: "💳 Aceitamos Pix, cartão de crédito, boleto bancário e PayPal.",
  promocoes: "🎉 Sim! Confira nossa aba de Promoções — temos descontos de até 50% em produtos selecionados!"
};

// Abrir o chat
chatIcon.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatIcon.style.display = "none";
});

// Fechar o chat
closeChat.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatIcon.style.display = "flex";
});

// Enviar pergunta
sendBtn.addEventListener("click", () => {
  const perguntaSelecionada = select.value;
  if (!perguntaSelecionada) return;

  const textoPergunta = select.options[select.selectedIndex].text;
  adicionarMensagemUsuario(textoPergunta);

  mostrarDigitando();

  setTimeout(() => {
    removerDigitando();
    adicionarMensagemBot(respostas[perguntaSelecionada]);
  }, 1500);

  select.value = "";
});

// Funções de mensagens
function adicionarMensagemUsuario(texto) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function adicionarMensagemBot(texto) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.textContent = texto;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function mostrarDigitando() {
  const div = document.createElement("div");
  div.className = "bot-message typing";
  div.id = "typing";
  div.textContent = "Assistente está digitando...";
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removerDigitando() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}