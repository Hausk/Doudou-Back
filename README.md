# Vitrine Back

Le développement de ce projet est à but non lucratif pour moi.
C'est un site vitrine que je créer pour un site photo

Cette API comprendra :

- La génération du token d'authentification google.
- Ajout de catégories.
- Ajout d'images reliés à une catégorie .

## Pour commencer

Pour lancer un serveur de développement, j'utiliserai d'abord la commande suivante :

```bash
node ace serve -w
```

Cette commande ouvre un serveur local par défault sur le port 3000
[http://localhost:3333](http://localhost:3333).

Pour ce projet j'utiliserai *pnpm* pour la rapidité et pour sont audit qui est bien au dessus de *npm*

## Tests

Les tests seront écrits au fur et à mesure de la création de l'api
pour les lancers:

- `node ace test`

## A savoir

L'api utilise la connexion via le provider google aucun mot de passe n'est utilisé et stocké en base seuls les tokens sont hashé et stocké en base.

Pour le moment je n'utilise pas Redis car la plupart des hébérgeurs mutualisé ne proposent pas Redis, si jamais j'en trouve un qui propose ce service je modifierai le code en conséquence.

L'utilisation de docker-compose est pour le moment strictement local car comme dit plus haut la plupart des hébérgements mutualisé ne propose pas docker.