---
title: Projekte
menu: main
---

## [Babel: promise-to-bluebird](https://www.npmjs.com/package/babel-plugin-transform-promise-to-bluebird)
[*Babel*](https://babeljs.io/)-Plugin. Wandelt `Promise` nach
[*Bluebird*](http://bluebirdjs.com/) um.

```js
export default function main() {
    const taskA = getResultAsync(1337);
    const taskB = new Promise((resolve, reject) =>
        nodeCallbackFunc(42, (err, res) => err ? reject(err) : resolve(res))
    );
    return Promise.all([taskA, taskB]).then(([resA, resB]) => resA + resB);
}
```

Ergibt:

```js
import {all, default as Promise} from 'bluebird';

export default function main() {
    const taskA = getResultAsync(1337);
    const taskB = new Promise((resolve, reject) =>
        nodeCallbackFunc(42, (err, res) => err ? reject(err) : resolve(res))
    );
    return all([taskA, taskB]).then(([resA, resB]) => resA + resB);
}
```

## [Babel: async-to-bluebird](https://www.npmjs.com/package/babel-plugin-transform-async-to-bluebird)
[*Babel*](https://babeljs.io/)-Plugin. Wandelt `async`-Funktionen nach
[*Bluebird*](http://bluebirdjs.com/)s [`method`](http://bluebirdjs.com/docs/api/promise.method.html)
oder [`coroutine`](http://bluebirdjs.com/docs/api/promise.coroutine.html) um. Der Vorteil hierbei
ist, dass Code, der kein `await` enthält, keinen *generator* erzeugt, aber trotzdem bei einem *throw*
oder *return* ein `Promise`-Objekt zurückgibt.

## [WIP] [vdom-rs](https://github.com/vdom-rs/vdom-rs)
Implementerung eines virtuellen *DOM*s in [*Rust*](https://www.rust-lang.org/), vergleichbar mit
[*React*](https://facebook.github.io/react/).
