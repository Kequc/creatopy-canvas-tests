document.addEventListener('DOMContentLoaded', () => {
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const renderButton = document.getElementById('render-button');
    const renderCheckbox = document.getElementById('render-checkbox');
    const htmlWrapper = document.getElementById('html-wrapper');
    const ball = htmlWrapper.querySelector('.js-ball');

    let direction = 1;
    let position = 0;
    let timeout;

    function moveBall () {
        if (position <= 0) {
            direction = 1;
        } else if (position >= htmlWrapper.clientWidth) {
            direction = -1;
        }

        position += (direction * 3);

        ball.style.left = position;

        requestAnimationFrame(moveBall);
    }

    async function render () {
        cancelAnimationFrame(timeout);
        const oldCanvas = canvasWrapper.querySelector('canvas');
        const canvas = await window.html2canvas(htmlWrapper);
        canvasWrapper.replaceChild(canvas, oldCanvas);

        if (renderCheckbox.checked) {
            timeout = requestAnimationFrame(render);
        }
    }

    renderButton.addEventListener('click', render);
    renderCheckbox.addEventListener('change', render);

    render();
    moveBall();
});
