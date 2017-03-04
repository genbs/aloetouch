/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AloeTouchObject = __webpack_require__(1);

var _AloeTouchObject2 = _interopRequireDefault(_AloeTouchObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * AloeTouch
 */
var AloeTouch = {

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

exports.default = AloeTouch;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * La durata minimina per bindare un evento
 * Utile a non prevenire lo scrolling
 * @type {Number}
 */
var ALOETOUCH_MIN_TIME = 85;

/**
 * Tempo minimo per bindare l'evento press
 * @type {Number}
 */
var ALOETOUCH_PRESS_MIN_TIME = 600;

/**
 * Distanza minima per bindare l'evento swipe[Direction]
 * @type {Number}
 */
var ALOETOUCH_MIN_SWIPE_DISTANCE = 20;

/**
 * Assegna gli eventi touch ad un elemento
 *
 * GLi eventi disponibili sono:
 * Touch singolo
 *     tap, press, pan, swipeLeft, swipeRight, swipeTop, swipeBottom
 * Touch doppio
 *     pinch, rotate
 */

var AloeTouchObject = function () {

    /**
     * Binda gli eventi all'elemento
     * @param {DomElement} element
     * @param {Object} events Oggetto che contiene le funzioni es. { tap: ..., swipeLeft: ..., rotate: ... }
     * @param {Boolean} strict Aggiunge le coordinate del tuoch solo se il target è uguale all'elemento bindato
     */
    function AloeTouchObject(id, element, events, strict) {
        _classCallCheck(this, AloeTouchObject);

        this.id = id;
        this.el = typeof element === 'string' ? document.querySelector(element) : element;
        this.events = events || {};
        this.strictMode = strict || false;
        this.events.state = this.events.state || {};
        this.locked = true;

        // Services
        this.utils = _utils2.default;
        this.state = _state2.default;

        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.finish = this.finish.bind(this);

        this.clear();
        this.clearState();
        this.unlock();
    }

    /**
     * Eventi 'touchstart' 'mousedown'
     */


    _createClass(AloeTouchObject, [{
        key: 'start',
        value: function start(event) {
            if (!this.locked) {
                this.$event = event;
                this.started = this.utils.create(event, this.strictMode ? this.el : null, this.started);
                this.started.updated ? this.mooving = true : this.pressEmitted = window.setTimeout(this.press.bind(this), ALOETOUCH_PRESS_MIN_TIME);
                // Binderà l'evento press solo se non sarà invocato nè l'evento move, nè finish
                this.emit('start');
            }
        }

        /**
         * Eventi 'touchmove'
         */

    }, {
        key: 'move',
        value: function move(event) {
            var _this = this;

            // Controllo se sono settate le coordinate del touch all'evento start e bindo le nuove coordinate (ended)
            !this.locked && this.prepareMove(event, function (ended) {
                if (_this.isPermissible()) {
                    event.preventDefault();
                    _this.$event = event;
                    _this.mooving = true;
                    _this.dispatch(); // Smisto gli eventi 'mobili': pan, rotate, pitch
                } else {
                    _this.mooving = false; // L'evento non può più essere prevenuto
                }
            });
        }

        /**
         * Eseguo la funczione moove solo se sono settate le coordinate iniziali
         */

    }, {
        key: 'prepareMove',
        value: function prepareMove(event, callback) {
            this.started ? callback(this.ended = this.utils.create(event, this.strictMode ? this.el : null)) : this.clear();
        }

        /**
         * Questa funzionalitò è molto importante poiché previene che l'evento 'touchmove'
         * prevenga l'azione di default dell'evento (e quindi blocchi lo scrolling)
         */

    }, {
        key: 'isPermissible',
        value: function isPermissible() {
            var time = this.ended.time - this.started.time;
            var isHorizontal = this.utils.isHorizontal(this.started, this.ended); // Se lo scrolling è orizzontale implica che l'utente non sta scorrendo
            // verticalmente la pagina, quindi è possibile bloccare lo scrolling
            return this.mooving || this.mooving === null // Il caso in cui questa variabile risulta === null avviene solo la priva volta che viene invocata la fuonzione move,
            && (isHorizontal || time > ALOETOUCH_MIN_TIME) // infatti viene nullata con la funzione clear presente nel metodo start. Questa cndizione è necessaria perché il metodo
            ; // preventDefault() di Event non può essere invocato in un secondo stadio dell'evento 'touchmove', ma solo la prima volta
        }

        /**
         * Smisto gli eventi in 'touchmove' in base al numero di tocchi
         */

    }, {
        key: 'dispatch',
        value: function dispatch() {
            var fingers = this.utils.howManyTouches(this.ended),
                pan = null,
                pinch = null,
                rotate = null;

            if (fingers == 1) {
                pan = this.utils.coords(this.started, this.ended);
            } else if (fingers == 2) {
                pan = this.utils.coords(this.started, this.ended);
                pinch = this.utils.distanceBetween(this.started, this.ended);
                rotate = this.utils.rotation(this.started, this.ended);
            }

            this.setStateAndEmit({ pan: pan, pinch: pinch, rotate: rotate }, fingers);
            this.emit('move');
        }

        /**
         * Setta i valore dello state ed emette gli eventi
         *
         * @param {Object} eventValues Valori da emettere
         */

    }, {
        key: 'setStateAndEmit',
        value: function setStateAndEmit(eventValues, fingers) {
            this.stateValue = this.state.set(this.stateValue, eventValues, this.events.state);

            fingers == 1 && eventValues.pan && this.pan();
            fingers == 2 && eventValues.pan && this.pan2();
            eventValues.pinch && this.pinch(eventValues.pinch);
            eventValues.rotate && this.rotate(eventValues.rotate);
        }

        /**
         * Termino l'evento
         */

    }, {
        key: 'finish',
        value: function finish(event) {
            if (!this.locked && this.started) // Controllo che vale anche per l'evento touchmove
                {
                    this.$event = event;
                    this.mooving && this.swipe();
                    this.mooving === null && this.tap();
                    this.stateValue = this.state.refresh(this.stateValue, this.events.state); // aggiorno lo state
                    this.emit('end');
                }

            this.clear();
        }

        /**
         * Reset delle variabili
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.pressEmitted && window.clearTimeout(this.pressEmitted); // Cancello l'evento press

            this.started = null;
            this.ended = null;
            this.mooving = null;
            this.$event = null;
            this.pressEmitted = null;
        }

        /* -------------------------------------
         *  Eventi
         * ------------------------------------- */

        /**
         * Ritorna vero se questo oggetto è bloccato, falso altrimenti
         *
         * @return {Boolean}
         */

    }, {
        key: 'isLock',
        value: function isLock() {
            return this.locked;
        }

        /**
         * Rimuove i listener degli eventi
         */

    }, {
        key: 'lock',
        value: function lock() {
            if (!this.locked) {
                this.off('touchstart', this.start, true);
                this.off('touchmove', this.move);
                this.off('touchend touchcancel', this.finish, true);
                this.locked = true;
            }
        }

        /**
         * Binda gli eventi
         */

    }, {
        key: 'unlock',
        value: function unlock() {
            if (this.locked) {
                this.on('touchstart', this.start, true);
                this.on('touchmove', this.move);
                this.on('touchend touchcancel', this.finish, true);
                this.locked = false;
            }
        }

        /* -------------------------------------
         *  State
         * ------------------------------------- */

        /**
         * Setta uno state
         *
         * @param {Object} state
         */

    }, {
        key: 'setState',
        value: function setState(state) {
            var _this2 = this;

            Object.keys(state).forEach(function (s) {
                return _this2.events.state[s] = state[s];
            });
        }

        /**
         * Ritorna i valori dello state corrente
         */

    }, {
        key: 'getState',
        value: function getState() {
            return this.stateValue;
        }

        /**
         * Rimuove uno state
         *
         * @param {String} name Nome dello state da rimuovere
         */

    }, {
        key: 'removeState',
        value: function removeState(name) {
            this.state[name] = null;
            this.stateValue[name] = null;
            delete this.state[name];
            delete this.stateValue[name];
        }

        /**
         * Cancella lo state con ivalori correnti
         */

    }, {
        key: 'clearState',
        value: function clearState() {
            this.stateValue = this.state.create();
        }

        /* -------------------------------------
         *  Eventi
         * ------------------------------------- */

        /**
         * Valido l'evento tap
         */

    }, {
        key: 'tap',
        value: function tap() {
            var fingers = this.utils.howManyTouches(this.ended);
            var time = Date.now() - this.started.time;

            if (fingers < 2 && time < ALOETOUCH_PRESS_MIN_TIME) this.emit('tap');
        }

        /**
         * Evento press
         */

    }, {
        key: 'press',
        value: function press() {
            if (this.pressEmitted && !this.mooving) {
                this.emit('press');
                this.pressEmitted = null;
            }
        }

        /**
         * Valido l'evento swipe
         */

    }, {
        key: 'swipe',
        value: function swipe() {
            var coords = this.utils.coords(this.started, this.ended);

            if (Math.abs(coords.x) > ALOETOUCH_MIN_SWIPE_DISTANCE) {
                var stringDirection = this.utils.stringDirection(coords);

                this.emit('swipe' + stringDirection.x);
                this.emit('swipe' + stringDirection.y);
                this.emit('swipe');
            }
        }

        /**
         * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move
          * @param {Object} coords
         */

    }, {
        key: 'pan',
        value: function pan() {
            this.emit('pan');
        }

        /**
         * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move
          * @param {Object} coords
         */

    }, {
        key: 'pan2',
        value: function pan2() {
            this.emit('pan2');
        }

        /**
         * L'evento pinch non ha bisogno di validazioni, siccome sono state fatte nel metodo move
         *
         * @param {Number} distance
         */

    }, {
        key: 'pinch',
        value: function pinch(distance) {
            this.emit('pinch', { distance: distance });
        }

        /**
         * L'evento rotate non ha bisogno di validazioni, siccome sono state fatte nel metodo move
         *
         * @param {Number} rotation
         */

    }, {
        key: 'rotate',
        value: function rotate(rotation) {
            this.emit('rotate', { rotation: rotation });
        }

        /* -------------------------------------
         *  Bindaggio ed emissione eventi
         * ------------------------------------- */

        /**
         * Emette un evento se settato
         *
         * @param {String} event Nome dell'evento da emettere
         */

    }, {
        key: 'emit',
        value: function emit(event, data) {
            if (this.events[event]) {

                //let result = this.events[event](data ? data : this.stateValue, data ? this.stateValue : null)
                var result = this.events[event](this.setEventData(data));

                // Prevengo la gestione degli altri eventi se - nella funzione settata dall'utente - viene restituito il booleano false
                return result === false && this.clear();
            }
        }
    }, {
        key: 'setEventData',
        value: function setEventData(data) {
            var coords = void 0,
                directions = void 0,
                duration = void 0;

            // Per l'evento tap e press
            if (!this.ended) {
                this.ended = this.utils.create(null);
                coords = { x: this.started.touches[0].clientX, y: this.started.touches[0].clientY };
            } else {
                coords = this.utils.coords(this.started, this.ended);
                directions = this.utils.stringDirection(coords);
            }
            duration = (this.ended.time - this.started.time) / 1000;

            return Object.assign({}, {
                el: this.el,
                coords: coords,
                directions: directions,
                velocity: {
                    x: coords.x / duration,
                    y: coords.y / duration,
                    d: this.utils.scalar(coords.x, coords.y) / duration
                },
                fingers: this.utils.howManyTouches(this.ended),
                $state: this.stateValue,
                $event: this.$event,
                duration: duration
            }, data);
        }

        /**
         * Aggiunge un evento
         */

    }, {
        key: 'attach',
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
        key: 'detach',
        value: function detach(events) {
            var _this4 = this;

            events = events.constructor.name === 'Array' ? events : [events];
            events.forEach(function (e) {
                return _this4.events[e] && delete _this4.events[e];
            });
        }

        /**
         * Bindo gli eventi all'elemento
         */

    }, {
        key: 'on',
        value: function on(events, handler, passive) {
            var _this5 = this;

            events.split(' ').forEach(function (e) {
                return _this5.el.addEventListener(e, handler, passive ? { passive: true } : false);
            });
        }

        /**
         * Rimuovo i listeners
         */

    }, {
        key: 'off',
        value: function off(events, handler, passive) {
            var _this6 = this;

            events.split(' ').forEach(function (e) {
                return _this6.el.removeEventListener(e, handler, passive ? { passive: true } : false);
            });
        }
    }]);

    return AloeTouchObject;
}();

exports.default = AloeTouchObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var State = {

    /**
     * Crea un oggetto vuoto per il contenimento dei valori degli eventi pan, pinch e rotate
     */
    init: function init() {
        return {
            pan: { x: null, y: null },
            pinch: null,
            rotate: null
        };
    },


    /**
     * Crea un nuovo oggetto che conterra i valori precedenti degli eventi
     */
    create: function create() {
        return Object.assign({}, State.init(), { $old: State.init() });
    },


    /**
     * Binda i nuovi valori dall'evento corrente (chiamato da touchmove->dispatch->emit) con i valori precendenti
     *
     * @param {ATS} state
     * @param {ATEvent} event
     */
    set: function set(state, event, customState) {
        event.rotate && (state.rotate = event.rotate + state.$old.rotate);
        event.pinch && (state.pinch = event.pinch + state.$old.pinch);
        event.pan && event.pan.x && (state.pan.x = event.pan.x + state.$old.pan.x);
        event.pan && event.pan.y && (state.pan.y = event.pan.y + state.$old.pan.y);

        // Aggiungo gli state settati dall'utente
        Object.keys(customState).forEach(function (cs) {
            return state[cs] = customState[cs](state);
        });

        return state;
    },


    /**
     * All'evento touchend setto i valori precendeti con l'ultimo settato
     *
     * @param {ATS} state
     */
    refresh: function refresh(state) {
        state.$old = State.copyState(state);

        return state;
    },


    /**
     * Copio l'oggetto state
     */
    copyState: function copyState(state) {
        var n = {};
        Object.keys(state).forEach(function (k) {
            k != '$old' && (n[k] = _typeof(state[k]) === 'object' && state[k] !== null ? State.copyState(state[k]) : state[k]);
        });
        return n;
    }
};

exports.default = {
    set: State.set,
    create: State.create,
    refresh: State.refresh
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Utils = {
    /**
     * Crea (o modifico) l'oggetto ATO (AloeTouchObject) contenente la Touchlist
     *
     * @param  {Event}      event
     * @param  {DOMElement} element
     * @param  {ATO?}       oldATO
     */
    create: function create(event, element, oldATO) {
        var ATO = oldATO ? Object.assign({}, oldATO, { updated: true }) : { time: Date.now() };

        ATO.touches = event && event.touches ? Utils.getTouches(event.touches, element) : [{ clientX: 0, clientY: 0 }];

        return ATO;
    },


    /**
     * Preleva la touchlist (modificata) dall'evento
     *
     * @param  {Touchlist}  touches [description]
     * @param  {DOMElement} element L'emento esiste solo se è settato STRICT
     * @return {Array}
     */
    getTouches: function getTouches(touches, element) {
        var data = [];

        Object.keys(touches).forEach(function (e) {
            Utils.validate(touches[e], element) && data.push({
                clientX: touches[e].clientX,
                clientY: touches[e].clientY
            });
        });

        return data;
    },


    /**
     * Aggiunge l'oggetto Touch se rispetta la validazone
     *
     * @param {Touch}      touch
     * @param {DOMElement} element
     */
    validate: function validate(touch, element) {
        return touch && (touch.clientX || touch.clientY) && (!element || element == touch.target);
    },


    /**
     * Ritorna la differenza delle coordinate tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    coords: function coords(ATOstart, ATOend) {
        return Utils.diff(ATOstart.touches[0], ATOend.touches[0]);
    },


    /**
     * Ritorna una coordinata basata sulla differenza tra due punti
     *
     * @param {ATO.touch} pointA
     * @param {ATO.touch} pointB
     */
    diff: function diff(pointA, pointB) {
        return {
            x: pointB.clientX - pointA.clientX,
            y: pointB.clientY - pointA.clientY
        };
    },


    /**
     * Ritorna il numero di touch
     *
     * @param {ATO} ATOe
     */
    howManyTouches: function howManyTouches(ATO) {
        return ATO && ATO.touches ? ATO.touches.length : 0;
    },


    /**
     * Ritorna true se la differenza tra le coordinate è principalmente verticale
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    isVertical: function isVertical(ATOstart, ATOend) {
        var coords = Utils.coords(ATOstart, ATOend);
        return Math.abs(coords.y) > Math.abs(coords.x);
    },


    /**
     * Ritorna true se la differenza tra le coordinate è principalmente orizzontale
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    isHorizontal: function isHorizontal(ATOstart, ATOend) {
        var coords = Utils.coords(ATOstart, ATOend);
        return Math.abs(coords.x) > Math.abs(coords.y);
    },


    /**
     * Ritorna la direzione in base al valore delle coordinate
     *
     * @param {Object{x,y} } coords
     */
    stringDirection: function stringDirection(coords) {
        return {
            x: coords.x <= 0 ? 'Left' : 'Right',
            y: coords.y <= 0 ? 'Top' : 'Bottom'
        };
    },


    /* -------------------------------------
     *  Helper per eventi
     * ------------------------------------- */

    /**
     * Ritorna la distanza tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    distanceBetween: function distanceBetween(ATOstart, ATOend) {
        return Utils.distance(ATOend) - Utils.distance(ATOstart);
    },


    /**
     * Ritorna la distanza vettoriale tra due coordinata
     *
     * @param {ATO} ATO
     */
    distance: function distance(ATO) {
        var distance = Utils.diff(ATO.touches[0], ATO.touches[1]);
        return Utils.scalar(distance.x, distance.y);
    },


    /**
     * Distanza scalare
     */
    scalar: function scalar(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    },


    /**
     * Ritorna la direzione tangente tra due coordinate
     *
     * @param {ATO} ATO
     */
    direction: function direction(ATO) {
        var distance = Utils.diff(ATO.touches[0], ATO.touches[1]);
        return Utils.angle(distance.x, distance.y);
    },


    /**
     * Angolo
     */
    angle: function angle(a, b) {
        return Math.atan2(b, a) * 180 / Math.PI;
    },


    /**
     * Ritorna l'angolo di rotazione tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    rotation: function rotation(ATOstart, ATOend) {
        return Utils.direction(ATOend) - Utils.direction(ATOstart);
    }
};

exports.default = {
    create: Utils.create,
    coords: Utils.coords,
    howManyTouches: Utils.howManyTouches,
    isVertical: Utils.isVertical,
    isHorizontal: Utils.isHorizontal,
    stringDirection: Utils.stringDirection,
    distanceBetween: Utils.distanceBetween,
    direction: Utils.direction,
    rotation: Utils.rotation,
    angle: Utils.angle,
    scalar: Utils.scalar
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AloeTouch = __webpack_require__(0);

var _AloeTouch2 = _interopRequireDefault(_AloeTouch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.AloeTouch = _AloeTouch2.default;

/***/ })
/******/ ]);