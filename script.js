const HTML = document.documentElement
const CANVAS = document.getElementById("hero")
const CONTEXT = CANVAS.getContext("2d")

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
};

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

window.addEventListener('scroll', () =>
{  
    const scrollTop = HTML.scrollTop;
    const maxScrollTop = HTML.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    )

    requestAnimationFrame(() => updateImage(frameIndex + 1))
})

preloadImages()