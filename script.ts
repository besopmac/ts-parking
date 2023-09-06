interface Veiculo {
  placa: string;
  modelo: string;
  entrada: Date;
}

(function () {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

  function patio() {
    function ler(): Veiculo[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }

    function salvar(veiculos: Veiculo[]) {
      localStorage.setItem('patio', JSON.stringify(veiculos))
    }

    function adicionar(veiculo: Veiculo, salva?: boolean) {
      const row = document.createElement('tr')

      row.innerHTML = `
        <td>${ veiculo.placa }</td>
        <td>${ veiculo.modelo }</td>
        <td>${ veiculo.entrada }</td>
        <td>
          <button data-placa="${ veiculo.placa }">Excluir</button>
        </td>
      `

      $('#patio')?.appendChild(row);

      if (salva) salvar([...ler(), veiculo])
    }
    
    function remover() {}
    
    function render() {
      $('#patio')!.innerHTML = '';

      const patio = ler();

      if (patio.length) {
        patio.forEach((veiculo) => adicionar(veiculo));
      }
    }

    return {
      ler, adicionar, remover, salvar, render
    }
  }

  $('#cadastrar')?.addEventListener('click', () => {
    const placa = $('#placa')?.value;
    const modelo = $('#modelo')?.value;

    if (!modelo || !placa) {
      alert("Os campos são obrigatórios")
      return;
    }

    patio().adicionar({ modelo, placa, entrada: new Date }, true);
  });  

  // Render
  patio().render();
})();