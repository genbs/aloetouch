import AloeTouchObject from './classes/AloeTouchObject'

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

        AloeTouch.list[id] = new AloeTouchObject( id, element, events, strict ).public

        return AloeTouch.list[id]
    },


    /**
     * Rimuove i listener ad un elemento
     *
     * @param {AloeTouchObject or Numer} aloetouchobject
     * @return {Boolean} true se l'elemento è stato rimosso, falso altrimenti
     */
    unbind(aloetouchobject)
    {
        let id = this.getIds(aloetouchobject, true)

        if(id) {
            AloeTouch.list[id].lock()
            delete AloeTouch.list[id].$ref
            delete AloeTouch.list[id]
            return true
        }

        return false
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
     * Ritorna un' array di id
     *
     * @param {Array<AloeTouchObject or Number>} aloetouchobjects
     * @param {Boolean} flag Ritorna un id se l'array ha lunghezza pari a uno
     * @return {Array<Number> or Number}
     */
    getIds(aloetouchobjects, flag)
    {
        aloetouchobjects = aloetouchobjects.constructor.name === 'Array' ? aloetouchobjects : [aloetouchobjects]
        aloetouchobjects = aloetouchobjects.map( ato => typeof ato === 'number' ? ( AloeTouch.get(ato) ? ato : null ) : ( ato.$ref ? ato.$id : null ) )
        aloetouchobjects = aloetouchobjects.filter(id => !!id)

        return flag ? ( aloetouchobjects.length == 1 ? aloetouchobjects[0] : aloetouchobjects ) : aloetouchobjects
    },

    /**
     * Blocca un oggetto singolo o tutti
     *
     * @param {Number?} id Blocca gli eventi per l'oggetto con id 'id'
     */
    lock(id)
    {
        id ? AloeTouch.list[id].lock() : AloeTouch.map(ato => ato.lock())
    },

    /**
     *  Blocca tutti gli oggetti tranne quelli presenti nell'array aloetouchobjects
     *
     * @param {Array<AloeTouchObject or Number>} aloetouchobjects
     */
    lockExcept(aloetouchobjects)
    {
        ids = this.getIds(ids) || []

        AloeTouch.map((ato, id) => ato[ids.indexOf(id) == -1 ? 'unlock' : 'lock']())
    },

    /**
     * Blocca solo gli oggetti presenti in aloetouchobjects
     *
     * @param {Array<AloeTouchObject or Number>} aloetouchobjects
     */
    lockOnly(aloetouchobjects)
    {
        ids = this.getIds(ids) || []

        AloeTouch.map((ato, id) => ato[ids.indexOf(id) >= 0 ? 'lock' : 'unlock']())
    },

    /**
     * Abilita li eventi ad un oggetto singolo o tutti
     *
     * @param {Number?} id
     */
    unlock(id)
    {
        id ? AloeTouch.list[id].unlock() : AloeTouch.map(ato => ato.unlock())
    },

    /**
     * Abilita gli eventi tranne agli elementi presenti nell'array aloetouchobjects
     *
     * @param {Array<AloeTouchObject or Number>} aloetouchobjects
     */
    unlockExcept(aloetouchobjects)
    {
        AloeTouch.lockOnly(aloetouchobjects)
    },

    /**
     * Abilita gli eventi solo agli elementi presenti nell'array aloetouchobjects
     *
     * @param {Array<AloeTouchObject or Number>} aloetouchobjects
     */
    unlockOnly(aloetouchobjects)
    {
        AloeTouch.lockExcept(aloetouchobjects)
    },

    /**
     * Mappa tutti li elementi bindati
     *
     * @param {Callable(AloeTouchObject, id)}
     */
    map(callable) {
        Object.keys(AloeTouch.list).forEach(id => callable(AloeTouch.list[id], id))
    }

}

export default AloeTouch