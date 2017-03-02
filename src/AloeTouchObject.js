import Utils from './services/utils'
import State from './services/state'

/**
 * La durata minimina per bindare un evento
 * Utile a non prevenire lo scrolling
 * @type {Number}
 */
const ALOETOUCH_MIN_TIME = 85

/**
 * Tempo minimo per bindare l'evento press
 * @type {Number}
 */
const ALOETOUCH_PRESS_MIN_TIME = 600

/**
 * Distanza minima per bindare l'evento swipe[Direction]
 * @type {Number}
 */
const ALOETOUCH_MIN_SWIPE_DISTANCE = 20

/**
 * Assegna gli eventi touch ad un elemento
 *
 * GLi eventi disponibili sono:
 * Touch singolo
 *     tap, press, pan, swipeLeft, swipeRight, swipeTop, swipeBottom
 * Touch doppio
 *     pinch, rotate
 */
export default class AloeTouchObject {

    /**
     * Binda gli eventi all'elemento
     * @param {DomElement} element
     * @param {Object} events Oggetto che contiene le funzioni es. { tap: ..., swipeLeft: ..., rotate: ... }
     * @param {Boolean} strict Aggiunge le coordinate del tuoch solo se il target è uguale all'elemento bindato
     */
    constructor(id, element, events, strict)
    {
        this.id = id
        this.el = typeof element === 'string' ? document.querySelector(element) : element
        this.events = events || {}
        this.strictMode = strict || true
        this.events.state = this.events.state || {}
        this.locked = true

        // Services
        this.utils = Utils
        this.state = State

        this.__start = this.start.bind(this)
        this.__move = this.move.bind(this)
        this.__finish = this.finish.bind(this)

        this.clear()
        this.clearState()
        this.unlock()
    }


    /**
     * Eventi 'touchstart' 'mousedown'
     */
    start(event)
    {
        if(!this.locked) {
            this.started = this.utils.create(event, this.strictMode ? this.el : null, this.started)

            this.started.updated && ( this.mooving = true )

            // Binderà l'evento press solo se non sarà invocato nè l'evento move, nè finish
            !this.started.updated && ( this.pressEmitted = window.setTimeout(this.press.bind(this), ALOETOUCH_PRESS_MIN_TIME) )

            this.emit('touchstart')
        }
    }

    /**
     * Eventi 'touchmove'
     */
    move(event)
    {
        // Controllo se sono settate le coordinate del touch all'evento start e bindo le nuove coordinate (ended)
        !this.locked && this.prepareMove(event, ended => {
            if(this.isPermissible())
            {
                event.preventDefault()
                event.stopPropagation()

                this.mooving = true
                this.dispatch() // Smisto gli eventi 'mobili': pan, rotate, pitch
            } else {
                this.mooving = false // L'evento non può più essere prevenuto
            }
        })
    }

    /**
     * Eseguo la funczione moove solo se sono settate le coordinate iniziali
     */
    prepareMove(event, callback)
    {
        this.started && callback.call( this, ( this.ended = this.utils.create(event, this.el) ) )
        !this.started && this.clear()
    }

    /**
     * Questa funzionalitò è molto importante poiché previene che l'evento 'touchmove'
     * prevenga l'azione di default dell'evento (e quindi blocchi lo scrolling)
     */
    isPermissible()
    {
        let time = this.ended.time - this.started.time
        let isHorizontal = this.utils.isHorizontal(this.started, this.ended); // Se lo scrolling è orizzontale implica che l'utente non sta scorrendo
                                                                              // verticalmente la pagina, quindi è possibile bloccare lo scrolling
        return this.mooving || (
            this.mooving === null                              // Il caso in cui questa variabile risulta === null avviene solo la priva volta che viene invocata la fuonzione move,
            && ( isHorizontal || time > ALOETOUCH_MIN_TIME )   // infatti viene nullata con la funzione clear presente nel metodo start. Questa cndizione è necessaria perché il metodo
        )                                                      // preventDefault() di Event non può essere invocato in un secondo stadio dell'evento 'touchmove', ma solo la prima volta
    }

    /**
     * Smisto gli eventi in 'touchmove' in base al numero di tocchi
     */
    dispatch()
    {
        let howManyTouches = this.utils.howManyTouches(this.ended),
            pan = null, pinch = null, rotate = null

        if(howManyTouches == 1) {
            pan = this.utils.coords(this.started, this.ended)
        } else if(howManyTouches == 2) {
            pan = this.utils.coords(this.started, this.ended),
            pinch = this.utils.distanceBetween(this.started, this.ended),
            rotate = this.utils.rotation(this.started, this.ended)
        }

        this.setStateAndEmit({ pan, pinch, rotate })
        return this.emit('touchmove', this.stateValue)
    }

    /**
     * Termino l'evento
     */
    finish(event)
    {
        if(!this.locked && this.started)  // Controllo che vale anche per l'evento touchmove
        {
            this.mooving && this.swipe()
            this.mooving === null && this.tap()

            this.stateValue = this.state.refresh(this.stateValue, this.events.state) // aggiorno lo state

            this.emit('touchend')
        }

        this.clear()
    }

