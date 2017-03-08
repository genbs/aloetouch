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
    constructor(id, element, events)
    {
        this.Emitter = new Emitter(id, element, events || {})
        this.started = null
        this.ended = null
        this.lastTap = null
    }

    /**
     * Setta l'evento iniziale
     * Binderà l'evento press nel caso in cui l'utente non rilascerà o muoverà l'elemento
     */
    start(event, touches)
    {
        if ( !event.cancelable )
            return this.clear()

        !this.started ? ( this.started = { time: Date.now(), touches } ) : ( this.started.touches = touches )

        let _fingers = fingers(this.started)

        if( _fingers ) {
            this.Emitter.prepare(this.started)
            this.Emitter.emitBefore('press', ALOETOUCH_PRESS_MIN_TIME)
            this.Emitter.emit('start')

            _fingers > 1 && event.preventDefault() // Blocca lo scrolling nel caso in cui l'utente abbia toccato l'elemento con più di un dito
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
     */
    dispatch(final)
    {
        let _fingers = fingers(this.ended)

        this.Emitter.prepare(this.started, this.ended, _fingers, !!final)

        final ? this.dispatchFinalEvents(!!this.ended) : this.dispatchMovedEvents(_fingers) // Smisto al tipo di eventi
    }

    /**
     * Gestione degli eventi che non richiedono movimento
     */
    dispatchFinalEvents(move)
    {
        move ? this.dispatchSwipe() : this.dispatchTap()

        this.clear()
    }

    /**
     * Gestione degli eventi con movimento
     */
    dispatchMovedEvents(_fingers)
    {
        this.Emitter.clearBefore('press') // l'evento press non è più valido se l'utente si muove sull'elemento

        // Smisto gli eventi in base al numero dei tocchi
        if( _fingers == 1)
           this.Emitter.emit('pan')
        else if( _fingers == 2 ) {
            this.Emitter.emit('pan2')
            this.Emitter.emit('pinch')
            this.Emitter.emit('rotate')
        }

        this.Emitter.emit('move') // Chiamo l'evento speciale 'move' in ogni caso
    }

    /**
     * Gestione dell'evento particolare 'tap' e 'dbltap'
     */
    dispatchTap()
    {
        if(!this.lastTap) {
            this.lastTap = this.started.time
            this.Emitter.emitBefore('tap', ALOETOUCH_DBL_TAP_TIME, () => this.lastTap = null)
        } else if( this.started.time - this.lastTap < ALOETOUCH_DBL_TAP_TIME ) {
            this.Emitter.clearBefore('tap') 
            this.Emitter.emit('dbltap') 
            this.lastTap = null
        }
    }

    /**
     * Gestione dell'evento 'swipe'
     */
    dispatchSwipe()
    {
        this.Emitter.emit('swipe')
        this.Emitter.emit('swipeLeft')
        this.Emitter.emit('swipeRight')
        this.Emitter.emit('swipeTop')
        this.Emitter.emit('swipeBottom')
    }

    /**
     * Reset delle variabili
     */
    clear()
    {
        this.started = null
        this.ended = null

        this.Emitter.clearBefore('press')
        this.Emitter.State.refresh()
    }

}