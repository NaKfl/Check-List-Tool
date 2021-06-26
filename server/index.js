const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { readCSV, writeCSV } = require('./utils/csv');

const PORT = 6969;
const INPUT_PATH = path.resolve(__dirname, 'data/input.csv');
const OUTPUT_PATH = path.resolve(__dirname, 'data/output.csv');
const SUGGESTION_PATH = path.resolve(__dirname, 'data/suggestion.csv');

const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('development'));

app.get('/input', async (_, res) => {
  try {
    const data = await readCSV(INPUT_PATH);
    return res.json({ message: 'Read file success', data });
  } catch (error) {
    console.error(error);
  }
});

app.get('/suggestion', async (_, res) => {
  try {
    const data = await readCSV(SUGGESTION_PATH);
    return res.json({ message: 'Read file success', data });
  } catch (error) {
    console.error(error);
  }
});

app.post('/suggestion/create', async (req, res) => {
  try {
    const { content } = req.body;
    const prevSuggestions = await readCSV(SUGGESTION_PATH);
    const id = +prevSuggestions[prevSuggestions.length - 1].id + 1;
    const newSuggestions = [...prevSuggestions, { id, content }];
    await writeCSV(SUGGESTION_PATH, newSuggestions);
    return res.json({ message: 'Write file success' });
  } catch (error) {
    console.error(error);
  }
});

app.post('/output', async (req, res) => {
  try {
    const { data } = req.body;
    await writeCSV(OUTPUT_PATH, data);
    return res.json({ message: 'Write file success' });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
