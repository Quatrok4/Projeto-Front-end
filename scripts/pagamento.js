// pagamento.js
// Garantindo que gerarBoleto fique global
window.gerarBoleto = function() {
  alert("📄 Boleto gerado com sucesso! (simulação)");
};

const metodos = document.querySelectorAll(".metodo");
const formCartao = document.getElementById("formCartao");
const formPix = document.getElementById("formPix");
const formBoleto = document.getElementById("formBoleto");
const btnFinalizar = document.getElementById("btnFinalizar");
const form = document.getElementById("formPagamento");
const msg = document.getElementById("successMessage");

let metodoSelecionado = "cartao";

metodos.forEach(m => {
  m.addEventListener("click", () => {
    // Remove active de todos e adiciona no selecionado
    metodos.forEach(item => item.classList.remove("active"));
    m.classList.add("active");

    metodoSelecionado = m.dataset.metodo;

    // Alterna formulários
    formCartao.style.display = metodoSelecionado === "cartao" ? "block" : "none";
    formPix.style.display = metodoSelecionado === "pix" ? "block" : "none";
    formBoleto.style.display = metodoSelecionado === "boleto" ? "block" : "none";

    btnFinalizar.style.display = metodoSelecionado === "boleto" ? "none" : "block";
  });
});

// Simulação de pagamento
form.addEventListener("submit", function(e) {
  e.preventDefault();
  form.style.display = "none";
  msg.style.display = "block";
});

// Carrinho
document.addEventListener("DOMContentLoaded", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = localStorage.getItem("carrinhoTotal") || "0.00";

  let quantidade = 0;
  carrinho.forEach(item => quantidade += item.quantidade);

  document.getElementById("qtdItens").textContent = quantidade;
  document.getElementById("totalCompra").textContent = parseFloat(total).toFixed(2).replace(".", ",");
});
