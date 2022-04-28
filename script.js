// inspi https://codepen.io/j-v-w/pen/ZEbGzyv?editors=0110
const HTML = document.documentElement
const CANVAS = document.getElementById("hero")
const CONTEXT = CANVAS.getContext("2d")
const INTRO = document.querySelector('.intro')
const TEXT = INTRO.querySelector('h1')

const frameCount = 340

const currentFrame = index =>
(
    `./assets/IMG_0076${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () =>
{
    for (let i = 1; i < frameCount; i++)
    {
        const img = new Image()
        img.src = currentFrame(i)
    }
}

const img = new Image()
img.src = currentFrame(1);
CANVAS.width=563;
CANVAS.height=1000;
img.onload=function()
{
    CONTEXT.drawImage(img, 0, 0)
}

const updateImage = index =>
{
    img.src = currentFrame(index)
    CONTEXT.drawImage(img, 0, 0)
}

preloadImages()

const controller = new ScrollMagic.Controller()
// Img Animation
const duration = 3000

const imgScene = new ScrollMagic.Scene({
    duration,
    triggerElement: INTRO,
    triggerHook: 0
})
    .setPin(INTRO)
    .addTo(controller)

let scrollPosition = 0
let accelAmount = 0.1
let delay = 0

imgScene.on('update', (_event) =>
{
    scrollPosition = _event.scrollPos

    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil((scrollPosition / (duration * 1.1)) * frameCount)
    )

    requestAnimationFrame(() => updateImage(frameIndex + 1))
})

// Txt Animation
const txtAnim = TweenMax.fromTo(TEXT, 3, { opacity: 1 }, { opacity: 0 })
const txtScene = new ScrollMagic.Scene({
    duration,
    triggerElement: INTRO,
    triggerHook: 0
})
    .setTween(txtAnim)
    .addTo(controller);