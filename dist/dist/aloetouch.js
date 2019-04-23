exports["AloeTouch"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/AloeTouch.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AloeTouch.js":
/*!**************************!*\
  !*** ./src/AloeTouch.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_AloeTouchObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/AloeTouchObject */ "./src/classes/AloeTouchObject.js");

/**
 * AloeTouch
 */

var AloeTouch = {
  /**
   * Version
   *
   * @type {String}
   */
  version: '0.0.2',

  /**
   * Contiene il numero di elementi
   *
   * @type {Number}
   */
  increment: 0,

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
   * @param {Object}    settings Impostazioni per l'ATO
   */
  bind: function bind(element, events, settings) {
    var id = ++AloeTouch.increment;
    var ato = new _classes_AloeTouchObject__WEBPACK_IMPORTED_MODULE_0__["default"](id, element, events, settings).public;
    ato.el.setAttribute('aloetouch-data-id', id);
    return AloeTouch.list[id] = ato;
  },

  /**
   * Rimuove i listener ad un elemento
   *
   * @param {AloeTouchObject or Numer} aloetouchobject
   * @return {Boolean} true se l'elemento è stato rimosso, falso altrimenti
   */
  unbind: function unbind(aloetouchobject) {
    var id = aloetouchobject.nodeType ? aloetouchobject.getAttribute('aloetouch-data-id') : this.getIds(aloetouchobject, true);

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
   * @param {Boolean} first Ritorna un id se l'array ha lunghezza pari a uno
   * @return {Array<Number> or Number}
   */
  getIds: function getIds(aloetouchobjects, first) {
    aloetouchobjects = aloetouchobjects.constructor.name === 'Array' ? aloetouchobjects : [aloetouchobjects];
    aloetouchobjects = aloetouchobjects.map(function (ato) {
      return typeof ato === 'number' ? AloeTouch.get(ato) ? ato : null : ato.$ref ? ato.$id : null;
    });
    aloetouchobjects = aloetouchobjects.filter(function (id) {
      return !!id;
    });
    return first ? aloetouchobjects[0] : aloetouchobjects;
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
   *  Blocca tutti gli oggetti tranne quelli presenti nell'array ids
   *
   * @param {Array<AloeTouchObject or Number>} ids
   */
  lockExcept: function lockExcept(ids) {
    ids = this.getIds(ids) || [];
    AloeTouch.map(function (ato, id) {
      return ato[ids.indexOf(id) == -1 ? 'unlock' : 'lock']();
    });
  },

  /**
   * Blocca solo gli oggetti presenti in ids
   *
   * @param {Array<AloeTouchObject or Number>} ids
   */
  lockOnly: function lockOnly(ids) {
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
   * Abilita gli eventi solo agli elementi presenti nell'array ids
   *
   * @param {Array<AloeTouchObject or Number>} ids
   */
  unlockOnly: function unlockOnly(ids) {
    AloeTouch.lockExcept(ids);
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
/* harmony default export */ __webpack_exports__["default"] = (AloeTouch);

/***/ }),

/***/ "./src/classes/AloeTouchObject.js":
/*!****************************************!*\
  !*** ./src/classes/AloeTouchObject.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AloeTouchObject; });
/* harmony import */ var _services_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/constants */ "./src/services/constants.js");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/Utils */ "./src/services/Utils.js");
/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dispatcher */ "./src/classes/Dispatcher.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * Settaggi di default
 * @type Object
 */

var DEFAULT_SETTINGS = {
  strict: false,
  stopPropagation: false,
  isPermissible: null,
  onlyX: false,
  onlyY: false
  /**
   * Assegna gli eventi touch ad un elemento
   *
   * GLi eventi disponibili sono:
   * Touch singolo
   *     tap, dbltap, press, pan, swipe, swipeLeft, swipeRight, swipeTop, swipeBottom
   * Touch doppio
   *     pan2, pinch, rotate
   */

};

var AloeTouchObject =
/*#__PURE__*/
function () {
  /**
   * Binda gli eventi all'elemento
   * @param {DomElement} element
   * @param {Object} events Oggetto che contiene le funzioni es. { tap: ..., swipeLeft: ..., rotate: ... }
   * @param {Object<Boolean>} strict
   */
  function AloeTouchObject(id, element, events, settings) {
    _classCallCheck(this, AloeTouchObject);

    this.id = id;
    this.el = typeof element === 'string' ? document.querySelector(element) : element;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, settings);
    this.locked = true;
    this.public = this.getPublicMethods();
    this.Dispatcher = new _Dispatcher__WEBPACK_IMPORTED_MODULE_2__["default"](id, this.el, events, this.public);
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.finish = this.finish.bind(this);
    this.unlock();
    this.el.style.willChange = 'transform';
  }
  /**
   * Eventi 'touchstart' 'mousedown'
   */


  _createClass(AloeTouchObject, [{
    key: "start",
    value: function start(event) {
      !this.locked && this.Dispatcher.start(event, Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["getTouches"])(event, this.el, this.settings.strict), this.settings.stopPropagation);
    }
    /**
     * Eventi 'touchmove'
     */

  }, {
    key: "move",
    value: function move(event) {
      if (!this.locked && this.Dispatcher.isStarted() && this.Dispatcher.end(event, Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["getTouches"])(event, this.el, this.settings.strict)) && this.isPermissible(event)) {
        if (this.settings.stopPropagation === true || this.settings.stopPropagation === 1) event.stopPropagation();
        if (this.settings.stopPropagation === true || this.settings.stopPropagation === 2) event.stopImmediatePropagation();
        event.preventDefault();
        this.Dispatcher.dispatch(null, event);
      } else {
        this.Dispatcher.clear();
      }
    }
    /**
     * Questa funzionalitò è molto importante poiché previene che l'evento 'touchmove'
     * prevenga l'azione di default dell'evento (e quindi blocchi lo scrolling)
     */

  }, {
    key: "isPermissible",
    value: function isPermissible(event) {
      var _this = this;

      return this.settings.isPermissible ? this.settings.isPermissible(event, Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["coords"])(this.Dispatcher.started, this.Dispatcher.ended), this.Dispatcher.started, this.Dispatcher.ended) : function () {
        var time = Date.now() - _this.Dispatcher.started.time;

        var _isHorizontal = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["isHorizontal"])(_this.Dispatcher.started, _this.Dispatcher.ended);

        var _isVertical = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["isVertical"])(_this.Dispatcher.started, _this.Dispatcher.ended);

        return event.cancelable && (!_this.settings.onlyX && !_this.settings.onlyY && time > _services_constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_TIME"] || _isHorizontal || _this.settings.onlyX && _isHorizontal || _this.settings.onlyY && _isVertical);
      }();
    }
    /**
     * Termino l'evento
     */

  }, {
    key: "finish",
    value: function finish(event) {
      if (!this.locked && this.Dispatcher.isStarted()) {
        this.Dispatcher.dispatch(true, event);

        if (this.settings.stopPropagation) {
          event.stopPropagation();
          event.stopImmediatePropagation();
        }
      }
    }
    /**
     * Ritorna vero se questo oggetto è bloccato, falso altrimenti
     *
     * @return {Boolean}
     */

  }, {
    key: "isLock",
    value: function isLock() {
      return this.locked;
    }
    /**
     * Rimuove i listener degli eventi
     */

  }, {
    key: "lock",
    value: function lock() {
      if (!this.locked) {
        this.off('touchstart', this.start, true);
        this.off('touchmove', this.move, true);
        this.off('touchend touchcancel', this.finish, true);
        this.locked = true;
      }
    }
    /**
     * Binda gli eventi
     */

  }, {
    key: "unlock",
    value: function unlock() {
      if (this.locked) {
        this.on('touchstart', this.start);
        this.on('touchmove', this.move);
        this.on('touchend touchleave touchcancel', this.finish, true);
        this.locked = false;
      }
    }
    /**
     * Bindo gli eventi all'elemento
     */

  }, {
    key: "on",
    value: function on(events, handler, passive) {
      var _this2 = this;

      events.split(' ').forEach(function (e) {
        return _this2.el.addEventListener(e, handler, passive ? {
          passive: true
        } : true);
      });
    }
    /**
     * Rimuovo i listeners
     */

  }, {
    key: "off",
    value: function off(events, handler) {
      var _this3 = this;

      events.split(' ').forEach(function (e) {
        return _this3.el.removeEventListener(e, handler, true);
      });
    }
    /**
     * Helper per una chiamata più semplice alle funzioni
     */

  }, {
    key: "getPublicMethods",
    value: function getPublicMethods() {
      var ato = this;
      return {
        el: this.el,
        $id: this.id,
        attach: function attach(events) {
          ato.Dispatcher.Emitter.attach(events);
        },
        detach: function detach(events) {
          ato.Dispatcher.Emitter.detach(events);
        },
        getState: function getState() {
          return ato.Dispatcher.Emitter.State.get();
        },
        clearState: function clearState() {
          ato.Dispatcher.Emitter.State.clear();
        },
        addState: function addState(state) {
          ato.Dispatcher.Emitter.State.add(state);
        },
        removeState: function removeState(name) {
          ato.Dispatcher.Emitter.State.remove(name);
        },
        lock: function lock() {
          ato.lock();
        },
        unlock: function unlock() {
          ato.unlock();
        },
        isLock: function isLock() {
          return ato.isLock();
        },
        $ref: this
      };
    }
  }]);

  return AloeTouchObject;
}();



