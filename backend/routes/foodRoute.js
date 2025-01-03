const express = require('express');
const foodRouter = express.Router();
const {addFood,listFood,removeFood} = require('../controllers/foodController')
const multer = require('multer');

// Multer middleware for uploading image
const storage = multer.diskStorage({
  destination: "uploads",
  filename:(req, file, cb) => {
    return cb(null,`${Date.now()}-${file.originalname}`)
  }})

  const upload = multer({storage});
  foodRouter.post('/add',upload.single('image'),addFood)
  foodRouter.get('/foodlist',listFood)
  foodRouter.delete('/remove',removeFood)
module.exports = foodRouter;