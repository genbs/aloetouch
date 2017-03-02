let State = {

    /**
     * Crea un oggetto vuoto per il contenimento dei valori degli eventi pan, pinch e rotate
     */
    new()
    {
        return {
            pan: { x: null, y: null },
            pinch: null,
            rotate: null
        }
    },

    /**
     * Crea un nuovo oggetto che conterra i valori precedenti degli eventi
     */
    create()
    {
        return Object.assign({}, State.new(), { old: State.new() })
    },

    /**
     * Binda i nuovi valori dall'evento corrente (chiamato da touchmove->dispatch->emit) con i valori precendenti
     *
     * @param {ATS} state
     * @param {ATEvent} event
     */
    set(state, event, customState)
    {
        event.rotate && ( state.rotate = event.rotate + state.old.rotate )
        event.pinch && ( state.pinch = event.pinch + state.old.pinch )
        event.pan && event.pan.x && ( state.pan.x = event.pan.x + state.old.pan.x )
        event.pan && event.pan.y && ( state.pan.y = event.pan.y + state.old.pan.y )

        // Aggiungo gli state settati dall'utente
        Object.keys(customState).forEach( cs => state[cs] = customState[cs](state) )

        return state
    },

    /**
     * All'evento touchend setto i valori precendeti con l'ultimo settato
     *
     * @param {ATS} state
     */
    refresh(state)
    {
        state.old = State.copyState(state)

        return state
    },

    /**
     * Copio l'oggetto state
     */
    copyState(state)
    {
        let n = {}
        Object.keys(state).forEach( k => {
            k != 'old' && ( n[k] = typeof(state[k]) === 'object' && state[k] !== null ? State.copyState(state[k]) : state[k] )
        })
        return n
    }

}

export default {
    set: State.set,
    create: State.create,
    refresh: State.refresh
}