/***/ }),

/***/ "./src/classes/Dispatcher.js":
/*!***********************************!*\
  !*** ./src/classes/Dispatcher.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dispatcher; });
/* harmony import */ var _services_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/constants */ "./src/services/constants.js");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/Utils */ "./src/services/Utils.js");
/* harmony import */ var _Emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Emitter */ "./src/classes/Emitter.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * Dispatcher - smistare gli eventi
 */

var Dispatcher =
/*#__PURE__*/
function () {
  /**
   * Binda l'Emtitter che chiamerà gli eventi
   */
  function Dispatcher(id, element, events, ato) {
    _classCallCheck(this, Dispatcher);

    this.Emitter = new _Emitter__WEBPACK_IMPORTED_MODULE_2__["default"](id, element, events || {}, ato);
    this.started = null;
    this.ended = null;
    this.lastTap = null;
  }
  /**
   * Setta l'evento iniziale
   * Binderà l'evento press nel caso in cui l'utente non rilascerà o muoverà l'elemento
   */


  _createClass(Dispatcher, [{
    key: "start",
    value: function start(event, touches, stopPropagation) {
      //if (!event.cancelable)
      //return this.clear()
      !this.started ? this.started = {
        time: Date.now(),
        touches: touches
      } : this.started.touches = touches;

      var _fingers = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["fingers"])(this.started);

      if (_fingers) {
        this.Emitter.prepare(this.started);
        this.Emitter.emitAfter('press', _services_constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_PRESS_MIN_TIME"]);
        this.Emitter.emit('start', event);

        if (_fingers > 1) {
          event.preventDefault(); // Blocca lo scrolling nel caso in cui l'utente abbia toccato l'elemento con più di un dito

          if (stopPropagation) {
            if (stopPropagation === true || stopPropagation === 1) event.stopPropagation();
            if (stopPropagation === true || stopPropagation === 2) event.stopImmediatePropagation();
          }
        }
      }
    }
    /**
     * Ritorna vero se l'evento è stato inizializzato correttamente
     */

  }, {
    key: "isStarted",
    value: function isStarted() {
      return !!this.started;
    }
    /**
     * Setta il punto corrente ( richiamato dalla gestore dell'evento touchmove: AloeTouchObject@move )
     */

  }, {
    key: "end",
    value: function end(event, touches) {
      this.ended = {
        time: Date.now(),
        touches: touches
      };
      return Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["fingers"])(this.started) == Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["fingers"])(this.ended);
    }
    /**
     * Smisto gli eventi in 'touchmove' in base al numero di tocchi in base alla tipologia dell'evento
     *
     * @param {Boolean} final Questo valore è settato a true se questa funzione è chiamanta dall'evento touchend o touchcancel
     * @param {Event} 
     */

  }, {
    key: "dispatch",
    value: function dispatch(final, event) {
      var _fingers = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_1__["fingers"])(this.ended);

      this.Emitter.prepare(this.started, this.ended, _fingers, !!final);
      final ? this.dispatchFinalEvents(!!this.ended, event) : this.dispatchMovedEvents(_fingers, event); // Smisto al tipo di eventi
    }
    /**
     * Gestione degli eventi che non richiedono movimento
     */

  }, {
    key: "dispatchFinalEvents",
    value: function dispatchFinalEvents(move, event) {
      move ? this.dispatchSwipe(event) : this.dispatchTap(event);
      this.Emitter.emit('end', event);
      this.clear();
    }
    /**
     * Gestione degli eventi con movimento
     */

  }, {
    key: "dispatchMovedEvents",
    value: function dispatchMovedEvents(_fingers, event) {
      this.Emitter.clearAfter('press'); // l'evento press non è più valido se l'utente si muove sull'elemento
      // Smisto gli eventi in base al numero dei tocchi

      if (_fingers == 1) this.Emitter.emit('pan', event);else if (_fingers == 2) {
        this.Emitter.emit('pan2', event);
        this.Emitter.emit('pinch', event);
        this.Emitter.emit('rotate', event);
      }
      this.Emitter.emit('move', event); // Chiamo l'evento speciale 'move' in ogni caso
    }
    /**
     * Gestione dell'evento particolare 'tap' e 'dbltap'
     */

  }, {
    key: "dispatchTap",
    value: function dispatchTap(event) {
      var _this = this;

      if (!this.lastTap) {
        this.lastTap = this.started.time;
        this.Emitter.emitAfter('tap', _services_constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_DBL_TAP_TIME"], function () {
          return _this.lastTap = null;
        });
      } else if (this.started.time - this.lastTap < _services_constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_DBL_TAP_TIME"]) {
        this.Emitter.clearAfter('tap');
        this.Emitter.emit('dbltap', event);
        this.lastTap = null;
      }
    }
    /**
     * Gestione dell'evento 'swipe'
     */

  }, {
    key: "dispatchSwipe",
    value: function dispatchSwipe(event) {
      this.Emitter.emit('swipe', event);
      this.Emitter.emit('swipeLeft', event);
      this.Emitter.emit('swipeRight', event);
      this.Emitter.emit('swipeTop', event);
      this.Emitter.emit('swipeBottom', event);
    }
    /**
     * Reset delle variabili
     */

  }, {
    key: "clear",
    value: function clear() {
      this.started = null;
      this.ended = null;
      this.Emitter.clearAfter('press');
      this.Emitter.State.refresh();
    }
  }]);

  return Dispatcher;
}();



