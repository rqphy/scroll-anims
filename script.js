// inspi https://codepen.io/j-v-w/pen/ZEbGzyv?editors=0110
// Check scroll-out js
// and https://codepen.io/jacob_124/pen/dyydWbB?editors=1010
const HTML = document.documentElement
const CANVAS = document.getElementById("hero")
const CONTEXT = CANVAS.getContext("2d")
const INTRO = document.querySelector('.intro')
const TITLE = INTRO.querySelector('.title')
const TXT = INTRO.querySelector('.second')

const frameCount = 621

const currentFrame = index =>
(
    `./assets/pexels${index.toString().padStart(3, '0')}.jpg`
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
CANVAS.width=1422;
CANVAS.height=800;
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

// Title Animation
const titleAnim = TweenMax.fromTo(
    TITLE,
    1,
    {
        css:{
            opacity: '1',
            transform: 'translate3d(-50%, -50%, 0) scale(1)'
        }
    },
    {
        css:{
            opacity: '0',
            transform: 'translate3d(-50%, -50%, 0) scale(2)'
        }
    }
)
const titleScene = new ScrollMagic.Scene({
    duration: duration * 0.33,
    triggerElement: INTRO,
    triggerHook: 0
})
    .setTween(titleAnim)
    .addTo(controller)

// Txt Animation
const txtOffset = 1250
const txtAnim = TweenMax.fromTo(
    TXT,
    1,
    {
        css:{
            opacity: '0',
            transform: 'translate3d(-50%, -50%, 0) scale(1)'
        }
    },
    {
        css:{
            opacity: '1',
            transform: 'translate3d(-50%, -50%, 0) scale(2)'
        }
    }
)
const txtScene = new ScrollMagic.Scene({
    duration: (duration * 0.66) - txtOffset,
    triggerElement: INTRO,
    triggerHook: 0,
    offset: txtOffset
})
    .setTween(txtAnim)
    .addTo(controller)