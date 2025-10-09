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
