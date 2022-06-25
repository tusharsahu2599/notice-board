const express = require("express");

const Notice = require("../models/notice.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    req.body.postDate = Date.now();
    const notice = await Notice.create(req.body);

    return res.send(notice);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const notice = await Notice.find().lean().exec();

    return res.send(notice);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id).lean().exec();

    return res.send(notice);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


router.put("/:id", authenticate, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean().exec();

    return res.send(notice);

  } catch (err) {

    return res.status(500).send({ message: err.message });

  }
});


router.delete("/:id", authenticate, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id).lean().exec();

    return res.send(notice);

  } catch (err) {

    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;