import express from 'express';
import 'dotenv/config';
import db from './config/db.config';
import taxRoutes from './routes/tax.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api', taxRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
});
