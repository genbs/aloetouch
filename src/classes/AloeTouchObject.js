import { ALOETOUCH_MIN_TIME } from '../services/constants'
import { getTouches, isHorizontal, velocity } from '../services/Utils'

import Dispatcher from './Dispatcher'

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
     * @param {Boolean} strict Aggiunge le coordinate del tuoch solo se il target è uguale all'elemento bindato
     */
    constructor(id, element, events, strict)
    {
        this.id = id
        this.el = typeof element === 'string' ? document.querySelector(element) : element
        this.strict = !!strict
        this.locked = true

        this.Dispatcher = new Dispatcher(id, this.el, events)

        this.start = this.start.bind(this)
        this.move = this.move.bind(this)
        this.finish = this.finish.bind(this)

        this.unlock()

        this.public = this.getPublicMethods()
    }

    /**
     * Eventi 'touchstart' 'mousedown'
     */
    start(event)
    {
        !this.locked && this.Dispatcher.start( event, getTouches(event, this.el, this.strict) )
    }

    /**
     * Eventi 'touchmove'
     */
    move(event)
    {
        if(
            !this.locked &&
            this.Dispatcher.isStarted() &&
            this.Dispatcher.end(event, getTouches(event, this.el, this.strict) ) &&
            this.isPermissible(event)
        ) {
            event.preventDefault()
            event.stopPropagation()

            this.Dispatcher.dispatch()
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
        let time = Date.now() - this.Dispatcher.started.time
        let _isHorizontal = isHorizontal(this.Dispatcher.started, this.Dispatcher.ended) // Se lo scrolling è orizzontale implica che l'utente non sta scorrendo
                                                                                         // verticalmente la pagina, quindi è possibile bloccare lo scrolling
        return event.cancelable && ( _isHorizontal || time > ALOETOUCH_MIN_TIME )
    }

    /**
     * Termino l'evento
     */
    finish(event)
    {
        !this.locked && this.Dispatcher.isStarted() && this.Dispatcher.dispatch(true)
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
            this.off('touchstart', this.start)
            this.off('touchmove', this.move)
            this.off('touchend touchcancel', this.finish)
            this.locked = true
        }
    }

    /**
     * Binda gli eventi
     */
    unlock()
    {
        if( this.locked ) {
            this.on('touchstart', this.start)
            this.on('touchmove', this.move)
            this.on('touchend touchcancel', this.finish)
            this.locked = false
        }
    }

    /**
     * Bindo gli eventi all'elemento
     */
    on(events, handler)
    {
        events.split(' ').forEach( e => this.el.addEventListener(e, handler, true) )
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

            lock(){ ato.lock },
            unlock(){ ato.unlock },
            isLock(){ ato.isLock() },

            $ref: this
        }
    }

}

