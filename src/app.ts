import { createApp, staticFiles } from 'kequapp';
import htmlRenderer, { useHtml } from './htmlRenderer';

const app = createApp({
    renderers: {
        'text/html': htmlRenderer
    },
    logger: console
});

app.route('/assets/**', staticFiles());

app.branch(useHtml)
    .route(() => {
        return {
            name: 'index',
            view: {}
        };
    })
    .route('/video', () => {
        return {
            name: 'video',
            view: {
                css: ['video'],
                js: ['video'],
                videoUrl: '/assets/video/Big_Buck_Bunny_4K.webm.480p.vp9.webm'
            }
        };
    })
    .route('/html', () => {
        return {
            name: 'html',
            view: {
                css: ['html'],
                js: ['html2canvas.min', 'html']
            }
        };
    });

export default app;
