
function calculerRemiseFidelite(client) {
  let remise = 0;
  if (client.anneesAnciennete >= 6) {
    remise = 0.15;
  } else if (client.anneesAnciennete >= 2) {
    remise = 0.10;
  } else {
    remise = 0.05;
  }

  return remise;
}

module.exports = { calculerRemiseFidelite };
