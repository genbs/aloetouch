import AloeTouchObject from './classes/AloeTouchObject'

/**
 * AloeTouch
 */
let AloeTouch = {

    /**
     * Version
     *
     * @type {String}
     */
    version: '0.0.3',

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
     * @param {Object}    settings Impostazioni per l'ATO
     */
    bind(element, events, settings)
    {
        let id = ++AloeTouch.increment

        let ato = new AloeTouchObject( id, element, events, settings ).public
        ato.el.setAttribute('aloetouch-data-id', id)

        return ( AloeTouch.list[id] = ato )
    },


    /**
     * Rimuove i listener ad un elemento
     *
     * @param {AloeTouchObject or Numer} aloetouchobject
     * @return {Boolean} true se l'elemento è stato rimosso, falso altrimenti
     */
    unbind(aloetouchobject)
    {
        let id = aloetouchobject.nodeType ? aloetouchobject.getAttribute('aloetouch-data-id') : this.getIds(aloetouchobject, true)

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
     * @param {Boolean} first Ritorna un id se l'array ha lunghezza pari a uno
     * @return {Array<Number> or Number}
     */
    getIds(aloetouchobjects, first)
    {
        aloetouchobjects = aloetouchobjects.constructor.name === 'Array' ? aloetouchobjects : [aloetouchobjects]
        aloetouchobjects = aloetouchobjects.map( ato => typeof ato === 'number' ? ( AloeTouch.get(ato) ? ato : null ) : ( ato.$ref ? ato.$id : null ) )
        aloetouchobjects = aloetouchobjects.filter(id => !!id)

        return first ? aloetouchobjects[0] : aloetouchobjects
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
     *  Blocca tutti gli oggetti tranne quelli presenti nell'array ids
     *
     * @param {Array<AloeTouchObject or Number>} ids
     */
    lockExcept(ids)
    {
        ids = this.getIds(ids) || []

        AloeTouch.map((ato, id) => ato[ids.indexOf(id) == -1 ? 'unlock' : 'lock']())
    },

    /**
     * Blocca solo gli oggetti presenti in ids
     *
     * @param {Array<AloeTouchObject or Number>} ids
     */
    lockOnly(ids)
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
     * Abilita gli eventi solo agli elementi presenti nell'array ids
     *
     * @param {Array<AloeTouchObject or Number>} ids
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
    map(callable) {
        Object.keys(AloeTouch.list).forEach(id => callable(AloeTouch.list[id], id))
    }

}

export default AloeTouch