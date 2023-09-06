interface Veiculo {
  placa: string;
  modelo: string;
  entrada: Date | string;
}

(function () {
  const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

  function calcTempo(mil: number) {
    const min = Math.floor(mil / 60000);
    const sec = Math.floor((mil % 60000) / 1000);

    return `${min}m e ${sec}s`
  }

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
          <button class="delete" data-placa="${ veiculo.placa }">Excluir</button>
        </td>
      `

      row.querySelector(".delete")?.addEventListener("click", function() {
        remover(this.dataset.placa)
      })

      $('#patio')?.appendChild(row);

      if (salva) salvar([...ler(), veiculo])
    }
    
    function remover(item: string) {
      const { entrada, placa } = ler().find(veiculo => veiculo.placa === item)
      const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

      if (!confirm(`O veículo ${placa} permaneceu por ${tempo}. Deseja encerrar?`)) return;

      salvar(ler().filter(veiculo => veiculo.placa !== item));
      render();
    }
    
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

    patio().adicionar({ modelo, placa, entrada: new Date().toISOString() }, true);
  });  

  // Render
  patio().render();
})();