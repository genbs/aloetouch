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

### AloeTouch.bind(element, events, strict)

**Parametri**

 * `element` - **String / DOMElement** - *Elemento a cui bindare gli eventi*.
 * `events` - **Object** - *Oggetto che contiene gli eventi da gestire e gli [state personalizzati]()*.
 * `strict` - **Boolean** - *Se settata a true, gli eventi verranno bindati solo se il target è l'elemento bindato*.
 
Il parametro `strict` è di default impostato a *false*. Questo valore deve essere impostato a *true* nel caso in cui
si vogliano gestire più elementi in modo simultaneo (ad esempio [due eventi *pan*](blob/master/examples/multitouch.html)).

**Valore di ritorno**

 * Un oggetto di tipo [AloeTouchObject](#loggetto-aloetouchobject)

**Esempo**

```js
var ato = AloeTouch.bind('#el', {
  rotate: function(gradi) {
    ato.el.style.transform = 'rotate('+ gradi +'deg)'
  }
});
```

### AloeTouch.unbind(aloeTouchObject)

**Parametri**

  * `aloeTouchObject` - **[AloeTouchObject](#loggetto-aloetouchobject) / Number** - *Oggetto - oppure l'id - da rimuovere*. 

**Valore di ritorno**

  **Boolean** - *true* se l'oggetto è stato rimosso con successo, falso altrimenti.

**Esempio**
```js
var ato = AloeTouch.bind('#el', {
  pan: function(coords) {
    ato.el.style.transform = 'translate('+ coords.x +'px, '+ coords.y +'px)';
    
  }
});
```

* unbind(`AloeTouchObject`)
* get(`id`)
* lock(`id`)
* lockExcept(`ids`)
* lockOnly(`ids`)
* unlock(`id`)
* unlockExcept(`ids`)
* unlockOnly(`ids`)

I parametri 


# Integrazione
