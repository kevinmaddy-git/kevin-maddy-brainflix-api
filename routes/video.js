const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Endpoint: GET /videos
app.get('/videos', (req, res) => {
  const videos = getVideos();
  res.json(videos);
});

// Endpoint: GET /videos/:id
app.get('/videos/:id', (req, res) => {
  const videoId = req.params.id;
  const video = getVideoById(videoId);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

// Endpoint: POST /videos
app.post('/videos', (req, res) => {
  const videoData = req.body;
  const videos = getVideos();

  // Generate a unique id for the new video
  const newVideoId = generateUniqueId();

  // Add the new video to the array
  const newVideo = {
    id: newVideoId,
    ...videoData,
  };
  videos.push(newVideo);

  // Save the updated array to the JSON file
  saveVideos(videos);

  res.status(201).json(newVideo);
});

// Helper function: Get all videos from the JSON file
function getVideos() {
  const filePath = path.join(__dirname, '../data/videos.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

// Helper function: Get a video by its id
function getVideoById(id) {
  const videos = getVideos();
  return videos.find((video) => video.id === id);
}

// Helper function: Save the videos array to the JSON file
function saveVideos(videos) {
  const filePath = path.join(__dirname, '../data/videos.json');
  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
}

// Helper function: Generate a unique id
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
