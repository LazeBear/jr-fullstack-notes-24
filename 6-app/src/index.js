const app = require('./app');
const config = require('./utils/config');
const connectToDb = require('./utils/db');

connectToDb();

app.listen(config.PORT, () => {
  console.log(`server listening on port ${config.PORT}`);
});
