
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
      console.log(image);
      const newFeed = {
        id: '',
        url: '',
        ownerId: '',
        numOfComments: '',
        views: '',
        title: '',
        creator: '',
      };
      newFeed.id = image.id;
      newFeed.url = `${IMAGE_CDN}${IMAGES}${image.url}${IMAGE_QUERY_LOW}`;
      newFeed.ownerId = image.owner.id;
      newFeed.numOfComments = image.owner.comments.length;
      newFeed.views = image.owner.views;
      newFeed.title = image.owner.title;
      newFeed.creator = image.creator;

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
        _id: '',
        url: '',
        ownerId: '',
        numOfComments: '',
        views: '',
        title: '',
        creator: '',
      };
      newFeed._id = wallpaper._id;
      newFeed.url = `${IMAGE_CDN}${WALLPAPERS}${wallpaper.url}${IMAGE_QUERY_LOW}`;
      newFeed.ownerId = wallpaper.owner._id;
      newFeed.numOfComments = wallpaper.owner.comments.length;
      newFeed.views = wallpaper.owner.views;
      newFeed.title = wallpaper.owner.title;
      newFeed.creator = wallpaper.creator;
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

export {
  getImages,
  getWallpapers,
  getWorkImage,
  addComment,
};
