
function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function parseBRL(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

function atualizarCalculo() {
  const valor = parseBRL(document.getElementById("valor").value);
  const prazo = parseFloat(document.getElementById("prazo").value) || 0;
  const taxa = parseBRL(document.getElementById("taxa").value) / 100;
  const nivel = parseFloat(document.getElementById("parceria").value) || 0;

  const desagio = valor * (prazo / 30) * taxa;
  const comissao = desagio * nivel;

  document.getElementById("desagio").textContent = formatBRL(desagio);
  document.getElementById("comissao").textContent = formatBRL(comissao);
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calc-form").addEventListener("input", atualizarCalculo);
});
