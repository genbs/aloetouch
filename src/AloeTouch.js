import AloeTouchObject from './AloeTouchObject'

/**
 * AloeTouch
 */
let AloeTouch = {

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
    bind(element, events, strict)
    {
        let id = ++AloeTouch.length
        let ato = new AloeTouchObject(id, element, events, strict)
        ato = {
            el: ato.el,
            rect: (() => AloeTouch.getRect(ato.el)),

            attach: AloeTouch.caller('attach'),               // Binda un evento
            detach: AloeTouch.caller('detach'),               // Rimuovo il listener di un evento

            setState: AloeTouch.caller('setState'),           // Setta uno stato personalizzato
            getState: AloeTouch.caller('getState'),           // Setta uno stato personalizzato
            removeState: AloeTouch.caller('removeState'),     // Rimuove uno state
            clearState: AloeTouch.caller('clearState'),       // Azzera la variabile state

            isLock: AloeTouch.caller('isLock'),               // Rimuove i listener per tutti gli eventi
            lock: AloeTouch.caller('lock'),                   // Rimuove i listener per tutti gli eventi
            unlock: AloeTouch.caller('unlock'),               // Rebinda i listener per gli eventii

            $ref: ato,                                         // refrenza all'oggetto
            $id: id                                            // id dell'oggetto
        }

        return ( AloeTouch.list[id] = ato )
    },

    /**
     * Chiama una funzione bindando il riferimento dell'oggetto chimante
     * @param  {String} fn
     * @return {Function}
     */
    caller(fn)
    {
        return function(data) {
            this.$ref && this.$ref[fn](data)
        }
    },

    /**
     * Rimuove i listener ad un elemento
     *
     * @param {Numer or AloeTouchObject} aloetouchobject
     * @return {Boolean} true se l'elemento è stato rimosso, falso altrimenti
     */
    unbind(aloetouchobject)
    {
        let id
        if(typeof aloetouchobject === 'number') {
            aloetouchobject = AloeTouch.get(id)
            id = aloetouchobject ? aloetouchobject.$id : null
        } else {
            id = aloetouchobject.$ref && AloeTouch.get(aloetouchobject.$id) ? aloetouchobject.$id : null
        }

        if(id) {
            aloetouchobject.lock()
            aloetouchobject.$ref = null
            delete AloeTouch.list[id]
            return true
        }

        return false
    },

    /**
     * Ritorna le grandezze dell'elemento relativa alla viewport
     *
     * @param {DOMElement} element
     * @return {Object}
     */
    getRect(element)
    {
        return element.getBoundingClientRect()
    },

    /**
     * Ritorna un elemento in base al suo id
     *
     * @param {Number} id
     */
    get(id)
    {
        return AloeTouch.list.hasOwnProperty(id) ? AloeTouch.list[id] : null
    },

    /**
     * Blocca un oggetto singolo o tutti
     *
     * @param {Number?} id Blocca gli eventi per l'oggetto con id id
     */
    lock(id)
    {
        id && ( AloeTouch.list[id].lock() )
        !id && AloeTouch.map(ato => ato.lock() )
    },

    /**
     *  Blocca tutti gli oggetti tranne gli id presenti nell'array ids
     *
     * @param {Array<Number>} ids
     */
    lockExcept(ids)
    {
        ids = ids || []

        AloeTouch.map((ato, id) => {
            AloeTouch.list[id][ids.indexOf(id) == -1 ? 'unlock' : 'lock']()
        })
    },

    /**
     * Blocca solo gli oggetti con id presente in ids
     *
     * @param {Array<Number>} ids
     */
    lockOnly(ids)
    {
        ids = ids || []

        AloeTouch.map((ato, id) => {
            AloeTouch.list[id][ids.indexOf(id) >= 0 ? 'lock' : 'unlock']()
        })
    },

    /**
     * Abilita li eventi ad un oggetto singolo o tutti
     *
     * @param {Number?} id
     */
    unlock(id)
    {
        id && ( AloeTouch.list[id].unlock() )
        !id && AloeTouch.map(ato => ato.unlock() )
    },

    /**
     * Abilita gli eventi tranne agli elementi con id presente nell'array ids
     *
     * @param {Array<Number>} ids
     */
    unlockExcept(ids)
    {
        AloeTouch.lockOnly(ids)
    },

    /**
     * Abilita gli eventi solo agli elementi con id presente nell'array ids
     *
     * @param {Array<Number>} ids
     */
    unlockOnly(ids)
    {
        AloeTouch.lockExcept(ids)
    },

    /**
     * Mappa tutti li elementi bindati
     *
     * @param {Callable(AloeTouchObject, id)}
     */
    map(callable){
        Object.keys(AloeTouch.list).forEach(id => callable(AloeTouch.list[id], id))
    }

}

export default AloeTouch