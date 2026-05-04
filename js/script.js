const url = "https://rickandmortyapi.com/api/character";

async function buscarDados() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const cards = document.getElementById("cards");

  try {
    // estado inicial
    loading.style.display = "block";
    error.textContent = "";
    cards.innerHTML = "";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    loading.style.display = "none";

    data.results.forEach(personagem => {

      const statusClass =
        personagem.status === "Alive" ? "success" :
        personagem.status === "Dead" ? "danger" :
        "secondary";

      cards.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">

            <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">

            <div class="card-body">
              <h5 class="card-title">${personagem.name}</h5>

              <p>
                Status:
                <span class="badge bg-${statusClass}">
                  ${personagem.status}
                </span>
              </p>

              <p>Espécie: ${personagem.species}</p>
            </div>

          </div>
        </div>
      `;
    });

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Erro ao carregar dados da API.";
    console.error(err);
  }
}

buscarDados();