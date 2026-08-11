// Version baseline (saine) - a committer en premier sur main

const cacheRemises = new Map();

function calculerRemiseFidelite(client) {
  if (cacheRemises.has(client.id)) {
    return cacheRemises.get(client.id);
  }

  let remise = 0;
  if (client.anneesAnciennete >= 5) {
    remise = 0.15;
  } else if (client.anneesAnciennete >= 2) {
    remise = 0.10;
  } else {
    remise = 0.05;
  }

  cacheRemises.set(client.id, remise);
  return remise;
}

module.exports = { calculerRemiseFidelite };
