
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
  const email = document.getElementById("email").value;
  const valor = parseBRL(document.getElementById("valor").value);
  const prazo = parseFloat(document.getElementById("prazo").value) || 0;
  const taxa = parseBRL(document.getElementById("taxa").value) || 0;
  const nivel = parseFloat(document.getElementById("parceria").value) || 0;
  const nivelLabel = document.getElementById("parceria").selectedOptions[0].text;

  const resultadoBox = document.getElementById("resultado-box");

  if (!email || !valor || !prazo || !taxa || !nivel) {
    resultadoBox.classList.remove("mostrar");
    return;
  }

  const taxaDecimal = taxa / 100;
  const desagio = valor * (prazo / 30) * taxaDecimal;
  const comissao = desagio * nivel;

  document.getElementById("desagio").textContent = formatBRL(desagio);
  document.getElementById("comissao").textContent = formatBRL(comissao);
  resultadoBox.classList.add("mostrar");

  // Webhook
  const payload = {
    email: email,
    valor: valor,
    prazo: prazo,
    taxa: taxa,
    nivel_parceria: nivel,
    nivel_label: nivelLabel,
    desagio: parseFloat(desagio.toFixed(2)),
    comissao: parseFloat(comissao.toFixed(2))
  };

  fetch("https://hook.us1.make.com/mqae7omxgmno4jto0vlzuunaekqrsxji", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => console.log("Enviado ao webhook")).catch(err => console.error("Erro no envio:", err));
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
