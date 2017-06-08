import { ALOETOUCH_MIN_TIME } from '../services/constants'
import { getTouches, isHorizontal, isVertical, coords } from '../services/Utils'

import Dispatcher from './Dispatcher'

/**
 * Settaggi di default
 * @type Object
 */
const DEFAULT_SETTINGS = {
    strict: false,
    stopPropagation: false,
    isPermissible: null,
    onlyX: false,
    onlyY: false
}

/**
 * Assegna gli eventi touch ad un elemento
 *
 * GLi eventi disponibili sono:
 * Touch singolo
 *     tap, dbltap, press, pan, swipe, swipeLeft, swipeRight, swipeTop, swipeBottom
 * Touch doppio
 *     pan2, pinch, rotate
 */
export default class AloeTouchObject {

    /**
     * Binda gli eventi all'elemento
     * @param {DomElement} element
     * @param {Object} events Oggetto che contiene le funzioni es. { tap: ..., swipeLeft: ..., rotate: ... }
     * @param {Object<Boolean>} strict
     */
    constructor(id, element, events, settings)
    {
        this.id = id
        this.el = typeof element === 'string' ? document.querySelector(element) : element
        this.settings = Object.assign({}, DEFAULT_SETTINGS, settings)

        this.locked = true

        this.public = this.getPublicMethods()

        this.Dispatcher = new Dispatcher(id, this.el, events, this.public)

        this.start = this.start.bind(this)
        this.move = this.move.bind(this)
        this.finish = this.finish.bind(this)

        this.unlock()

        this.el.style.willChange = 'transform'
    }

    /**
     * Eventi 'touchstart' 'mousedown'
     */
    start(event)
    {
        !this.locked && this.Dispatcher.start( event, getTouches(event, this.el, this.settings.strict), this.settings.stopPropagation )
    }

    /**
     * Eventi 'touchmove'
     */
    move(event)
    {
        if(
            !this.locked &&
            this.Dispatcher.isStarted() &&
            this.Dispatcher.end(event, getTouches(event, this.el, this.settings.strict) ) &&
            this.isPermissible(event)
        ) {
            event.preventDefault();
            if(this.settings.stopPropagation === true || this.settings.stopPropagation === 1) event.stopPropagation()
            if(this.settings.stopPropagation === true || this.settings.stopPropagation === 2) event.stopImmediatePropagation()

            this.Dispatcher.dispatch(null, event)
        } else {
            this.Dispatcher.clear()
        }
    }

    /**
     * Questa funzionalitò è molto importante poiché previene che l'evento 'touchmove'
     * prevenga l'azione di default dell'evento (e quindi blocchi lo scrolling)
     */
    isPermissible(event)
    {
        return this.settings.isPermissible ? this.settings.isPermissible(event, coords(this.Dispatcher.started, this.Dispatcher.ended), this.Dispatcher.started, this.Dispatcher.ended) : (() => {
            let time = Date.now() - this.Dispatcher.started.time
            let _isHorizontal = isHorizontal(this.Dispatcher.started, this.Dispatcher.ended)
            let _isVertical = isVertical(this.Dispatcher.started, this.Dispatcher.ended)

            return event.cancelable && (
                ((!this.settings.onlyX && !this.settings.onlyY && time > ALOETOUCH_MIN_TIME) || _isHorizontal) ||
                (this.settings.onlyX && _isHorizontal) ||
                (this.settings.onlyY && _isVertical)
            )
        })
    }

    /**
     * Termino l'evento
     */
    finish(event)
    {
        if (!this.locked && this.Dispatcher.isStarted()) {
            this.Dispatcher.dispatch(true, event)
            
            if (this.settings.stopPropagation) {    
                event.stopPropagation()
                event.stopImmediatePropagation()
            }
        }
    }

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
        if( !this.locked ) {
            this.off('touchstart', this.start, true)
            this.off('touchmove', this.move)
            this.off('touchend touchcancel', this.finish, true)
            this.locked = true
        }
    }

    /**
     * Binda gli eventi
     */
    unlock()
    {
        if( this.locked ) {
            this.on('touchstart', this.start, true)
            this.on('touchmove', this.move)
            this.on('touchend touchleave touchcancel', this.finish, true)
            this.locked = false
        }
    }

    /**
     * Bindo gli eventi all'elemento
     */
    on(events, handler, passive)
    {
        events.split(' ').forEach( e => this.el.addEventListener(e, handler, passive ? { passive: true } : true) )
    }

    /**
     * Rimuovo i listeners
     */
    off(events, handler)
    {
        events.split(' ').forEach( e => this.el.removeEventListener(e, handler, true) )
    }

    /**
     * Helper per una chiamata più semplice alle funzioni
     */
    getPublicMethods()
    {
        let ato = this

        return {
            el: this.el,
            $id: this.id,

            attach(events){ ato.Dispatcher.Emitter.attach(events) },
            detach(events){ ato.Dispatcher.Emitter.detach(events) },

            getState(){ ato.Dispatcher.Emitter.State.get() },
            clearState(){ ato.Dispatcher.Emitter.State.clear() },
            addState(state){ ato.Dispatcher.Emitter.State.add(state) },
            removeState(name){ ato.Dispatcher.Emitter.State.remove(name) },

            lock(){ ato.lock() },
            unlock(){ ato.unlock() },
            isLock(){ return ato.isLock() },

            $ref: this
        }
    }

}

