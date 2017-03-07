import { ALOETOUCH_PRESS_MIN_TIME, ALOETOUCH_MIN_SWIPE_DISTANCE } from './constants'

/* -------------------------------------
 *  Eventi
 * ------------------------------------- */

/**
 * Lista di tutti gli eventi gestibili
 * @type {Array<String>}
 */
const events = [
    'start', 'move', 'end', // Eventi speciali
    'tap', 'dbltap', 'press', 'swipe', 'swipeTop', 'swipeBottom', 'swipeLeft', 'swipeRight', 'pan', // Eventi un solo dito
    'pan2', 'pinch', 'rotate' // Eventi due dita
]

export default  {

    /**
     * Richiama gli altri eventi
     */
    emit(event, values, callback)
    {
        if( events.indexOf(event) >= 0 && this[event] && callback ) {
            let result = this[event](values, callback)
            return result === false ? false: true
        }
    },

    /**
     * Special Event
     */
    start(values, callback){ return callback() },

    /**
     * Special Event
     */
    move(values, callback){ return callback(values) },

    /**
     * Special Event
     */
    end(values, callback){ return callback(values) },

    /**
     * Valido l'evento Tap
     */
    tap(values, callback)
    {
        if( Date.now() - values.started.time < ALOETOUCH_PRESS_MIN_TIME )
            return callback()
    },

    /**
     * Evento doppio tap
     * ( Validazione nell'Emitter )
     */
    dbltap(values, callback){ return callback() },

    /**
     * Evento press
     * ( Validazione nell'Emitter )
     */
    press(values, callback){ return callback() },

    /**
     * Valido l'evento swipe
     */
    swipe(values, callback)
    {
        let coords = values.pan
        let directions = Utils.stringDirection(coords)

        if( Math.abs(coords.x) > ALOETOUCH_MIN_SWIPE_DISTANCE || Math.abs(coords.y) > ALOETOUCH_MIN_SWIPE_DISTANCE )
            return callback({ coords, directions }, values)
    },

     /**
     * Valido l'evento swipeLeft
     */
    swipeLeft(values, callback)
    {
        if( Math.abs(values.pan.x) > ALOETOUCH_MIN_SWIPE_DISTANCE )
            return callback({ coords }, values)
    },

    /**
     * Valido l'evento swipeRight
     */
    swipeRight(values, callback)
    {
        if( Math.abs(values.pan.x) > ALOETOUCH_MIN_SWIPE_DISTANCE )
            return callback({ coords }, values)
    },

    /**
     * Valido l'evento swipeTop
     */
    swipeTop(values, callback)
    {
        if( Math.abs(values.pan.y) > ALOETOUCH_MIN_SWIPE_DISTANCE )
            return callback({ coords }, values)
    },

    /**
     * Valido l'evento swipeBottom
     */
    swipeBottom(values, callback)
    {
        if( Math.abs(values.pan.y) > ALOETOUCH_MIN_SWIPE_DISTANCE )
            return callback({ coords }, values)
    },

    /**
     * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move

     * @param {Object} coords
     */
    pan(values, callback)
    {
        return callback(values.pan, values)
    },

    /**
     * L'evento pan non ha bisogno di validazioni, siccome sono state fatte nel metodo move

     * @param {Object} coords
     */
    pan2(values, callback)
    {
        return callback(values.pan, values)
    },

    /**
     * L'evento pinch non ha bisogno di validazioni, siccome sono state fatte nel metodo move
     *
     * @param {Number} distance
     */
    pinch(values, callback)
    {
        return callback(values.pinch, values)
    },

    /**
     * L'evento rotate non ha bisogno di validazioni, siccome sono state fatte nel metodo move
     *
     * @param {Number} rotation
     */
    rotate(values, callback)
    {
        return callback(values.rotation, values)
    }

}