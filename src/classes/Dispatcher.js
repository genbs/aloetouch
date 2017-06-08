import { ALOETOUCH_PRESS_MIN_TIME, ALOETOUCH_DBL_TAP_TIME } from '../services/constants'
import { fingers } from '../services/Utils'

import Emitter from './Emitter'

/**
 * Dispatcher - smistare gli eventi
 */
export default class Dispatcher {

    /**
     * Binda l'Emtitter che chiamerà gli eventi
     */
    constructor(id, element, events, ato)
    {
        this.Emitter = new Emitter(id, element, events || {}, ato)
        this.started = null
        this.ended = null
        this.lastTap = null
    }

    /**
     * Setta l'evento iniziale
     * Binderà l'evento press nel caso in cui l'utente non rilascerà o muoverà l'elemento
     */
    start(event, touches, stopPropagation)
    {
        if (!event.cancelable)
            return this.clear()

        !this.started ? ( this.started = { time: Date.now(), touches } ) : ( this.started.touches = touches )

        let _fingers = fingers(this.started)

        if( _fingers ) {
            this.Emitter.prepare(this.started)
            this.Emitter.emitAfter('press', ALOETOUCH_PRESS_MIN_TIME)
            this.Emitter.emit('start', event)
            
            if (_fingers > 1) {
                event.preventDefault() // Blocca lo scrolling nel caso in cui l'utente abbia toccato l'elemento con più di un dito
                
                if (stopPropagation) {
                    event.stopPropagation()
                    event.stopImmediatePropagation()
                }
            }
        }
    }

    /**
     * Ritorna vero se l'evento è stato inizializzato correttamente
     */
    isStarted()
    {
        return !!this.started
    }

    /**
     * Setta il punto corrente ( richiamato dalla gestore dell'evento touchmove: AloeTouchObject@move )
     */
    end(event, touches)
    {
        this.ended = { time: Date.now(), touches }

        return fingers(this.started) == fingers(this.ended)
    }

    /**
     * Smisto gli eventi in 'touchmove' in base al numero di tocchi in base alla tipologia dell'evento
     *
     * @param {Boolean} final Questo valore è settato a true se questa funzione è chiamanta dall'evento touchend o touchcancel
     * @param {Event} 
     */
    dispatch(final, event)
    {
        let _fingers = fingers(this.ended)

        this.Emitter.prepare(this.started, this.ended, _fingers, !!final)

        final ? this.dispatchFinalEvents(!!this.ended, event) : this.dispatchMovedEvents(_fingers, event) // Smisto al tipo di eventi
    }

    /**
     * Gestione degli eventi che non richiedono movimento
     */
    dispatchFinalEvents(move, event)
    {
        move ? this.dispatchSwipe(event) : this.dispatchTap(event)
        this.Emitter.emit('end', event)
        this.clear()
    }

    /**
     * Gestione degli eventi con movimento
     */
    dispatchMovedEvents(_fingers, event)
    {
        this.Emitter.clearAfter('press') // l'evento press non è più valido se l'utente si muove sull'elemento

        // Smisto gli eventi in base al numero dei tocchi
        if( _fingers == 1)
           this.Emitter.emit('pan', event)
        else if( _fingers == 2 ) {
            this.Emitter.emit('pan2', event)
            this.Emitter.emit('pinch', event)
            this.Emitter.emit('rotate', event)
        }

        this.Emitter.emit('move', event) // Chiamo l'evento speciale 'move' in ogni caso
    }

    /**
     * Gestione dell'evento particolare 'tap' e 'dbltap'
     */
    dispatchTap(event)
    {
        if(!this.lastTap) {
            this.lastTap = this.started.time
            this.Emitter.emitAfter('tap', ALOETOUCH_DBL_TAP_TIME, () => this.lastTap = null)
        } else if( this.started.time - this.lastTap < ALOETOUCH_DBL_TAP_TIME ) {
            this.Emitter.clearAfter('tap') 
            this.Emitter.emit('dbltap', event) 
            this.lastTap = null
        }
    }

    /**
     * Gestione dell'evento 'swipe'
     */
    dispatchSwipe(event)
    {
        this.Emitter.emit('swipe', event)
        this.Emitter.emit('swipeLeft', event)
        this.Emitter.emit('swipeRight', event)
        this.Emitter.emit('swipeTop', event)
        this.Emitter.emit('swipeBottom', event)
    }

    /**
     * Reset delle variabili
     */
    clear()
    {
        this.started = null
        this.ended = null

        this.Emitter.clearAfter('press')
        this.Emitter.State.refresh()
    }

}