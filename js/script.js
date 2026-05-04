const url = "https://rickandmortyapi.com/api/character";

async function buscarDados() {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const cards = document.getElementById("cards");

  try {
    loading.style.display = "block";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    loading.style.display = "none";

    data.results.forEach(personagem => {
      cards.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${personagem.image}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${personagem.name}</h5>
              <p>Status: ${personagem.status}</p>
              <p>Espécie: ${personagem.species}</p>
            </div>
          </div>
        </div>
      `;
    });

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Erro ao carregar dados.";
    console.error(err);
  }
}

buscarDados();