/***/ }),

/***/ "./src/classes/Emitter.js":
/*!********************************!*\
  !*** ./src/classes/Emitter.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Emitter; });
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/Utils */ "./src/services/Utils.js");
/* harmony import */ var _services_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/Events */ "./src/services/Events.js");
/* harmony import */ var _State__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./State */ "./src/classes/State.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/* -------------------------------------
 *  Bindaggio ed emissione eventi
 * ------------------------------------- */

var Emitter =
/*#__PURE__*/
function () {
  /**
   * Gestore degli eventi e relativi argomenti
   */
  function Emitter(id, el, events, ato) {
    _classCallCheck(this, Emitter);

    this.ato = ato;
    this.events = events;
    this.State = new _State__WEBPACK_IMPORTED_MODULE_2__["default"](events.state || {});
    this.initialData = {
      id: id,
      el: el,
      ato: ato
    };
    this.after = {};
    this.detach('state');
  }
  /**
   * Emette un evento se settato
   *
   * @param {String} eventName Nome dell'evento da emettere
   * @param {Event} event
   */


  _createClass(Emitter, [{
    key: "emit",
    value: function emit(eventName, event) {
      if (_services_Events__WEBPACK_IMPORTED_MODULE_1__["default"].emit(eventName, this.data, this.events[eventName], event) === false) this.detach(eventName);
    }
    /**
     * Emette un evento dopo un certo 'delay'
     *
     * @param {String}     event Nome dell'evento da emettere
     * @param {Int}        delay Millisecondi da ritardare
     * @param {Callable?}  callback Funzione da chiamare dopo il delay
     */

  }, {
    key: "emitAfter",
    value: function emitAfter(event, delay, callback) {
      var _this = this;

      this.clearAfter(event);
      this.after[event] = window.setTimeout(function () {
        _this.emit(event);

        callback && callback();
      }, delay);
    }
    /**
     * Rimuove un evento da ritardare
     *
     * @param {String?} event Nome dell'evento da rimuovere. Se non settato, verranno rimossi tutti.
     */

  }, {
    key: "clearAfter",
    value: function clearAfter(event) {
      var _this2 = this;

      if (typeof event === 'undefined') Object.keys(this.after).forEach(function (e) {
        return _this2.clearAfter(e);
      });else {
        this.after[event] && window.clearTimeout(this.after[event]);
        this.after[event] = null;
        delete this.after[event];
      }
    }
    /**
     * Prepare i dati da inviare agli eventi
     */

  }, {
    key: "prepare",
    value: function prepare(started, ended, fingers, final) {
      this.data = Object.assign({}, this.initialData, {
        started: started,
        ended: ended,
        fingers: fingers,
        final: final
      });
      this.setStateData(started, ended, fingers, final); // Setta lo state se si sta 'preparando' un evento non finale

      this.data.$state = this.State.get();
    }
    /**
     * Prepara la variabile che conterrà lo 'state'
     */

  }, {
    key: "setStateData",
    value: function setStateData(started, ended, fingers, final) {
      if (fingers == 1) this.data.pan = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_0__["coords"])(started, ended);else if (fingers == 2) {
        this.data.pan = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_0__["coords"])(started, ended);
        this.data.pinch = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_0__["distanceBetween"])(started, ended);
        this.data.rotate = Object(_services_Utils__WEBPACK_IMPORTED_MODULE_0__["rotation"])(started, ended);
      }
      !final && this.State.set(this.data);
    }
    /**
     * Aggiunge un evento
     */

  }, {
    key: "attach",
    value: function attach(events) {
      var _this3 = this;

      Object.keys(events).forEach(function (e) {
        return _this3.events[e] = events[e];
      });
    }
    /**
     * Rimuove un evento
     */

  }, {
    key: "detach",
    value: function detach(events) {
      var _this4 = this;

      events = events.constructor.name === 'Array' ? events : [events];
      events.forEach(function (e) {
        return _this4.events[e] && delete _this4.events[e];
      });
    }
  }]);

  return Emitter;
}();



