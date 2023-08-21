# `useState`

> [doc](https://react.dev/reference/react/useState)

On y va petit à petit : on commence par le plus simple et on ajoute au fur et à mesure une complexité

## Dans `<App />`

On peut partir sur un compteur de _likes_.

Première étape, on reste sur le composant racine

```js
import { useState } from 'react';

// ...

function App() {
  console.log('APP > render');
  /*
    Pour gérer un état, on utilise le _Hook_ `useState`
    un _hook_ est une fonction (React) qui est dépendante d'un composant

    Syntaxe :
    const [value, setValue] = useState(initialValue);

    useState est une fonction qui retourne un tableau de 2 éléments
      - le 1er (assigné à la variable `value`) est la valeur actuelle du state
      - le 2nd (`setValue`) est une fonction qui permet de modifier la valeur
          ET de mettre à jour (provoquer un re-rendu) du ou des composants
          qui utilise cet état
  
    `initialValue` est la valeur initiale du state
  */
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    // Je décris mon intention
    console.log(
      'Je veux modifier mon état pour incrémenter le nombre de likes'
    );
    // modifier l'état → `setLikes`
    setLikes(5); // on définit en dur le nouvel état
  };

  return (
    <>
      <div className="converter">
        <Header baseAmount={1} />
        <Currencies list={currencies} />
        <Result currency={currencies[16]} />
      </div>

      <footer>
        <button type="button" onClick={handleClick}>
          Likes : {likes}
        </button>
      </footer>
    </>
  );
}

export default App;
```

Au lieu de définir en dur le nouvel état au clic, on incrémente le compteur…  
Pour incrémenter, il faut retrouver la valeur actuelle de l'état.  
Comment fait-on ?

```js
// passer la valeur actuelle à +1
setLikes(likes + 1);
```

## Dans un sous-composant

On peut créer un état où l'on souhaite, dans le composant racine mais aussi dans
un sous-composant.

Par exemple, on va ajouter un composant `<Footer />`.  
On y copie/colle le code du compteur ; on veille à bien laisser le `console.log('APP > render');`

```js
import { useState } from 'react';

function Footer() {
  console.log('FOOTER > render');
  /*
    Pour gérer un état, on utilise le _Hook_ `useState`
    un _hook_ est une fonction (React) qui est dépendante d'un composant

    Syntaxe :
    const [value, setValue] = useState(initialValue);

    useState est une fonction qui retourne un tableau de 2 éléments
      - le 1er (assigné à la variable `value`) est la valeur actuelle du state
      - le 2nd (`setValue`) est une fonction qui permet de modifier la valeur
          ET de mettre à jour (provoquer un re-rendu) du ou des composants
          qui utilise cet état
  
    `initialValue` est la valeur initiale du state
  */
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    // Je décris mon intention
    console.log(
      'Je veux modifier mon état pour incrémenter le nombre de likes'
    );
    // modifier l'état → `setLikes`
    // setLikes(5);
    // passer la valeur actuelle à +1
    setLikes(likes + 1);
  };
  return (
    <footer>
      <button type="button" onClick={handleClick}>
        Likes : {likes}
      </button>
    </footer>
  );
}

export default Footer;
```

On remarque qu'à chaque changement d'état, seul le footer est re-rendu.

## Partager un état entre composants

Régulièrement, on voudra créer une variable d'état qui sera utilisée dans plusieurs composants.

Mais rappelez-vous, React a une communication **unidirectionnelle descendante** :
une information peut descendre (aller d'un parent à un enfant) mais ne peut pas remonter…

Impossible donc d'utiliser, ici, `likes` (définie dans le `<Footer />`) dans `<Result />` par exemple.

La solution : on trouve un ancêtre commun aux composants ayant besoin de la donnée et on diffuse
l'information par les _props_.

On applique à notre code, d'abord en **lecture** : on ne diffuse que `likes` à `<Result />` et à `<Footer />`

```js
// @file Result
function Result({ currency, likes }) {
  return (
    <div className="result">
      <span className="result-value">{currency.rate.toFixed(2)}</span>
      <span className="result-currency">{currency.description}</span>

      <p>{likes} likes</p>
    </div>
  );
}

// @file Footer
function Footer({ likes }) {
  const handleClick = () => {
    // Je décris mon intention
    console.log(
      'Je veux modifier mon état pour incrémenter le nombre de likes'
    );

    setLikes(likes + 1);
  };
  return (
    <footer>
      <button type="button" onClick={handleClick}>
        Likes : {likes}
      </button>
    </footer>
  );
}

export default Footer;
```

Comment fait-on pour modifier notre état maintenant ? On a besoin de `setLikes` dans le footer…

Et bien, on passe par les _props_ : on peut diffuser des fonctions aussi !

> on oublie pas de typer les props  
> pour déterminer le type d'un _setter_,
> je survole la variable de mon _setter_ (`setLikes`),
> TS me la donne… Je n'ai plus qu'à copier/coller !
>
> ```js
> interface FooterProps {
>   likes: number;
>   setLikes: React.Dispatch<React.SetStateAction<number>>;
> }
> ```
