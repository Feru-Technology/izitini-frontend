export const imageZoom = () => {

    const zoom = document.getElementById('zoom')
    const image = document.getElementById('image')
    const lens = document.getElementById('lens')

    let ratio = 2
    let cx = 0, cy = 0
    if (lens && zoom) {
        cx = zoom.offsetWidth / lens.offsetWidth
        cy = zoom.offsetHeight / lens.offsetHeight
    }

    if (zoom) {
        // @ts-ignore
        zoom.style.backgroundImage = `url(${image.src})`
        // @ts-ignore
        zoom.style.backgroundSize = (image.width * cx) + 'px ' + (image.height * cy) + 'px'
    }


    // track the cursor movements
    const moveZoom = () => {

        const p = getCursor()
        let x = 0, y = 0
        if (lens) {
            x = p.x - (lens.offsetWidth / 2)
            y = p.y - (lens.offsetHeight / 2)
        }

        // @ts-ignore
        if (lens && x && image && x > image.width - lens.offsetWidth) x = image.width - lens.offsetWidth
        if (x && x < 0) x = 0
        // @ts-ignore
        if (lens && y && image && y > image.height - lens.offsetHeight) y = image.height - lens.offsetHeight
        if (y && y < 0) y = 0

        if (lens) {
            lens.style.left = x + 'px'
            lens.style.top = y + 'px'
        }

        // @ts-ignore
        if (zoom) return zoom.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px'
    }

    // get the cursor position
    const getCursor = () => {

        const e = window.event
        const b = image?.getBoundingClientRect()
        // @ts-ignore
        let x = e.pageX - b.left
        // @ts-ignore
        let y = e.pageY - b.top
        return { 'x': x, 'y': y }
    }

    return moveZoom()
}
