const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/videos', (req, res) => {
  const videos = getVideos();
  res.json(videos);
});

app.get('/videos/:id', (req, res) => {
  const videoId = req.params.id;
  const video = getVideoById(videoId);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

app.post('/videos', (req, res) => {
  const videoData = req.body;
  const videos = getVideos();
  const newVideoId = generateUniqueId();

  const newVideo = {
    id: newVideoId,
    title: videoData.title,
    description: videoData.description,
    // Add other hard-coded properties here
  };

  videos.push(newVideo);
  saveVideos(videos);
  res.status(201).json(newVideo);
});

function getVideos() {
  const filePath = path.join(__dirname, '../data/videos.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

function getVideoById(id) {
  const videos = getVideos();
  return videos.find((video) => video.id === id);
}

function saveVideos(videos) {
  const filePath = path.join(__dirname, '../data/videos.json');
  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
}

function generateUniqueId() {
  const videos = getVideos();
  if (videos.length === 0) {
    return '1';
  }
  const lastVideo = videos[videos.length - 1];
  const newId = parseInt(lastVideo.id) + 1;
  return newId.toString();
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

