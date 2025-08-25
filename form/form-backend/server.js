const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  

 mongoose.connect('mongodb://mongo:27017/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
 
// Schema & Model
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
});
const FormData = mongoose.model('FormData', FormSchema);

// Route
app.get('/', (req, res) => {
    res.send('API is working ✅');
  });
  
app.post('/submit', async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const newForm = new FormData({ name, email, contact });
    await newForm.save();
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/entries', async (req, res) => {
  try {
    const entries = await FormData.find().sort({ _id: -1 }); // newest first
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});


app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));
