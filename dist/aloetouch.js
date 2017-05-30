exports["AloeTouch"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTouches = getTouches;
exports.validate = validate;
exports.coords = coords;
exports.diff = diff;
exports.fingers = fingers;
exports.isVertical = isVertical;
exports.isHorizontal = isHorizontal;
exports.stringDirection = stringDirection;
exports.velocity = velocity;
exports.distanceBetween = distanceBetween;
exports.distance = distance;
exports.scalar = scalar;
exports.direction = direction;
exports.angle = angle;
exports.rotation = rotation;
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
    var touches = event.touches ? event.touches : { 'e': event };

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * La durata minimina per bindare un evento
 * Utile a non prevenire lo scrolling
 * @type {Number}
 */
var ALOETOUCH_MIN_TIME = exports.ALOETOUCH_MIN_TIME = 100;

/**
 * Tempo minimo per bindare l'evento press
 * @type {Number}
 */
var ALOETOUCH_PRESS_MIN_TIME = exports.ALOETOUCH_PRESS_MIN_TIME = 600;

/**
 * Distanza minima per bindare l'evento swipe[Direction]
 * @type {Number}
 */
var ALOETOUCH_MIN_SWIPE_DISTANCE = exports.ALOETOUCH_MIN_SWIPE_DISTANCE = 60;

/**
 * Distanza tra due Tap per bindare l'evento Double Tap
 * @type {Number}
 */
var ALOETOUCH_DBL_TAP_TIME = exports.ALOETOUCH_DBL_TAP_TIME = 200;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

var _Utils = __webpack_require__(0);

var _Dispatcher = __webpack_require__(3);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Settaggi di default
 * @type Object
 */
var DEFAULT_SETTINGS = {
    strict: false,
    stopPropagation: false,
    onlyX: false,
    onlyY: false
};

/**
 * Assegna gli eventi touch ad un elemento
 *
 * GLi eventi disponibili sono:
 * Touch singolo
 *     tap, dbltap, press, pan, swipe, swipeLeft, swipeRight, swipeTop, swipeBottom
 * Touch doppio
 *     pan2, pinch, rotate
 */

var AloeTouchObject = function () {

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

        this.Dispatcher = new _Dispatcher2.default(id, this.el, events, this.public);

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
        key: 'start',
        value: function start(event) {
            !this.locked && this.Dispatcher.start(event, (0, _Utils.getTouches)(event, this.el, this.settings.strict));
        }

        /**
         * Eventi 'touchmove'
         */

    }, {
        key: 'move',
        value: function move(event) {
            if (!this.locked && this.Dispatcher.isStarted() && this.Dispatcher.end(event, (0, _Utils.getTouches)(event, this.el, this.settings.strict)) && this.isPermissible(event)) {
                event.preventDefault();
                this.settings.stopPropagation && event.stopPropagation();

                this.Dispatcher.dispatch();
            } else {
                this.Dispatcher.clear();
            }
        }

        /**
         * Questa funzionalitò è molto importante poiché previene che l'evento 'touchmove'
         * prevenga l'azione di default dell'evento (e quindi blocchi lo scrolling)
         */

    }, {
        key: 'isPermissible',
        value: function isPermissible(event) {
            var time = Date.now() - this.Dispatcher.started.time;
            var _isHorizontal = (0, _Utils.isHorizontal)(this.Dispatcher.started, this.Dispatcher.ended);
            var _isVertical = (0, _Utils.isVertical)(this.Dispatcher.started, this.Dispatcher.ended);

            return event.cancelable && (!this.settings.onlyX && !this.settings.onlyY && time > _constants.ALOETOUCH_MIN_TIME || _isHorizontal || this.settings.onlyX && _isHorizontal || this.settings.onlyY && _isVertical);
        }

        /**
         * Termino l'evento
         */

    }, {
        key: 'finish',
        value: function finish() {
            !this.locked && this.Dispatcher.isStarted() && this.Dispatcher.dispatch(true);
        }

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

        /**
         * Bindo gli eventi all'elemento
         */

    }, {
        key: 'on',
        value: function on(events, handler, passive) {
            var _this = this;

            events.split(' ').forEach(function (e) {
                return _this.el.addEventListener(e, handler, passive ? { passive: true } : true);
            });
        }

        /**
         * Rimuovo i listeners
         */

    }, {
        key: 'off',
        value: function off(events, handler) {
            var _this2 = this;

            events.split(' ').forEach(function (e) {
                return _this2.el.removeEventListener(e, handler, true);
            });
        }

        /**
         * Helper per una chiamata più semplice alle funzioni
         */

    }, {
        key: 'getPublicMethods',
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
                    ato.Dispatcher.Emitter.State.get();
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

exports.default = AloeTouchObject;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(1);

var _Utils = __webpack_require__(0);

var _Emitter = __webpack_require__(4);

var _Emitter2 = _interopRequireDefault(_Emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dispatcher - smistare gli eventi
 */
var Dispatcher = function () {

    /**
     * Binda l'Emtitter che chiamerà gli eventi
     */
    function Dispatcher(id, element, events, ato) {
        _classCallCheck(this, Dispatcher);

        this.Emitter = new _Emitter2.default(id, element, events || {}, ato);
        this.started = null;
        this.ended = null;
        this.lastTap = null;
    }

    /**
     * Setta l'evento iniziale
     * Binderà l'evento press nel caso in cui l'utente non rilascerà o muoverà l'elemento
     */


    _createClass(Dispatcher, [{
        key: 'start',
        value: function start(event, touches) {
            if (!event.cancelable) return this.clear();

            !this.started ? this.started = { time: Date.now(), touches: touches } : this.started.touches = touches;

            var _fingers = (0, _Utils.fingers)(this.started);

            if (_fingers) {
                this.Emitter.prepare(this.started);
                this.Emitter.emitBefore('press', _constants.ALOETOUCH_PRESS_MIN_TIME);
                this.Emitter.emit('start');

                _fingers > 1 && event.preventDefault(); // Blocca lo scrolling nel caso in cui l'utente abbia toccato l'elemento con più di un dito
            }
        }

        /**
         * Ritorna vero se l'evento è stato inizializzato correttamente
         */

    }, {
        key: 'isStarted',
        value: function isStarted() {
            return !!this.started;
        }

        /**
         * Setta il punto corrente ( richiamato dalla gestore dell'evento touchmove: AloeTouchObject@move )
         */

    }, {
        key: 'end',
        value: function end(event, touches) {
            this.ended = { time: Date.now(), touches: touches };

            return (0, _Utils.fingers)(this.started) == (0, _Utils.fingers)(this.ended);
        }

        /**
         * Smisto gli eventi in 'touchmove' in base al numero di tocchi in base alla tipologia dell'evento
         *
         * @param {Boolean} final Questo valore è settato a true se questa funzione è chiamanta dall'evento touchend o touchcancel
         */

    }, {
        key: 'dispatch',
        value: function dispatch(final) {
            var _fingers = (0, _Utils.fingers)(this.ended);

            this.Emitter.prepare(this.started, this.ended, _fingers, !!final);

            final ? this.dispatchFinalEvents(!!this.ended) : this.dispatchMovedEvents(_fingers); // Smisto al tipo di eventi
        }

        /**
         * Gestione degli eventi che non richiedono movimento
         */

    }, {
        key: 'dispatchFinalEvents',
        value: function dispatchFinalEvents(move) {
            move ? this.dispatchSwipe() : this.dispatchTap();
            this.Emitter.emit('end');
            this.clear();
        }

        /**
         * Gestione degli eventi con movimento
         */

    }, {
        key: 'dispatchMovedEvents',
        value: function dispatchMovedEvents(_fingers) {
            this.Emitter.clearBefore('press'); // l'evento press non è più valido se l'utente si muove sull'elemento

            // Smisto gli eventi in base al numero dei tocchi
            if (_fingers == 1) this.Emitter.emit('pan');else if (_fingers == 2) {
                this.Emitter.emit('pan2');
                this.Emitter.emit('pinch');
                this.Emitter.emit('rotate');
            }

            this.Emitter.emit('move'); // Chiamo l'evento speciale 'move' in ogni caso
        }

        /**
         * Gestione dell'evento particolare 'tap' e 'dbltap'
         */

    }, {
        key: 'dispatchTap',
        value: function dispatchTap() {
            var _this = this;

            if (!this.lastTap) {
                this.lastTap = this.started.time;
                this.Emitter.emitBefore('tap', _constants.ALOETOUCH_DBL_TAP_TIME, function () {
                    return _this.lastTap = null;
                });
            } else if (this.started.time - this.lastTap < _constants.ALOETOUCH_DBL_TAP_TIME) {
                this.Emitter.clearBefore('tap');
                this.Emitter.emit('dbltap');
                this.lastTap = null;
            }
        }

        /**
         * Gestione dell'evento 'swipe'
         */

    }, {
        key: 'dispatchSwipe',
        value: function dispatchSwipe() {
            this.Emitter.emit('swipe');
            this.Emitter.emit('swipeLeft');
            this.Emitter.emit('swipeRight');
            this.Emitter.emit('swipeTop');
            this.Emitter.emit('swipeBottom');
        }

        /**
         * Reset delle variabili
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.started = null;
            this.ended = null;

            this.Emitter.clearBefore('press');
            this.Emitter.State.refresh();
        }
    }]);

    return Dispatcher;
}();

exports.default = Dispatcher;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(0);

var _Events = __webpack_require__(6);

var _Events2 = _interopRequireDefault(_Events);

var _State = __webpack_require__(5);

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* -------------------------------------
 *  Bindaggio ed emissione eventi
 * ------------------------------------- */

var Emitter = function () {

    /**
     * Gestore degli eventi e relativi argomenti
     */
    function Emitter(id, el, events, ato) {
        _classCallCheck(this, Emitter);

        this.ato = ato;
        this.events = events;
        this.State = new _State2.default(events.state || {});

        this.initialData = { id: id, el: el, ato: ato };
        this.before = {};

        this.detach('state');
    }

    /**
     * Emette un evento se settato
     *
     * @param {String} event Nome dell'evento da emettere
     */


    _createClass(Emitter, [{
        key: 'emit',
        value: function emit(event) {
            if (_Events2.default.emit(event, this.data, this.events[event]) === false) this.detach(event);
        }

        /**
         * Emette un evento dopo un certo 'delay'
         *
         * @param {String}     event Nome dell'evento da emettere
         * @param {Int}        delay Millisecondi da ritardare
         * @param {Callable?}  callback Funzione da chiamare dopo il delay
         */

    }, {
        key: 'emitBefore',
        value: function emitBefore(event, delay, callback) {
            var _this = this;

            this.clearBefore(event);

            this.before[event] = window.setTimeout(function () {
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
        key: 'clearBefore',
        value: function clearBefore(event) {
            var _this2 = this;

            if (typeof event === 'undefined') Object.keys(this.before).forEach(function (e) {
                return _this2.clearBefore(e);
            });else {
                this.before[event] && window.clearTimeout(this.before[event]);
                this.before[event] = null;
                delete this.before[event];
            }
        }

        /**
         * Prepare i dati da inviare agli eventi
         */

    }, {
        key: 'prepare',
        value: function prepare(started, ended, fingers, final) {
            this.data = Object.assign({}, this.initialData, { started: started, ended: ended, fingers: fingers, final: final });

            this.setStateData(started, ended, fingers, final); // Setta lo state se si sta 'preparando' un evento non finale

            this.data.$state = this.State.get();
        }

        /**
         * Prepara la variabile che conterrà lo 'state'
         */

    }, {
        key: 'setStateData',
        value: function setStateData(started, ended, fingers, final) {
            if (fingers == 1) this.data.pan = (0, _Utils.coords)(started, ended);else if (fingers == 2) {
                this.data.pan = (0, _Utils.coords)(started, ended);
                this.data.pinch = (0, _Utils.distanceBetween)(started, ended);
                this.data.rotate = (0, _Utils.rotation)(started, ended);
            }
            !final && this.State.set(this.data);
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
    }]);

    return Emitter;
}();

exports.default = Emitter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* -------------------------------------
 *  State
 * ------------------------------------- */

var State = function () {

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
        key: 'empty',
        value: function empty() {
            return {
                pan: { x: 0, y: 0 },
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
        key: 'set',
        value: function set(data) {
            var _this = this;

            data.rotate && (this.values.rotate = data.rotate + this.old.rotate);
            data.pinch && (this.values.pinch = data.pinch + this.old.pinch);
            data.pan && data.pan.x && (this.values.pan.x = data.pan.x + this.old.pan.x);
            data.pan && data.pan.y && (this.values.pan.y = data.pan.y + this.old.pan.y);

            // Aggiungo gli state settati dall'utente
            Object.keys(this.customState).forEach(function (cs) {
                return _this.values[cs] = _this.customState[cs](_this.values);
            });

            return this.get();
        }

        /**
         * Ritorna i valori dello state corrente
         */

    }, {
        key: 'get',
        value: function get() {
            return this.values;
        }

        /**
         * All'evento touchend setto i valori precendeti con l'ultimo settato
         *
         * @param {ATS} state
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            this.old = this.copy(this.values);
        }

        /**
         * Copia un oggetto
         *
         * @return {Object}
         */

    }, {
        key: 'copy',
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
        key: 'add',
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
        key: 'remove',
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
        key: 'clear',
        value: function clear() {
            this.values = this.empty();
            this.old = this.empty();
        }
    }]);

    return State;
}();

exports.default = State;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(1);

var _Utils = __webpack_require__(0);

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

exports.default = {

  /**
   * Richiama gli altri eventi
   */
  emit: function emit(event, values, callback) {
    if (events.indexOf(event) >= 0 && this[event] && callback) {
      var result = this[event](values, callback);
      return result === false ? false : true;
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
      var directions = (0, _Utils.stringDirection)(coords);

      if (Math.abs(coords.x) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) {
        values.isSwipe = true;
        values.directions ? values.directions.x = directions.x : values.directions = { x: directions.x };
      }

      if (Math.abs(coords.y) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) {
        values.isSwipe = true;
        values.directions ? values.directions.y = directions.y : values.directions = { y: directions.y };
      }
    }

    return callback(values);
  },


  /**
   * Valido l'evento Tap
   */
  tap: function tap(values, callback) {
    if (Date.now() - values.started.time < _constants.ALOETOUCH_PRESS_MIN_TIME) return callback();
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
    var directions = (0, _Utils.stringDirection)(coords);

    if (Math.abs(coords.x) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE || Math.abs(coords.y) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) return callback({ coords: coords, directions: directions }, values);
  },


  /**
  * Valido l'evento swipeLeft
  */
  swipeLeft: function swipeLeft(values, callback) {
    var coords = values.pan;
    if (coords.x < 0 && Math.abs(coords.x) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) return callback({ coords: coords }, values);
  },


  /**
   * Valido l'evento swipeRight
   */
  swipeRight: function swipeRight(values, callback) {
    var coords = values.pan;
    if (coords.x > 0 && Math.abs(coords.x) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) return callback({ coords: coords }, values);
  },


  /**
   * Valido l'evento swipeTop
   */
  swipeTop: function swipeTop(values, callback) {
    var coords = values.pan;
    if (Math.abs(coords.y) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) return callback({ coords: coords }, values);
  },


  /**
   * Valido l'evento swipeBottom
   */
  swipeBottom: function swipeBottom(values, callback) {
    var coords = values.pan;
    if (Math.abs(values.pan.y) > _constants.ALOETOUCH_MIN_SWIPE_DISTANCE) return callback({ coords: coords }, values);
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
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AloeTouchObject = __webpack_require__(2);

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
   * @param {Boolean}    strict  Se settata, valida l'evento solo se il target del touch è l'elemento bindato
   */
  bind: function bind(element, events, strict) {
    var id = ++AloeTouch.increment;

    var ato = new _AloeTouchObject2.default(id, element, events, strict).public;
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

exports.default = AloeTouch;

/***/ })
/******/ ]);