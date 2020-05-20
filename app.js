const express= require('express');
const request= require('request');

const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/jonsu'));
app.use('/recipe',require('./routes/gidion'));
app.get('/', (req, res) => res.send('Online!'));

app.listen(process.env.PORT || 3000, () => console.log(`Server running`));