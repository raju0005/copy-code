const express = require('express');
const cors = require('cors');
const UserData = require('./mongoose'); // Import the Mongoose model

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Save or update content
app.post('/', async (req, res) => {
  const { uniq_id, content } = req.body;

  try {
    await UserData.findOneAndUpdate(
      { uniq_id },
      { content },
      { upsert: true, new: true } // Upsert and return the updated document
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/', async (req, res) => {
  const { uniq_id } = req.query;

  try {
    const userData = await UserData.findOne({ uniq_id });
    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ error: 'No content found for this uniq_id' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/hello', (req, res) => {
  res.send('Hello');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
