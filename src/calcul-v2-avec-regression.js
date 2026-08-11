// Version 2 - contient DEUX regressions volontaires pour le TP :
// 1) Fonctionnelle : le seuil de 5 ans devient 6 ans -> le test
//    test_calcul_remise_fidelite (qui teste un client a 5 ans d'anciennete)
//    passe de PASS a FAIL.
// 2) Perte de perf : le cache a ete retire -> le calcul est refait
//    a chaque appel (d'ou le temps_calcul_ms qui augmente dans report.json).
//
// Pour tester le TP : remplacez src/calcul.js par le contenu de ce fichier,
// committez, et poussez sur main.

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
