
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';
import response from '../utils/response';
import {
  get10Images, get10Wallpapers, getImageFeeds, getWorkImageById, addCommentToWorkImage,
} from '../services/feed';
import {
  IMAGE_CDN, IMAGES, WALLPAPERS, IMAGE_QUERY_LOW, IMAGE_QUERY_HIGH,
} from '../utils/constant';
import { FEED } from '../utils/messages';

const getImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const images = await getImageFeeds(0, 10);
    const filteredFeed = images.map((image: any) => {
      const newFeed = {
        id: image.id,
        url: `${IMAGE_CDN}${IMAGES}${image.url}${IMAGE_QUERY_LOW}`,
        ownerId: image.owner.id,
        numOfComments: image.owner.comments.length,
        views: image.owner.views,
        title: image.owner.title,
        creator: image.creator,
      };

      return newFeed;
    });

    return response(res, filteredFeed);
  } catch (e) {
    next(e);
  }
};

const getWallpapers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wallpapers = await get10Wallpapers(0, 10);
    const newWallpapers = wallpapers.map((wallpaper:any) => {
      const newFeed = {
        _id: wallpaper._id,
        url: `${IMAGE_CDN}${WALLPAPERS}${wallpaper.url}${IMAGE_QUERY_LOW}`,
        ownerId: wallpaper.owner._id,
        numOfComments: wallpaper.owner.comments.length,
        views: wallpaper.owner.views,
        title: wallpaper.owner.title,
        creator: wallpaper.creator,
      };
      return newFeed;
    });

    return response(res, newWallpapers);
  } catch (e) {
    next(e);
  }
};

const getWorkImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const workImage = await getWorkImageById(id);
    if (!workImage) {
      throw (createError(httpStatus.NOT_FOUND, FEED.NOT_FOUND_WORK_IMAGE));
    }
    workImage.content = workImage.content.map((el) => {
      if (el.type === 'description') {
        return el;
      }
      return { ...el, content: `${IMAGE_CDN}${el.type}/${el.content}${IMAGE_QUERY_HIGH}` };
    });
    console.log(workImage.content);
    response(res, workImage);
  } catch (e) {
    next(e);
  }
};

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workImageId = req.params.id;
    const { content } = req.body;
    const createdAt = Date.now();
    const payload = {
      owner: '0000000188e1a5245cea7a3a',
      content,
      createdAt,
    };
    const workImage = await addCommentToWorkImage(workImageId, payload);
    if (!workImage) {
      throw (createError(httpStatus.NOT_FOUND, FEED.NOT_ADD_COMMENT));
    }
    workImage.content = workImage.content.map((el) => {
      if (el.type === 'description') {
        return el;
      }
      return { ...el, content: `${IMAGE_CDN}${el.type}/${el.content}${IMAGE_QUERY_HIGH}` };
    });

    response(res, workImage);
  } catch (e) {
    next(e);
  }
};

const getWallpapersMore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fixedNum, skippedNum } = req.params;
    const images = await get10Wallpapers(+skippedNum, +fixedNum);
    const filteredFeed = images.map((image: any) => {
      const newFeed = {
        id: image.id,
        url: `${IMAGE_CDN}${IMAGES}${image.url}${IMAGE_QUERY_LOW}`,
        ownerId: image.owner.id,
        numOfComments: image.owner.comments.length,
        views: image.owner.views,
        title: image.owner.title,
        creator: image.creator,
      };

      return newFeed;
    });
    return response(res, filteredFeed);
  } catch (e) {
    next(e);
  }
};

const getImagesMore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fixedNum, skippedNum } = req.params;
    const images = await get10Images(+skippedNum, +fixedNum);
    const filteredFeed = images.map((image: any) => {
      const newFeed = {
        id: image.id,
        url: `${IMAGE_CDN}${IMAGES}${image.url}${IMAGE_QUERY_LOW}`,
        ownerId: image.owner.id,
        numOfComments: image.owner.comments.length,
        views: image.owner.views,
        title: image.owner.title,
        creator: image.creator,
      };

      return newFeed;
    });
    return response(res, filteredFeed);
  } catch (e) {
    next(e);
  }
};


export {
  getImages,
  getWallpapers,
  getWorkImage,
  addComment,
  getWallpapersMore,
  getImagesMore,
};
