const v1Router = require('./routes');
const express = require('express');
const morgan = require('./utils/morgan');
const rateLimit = require('./utils/rateLimit');
const helmet = require('helmet');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(helmet());
app.use(cors());
app.use(rateLimit);
app.use(express.json());
app.use(morgan);

// swagger

app.use('/v1', v1Router);

errorMiddleware.forEach((handler) => app.use(handler));

module.exports = app;
