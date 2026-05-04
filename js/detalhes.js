const baseUrl = "https://rickandmortyapi.com/api/character/";

async function carregarDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const details = document.getElementById("details");

  try {
    loading.style.display = "block";
    error.textContent = "";

    const response = await fetch(baseUrl + id);

    if (!response.ok) {
      throw new Error("Erro ao buscar personagem");
    }

    const data = await response.json();

    loading.style.display = "none";

    const statusClass =
      data.status === "Alive" ? "success" :
      data.status === "Dead" ? "danger" :
      "secondary";

    details.innerHTML = `
      <div class="card mx-auto shadow-sm" style="max-width: 400px;">

        <img src="${data.image}" class="card-img-top" alt="${data.name}">

        <div class="card-body">
          <h3>${data.name}</h3>

          <p>
            <span class="badge bg-${statusClass}">
              ${data.status}
            </span>
          </p>

          <p><strong>Espécie:</strong> ${data.species}</p>
          <p><strong>Gênero:</strong> ${data.gender}</p>
          <p><strong>Origem:</strong> ${data.origin.name}</p>
          <p><strong>Localização:</strong> ${data.location.name}</p>
        </div>

      </div>
    `;

  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Erro ao carregar detalhes.";
    console.error(err);
  }
}

carregarDetalhes();