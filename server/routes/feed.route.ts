import {
  getImages,
  getWallpapers,
  getWorkImage,
  addComment,
  getMoreWallpapers,
  getMoreImages,
  getWorkMusic,
  addMusicComment,
  getMoreMusics,
} from '../controllers/feeds';
import authByJWT from '../middleware/authByJWT';
import viewUpdate from '../middleware/viewUpdate';

const router = require('express').Router();

router.get('/images', getImages);
router.post('/images/:id/add-comment', authByJWT, addComment);
router.get('/images/more/:fixedNum/:skippedNum', getMoreImages);
router.get('/wallpapers', getWallpapers);
router.get('/wallpapers/more/:fixedNum/:skippedNum', getMoreWallpapers);
router.post('/musics/:id/add-comment', authByJWT, addMusicComment);
router.get('/musics/more/:fixedNum/:skippedNum', getMoreMusics);

router.get('/workimage/:id', authByJWT, viewUpdate, getWorkImage);
router.get('/workmusic/:id', getWorkMusic);

export default router;
