const express = require('express');
const cors = require('cors');
const videoRoutes = require('./routes/videos');
const videoImages = require('./routes/videos');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use('/', videoRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
