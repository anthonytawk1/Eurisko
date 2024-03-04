const categoryModel = require("./category.model");
const UserService = require("../users/user.service");
const errorCode = require('../configs/errorCodes.js');

class CategoryService {
  constructor(){
    this.userService = new UserService();
  }
  async addCategory(category) {
    const existingCategory = await categoryModel.findOne({
      name: category.name,
    });
    if (existingCategory) {
      throw new Error(errorCode.conflict.message);
    }
    //Make sure user ids provided exists
    await this.userService.getUserById(category.updatedByUser);
    await this.userService.getUserById(category.createdByUser);
    return await new categoryModel(category).save();
  }

  async getCategoryById(_id){
    const category = await categoryModel.findById(_id);
    if(!category){
        throw new Error(errorCode.notFound);
    }
    return category;
} 
}
module.exports = CategoryService;
