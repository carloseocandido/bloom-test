const express = require('express')
const mongoose = require('mongoose');
const router = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require('./utils/swagger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Could not connect to MongoDB', err));

app.use('/', router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.redirect('/docs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});