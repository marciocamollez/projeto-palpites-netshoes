var validSearch = [
  "Brasil",
  "Alemanha",
  "Itália",
  "Argentina",
  "França",
  "Uruguai",
  "Inglaterra",
  "Espanha",
  "Holanda",
  "Tchecoslováquia",
  "Hungria",
  "Suécia",
  "Croácia",
];

function sendToPage() {
  //get value and trim for unnecesary spaces, and set variable
  var q = document.getElementById("search").value.trim(),
    re,
    result;

  //return if textbox is empty
  if (!q.length > 0) {
    return;
  }

  //nao permite achar resultado com menos de 4 caracteres digitados
  if (q.length <= 4) {
    return;
  }

  //set RegExp (indexOf is faster but Case Sensitive)
  re = new RegExp(".*" + q.replace(/\s/g, "\\s") + ".*", "ig");

  //start searching
  validSearch.some(function (v) {
    result = re.exec(v);
    if (result) {
      //Tira da array original os itens acertados
      validSearch.splice(validSearch.indexOf(result[0]), 1);
      return true;
    }
  });

  //if match
  if (result !== null) {
    //alert("Certa resposta! - " + result[0]);
    var el = document.createElement("li");
    el.classList = "respostas";
    el.insertAdjacentHTML("beforeend", result[0]);
    var container = document.querySelector("#acertos");
    container.appendChild(el);
  } else {
    alert("Resposta incorreta. Tente novamente! - " + q);
  }

  //console.log(validSearch);

  //refresh input box
  document.getElementById("search").value = "";
  document.getElementById("search").focus();

  //checar se tem 13 respostas na lista, o que torna o desafio correto
  const contagem = document.querySelector("#acertos").children.length;
  //console.log(contagem);
  if (contagem === 13) {
    alert("Desafio completo! Parabéns! Pegue seu cupom de desconto!");
    stopTimer();
    document.getElementById("search").disabled = true;
    document.getElementById("palpitar").disabled = true;
    document.getElementById("iniciar").disabled = true;
    document.getElementById("cupom-premio").style.display = "block";
  }
}

var counter = 90;

function startTimer() {
  document.getElementById("iniciar").disabled = true;
  document.getElementById("search").disabled = false;
  document.getElementById("palpitar").disabled = false;
  document.getElementById("search").focus();

  setInterval(function () {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter;
    }
    if (counter === 0) {
      alert("Acabou o tempo!");
      clearInterval(counter);
      window.location.reload();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(counter);
  counter = 0;
}
