const CANVAS2 = document.getElementById("next")
const CONTEXT2 = CANVAS2.getContext("2d")
const SECTION2 = document.querySelector('.next')

const frameCount2 = 621

const img2 = new Image()
img2.src = currentFrame(1)
CONTEXT2.canvas.width = CANVAS2.offsetWidth
CONTEXT2.canvas.height = CANVAS2.offsetHeight
const imgSize2 = setImgSize(1422, 800)


img2.onload=function()
{
    CONTEXT2.drawImage(
        img2,
        CANVAS2.offsetWidth / 2 - imgSize2.width / 2,
        CANVAS2.offsetHeight / 2 - imgSize2.height / 2,
        imgSize2.width,
        imgSize2.height
    )
}

const duration2 = 5000
const imgScene2 = new ScrollMagic.Scene({
    duration2,
    triggerElement: SECTION2,
    triggerHook: 0
})
    .setPin(SECTION2)
    .addTo(controller)


imgScene2.on('update', (_event) =>
{
    scrollPosition = _event.scrollPos - duration

    if(scrollPosition < 0) return
    const frameIndex = Math.min(
        frameCount2 - 1,
        Math.ceil((scrollPosition / (duration2 * 1.1)) * frameCount2)
    )

    requestAnimationFrame(() => updateImage(img2, frameIndex + 1))
})