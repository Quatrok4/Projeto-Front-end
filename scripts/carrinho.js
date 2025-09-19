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
    const precoTexto = produto.querySelector(".preco").innerText;
    const preco = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim());

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

//botao de pagar
const btnPagar = document.getElementById("pagarCarrinho");
const modal = document.getElementById("alertaCarrinho");
const fechar = document.getElementById("fecharAlerta");

btnPagar.addEventListener("click", () => {
  if (carrinhoItens.length === 0) {
    modal.style.display = "flex"; 
    return;
  }

  // Salva o carrinho e o total de forma padronizada
  localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));
  const total = carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  localStorage.setItem("carrinhoTotal", total.toFixed(2));

  window.location.href = "/pages/pagamento.html";
});

fechar.addEventListener("click", () => {
  modal.style.display = "none"; // fecha modal
});

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
      <button onclick="removerItem(${i})">❌</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalEl.innerText = total.toFixed(2);
  qtdEl.innerText = quantidade;

  // 🔹 Salva sempre usando a mesma chave
  localStorage.setItem("carrinhoTotal", total.toFixed(2));
}