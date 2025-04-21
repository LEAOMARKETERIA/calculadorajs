
function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarMoeda(input) {
  let valor = input.value.replace(/\D/g, '');
  if (!valor) return;
  valor = (parseInt(valor) / 100).toFixed(2);
  input.value = formatBRL(parseFloat(valor));
}

function desformatarMoeda(input) {
  const onlyNumbers = input.value.replace(/[^\d]/g, '');
  input.value = onlyNumbers ? parseInt(onlyNumbers) : '';
}

function parseBRL(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

function calcularSimulacao() {
  const valor = parseBRL(document.getElementById("valor").value);
  const prazo = parseFloat(document.getElementById("prazo").value) || 0;
  const taxa = parseBRL(document.getElementById("taxa").value) / 100;
  const nivel = parseFloat(document.getElementById("parceria").value) || 0;

  const resultadoBox = document.getElementById("resultado-box");

  if (!valor || !prazo || !taxa || !nivel) {
    resultadoBox.classList.remove("mostrar");
    return;
  }

  const desagio = valor * (prazo / 30) * taxa;
  const comissao = desagio * nivel;

  document.getElementById("desagio").textContent = formatBRL(desagio);
  document.getElementById("comissao").textContent = formatBRL(comissao);
  resultadoBox.classList.add("mostrar");
}

window.addEventListener("DOMContentLoaded", function () {
  const botao = document.getElementById("btn-simulacao");
  const inputValor = document.getElementById("valor");

  if (botao) {
    botao.addEventListener("click", calcularSimulacao);
  }

  if (inputValor) {
    inputValor.addEventListener("blur", function () {
      formatarMoeda(this);
    });

    inputValor.addEventListener("focus", function () {
      desformatarMoeda(this);
    });
  }
});
