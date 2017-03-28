
/* -------------------------------------
 *  State
 * ------------------------------------- */

export default class State {

    /**
     * Setta gli state personalizzati
     */
    constructor(customState)
    {
        this.customState = customState

        this.old = this.empty()
        this.values = this.empty()
    }

    /**
     * Ritorna uno state vuoto
     * @return {Object}
     */
    empty() {
        return {
            pan: { x: 0, y: 0 },
            pinch: 0,
            rotate: 0
        }
    }

    /**
     * Binda i nuovi valori dall'evento corrente (chiamato da touchmove->dispatch->emit) con i valori precendenti
     *
     * @param {ATS} state
     * @param {ATEvent} event
     */
    set(data)
    {
        data.rotate && ( this.values.rotate = data.rotate + this.old.rotate )
        data.pinch && ( this.values.pinch = data.pinch + this.old.pinch )
        data.pan && data.pan.x && ( this.values.pan.x = data.pan.x + this.old.pan.x )
        data.pan && data.pan.y && ( this.values.pan.y = data.pan.y + this.old.pan.y )

        // Aggiungo gli state settati dall'utente
        Object.keys(this.customState).forEach( cs => this.values[cs] = this.customState[cs](this.values) )

        return this.get()
    }

    /**
     * Ritorna i valori dello state corrente
     */
    get()
    {
        return this.values
    }

    /**
     * All'evento touchend setto i valori precendeti con l'ultimo settato
     *
     * @param {ATS} state
     */
    refresh()
    {
        this.old = this.copy(this.values)
    }

    /**
     * Copia un oggetto
     *
     * @return {Object}
     */
    copy(d)
    {
        let n = {}
        Object.keys(d).forEach( k => {
            n[k] = typeof(d[k]) === 'object' && d[k] !== null ? this.copy(d[k]) : d[k]
        })
        return n
    }


    /**
     * Setta uno state
     *
     * @param {Object} state
     */
    add(state)
    {
        Object.keys(state).forEach( s => this.customState[s] = state[s] )
        this.set({})
    }

    /**
     * Rimuove uno state
     *
     * @param {String} name Nome dello state da rimuovere
     */
    remove(name)
    {
        this.values[name] = null
        this.values[name] = null

        delete this.values[name]
        delete this.values[name]
    }

    /**
     * Cancella lo state con ivalori correnti
     */
    clear()
    {
        this.values = this.empty()
        this.old = this.empty()
    }
}