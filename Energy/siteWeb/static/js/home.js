document.addEventListener('DOMContentLoaded', function() {
    // Quando o formulário for enviado
    document.getElementById("consultaForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio do formulário e recarregamento da página

        // Obter valores dos campos do formulário
        let valorContaLuz = parseFloat(document.getElementById("valorContaLuz").value);
        let ajusteTarifa = parseFloat(document.getElementById("ajusteTarifa").value);

        if(valorContaLuz<1) {
            alert("O valor deve ser maior do que 1,00")
            valorContaLuz=1
        }
        if(ajusteTarifa<1) {
            alert("O valor deve ser maior do que 1,00")
            ajusteTarifa=1
        }

        let tipoImovel = document.getElementById("tipoImovel").value;

        // Ajuste do tipo de imóvel (se for "E", muda para "Empresarial")
        tipoImovel = (tipoImovel === "E") ? "Empresarial" : "Residencial";

        // Cálculos básicos
        let consumoMensalKWh = valorContaLuz / ajusteTarifa; // Energia consumida em kWh por mês (aproximação)

        // Considerações baseadas nos dados fornecidos:
        let energiaGeradaPorPainelPorMes = 38.16; // Energia gerada por painel de 265W com 7 horas de sol por dia em kWh
        let areaPainel = 1.7;  // Área média necessária por painel em metros quadrados (1,7m²)
        let precoPainel = 1500; // Preço médio de um painel solar em reais

        // Cálculo da quantidade de painéis necessários para suprir o consumo
        let numPaineis = Math.ceil(consumoMensalKWh / energiaGeradaPorPainelPorMes); // Número de painéis para suprir o consumo mensal

        // Cálculo do custo total dos painéis solares
        let custoTotal = numPaineis * precoPainel;

        // Cálculo da área total necessária
        let areaTotal = numPaineis * areaPainel;

        // Cálculo do tempo de retorno do investimento
        let tempoRetorno = custoTotal / valorContaLuz; // Supõe que a economia mensal seja igual ao valor da conta de luz

        // Cálculo da economia total após 5 anos (60 meses)
        let economiaTotal = valorContaLuz * 60; // 60 meses = 5 anos

        // Exibir os resultados na tela
        document.getElementById("quantidadePaineis").textContent = numPaineis + " painéis";
        document.getElementById("consumoMensal").textContent = consumoMensalKWh.toFixed(2) + " kWh";
        document.getElementById("custoTotal").textContent = "R$ " + custoTotal.toFixed(2);
        document.getElementById("tempoRetorno").textContent = tempoRetorno.toFixed(0) + " meses";
        document.getElementById("areaTotal").textContent = areaTotal.toFixed(2) + " m²";
        document.getElementById("economiaTotal").textContent = "R$ " + economiaTotal.toFixed(2);

        // Mostrar os resultados, que estavam escondidos inicialmente
        document.getElementById("resultados").style.display = "grid";  // Exibe a grade de resultados

        // Enviar os dados da consulta para o backend via API (fetch)
        fetch('http://127.0.0.1:8000/consulta/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                cep: document.getElementById("cep").value,
                valorContaLuz: valorContaLuz,
                ajusteTarifa: ajusteTarifa,
                tipoImovel: tipoImovel,
                data: new Date().toISOString().split('T')[0]  // Data atual no formato YYYY-MM-DD
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Consulta salva com sucesso", data);
        })
        .catch(error => {
            console.error("Erro ao salvar consulta", error);
        });
    });
});