/***/ }),

/***/ "./src/classes/State.js":
/*!******************************!*\
  !*** ./src/classes/State.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return State; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* -------------------------------------
 *  State
 * ------------------------------------- */
var State =
/*#__PURE__*/
function () {
  /**
   * Setta gli state personalizzati
   */
  function State(customState) {
    _classCallCheck(this, State);

    this.customState = customState;
    this.old = this.empty();
    this.values = this.empty();
  }
  /**
   * Ritorna uno state vuoto
   * @return {Object}
   */


  _createClass(State, [{
    key: "empty",
    value: function empty() {
      return {
        pan: {
          x: 0,
          y: 0
        },
        pinch: 0,
        rotate: 0
      };
    }
    /**
     * Binda i nuovi valori dall'evento corrente (chiamato da touchmove->dispatch->emit) con i valori precendenti
     *
     * @param {ATS} state
     * @param {ATEvent} event
     */

  }, {
    key: "set",
    value: function set(data) {
      var _this = this;

      data.rotate && (this.values.rotate = data.rotate + this.old.rotate);
      data.pinch && (this.values.pinch = data.pinch + this.old.pinch);
      data.pan && data.pan.x && (this.values.pan.x = data.pan.x + this.old.pan.x);
      data.pan && data.pan.y && (this.values.pan.y = data.pan.y + this.old.pan.y); // Aggiungo gli state settati dall'utente

      Object.keys(this.customState).forEach(function (cs) {
        return _this.values[cs] = _this.customState[cs](_this.values);
      });
      return this.get();
    }
    /**
     * Ritorna i valori dello state corrente
     */

  }, {
    key: "get",
    value: function get() {
      return this.values;
    }
    /**
     * All'evento touchend setto i valori precendeti con l'ultimo settato
     *
     * @param {ATS} state
     */

  }, {
    key: "refresh",
    value: function refresh() {
      this.old = this.copy(this.values);
    }
    /**
     * Copia un oggetto
     *
     * @return {Object}
     */

  }, {
    key: "copy",
    value: function copy(d) {
      var _this2 = this;

      var n = {};
      Object.keys(d).forEach(function (k) {
        n[k] = _typeof(d[k]) === 'object' && d[k] !== null ? _this2.copy(d[k]) : d[k];
      });
      return n;
    }
    /**
     * Setta uno state
     *
     * @param {Object} state
     */

  }, {
    key: "add",
    value: function add(state) {
      var _this3 = this;

      Object.keys(state).forEach(function (s) {
        return _this3.customState[s] = state[s];
      });
      this.set({});
    }
    /**
     * Rimuove uno state
     *
     * @param {String} name Nome dello state da rimuovere
     */

  }, {
    key: "remove",
    value: function remove(name) {
      this.values[name] = null;
      this.values[name] = null;
      delete this.values[name];
      delete this.values[name];
    }
    /**
     * Cancella lo state con ivalori correnti
     */

  }, {
    key: "clear",
    value: function clear() {
      this.values = this.empty();
      this.old = this.empty();
    }
  }]);

  return State;
}();



