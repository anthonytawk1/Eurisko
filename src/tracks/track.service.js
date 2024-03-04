const trackModel = require("./track.model");
const AlbumService = require("../albums/album.service");
const CategoryService = require("../categories/category.service");
const errorCodes = require("../configs/errorCodes");
const authenticationMiddleware = require('../middleware/auth.middleware');


class TrackService {
  constructor() {
    // this.albumService = new AlbumService(); //this statement is causing circular dependency
    this.categoryService = new CategoryService();
  }

  async addTrack(track) {
    //Check if album exists
    const album = await this.albumService.getAlbumById(track.albumId);
    //Check if category exists
    await this.categoryService.getCategoryById(track.categoryId);
    const newTrack = await new trackModel(track).save();

    album.lastSongAddedAt = new Date();
    await album.save();
    return newTrack;
  }

  async deleteTrack(_id) {
    //Check that track exists
    await this.getTrackById(_id);

    await trackModel.deleteOne({ _id });
  }

  async getTrackById(_id) {
    const track = await trackModel.findById(_id);
    if (!track) {
      throw new Error(errorCodes.notFound.message);
    }
    return track;
  }

  async getTracksByAlbumId(albumId, category = null) {
    //Must be authenticated
    const filters = { albumId };
    if (category) {
      filters.categoryId = category;
    }

    const tracks = await trackModel
      .find(filters)
      .select("name singer")
      .sort({ createdAt: "asc" });
    return tracks;
  }
}
module.exports = TrackService;
