const express = require('express')
const connectDatabase = require('./config/database');
const router = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require('./utils/swagger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

dotenv.config();

app.use('/', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.redirect('/docs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});