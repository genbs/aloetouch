let Utils = {
    /**
     * Crea (o modifico) l'oggetto ATO (AloeTouchObject) contenente la Touchlist
     *
     * @param  {Event}      event
     * @param  {DOMElement} element
     * @param  {ATO?}       oldATO
     */
    create(event, element, oldATO)
    {
        let ATO = oldATO ? Object.assign({}, oldATO, { updated: true }) : { time: Date.now() }

        ATO.touches = Utils.getTouches(event.touches ? event.touches : [event], element)

        return ATO
    },

    /**
     * Preleva la touchlist (modificata) dall'evento
     *
     * @param  {Touclist}  touches [description]
     * @param  {DOMElement} element L'emento esiste solo se è settato STRICT
     * @return {Array}
     */
    getTouches(touches, element){
        let data = []

        Object.keys(touches).forEach(e => {
            Utils.validate(touches[e], element) && data.push({
                clientX: touches[e].clientX,
                clientY: touches[e].clientY
            })
        })

        return data
    },

    /**
     * Aggiunge l'oggetto Touch se rispetta la validazone
     *
     * @param {Touch}      touch
     * @param {DOMElement} element
     */
    validate(touch, element)
    {
        return touch && ( touch.clientX || touch.clientY ) && (!element || element == touch.target)
    },

    /**
     * Ritorna la differenza delle coordinate tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    coords(ATOstart, ATOend)
    {
        return Utils.diff(ATOstart.touches[0], ATOend.touches[0])
    },

    /**
     * Ritorna una coordinata basata sulla differenza tra due punti
     *
     * @param {ATO.touch} pointA
     * @param {ATO.touch} pointB
     */
    diff(pointA, pointB)
    {
        return {
            x: pointB.clientX - pointA.clientX,
            y: pointB.clientY - pointA.clientY
        }
    },

    /**
     * Ritorna il numero di touch
     *
     * @param {ATO} ATOe
     */
    howManyTouches(ATO)
    {
        return ATO && ATO.touches ? ATO.touches.length : 0
    },

    /**
     * Ritorna true se la differenza tra le coordinate è principalmente verticale
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    isVertical(ATOstart, ATOend)
    {
        let coords = Utils.coords(ATOstart, ATOend)
        return Math.abs(coords.y) > Math.abs(coords.x)
    },


    /**
     * Ritorna true se la differenza tra le coordinate è principalmente orizzontale
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    isHorizontal(ATOstart, ATOend)
    {
        let coords = Utils.coords(ATOstart, ATOend)
        return Math.abs(coords.x) > Math.abs(coords.y)
    },

    /**
     * Ritorna la direzione in base al valore delle coordinate
     *
     * @param {Object{x,y} } coords
     */
    stringDirection(coords)
    {
        return {
            x: coords.x <= 0 ? 'Left' : 'Right',
            y: coords.y <= 0 ? 'Top' : 'Bottom'
        }
    },

    /* -------------------------------------
     *  Helper per eventi
     * ------------------------------------- */

    /**
     * Ritorna la distanza tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    distanceBetween(ATOstart, ATOend)
    {
        return Utils.distance(ATOend) - Utils.distance(ATOstart)
    },

    /**
     * Ritorna la distanza vettoriale tra due coordinata
     *
     * @param {ATO} ATO
     */
    distance(ATO)
    {
        let distance = Utils.diff(ATO.touches[0], ATO.touches[1])
        return Utils.scalar(distance.x, distance.y)
    },

    /**
     * Distanza scalare
     */
    scalar(a, b, nosqrt)
    {
        let s = Math.pow(a, 2) +  Math.pow(b, 2)
        return nosqrt === false ? s : Math.sqrt(s)
    },

    /**
     * Ritorna la direzione tangente tra due coordinate
     *
     * @param {ATO} ATO
     */
    direction(ATO)
    {
        let distance = Utils.diff(ATO.touches[0], ATO.touches[1])
        return Utils.angle(distance.x, distance.y)
    },

    /**
     * Angolo
     */
    angle(a, b) 
    {
        return Math.atan2(b, a) * 180 / Math.PI
    },

    /**
     * Ritorna l'angolo di rotazione tra due ATO
     *
     * @param {ATO} ATOstart
     * @param {ATO} ATOend
     */
    rotation(ATOstart, ATOend)
    {
        return Utils.direction(ATOend) - Utils.direction(ATOstart)
    }
}

export default {
    create: Utils.create,
    coords: Utils.coords,
    howManyTouches: Utils.howManyTouches,
    isVertical: Utils.isVertical,
    isHorizontal: Utils.isHorizontal,
    stringDirection: Utils.stringDirection,
    distanceBetween: Utils.distanceBetween,
    direction: Utils.direction,
    rotation: Utils.rotation,

    angle: Utils.angle,
    scalar: Utils.scalar
}