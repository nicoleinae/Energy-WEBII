document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletando os dados do formulário
    const cep = document.getElementById('cep').value;
    const valorContaLuz = document.getElementById('valorContaLuz').value;
    const ajusteTarifa = document.getElementById('ajusteTarifa').value;
    const tipoImovel = document.getElementById('tipoImovel').value;
    
    // Resultado dos cálculos (exemplo de valores, deve ser substituído pelos cálculos reais)
    const quantidadePaineis = 10; // Exemplo
    const custoTotal = (valorContaLuz * 10).toFixed(2); // Exemplo
    const economiaTotal = (valorContaLuz * 5).toFixed(2); // Exemplo
    const consumoMensal = (valorContaLuz * 0.8).toFixed(2); // Exemplo
    const tempoRetorno = 5; // Exemplo
    const areaTotal = 50; // Exemplo

    // Criando um objeto com os dados da consulta
    const consulta = {
        cep,
        valorContaLuz,
        ajusteTarifa,
        tipoImovel,
        quantidadePaineis,
        custoTotal,
        economiaTotal,
        consumoMensal,
        tempoRetorno,
        areaTotal
    };

    // Pegando o histórico atual do localStorage
    const historico = JSON.parse(localStorage.getItem('historicoConsultas')) || [];

    // Adicionando a nova consulta ao histórico
    historico.push(consulta);

    // Salvando o histórico atualizado no localStorage
    localStorage.setItem('historicoConsultas', JSON.stringify(historico));

    // Exibindo os resultados na página
    document.getElementById('quantidadePaineis').textContent = quantidadePaineis;
    document.getElementById('custoTotal').textContent = custoTotal;
    document.getElementById('economiaTotal').textContent = economiaTotal;
    document.getElementById('consumoMensal').textContent = consumoMensal;
    document.getElementById('tempoRetorno').textContent = tempoRetorno;
    document.getElementById('areaTotal').textContent = areaTotal;

    // Exibindo os resultados
    document.getElementById('resultados').style.display = 'block';
});
