import { coords, rotation, distanceBetween } from '../services/Utils'
import Events from '../services/Events'
import State from './State'

/* -------------------------------------
 *  Bindaggio ed emissione eventi
 * ------------------------------------- */

export default class Emitter {

    /**
     * Gestore degli eventi e relativi argomenti
     */
    constructor(id, el, events, ato)
    {
        this.ato = ato
        this.events = events
        this.State = new State(events.state || {})

        this.initialData = { id, el, ato }
        this.before = {}

        this.detach('state')
    }

    /**
     * Emette un evento se settato
     *
     * @param {String} event Nome dell'evento da emettere
     */
    emit(event)
    {
        if( Events.emit(event, this.data, this.events[event]) === false )
            this.detach(event)
    }

    /**
     * Emette un evento dopo un certo 'delay'
     *
     * @param {String}     event Nome dell'evento da emettere
     * @param {Int}        delay Millisecondi da ritardare
     * @param {Callable?}  callback Funzione da chiamare dopo il delay
     */
    emitBefore(event, delay, callback)
    {
        this.clearBefore(event)

        this.before[event] = window.setTimeout(() => {
            this.emit(event)
            callback && callback()
        }, delay)
    }

    /**
     * Rimuove un evento da ritardare
     *
     * @param {String?} event Nome dell'evento da rimuovere. Se non settato, verranno rimossi tutti.
     */
    clearBefore(event)
    {
        if( typeof event === 'undefined' )
            Object.keys(this.before).forEach(e => this.clearBefore(e))
        else {
            this.before[event] && window.clearTimeout(this.before[event])
            this.before[event] = null
            delete this.before[event]
        }
    }


    /**
     * Prepare i dati da inviare agli eventi
     */
    prepare(started, ended, fingers, final)
    {
        this.data = Object.assign({}, this.initialData, { started, ended, fingers, final })

        this.setStateData(started, ended, fingers, final) // Setta lo state se si sta 'preparando' un evento non finale

        this.data.$state = this.State.get()
    }

    /**
     * Prepara la variabile che conterrà lo 'state'
     */
    setStateData(started, ended, fingers, final)
    {
        if( fingers == 1 )
            this.data.pan = coords(started, ended)
        else if( fingers == 2) {
            this.data.pan = coords(started, ended)
            this.data.pinch = distanceBetween(started, ended)
            this.data.rotate = rotation(started, ended)
        }
        !final && this.State.set(this.data)
    }

    /**
     * Aggiunge un evento
     */
    attach(events)
    {
        Object.keys(events).forEach( e => this.events[e] = events[e] )
    }

    /**
     * Rimuove un evento
     */
    detach(events)
    {
        events = events.constructor.name === 'Array' ? events : [events]
        events.forEach(e => this.events[e] && delete this.events[e])
    }


}