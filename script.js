let contador = 1;

const fetchPokemon = async (pokemonNome) => {
  let resposta;
  if (pokemonNome) {
    resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`);
  } else {
    resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${contador}`);
  }
  const data = await resposta.json();

  let types = "";
  for (let i = 0; i < data.types.length; i++) {
    types += data.types[i].type.name;
    if (i !== data.types.length - 1) {
      types += "/";
    }
  }

  document.querySelector("#pokemonIcone").src = data.sprites.front_default;
  document.querySelector("#pokemonNome").textContent = data.name;
  document.querySelector("#pokemonTipo").textContent = types;
  document.querySelector("#pokemonAltura").textContent = `Altura: ${data.height / 10}m`;
  document.querySelector("#pokemonPeso").textContent = `Peso: ${data.weight / 10}kg`;
};

document.querySelector("#anterior").addEventListener("click", () => {
  contador--;
  if (contador < 1) {
    contador = 1;
  }
  fetchPokemon();
});

document.querySelector("#proximo").addEventListener("click", () => {
  contador++;
  fetchPokemon();
});

document.querySelector("#pesquisa").addEventListener("click", () => {
  const pokemonNome = document.querySelector("#pokemonNameText").value.toLowerCase();
  fetchPokemon(pokemonNome);
});

fetchPokemon();
