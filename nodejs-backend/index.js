import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import router from './src/routes/index.js';
import { port } from './src/configs/index.js';
import { eventStream } from './src/events/eventService.js';
import errorHandler from './src/middleware/errorHandler.js';
import successHandler from './src/middleware/successHandler.js';

const createApp = () => {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use('/api/v1', router);
    app.get('/api/v1/events/stream/:userId', eventStream);
    app.use(successHandler);
    app.use(errorHandler);
    app.listen(port, () => { console.info(`Running on PORT ${port}`); });
};

createApp();
