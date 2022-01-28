document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#canvas-wrapper canvas');
    const ctx = canvas.getContext('2d');
    const video = document.querySelector('#video-wrapper video');

    let timeout;

    video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    function render () {
        cancelAnimationFrame(timeout);
        ctx.drawImage(video, 0, 0);

        if (!video.paused && !video.ended) {
            timeout = requestAnimationFrame(render);
        }
    }

    video.addEventListener('play', render);
    video.addEventListener('seeked', render);
});
