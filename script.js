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
// const frameCount = 1

const currentFrame = index =>
(
    // `./assets/test/pexels${index.toString().padStart(3, '0')}.jpg`
    `./assets/fireball/pexels${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () =>
{
    for (let i = 1; i < frameCount; i++)
    {
        const img = new Image()
        img.src = currentFrame(i)
    }
}

const wSize = {}
const updateWindowSize = () =>
{
    wSize.width = window.innerWidth
    wSize.height = window.innerHeight
}

preloadImages()
updateWindowSize()

const setImgSize = (defaultWidth, defaultHeight) =>
{
    const finalSize = {}

    if(wSize.width / wSize.height > defaultWidth / defaultHeight)
    {
        finalSize.width = wSize.width
        finalSize.height = (wSize.width * defaultHeight) / defaultWidth
    }
    else if(wSize.width / wSize.height < defaultWidth / defaultHeight)
    {
        finalSize.width = (wSize.height * defaultWidth) / defaultHeight
        finalSize.height = wSize.height
    }
    return finalSize
}

const img = new Image()
img.src = currentFrame(1);
// const imgSize = setImgSize(3648, 5472)
const imgSize = setImgSize(1422, 800)
CONTEXT.canvas.width = CANVAS.offsetWidth
CONTEXT.canvas.height = CANVAS.offsetHeight



img.onload=function()
{
    CONTEXT.drawImage(
        img,
        CANVAS.offsetWidth / 2 - imgSize.width / 2,
        CANVAS.offsetHeight / 2 - imgSize.height / 2,
        imgSize.width,
        imgSize.height
    )
}

const updateImage = (img, index) =>
{
    img.src = currentFrame(index)
}


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

imgScene.on('update', (_event) =>
{
    scrollPosition = _event.scrollPos

    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil((scrollPosition / (duration * 1.1)) * frameCount)
    )

    requestAnimationFrame(() => updateImage(img, frameIndex + 1))
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

// Section End
const sectionEndDuration = 400
const sectionEnd = TweenMax.fromTo(
    INTRO,
    1,
    {
        css:{
            transform: 'scale(1)'
        }
    },
    {
        css:{
            transform: 'scale(0.6)'
        }
    }
)
const sectionScene = new ScrollMagic.Scene({
    duration: sectionEndDuration,
    triggerElement: INTRO,
    triggerHook: 0,
    offset: duration - sectionEndDuration
})
    .setTween(sectionEnd)
    .addTo(controller)