/***/ }),

/***/ "./src/services/Events.js":
/*!********************************!*\
  !*** ./src/services/Events.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/services/constants.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/services/Utils.js");


/* -------------------------------------
 *  Eventi
 * ------------------------------------- */

/**
 * Lista di tutti gli eventi gestibili
 * @type {Array<String>}
 */

var events = ['start', 'move', 'end', // Eventi speciali
'tap', 'dbltap', 'press', 'swipe', 'swipeTop', 'swipeBottom', 'swipeLeft', 'swipeRight', 'pan', // Eventi un solo dito
'pan2', 'pinch', 'rotate' // Eventi due dita
];
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * Richiama gli altri eventi
   */
  emit: function emit(event, values, callback, nativeEvent) {
    if (events.indexOf(event) >= 0 && this[event] && callback) {
      values.$event = nativeEvent;
      return this[event](values, callback);
    }
  },

  /**
   * Special Event
   */
  start: function start(values, callback) {
    return callback(values);
  },

  /**
   * Special Event
   */
  move: function move(values, callback) {
    return callback(values);
  },

  /**
   * Special Event
   */
  end: function end(values, callback) {
    var coords = values.pan;

    if (coords) {
      values.isSwipe = false;
      var directions = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["stringDirection"])(coords);

      if (Math.abs(coords.x) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) {
        values.isSwipe = true;
        values.directions ? values.directions.x = directions.x : values.directions = {
          x: directions.x
        };
      }

      if (Math.abs(coords.y) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) {
        values.isSwipe = true;
        values.directions ? values.directions.y = directions.y : values.directions = {
          y: directions.y
        };
      }
    }

    return callback(values);
  },

  /**
   * Valido l'evento Tap
   */
  tap: function tap(values, callback) {
    if (Date.now() - values.started.time < _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_PRESS_MIN_TIME"]) return callback();
  },

  /**
   * Evento doppio tap
   * ( Validazione nell'Emitter )
   */
  dbltap: function dbltap(values, callback) {
    return callback();
  },

  /**
   * Evento press
   * ( Validazione nell'Emitter )
   */
  press: function press(values, callback) {
    return callback();
  },

  /**
   * Valido l'evento swipe
   */
  swipe: function swipe(values, callback) {
    var coords = values.pan;
    var directions = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["stringDirection"])(coords);
    if (Math.abs(coords.x) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"] || Math.abs(coords.y) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) return callback({
      coords: coords,
      directions: directions
    }, values);
  },

  /**
  * Valido l'evento swipeLeft
  */
  swipeLeft: function swipeLeft(values, callback) {
    var coords = values.pan;
    if (coords.x < 0 && Math.abs(coords.x) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) return callback({
      coords: coords
    }, values);
  },

  /**
   * Valido l'evento swipeRight
   */
  swipeRight: function swipeRight(values, callback) {
    var coords = values.pan;
    if (coords.x > 0 && Math.abs(coords.x) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) return callback({
      coords: coords
    }, values);
  },

  /**
   * Valido l'evento swipeTop
   */
  swipeTop: function swipeTop(values, callback) {
    var coords = values.pan;
    if (Math.abs(coords.y) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) return callback({
      coords: coords
    }, values);
  },

  /**
   * Valido l'evento swipeBottom
   */
  swipeBottom: function swipeBottom(values, callback) {
    var coords = values.pan;
    if (Math.abs(values.pan.y) > _constants__WEBPACK_IMPORTED_MODULE_0__["ALOETOUCH_MIN_SWIPE_DISTANCE"]) return callback({
      coords: coords
    }, values);
  },

  /**
   * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move
   *
   * @param {Object} coords
   */
  pan: function pan(values, callback) {
    return callback(values.pan, values);
  },

  /**
   * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move
   *
   * @param {Object} coords
   */
  pan2: function pan2(values, callback) {
    return callback(values.pan, values);
  },

  /**
   * L'evento pinch non ha bisogno di validazioni, siccome sono state fatte nel metodo move
   *
   * @param {Number} distance
   */
  pinch: function pinch(values, callback) {
    return callback(values.pinch, values);
  },

  /**
   * L'evento rotate non ha bisogno di validazioni, siccome sono state fatte nel metodo move
   *
   * @param {Number} rotation
   */
  rotate: function rotate(values, callback) {
    return callback(values.rotation, values);
  }
});

