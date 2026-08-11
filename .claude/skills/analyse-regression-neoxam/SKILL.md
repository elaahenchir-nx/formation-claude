---
name: analyse-regression-neoxam
description: a utiliser quand une campagne de tests produit un plan avec des ecarts (fonctionnels et/ou de perte de performance) entre une version avant et une version apres, pour identifier la cause probable dans le code et prioriser les ecarts.
---

Contexte attendu en entree : un rapport d'ecarts (report.json) et, si disponible, un diff de code entre la version avant et la version apres (diff-regression.txt). Si le diff n'est pas fourni, calcule-le toi-meme avec `git diff <commit_avant> <commit_apres>` en utilisant les references presentes dans report.json.

Methode :

1. Lis report.json. Note pour chaque ecart : son type (fonctionnel ou perte), le test ou la metrique concernee, la valeur avant et apres, et le seuil de regression si present.
2. Lis (ou calcule) le diff de code entre commit_avant et commit_apres.
3. Pour chaque ecart, cherche dans le diff les changements les plus probablement responsables. Cite precisement fichier:ligne.
4. Priorise chaque ecart :
   - P0 : cause tres probable (le changement touche directement la logique testee, ou plusieurs indices convergent).
   - P1 : cause plausible mais pas certaine (le changement touche une zone liee, sans certitude directe).
   - P2 : a verifier, faible confiance (aucun changement evident dans le diff ne l'explique directement).
5. Ne conclus jamais "aucune cause identifiee" sans lister explicitement les hypotheses ecartees et pourquoi elles ne tiennent pas.
6. Redige le rapport final sous forme d'un tableau : Ecart | Priorite | Fichier:ligne | Raisonnement.

Garde-fou : ne propose jamais de correctif de code a ce stade — le role de ce skill est le diagnostic, pas la correction. Termine toujours en rappelant qu'une revue humaine doit valider l'analyse avant toute action corrective.
