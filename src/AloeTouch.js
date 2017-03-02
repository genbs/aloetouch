import AloeTouchObject from './AloeTouchObject'

/**
 * AloeTouch
 */
let AloeTouch = {

    length: 0,

    list: {},

    /**
     * Binda un nuovo elemento
     */
    bind(element, events, strict)
    {
        let id = ++AloeTouch.length

        let ato = new AloeTouchObject(id, element, events, strict)

        ato = {
            el: ato.el,
            attach: ato.attach.bind(ato),               // Binda un evento
            detach: ato.detach.bind(ato),               // Rimuovo il listener di un evento
            setState: ato.setState.bind(ato),           // Setta uno stato personalizzato
            removeState: ato.removeState.bind(ato),     // Rimuove uno state
            clearState: ato.clearState.bind(ato),       // Azzera la variabile state
            lock: ato.lock.bind(ato),                   // Rimuove i listener per tutti gli eventi
            unlock: ato.unlock.bind(ato),               // Rebinda i listener per gli eventii
            id                                          // id dell'oggetto
        }

        return ( AloeTouch.list[id] = ato )
    },

    /**
     * Ritorna un elemento in base al suo id
     */
    get(id)
    {
        return AloeTouch.list[id]
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
        AloeTouch.map((ato, id) => {
            AloeTouch.list[id][ids.indexOf(id) == -1 ? 'unlock' : 'lock']()
        })
    },

    /**
     * Blocca solo gli oggetti con id presente in ids
     *
     * @param {Number?} id
     */
    lockOnly(ids)
    {
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
     * @param {Number?} id
     */
    unlockExcept(ids)
    {
        AloeTouch.lockOnly(ids)
    },

    /**
     * Abilita gli eventi solo agli elementi con id presente nell'array ids
     *
     * @param {Number?} id
     */
    unlockOnly(ids)
    {
        AloeTouch.lockExcept(ids)
    },

    /**
     * Mappa tutti li elementi bindati
     *
     * @param {Callable(Object, id)}
     */
    map(callable){
        Object.keys(AloeTouch.list).forEach(id => callable(AloeTouch.list[id], id))
    }

}

export default AloeTouch