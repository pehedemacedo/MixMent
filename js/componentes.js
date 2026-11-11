document.addEventListener("DOMContentLoaded", async () => {
  async function carregarComponente(seletor, arquivo) {
    const elementos = document.querySelectorAll(seletor);

    if (elementos.length === 0) return;

    try {
      const resposta = await fetch(arquivo);

      if (!resposta.ok) {
        throw new Error(`Erro ao carregar ${arquivo}`);
      }

      const html = await resposta.text();

      elementos.forEach((elemento) => {
        elemento.innerHTML = html;
      });
    } catch (erro) {
      console.error("Erro ao carregar componente:", erro);
    }
  }

  await Promise.all([
    carregarComponente('[data-componente="navbar"]', "/components/navbar.html"),
    carregarComponente('[data-componente="rodape"]', "/components/rodape.html"),
  ]);
});
