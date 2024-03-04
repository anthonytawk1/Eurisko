const albumModel = require("./album.model");
const errors = require("../configs/errorMessages");
const UserService = require("../users/user.service");
const errorCodes = require("../configs/errorCodes");
const TrackService = require("../tracks/track.service");

class AlbumService {
  constructor() {
    this.userService = new UserService();
    this.trackService = new TrackService();
  }
  async addAlbum(album) {
    //Make sure user ids provided exists
    await this.userService.getUserById(album.updatedByUser);
    await this.userService.getUserById(album.createdByUser);

    return await new albumModel(album).save();
  }

  async updateAlbum(_id, album) {
    //Check if album exists
    await this.getAlbumById(_id);

    //Make sure user ids provided exists
    await this.userService.getUserById(album.updatedByUser);
    await this.userService.getUserById(album.createdByUser);
    return await albumModel.findOneAndUpdate(
      { _id },
      { $set: album },
      { $new: true }
    );
  }

  async deleteAlbum(_id) {
    //Check that album exists
    await this.getAlbumById(_id);

    //Cannot delete album that have tracks
    const tracks = await this.trackService.getTracksByAlbumId(_id);
    if (tracks.length !== 0) {
      throw new Error(errorCodes.conflict.message);
    }
    await albumModel.deleteOne({ _id });
  }

  async getAlbums(){
    const albums = await albumModel.find({});
    return albums;
  }

  async getAlbumById(_id) {
    const album = await albumModel.findById(_id);
    console.log(album);
    if (!album) {
      throw new Error(errorCodes.notFound.message);
    }
    return album;
  }
}
module.exports = AlbumService;
