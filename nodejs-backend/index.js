import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import router from './src/routes/index.js';
import { port } from './src/configs/index.js';
import errorHandler from './src/middleware/errorHandler.js';
import successHandler from './src/middleware/successHandler.js';

const createApp = () => {
    const app = express();
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(express.json());
    app.use('/api/v1', router);
    app.use(successHandler);
    app.use(errorHandler);
    app.listen(port, () => { console.log(`Running on PORT ${port}`); });
};

createApp();