/***/ }),

/***/ "./src/services/Utils.js":
/*!*******************************!*\
  !*** ./src/services/Utils.js ***!
  \*******************************/
/*! exports provided: getTouches, validate, coords, diff, fingers, isVertical, isHorizontal, stringDirection, velocity, distanceBetween, distance, scalar, direction, angle, rotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTouches", function() { return getTouches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coords", function() { return coords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diff", function() { return diff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fingers", function() { return fingers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVertical", function() { return isVertical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHorizontal", function() { return isHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringDirection", function() { return stringDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "velocity", function() { return velocity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distanceBetween", function() { return distanceBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scalar", function() { return scalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "direction", function() { return direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotation", function() { return rotation; });
/**
 * Preleva la touchlist (modificata) dall'evento
 *
 * @param  {Touchlist}  touches [description]
 * @param  {DOMElement} element L'emento esiste solo se è settato STRICT
 * @param  {Boolean}    strict
 * @return {Array}
 */
function getTouches(event, element, strict) {
  var data = [];
  var touches = event.touches ? event.touches : {
    'e': event
  };
  Object.keys(touches).forEach(function (e) {
    validate(touches[e], element, strict) && data.push({
      screenX: touches[e].screenX,
      screenY: touches[e].screenY
    });
  });
  return data;
}
/**
 * Aggiunge l'oggetto Touch se rispetta la validazone
 *
 * @param {Touch}      touch
 * @param {DOMElement} element
 * @param {Boolean}    strict
 */

