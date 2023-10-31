const router = require('express').Router();
const Note = require('../models/Notes');
const User = require('../models/User');
// create notes
router.post('/addNote', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });
    const data = await note.save();
    res.status(200).json({ message: 'Notes Added Successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong', error });
  }
});

// delete notes
router.delete('/deleteNote/:id', async (req, res) => {
  try {
    const notes = await User.findOne({ _id: req.params.id });
    !notes &&
      res.status(200).json({ message: 'Note not found', status: false });

    const note = await Note.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Note Deleted Successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong', error });
  }
});

// update notes
router.put('/updateNote/:id', async (req, res) => {
  try {
    const notes = await User.findOne({ _id: req.params.id });
    !notes &&
      res.status(200).json({ message: 'Note not found', status: false });

    const note = await Note.updateOne({
      title: req.body.title,
      description: req.body.description,
      postedBy: req.body.postedBy,
    });
    res.status(200).json({ message: 'Notes Updated Successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong', error });
  }
});

// getallnote notes
router.get('/getNote/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    !currentUser && res.status(400).json({ data: 'User no found' });

    const notes = await Note.find({ postedBy: req.params.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Something Went Wrong', error });
  }
});

module.exports = router;
