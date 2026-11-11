
const scriptAtual = document.currentScript;
const pastaProjeto = new URL("../", scriptAtual.src);

document.addEventListener("DOMContentLoaded", async () => {
    async function carregarComponente(seletor, arquivo) {
        const elementos = document.querySelectorAll(seletor);

        if (!elementos.length) return;

        try {
            const caminho = new URL(arquivo, pastaProjeto);
            const resposta = await fetch(caminho);

            if (!resposta.ok) {
                throw new Error(`Erro ao carregar ${arquivo}: ${resposta.status}`);
            }

            const html = await resposta.text();

            elementos.forEach(elemento => {
                elemento.innerHTML = html;

                elemento.querySelectorAll("[src], [href]").forEach(item => {
                    ["src", "href"].forEach(atributo => {
                        const valor = item.getAttribute(atributo);

                        if (
                            !valor ||
                            valor.startsWith("#") ||
                            /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(valor)
                        ) return;

                        item.setAttribute(
                            atributo,
                            new URL(valor.replace(/^\//, ""), pastaProjeto).href
                        );
                    });
                });
            });

        } catch (erro) {
            console.error("Erro ao carregar componente:", erro);
        }
    }

    await Promise.all([
        carregarComponente('[data-componente="navbar"]', "components/navbar.html"),
        carregarComponente('[data-componente="rodape"]', "components/rodape.html")
    ]);
});