function validate(touch, element, strict) {
  return touch && (touch.screenX || touch.screenY) && (!strict ? element.contains(touch.target) : element == touch.target);
}
/**
 * Ritorna la differenza delle coordinate tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */

function coords(ATOstart, ATOend) {
  return diff(ATOstart.touches[0], ATOend.touches[0]);
}
/**
 * Ritorna una coordinata basata sulla differenza tra due punti
 *
 * @param {ATO.touch} pointA
 * @param {ATO.touch} pointB
 */

function diff(pointA, pointB) {
  return {
    x: pointB.screenX - pointA.screenX,
    y: pointB.screenY - pointA.screenY
  };
}
/**
 * Ritorna il numero di touch
 *
 * @param {ATO} ATOe
 */

function fingers(ATO) {
  return ATO && ATO.touches ? ATO.touches.length : 0;
}
/**
 * Ritorna true se la differenza tra le coordinate è principalmente verticale
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */

function isVertical(ATOstart, ATOend) {
  var _coords = coords(ATOstart, ATOend);

  return Math.abs(_coords.y) > Math.abs(_coords.x);
}
/**
 * Ritorna true se la differenza tra le coordinate è principalmente orizzontale
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */

function isHorizontal(ATOstart, ATOend) {
  var _coords = coords(ATOstart, ATOend);

  return Math.abs(_coords.x) > Math.abs(_coords.y);
}
/**
 * Ritorna la direzione in base al valore delle coordinate
 *
 * @param {Object{x,y} } coords
 */

