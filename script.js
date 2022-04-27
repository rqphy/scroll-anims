const INTRO = document.querySelector('.intro')
const VIDEO = INTRO.querySelector('video')

// SCROLL MAGIC
const controller = new ScrollMagic.Controller()
const scene = new ScrollMagic.Scene({
    duration: 9000,
    triggerElemnt: INTRO,
    triggerHook: 0
})
    .addTo(controller)
    .setPin(INTRO)

console.log(scene)

// Video Animation
let accelAmount = 0.1
let scrollPosition = 0
let delay = 0

scene.on('update', (_event) =>
{
    scrollPosition = _event.scrollPos / 1000
})


VIDEO.currentTime = 0

const init = () =>
{
    setInterval(() =>
    {
        delay += (scrollPosition - delay) * accelAmount
        // VIDEO.currentTime = 5
        VIDEO.currentTime = delay
        console.log(VIDEO.currentTime, scrollPosition)
        window.requestAnimationFrame(scrollPlay);

    }, 150)
}

// window.addEventListener('load', init)

// window.addEventListener('click', () =>
// {
//     VIDEO.currentTime += 1
//     // VIDEO.play()
// })

const scrollPlay = () =>
{
    delay += (scrollPosition - delay) * accelAmount
    // VIDEO.currentTime = 5
    VIDEO.currentTime = delay
    console.log(VIDEO.currentTime, scrollPosition)
    window.requestAnimationFrame(scrollPlay);
}
window.requestAnimationFrame(scrollPlay);