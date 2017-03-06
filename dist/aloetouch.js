'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AloeTouchObject = require('./AloeTouchObject');

var _AloeTouchObject2 = _interopRequireDefault(_AloeTouchObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AloeTouch
 */
exports.default = AloeTouch = {

  /**
   * Contiene il numero di elementi
   *
   * @type {Number}
   */
  length: 0,

  /**
   * Lista degli AloeTouchObject
   *
   * @type {Object}
   */
  list: {},

  /**
   * Binda un nuovo elemento
   *
   * @param {DOMElement} element Elemento da bindare
   * @param {Object}     events  Eventi da assegnare all'elemento
   * @param {Boolean}    strict  Se settata, valida l'evento solo se il target del touch è l'elemento bindato
   */
  bind: function bind(element, events, strict) {
    var id = ++AloeTouch.length;

    return AloeTouch.list[id] = {
      $id: id, // id dell'oggetto
      attach: AloeTouch.caller('attach'), // Binda un evento
      detach: AloeTouch.caller('detach'), // Rimuovo il listener di un evento
      setState: AloeTouch.caller('setState'), // Setta uno stato personalizzato
      getState: AloeTouch.caller('getState'), // Setta uno stato personalizzato
      removeState: AloeTouch.caller('removeState'), // Rimuove uno state
      clearState: AloeTouch.caller('clearState'), // Azzera la variabile state
      isLock: AloeTouch.caller('isLock'), // Rimuove i listener per tutti gli eventi
      lock: AloeTouch.caller('lock'), // Rimuove i listener per tutti gli eventi
      unlock: AloeTouch.caller('unlock'), // Rebinda i listener per gli eventii
      $ref: new _AloeTouchObject2.default(id, element, events, strict) // refrenza all'oggetto
    };
  },


  /**
   * Chiama una funzione bindando il riferimento dell'oggetto chimante
   * @param  {String} fn
   * @return {Function}
   */
  caller: function caller(fn) {
    return function (data) {
      this.$ref && this.$ref[fn](data);
    };
  },


  /**
   * Rimuove i listener ad un elemento
   *
   * @param {AloeTouchObject or Numer} aloetouchobject
   * @return {Boolean} true se l'elemento è stato rimosso, falso altrimenti
   */
  unbind: function unbind(aloetouchobject) {
    var id = this.getIds(aloetouchobject, true);

    if (id) {
      AloeTouch.list[id].lock();
      delete AloeTouch.list[id].$ref;
      delete AloeTouch.list[id];
      return true;
    }

    return false;
  },


  /**
   * Ritorna un elemento in base al suo id
   *
   * @param {Number} id
   */
  get: function get(id) {
    return AloeTouch.list.hasOwnProperty(id) ? AloeTouch.list[id] : null;
  },


  /**
   * Ritorna un' array di id
   *
   * @param {Array<AloeTouchObject or Number>} aloetouchobjects
   * @param {Boolean} flag Ritorna un id se l'array ha lunghezza pari a uno
   * @return {Array<Number> or Number}
   */
  getIds: function getIds(aloetouchobjects, flag) {
    aloetouchobjects = aloetouchobjects.constructor.name === 'Array' ? aloetouchobjects : [aloetouchobjects];
    aloetouchobjects = aloetouchobjects.map(function (ato) {
      return typeof ato === 'number' ? AloeTouch.get(ato) ? ato : null : ato.$ref ? ato.$id : null;
    });
    aloetouchobjects = aloetouchobjects.filter(function (id) {
      return !!id;
    });

    return flag ? aloetouchobjects.length == 1 ? aloetouchobjects[0] : aloetouchobjects : aloetouchobjects;
  },


  /**
   * Blocca un oggetto singolo o tutti
   *
   * @param {Number?} id Blocca gli eventi per l'oggetto con id 'id'
   */
  lock: function lock(id) {
    id ? AloeTouch.list[id].lock() : AloeTouch.map(function (ato) {
      return ato.lock();
    });
  },


  /**
   *  Blocca tutti gli oggetti tranne quelli presenti nell'array aloetouchobjects
   *
   * @param {Array<AloeTouchObject or Number>} aloetouchobjects
   */
  lockExcept: function lockExcept(aloetouchobjects) {
    ids = this.getIds(ids) || [];

    AloeTouch.map(function (ato, id) {
      return ato[ids.indexOf(id) == -1 ? 'unlock' : 'lock']();
    });
  },


  /**
   * Blocca solo gli oggetti presenti in aloetouchobjects
   *
   * @param {Array<AloeTouchObject or Number>} aloetouchobjects
   */
  lockOnly: function lockOnly(aloetouchobjects) {
    ids = this.getIds(ids) || [];

    AloeTouch.map(function (ato, id) {
      return ato[ids.indexOf(id) >= 0 ? 'lock' : 'unlock']();
    });
  },


  /**
   * Abilita li eventi ad un oggetto singolo o tutti
   *
   * @param {Number?} id
   */
  unlock: function unlock(id) {
    id ? AloeTouch.list[id].unlock() : AloeTouch.map(function (ato) {
      return ato.unlock();
    });
  },


  /**
   * Abilita gli eventi tranne agli elementi presenti nell'array aloetouchobjects
   *
   * @param {Array<AloeTouchObject or Number>} aloetouchobjects
   */
  unlockExcept: function unlockExcept(aloetouchobjects) {
    AloeTouch.lockOnly(aloetouchobjects);
  },


  /**
   * Abilita gli eventi solo agli elementi presenti nell'array aloetouchobjects
   *
   * @param {Array<AloeTouchObject or Number>} aloetouchobjects
   */
  unlockOnly: function unlockOnly(aloetouchobjects) {
    AloeTouch.lockExcept(aloetouchobjects);
  },


  /**
   * Mappa tutti li elementi bindati
   *
   * @param {Callable(AloeTouchObject, id)}
   */
  map: function map(callable) {
    Object.keys(AloeTouch.list).forEach(function (id) {
      return callable(AloeTouch.list[id], id);
    });
  }
};
