let carrinho = [];

/* ================= PIZZA ================= */

function definirLimitePizza(){
  const tamanho = document.getElementById("tamanhoPizza");
  const max = tamanho.options[tamanho.selectedIndex].getAttribute("data-max");
  const checks = document.querySelectorAll(".pizza-sabores input");

  checks.forEach(c => {
    c.checked = false;
    c.disabled = false;
  });

  let selecionados = 0;
  checks.forEach(c => {
    c.addEventListener("change", () => {
      if(c.checked) selecionados++;
      else selecionados--;

      if(selecionados >= max){
        checks.forEach(x => {
          if(!x.checked) x.disabled = true;
        });
      }else{
        checks.forEach(x => x.disabled = false);
      }
    });
  });
}

function adicionarPizza(){
  const tamanho = document.getElementById("tamanhoPizza").value;
  const borda = document.getElementById("bordaPizza").value;

  const sabores = [...document.querySelectorAll(".pizza-sabores input:checked")].map(i => i.value);
  const opcoes = [...document.querySelectorAll(".opcoes-pizza input:checked")].map(i => i.value);

  if(!tamanho){
    alert("Selecione o tamanho da pizza.");
    return;
  }

  if(sabores.length === 0){
    alert("Selecione o(s) sabor(es) da pizza.");
    return;
  }

  if(!borda){
    alert("Selecione a borda da pizza.");
    return;
  }

  if(opcoes.length === 0){
    alert("Selecione uma opção da pizza.");
    return;
  }

  if(opcoes.includes("Pizza completa") && opcoes.length > 1){
    alert("Se escolher pizza completa, não marque outras opções.");
    return;
  }

  const descricao =
    `🍕 ${tamanho}\n` +
    `Sabores: ${sabores.join(" / ")}\n` +
    `Borda: ${borda}\n` +
    `Opção: ${opcoes.join(", ")}`;

  carrinho.push(descricao);
  mostrarToast();

  document.getElementById("tamanhoPizza").value = "";
  document.getElementById("bordaPizza").value = "";
  document.querySelectorAll(".pizza-sabores input, .opcoes-pizza input").forEach(i => {
    i.checked = false;
    i.disabled = false;
  });
}

/* ================= LANCHES / BEBIDAS ================= */

function addItem(item){
  carrinho.push(item);
  mostrarToast();
}

/* ================= AÇAÍ ================= */

function adicionarAcai(){
  const tamanho = document.getElementById("acaiTamanho").value;
  if(!tamanho){
    alert("Selecione o tamanho do açaí.");
    return;
  }

  const adicionais = [...document.querySelectorAll(".acai-adicionais input:checked")].map(i => i.value);

  let descricao = `🥤 ${tamanho}\nAcompanha: Leite condensado, Leite Ninho, Granola e Banana`;

  if(adicionais.length > 0){
    descricao += `\nAdicionais: ${adicionais.join(", ")}`;
  }

  carrinho.push(descricao);
  mostrarToast();

  document.getElementById("acaiTamanho").value = "";
  document.querySelectorAll(".acai-adicionais input").forEach(i => i.checked = false);
}

/* ================= SORVETE ================= */

function adicionarSorvete(){
  const valor = document.getElementById("sorveteValor").value;
  const sabores = [...document.querySelectorAll(".sorvete-sabores input:checked")].map(i => i.value);
  const coberturas = [...document.querySelectorAll(".sorvete-coberturas input:checked")].map(i => i.value);

  if(!valor){
    alert("Selecione o valor do sorvete.");
    return;
  }

  if(sabores.length === 0){
    alert("Selecione ao menos um sabor do sorvete.");
    return;
  }

  let descricao = `🍨 ${valor}\nSabor(es): ${sabores.join(", ")}`;

  if(coberturas.length > 0){
    descricao += `\nCoberturas: ${coberturas.join(", ")}`;
  }

  carrinho.push(descricao);
  mostrarToast();

  document.getElementById("sorveteValor").value = "";
  document.querySelectorAll(".sorvete-sabores input, .sorvete-coberturas input").forEach(i => i.checked = false);
}

/* ================= ENTREGA ================= */

function mostrarEndereco(){
  const tipo = document.querySelector('input[name="tipoEntrega"]:checked').value;
  const box = document.getElementById("enderecoBox");

  if(tipo === "Entrega"){
    box.style.display = "block";
  }else{
    box.style.display = "none";
  }
}

/* ================= FINALIZAR PEDIDO ================= */

function finalizarPedido(){
  if(carrinho.length === 0){
    alert("Adicione itens ao pedido.");
    return;
  }

  const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked');
  if(!tipoEntrega){
    alert("Selecione entrega ou retirada.");
    return;
  }

  let endereco = "";
  if(tipoEntrega.value === "Entrega"){
    endereco = document.getElementById("enderecoCliente").value;
    if(!endereco){
      alert("Informe o endereço para entrega.");
      return;
    }
  }

  const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');
  if(!pagamentoSelecionado){
    alert("Selecione a forma de pagamento.");
    return;
  }

  const formaPagamento = pagamentoSelecionado.value;

  let mensagem = "🍕 *Pedido - Renata Pizzaria* \n\n";
  carrinho.forEach(item => {
    mensagem += item + "\n\n";
  });

  mensagem += `📍 ${tipoEntrega.value}`;
  if(endereco) mensagem += `\nEndereço: ${endereco}`;

  mensagem += `\n💳 Forma de pagamento: ${formaPagamento}`;

  const url = "https://wa.me/5577999235843?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
}

/* ================= TOAST ================= */

function mostrarToast(){
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
/* ================= INICIALIZAÇÃO ================= */
document.addEventListener("DOMContentLoaded", () => {
  definirLimitePizza();
  mostrarEndereco();
});
