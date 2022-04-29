// inspi https://codepen.io/j-v-w/pen/ZEbGzyv?editors=0110
// Check scroll-out js
// and https://codepen.io/jacob_124/pen/dyydWbB?editors=1010
const CANVAS2 = document.getElementById("two")
const CONTEXT2 = CANVAS2.getContext("2d")
const TWO = document.querySelector('.two')

const frameCount2 = 891

const currentFrame2 = index =>
(
    `./assets/fire/vid_2_${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages2 = () =>
{
    for (let i = 1; i < frameCount2; i++)
    {
        const img2 = new Image()
        img2.src = currentFrame2(i)
    }
}

preloadImages2()

const img2 = new Image()
img2.src = currentFrame2(1);
CONTEXT2.canvas.width = CANVAS2.offsetWidth
CONTEXT2.canvas.height = CANVAS2.offsetHeight



img2.onload=function()
{
    CONTEXT2.drawImage(
        img2,
        CANVAS2.offsetWidth / 2 - imgSize.width / 2,
        CANVAS2.offsetHeight / 2 - imgSize.height / 2,
        imgSize.width,
        imgSize.height
    )
}

const updateImage2 = index =>
{
    img2.src = currentFrame2(index)
}


// Img Animation

const img2Scene = new ScrollMagic.Scene({
    duration,
    triggerElement: TWO,
    triggerHook: 0
})
    .setPin(TWO)
    .addTo(controller)

let scrollPosition2 = 0

img2Scene.on('update', (_event) =>
{
    scrollPosition2 = _event.scrollPos
    
    if(scrollPosition2 > 3000)
    {
        const frameIndex = Math.min(
            frameCount2 - 1,
            Math.ceil(((scrollPosition2 - 3000) / duration * 0.8) * frameCount2)
        )
            
        requestAnimationFrame(() => updateImage2(frameIndex + 1))
    }
})