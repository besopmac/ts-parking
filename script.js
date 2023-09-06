"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a;
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${veiculo.placa}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.entrada}</td>
        <td>
          <button data-placa="${veiculo.placa}">Excluir</button>
        </td>
      `;
            (_a = $('#patio')) === null || _a === void 0 ? void 0 : _a.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover() { }
        function render() {
            $('#patio').innerHTML = '';
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }
        return {
            ler, adicionar, remover, salvar, render
        };
    }
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const placa = (_a = $('#placa')) === null || _a === void 0 ? void 0 : _a.value;
        const modelo = (_b = $('#modelo')) === null || _b === void 0 ? void 0 : _b.value;
        if (!modelo || !placa) {
            alert("Os campos são obrigatórios");
            return;
        }
        patio().adicionar({ modelo, placa, entrada: new Date }, true);
    });
    // Render
    patio().render();
})();
