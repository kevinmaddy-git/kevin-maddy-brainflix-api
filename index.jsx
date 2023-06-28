const express = require('express');
const videoRoutes = require('./routes/videos');
const videoImages = require('./routes/videos')
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/videos', express.static(videoImages));
app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('home');
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
