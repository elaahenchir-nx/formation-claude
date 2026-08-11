# Bac a sable — TP Analyse automatique des regressions

Ce dossier est un terrain de test complet, independant de votre vrai pipeline,
pour valider la mecanique du TP avant de la brancher sur votre vraie campagne
de tests.

## Contenu

- `.github/workflows/campagne-tests.yml` — simule votre campagne de tests :
  produit un `report.json` avec des ecarts (un fonctionnel, un de perte), le
  publie comme artifact, puis termine volontairement en echec (le "orange").
- `.github/workflows/analyse-regression.yml` — le workflow a tester : se
  declenche automatiquement quand `campagne-tests.yml` se termine sans succes,
  recupere le rapport, calcule le diff de code, et appelle Claude Code pour
  produire l'analyse priorisee P0/P1/P2.
- `.claude/skills/analyse-regression-neoxam/SKILL.md` — le skill utilisable en
  local (`claude "utilise analyse-regression-neoxam sur ce rapport"`) et
  reference par le prompt du workflow.
- `src/calcul.js` — version baseline (saine) a committer en premier.
- `src/calcul-v2-avec-regression.js` — contenu a copier dans `src/calcul.js`
  pour le deuxieme commit, qui introduit deux regressions volontaires (une
  fonctionnelle, une de perf) pour que le TP ait quelque chose a analyser.

## Etapes pour tester

1. Creez un nouveau depot GitHub vide, poussez-y tout ce dossier tel quel sur
   la branche `main`.
2. Generez un token : `claude setup-token`.
3. Dans Settings > Secrets and variables > Actions du depot, ajoutez le secret
   `CLAUDE_CODE_OAUTH_TOKEN` avec ce token (voir TP-Bonus Jour 5, Etape 2).
4. Ouvrez `.github/workflows/analyse-regression.yml` et remplacez `VERSION`
   par le numero renvoye par `npm view @anthropic-ai/claude-code version`.
5. Premier push (baseline) : le fichier `src/calcul.js` tel quel, commit
   initial sur `main`. La campagne va tourner, produire un report.json et
   echouer volontairement — c'est normal, c'est la simulation du "orange".
   L'analyse va se declencher une premiere fois (sur ce commit compare a
   lui-meme, resultat peu interessant, c'est attendu).
6. Deuxieme push (la vraie regression) : remplacez le contenu de
   `src/calcul.js` par celui de `src/calcul-v2-avec-regression.js`, committez,
   poussez. La campagne tourne, le report.json reflete les ecarts, et cette
   fois le diff entre les deux commits est reel.
7. Onglet Actions du depot : ouvrez l'execution de "Analyse automatique des
   regressions" (declenchee apres "Campagne de tests"), etape "Lancer l
   analyse de regression" — vous devez voir un rapport P0/P1/P2 qui pointe
   vers `src/calcul.js` (le changement du seuil `>= 5` en `>= 6`, et la
   suppression du cache).

## Si votre vraie CI n'est pas GitHub Actions

Voir le bloc commente en bas de `analyse-regression.yml` (variante
`repository_dispatch` + webhook depuis votre pipeline externe).
