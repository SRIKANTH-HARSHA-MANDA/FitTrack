const Workout = require('../models/Workout');

exports.create = async (req, res) => {
  try {
    const w = await Workout.create({
      ...req.body,
      userId: req.userId
    });

    res.status(201).json(w);
  } catch (e) {
    res.status(400).json({
      message: 'Could not add workout',
      error: e.message
    });
  }
};

exports.list = async (req, res) => {
  try {
    res.json(
      await Workout.find({ userId: req.userId })
        .sort({ date: -1 })
    );
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};
