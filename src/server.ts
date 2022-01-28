import { createServer } from 'http';
import app from './app';

createServer(app).listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
