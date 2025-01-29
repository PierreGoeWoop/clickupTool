
# Projet ClickUp

Ce projet permet de créer des entrées de temps dans ClickUp en utilisant l'API ClickUp.

## Prérequis

- Node.js installé sur votre machine
- Un compte ClickUp

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Naviguez dans le répertoire du projet et installez les dépendances avec la commande suivante :

```sh
npm install
```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :

```sh
cp .env.sample .env
```

4. Remplissez les variables d'environnement dans le fichier `.env` :

```sh
CLICKUP_API_KEY=YOUR_CLICKUP_API_KEY
CLICKUP_SPACE_ID=YOUR_CLICKUP_SPACE_ID
```

5. Remplissez vos data dans le fichier entries.js

```sh
Sample files ... 

[
  {
    start: new Date("2025-02-02T10:00:00").getTime(),
    duration: Duration.ONE_HOUR,
    tags: [ActivityType.BUILD],
    tid: TaskIds.LABEL_PROJECT,
  },
  {
    start: new Date("2025-02-02T11:00:00").getTime(),
    duration: Duration.TWO_HOURS,
    tags: [ActivityType.BUILD],
    tid: TaskIds.LABEL_PROJECT,
  },
]
```

## Maintainers

[@PierreGoeWoop](https://github.com/PierreGoeWoop).

## License

[MIT](LICENSE) © Pierre Goemans