    /**
     * Reset delle variabili
     */
    clear()
    {
        this.pressEmitted && window.clearTimeout(this.pressEmitted) // Cancello l'evento press

        this.started = null
        this.ended = null
        this.mooving = null
        this.pressEmitted = null
    }

    /* -------------------------------------
     *  Eventi
     * ------------------------------------- */

    /**
     * Ritorna vero se questo oggetto è bloccato, falso altrimenti
     *
     * @return {Boolean}
     */
    isLock() {
        return this.locked
    }

    /**
     * Rimuove i listener degli eventi
     */
    lock()
    {
        if(!this.locked) {
            this.off('touchstart', this.__start, true)
            this.off('touchmove', this.__move)
            this.off('touchend touchcancel', this.__finish, true)
            this.locked = true
        }
    }

    /**
     * Binda gli eventi
     */
    unlock()
    {
        if(this.locked) {
            this.on('touchstart', this.__start, true)
            this.on('touchmove', this.__move)
            this.on('touchend touchcancel', this.__finish, true)
            this.locked = false
        }
    }

    /* -------------------------------------
     *  State
     * ------------------------------------- */

    /**
     * Setta i valore dello state ed emette gli eventi
     *
     * @param {Object} eventValues Valori da emettere
     */
    setStateAndEmit(eventValues)
    {
        this.stateValue = this.state.set(this.stateValue, eventValues, this.events.state)

        eventValues.pan && this.pan(eventValues.pan, this.stateValue)
        eventValues.pinch && this.pinch(eventValues.pinch, this.stateValue)
        eventValues.rotate && this.rotate(eventValues.rotate, this.stateValue)
    }

    /**
     * Setta uno state
     *
     * @param {Object} state
     */
    setState(state)
    {
        Object.keys(state).forEach( s => {
            this.events.state[s] = state[s]
        })
    }

    /**
     * Ritorna i valori dello state corrente
     */
    getState()
    {
        return this.stateValue
    }

    /**
     * Rimuove uno state
     *
     * @param {String} name Nome dello state da rimuovere
     */
    removeState(name)
    {
        this.state[name] = null
        this.stateValue[name] = null
        delete this.state[name]
        delete this.stateValue[name]
    }

    /**
     * Cancella lo state con ivalori correnti
     */
    clearState()
    {
        this.stateValue = this.state.create()
    }

    /* -------------------------------------
     *  Eventi
     * ------------------------------------- */

    /**
     * Valido l'evento tap
     */
    tap()
    {
        let howManyTouches = this.utils.howManyTouches(this.ended)
        let time = Date.now() - this.started.time

        if( howManyTouches == 1 && time < ALOETOUCH_PRESS_MIN_TIME )
            this.emit('tap')
    }

    /**
     * Evento press
     */
    press()
    {
        if(this.pressEmitted) {
            this.emit('press', null)
            this.pressEmitted = null
        }
    }

    /**
     * Valido l'evento swipe
     */
    swipe()
    {
        let coords = this.utils.coords(this.started, this.ended)

        if( Math.abs(coords.x) > ALOETOUCH_MIN_SWIPE_DISTANCE )
        {
            let stringDirection = this.utils.stringDirection(coords)

            this.emit('swipe' + stringDirection.x, coords)
            this.emit('swipe' + stringDirection.y, coords)
        }
    }

    /**
     * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move

     * @param {Object} coords
     */
    pan(coords)
    {
        return this.emit('pan', coords)
    }

    /**
     * L'evento pinch non ha bisogno di validazioni, siccome sono state fatte nel metodo move
     *
     * @param {Number} distance
     */
    pinch(distance)
    {
        return this.emit('pinch', distance)
    }

    /**
     * L'evento rotate non ha bisogno di validazioni, siccome sono state fatte nel metodo move
     *
     * @param {Number} rotation
     */
    rotate(rotation)
    {
        return this.emit('rotate', rotation)
    }

    /* -------------------------------------
     *  Bindaggio ed emissione eventi
     * ------------------------------------- */

    /**
     * Emette un evento se settato
     *
     * @param {String} event Nome dell'evento da emettere
     * @param {Object} data Dati da passare alla funzione settata per l'evento
     */
    emit(event, data)
    {
        this.events[event] && this.events[event](data ? data : this.stateValue, data ? this.stateValue : null)

        return data
    }

    /**
     * Aggiunge un evento
     */
    attach(event, callable)
    {
        this.events[event] = callable
    }
    /**
     * Rimuove un evento
     */
    detach(event)
    {
        this.events[event] && delete this.events[event]
    }

    /**
     * Bindo gli eventi all'elemento
     */
    on(events, handler, passive)
    {
        events.split(' ').forEach( e => this.el.addEventListener(e, handler, passive ? { passive: true } : false) )
    }

    /**
     * Rimuovo i listeners
     */
    off(events, handler, passive)
    {
        events.split(' ').forEach(e => this.el.removeEventListener(e, handler, passive ? { passive: true } : false))
    }
}

