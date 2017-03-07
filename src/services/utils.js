/**
 * Preleva la touchlist (modificata) dall'evento
 *
 * @param  {Touchlist}  touches [description]
 * @param  {DOMElement} element L'emento esiste solo se è settato STRICT
 * @param  {Boolean}    strict
 * @return {Array}
 */
export function getTouches(event, element, strict){

    let data = []
    let touches = event.touches ? event.touches : { 'e': event }

    Object.keys(touches).forEach(e => {
        validate(touches[e], element, strict) && data.push({
            screenX: touches[e].screenX,
            screenY: touches[e].screenY
        })
    })

    return data
}

/**
 * Aggiunge l'oggetto Touch se rispetta la validazone
 *
 * @param {Touch}      touch
 * @param {DOMElement} element
 * @param {Boolean}    strict
 */
export function validate(touch, element, strict)
{
    return touch && ( touch.screenX || touch.screenY ) && ( !strict ? element.contains(touch.target) : element == touch.target )
}


/**
 * Ritorna la differenza delle coordinate tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */
export function coords(ATOstart, ATOend)
{
    return diff(ATOstart.touches[0], ATOend.touches[0])
}

/**
 * Ritorna una coordinata basata sulla differenza tra due punti
 *
 * @param {ATO.touch} pointA
 * @param {ATO.touch} pointB
 */
export function diff(pointA, pointB)
{
    return {
        x: pointB.screenX - pointA.screenX,
        y: pointB.screenY - pointA.screenY
    }
}

/**
 * Ritorna il numero di touch
 *
 * @param {ATO} ATOe
 */
export function fingers(ATO)
{
    return ATO && ATO.touches ? ATO.touches.length : 0
}

/**
 * Ritorna true se la differenza tra le coordinate è principalmente verticale
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */
export function isVertical(ATOstart, ATOend)
{
    let _coords = coords(ATOstart, ATOend)
    return Math.abs(_coords.y) > Math.abs(_coords.x)
}


/**
 * Ritorna true se la differenza tra le coordinate è principalmente orizzontale
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */
export function isHorizontal(ATOstart, ATOend)
{
    let _coords = coords(ATOstart, ATOend)
    return Math.abs(_coords.x) > Math.abs(_coords.y)
}

/**
 * Ritorna la direzione in base al valore delle coordinate
 *
 * @param {Object{x,y} } coords
 */
export function stringDirection(_coords)
{
    return {
        x: _coords.x <= 0 ? 'Left' : 'Right',
        y: _coords.y <= 0 ? 'Top' : 'Bottom'
    }
}

export function velocity(ATOstart, ATOend)
{
    let _coords = coords(ATOstart, ATOend)
    let duration = (ATOend.time - ATOstart.time) / 1000

    return {
        x: _coords.x / duration,
        y: _coords.y / duration,
        d: scalar(_coords.x, _coords.y) / duration
    }
}

/**
 * Ritorna la distanza tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */
export function distanceBetween(ATOstart, ATOend)
{
    return distance(ATOend) - distance(ATOstart)
}

/**
 * Ritorna la distanza vettoriale tra due coordinata
 *
 * @param {ATO} ATO
 */
export function distance(ATO)
{
    let distance = diff(ATO.touches[0], ATO.touches[1])
    return scalar(distance.x, distance.y)
}

/**
 * Distanza scalare
 */
export function scalar(a, b)
{
    return Math.sqrt(Math.pow(a, 2) +  Math.pow(b, 2))
}

/**
 * Ritorna la direzione tangente tra due coordinate
 *
 * @param {ATO} ATO
 */
export function direction(ATO)
{
    let distance = diff(ATO.touches[0], ATO.touches[1])
    return angle(distance.x, distance.y)
}

/**
 * Angolo
 */
export function angle(a, b) 
{
    return Math.atan2(b, a) * 180 / Math.PI
}

/**
 * Ritorna l'angolo di rotazione tra due ATO
 *
 * @param {ATO} ATOstart
 * @param {ATO} ATOend
 */
export function rotation(ATOstart, ATOend)
{
    return direction(ATOend) - direction(ATOstart)
}