function stringDirection(_coords) {
  return {
    x: _coords.x <= 0 ? 'Left' : 'Right',
    y: _coords.y <= 0 ? 'Top' : 'Bottom'
  };
}
function velocity(ATOstart, ATOend) {
  var _coords = coords(ATOstart, ATOend);

  var duration = (ATOend.time - ATOstart.time) / 1000;
  return {
    x: _coords.x / duration,
    y: _coords.y / duration,
    d: scalar(_coords.x, _coords.y) / duration
  };
}
/**
 * Ritorna la distanza tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */

function distanceBetween(ATOstart, ATOend) {
  return distance(ATOend) - distance(ATOstart);
}
/**
 * Ritorna la distanza vettoriale tra due coordinata
 *
 * @param {ATO} ATO
 */

function distance(ATO) {
  var distance = diff(ATO.touches[0], ATO.touches[1]);
  return scalar(distance.x, distance.y);
}
/**
 * Distanza scalare
 */

function scalar(a, b) {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}
/**
 * Ritorna la direzione tangente tra due coordinate
 *
 * @param {ATO} ATO
 */

function direction(ATO) {
  var distance = diff(ATO.touches[0], ATO.touches[1]);
  return angle(distance.x, distance.y);
}
/**
 * Angolo
 */

function angle(a, b) {
  return Math.atan2(b, a) * 180 / Math.PI;
}
/**
 * Ritorna l'angolo di rotazione tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */

function rotation(ATOstart, ATOend) {
  return direction(ATOend) - direction(ATOstart);
}

/***/ }),

/***/ "./src/services/constants.js":
/*!***********************************!*\
  !*** ./src/services/constants.js ***!
  \***********************************/
/*! exports provided: ALOETOUCH_MIN_TIME, ALOETOUCH_PRESS_MIN_TIME, ALOETOUCH_MIN_SWIPE_DISTANCE, ALOETOUCH_DBL_TAP_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALOETOUCH_MIN_TIME", function() { return ALOETOUCH_MIN_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALOETOUCH_PRESS_MIN_TIME", function() { return ALOETOUCH_PRESS_MIN_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALOETOUCH_MIN_SWIPE_DISTANCE", function() { return ALOETOUCH_MIN_SWIPE_DISTANCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALOETOUCH_DBL_TAP_TIME", function() { return ALOETOUCH_DBL_TAP_TIME; });
/**
 * La durata minimina per bindare un evento
 * Utile a non prevenire lo scrolling
 * @type {Number}
 */
var ALOETOUCH_MIN_TIME = 33;
/**
 * Tempo minimo per bindare l'evento press
 * @type {Number}
 */

var ALOETOUCH_PRESS_MIN_TIME = 600;
/**
 * Distanza minima per bindare l'evento swipe[Direction]
 * @type {Number}
 */

var ALOETOUCH_MIN_SWIPE_DISTANCE = 60;
/**
 * Distanza massima tra due Tap per bindare l'evento Double Tap
 * @type {Number}
 */

var ALOETOUCH_DBL_TAP_TIME = 300;

/***/ })

/******/ });
//# sourceMappingURL=aloetouch.js.map