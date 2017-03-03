# AloeTouch

Una modesta libreria per una modesta gestione degli eventi touch.

#### Esempi
* [Sorgenti](examples/)
* [Codepen](http://codepen.io/genbs/pen/MpKRrj)

#### Contenuti
* [Sinossi](#sinossi)
* [Installazione](#installazione)
* [Utilizzo](#utilizzo)
* [Integrazione](#integrazione)



# Sinossi

Questa libreria è rivolta a chi vuol adattare la propria applicazione ad una user-experience moderna,
che vede come protagonisti indiscussi i dispositivi mobili.

Gli eventi gestiti sono principalmente:

* Tap
* Press
* Swipe
* Pan
* Pinch
* Rotate

Gli eventi che definiscono il ciclo di vita implementato sono:

* start
* move
* end

Una particolarità è quella di non bloccare immediatamente lo scolling;
l'utente potrà scrollare sugli elementi bindati e la libreria cercherà di interpretare se la gesture deve prevenire o meno
lo scrolling naturale dell'app.



# Installazione

È possibile installare la libreria tramite npm con il comando:

```
$ npm install aloetouch
```

Oppure scaricare la versione [completa](https://raw.githubusercontent.com/genbs/aloetouch/master/dist/aloetouch.js) o [minimizzata](https://raw.githubusercontent.com/genbs/aloetouch/master/dist/aloetouch.min.js)

### Inclusione della libreria

***Node***

```js
var AloeTouch = require('aloetouch');
```

***HTML***

```html
<script src="./[path]/aloetouch[.min].js"></script>
```

***ES6***

```js
import AloeTouch from 'aloetouch'
```



# Utilizzo

* [Bindare un elemento](#bindare-un-elemento)
* [Metodi di AloeTouch](#metodi-di-aloetouch)
* [L'oggetto AloeTouchObject](#loggetto-aloetouchobject)
* [Utilizzo degli State](#utilizzo-degli-state)
* [Bloccare / Sbloccare un elemento](#bloccare-sbloccare-un-elemento)


## Bindare un elemento

```js
var ato = AloeTouch.bind('#el', {
  tap: function() {
    alert('tap!');
  },
  press: function() {
    alert('press!');
  }
});
```


## Metodi di AloeTouch

 * [bind](#aloetouchbindelement-events-strict)
 * [unbind](#aloetouchunbindaloetouchobject)
 * [get](#aloetouchgetid)
 * [lock](#aloetouchlockid)
 * [lockExcept](#aloetouchlockexceptaloetouchobjects)
 * [lockOnly](#aloetouchlockonlyaloetouchobjects)
 * [unlock](#aloetouchunlockid)
 * [unlockExcept](#aloetouchunlockexceptaloetouchobjects)
 * [unlockOnly](#aloetouchunlockonlyaloetouchobjects)


### AloeTouch.bind(element, events, strict)

Binda un elemento.

**Parametri**

 * `element` - *Elemento (o stringa) a cui bindare gli eventi.*
 * `events` - *Oggetto che contiene gli eventi da gestire e gli [state personalizzati]().*
 * `strict` - *Booleano che, se settata a true, binderà gli eventi bindati solo se il target è l'`element` stesso.*

Il parametro `strict` è di default impostato a *false.* Questo valore deve essere impostato a *true* nel caso in cui
si vogliano gestire più elementi in modo simultaneo (ad esempio [due eventi *pan*](examples/multitouch.html).

**Valore di ritorno**

 * Un oggetto di tipo [AloeTouchObject](#loggetto-aloetouchobject)

**Esempo**

```js
var ato = AloeTouch.bind('#el', {
  rotate: function(gradi) {
    ato.$ref.el.style.transform = 'rotate('+ gradi +'deg)'
  }
});
```


### AloeTouch.unbind(aloetouchobject)

Rimuove il binding di un elemento.

**Parametri**

  * `aloetouchobject` - *L'[AloeTouchObject](#loggetto-aloetouchobject) (oppure l'id) da rimuovere.*

**Valore di ritorno**

  **Boolean** - *true* se l'oggetto è stato rimosso con successo, falso altrimenti.

**Esempio**
```js
var ato = AloeTouch.bind('#el', {
  pan: function(coords) {
    ato.$ref.el.style.transform = 'translate('+ coords.x +'px, '+ coords.y +'px)';
  }
});
...
window.setTimeout(function(){
  AloeTouch.unbind(ato)
}, 3000);
```


### AloeTouch.get(id)

Preleva un elemento dalla lista degli elementi bindati.

**Parametri**

  * `id` - *L'id dell'[AloeTouchObject](#loggetto-aloetouchobject).*

**Valore di ritorno**

  **[AloeTouchObject](#loggetto-aloetouchobject)**


### AloeTouch.lock(id)

Blocca lo stato di un elemento finché non verrà sbloccato.

**Parametri**

  * `id` - *L'id dell'[AloeTouchObject](#loggetto-aloetouchobject).*

**Esempio**

  * [Lock/Unlock](blob/master/examples/lock-unlock.html)).


### AloeTouch.lockExcept(aloetouchobjects)

Blocca tutti gli [AloeTouchObject](#loggetto-aloetouchobject) e sblocca quelli presenti nell'array `aloetouchobjects`.

**Parametri**

  * `aloetouchobjects` - *Array di [AloeTouchObject](#loggetto-aloetouchobject) o di id.*


### AloeTouch.lockOnly(aloetouchobjects)

Blocca solo gli [AloeTouchObject](#loggetto-aloetouchobject) presenti nell'array `aloetouchobjects` e sblocca tutti gli altri.

**Parametri**

  * `aloetouchobjects` - *Array di [AloeTouchObject](#loggetto-aloetouchobject) o di id.*


### AloeTouch.unlock(id)

Sblocca lo stato di un elemento.

**Parametri**

  * `id` - *L'id dell'[AloeTouchObject](#loggetto-aloetouchobject).*

**Esempio**

  * [Lock/Unlock](blob/master/examples/lock-unlock.html)).


### AloeTouch.unlockExcept(aloetouchobjects)

Sblocca tutti gli [AloeTouchObject](#loggetto-aloetouchobject) e blocca quelli presenti nell'array `aloetouchobjects`.

**Parametri**

  * `aloetouchobjects` - *Array di [AloeTouchObject](#loggetto-aloetouchobject) o di id.*


### AloeTouch.unlockOnly(aloetouchobjects)

Sblocca solo gli [AloeTouchObject](#loggetto-aloetouchobject) presenti nell'array `aloetouchobjects` e blocca tutti gli altri.

**Parametri**

  * `aloetouchobjects` - *Array di [AloeTouchObject](#loggetto-aloetouchobject) o di id.*



# Integrazione
