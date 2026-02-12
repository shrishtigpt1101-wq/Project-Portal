import express from 'express';
import routes from './src/routes/index.js';
import { ENV_CONFIG } from './src/config/envconfig.js';

const app = express();

app.use(express.json());

app.use('/api',routes);

app.listen(ENV_CONFIG.PORT, () => {
  console.log(`Server is running on port ${ENV_CONFIG.PORT}`);
});