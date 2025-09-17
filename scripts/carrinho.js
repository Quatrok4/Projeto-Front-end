const btnToggle = document.getElementById("toggleCarrinho");
const carrinho = document.getElementById("carrinho");
const btnFechar = document.getElementById("fecharCarrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalEl = document.getElementById("total");
const qtdEl = document.getElementById("quantidade");

let carrinhoItens = [];

// Abrir carrinho
btnToggle.addEventListener("click", () => {
  carrinho.classList.add("ativo");
});

// Fechar carrinho
btnFechar.addEventListener("click", () => {
  carrinho.classList.remove("ativo");
});

// Adicionar ao carrinho
document.querySelectorAll(".add-carrinho").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const produto = btn.parentElement;
    const nome = produto.querySelector("h3").innerText;
    const preco = parseFloat(produto.querySelector(".preco").innerText);

    // Verifica se já existe
    const itemExistente = carrinhoItens.find(item => item.nome === nome);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinhoItens.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
  });
});

// Atualizar carrinho
function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  let quantidade = 0;

  carrinhoItens.forEach((item, i) => {
    total += item.preco * item.quantidade;
    quantidade += item.quantidade;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button onclick="removerItem(${i})">X</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalEl.innerText = total.toFixed(2);
  qtdEl.innerText = quantidade;
}

// Remover item
function removerItem(index) {
  carrinhoItens.splice(index, 1);
  atualizarCarrinho();
}
