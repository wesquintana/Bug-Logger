import mongoose from "mongoose";
// @ts-ignore
import Bug from "../models/Bug";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Bug", Bug);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }
  async getBugById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
    return data;
  }
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async edit(id, rawData) {
    let data = await _repository.findById(id);
    // console.log(data);
    // @ts-ignore
    if (data.closed) {
      throw new ApiError("Cannot Edit closed bug", 400);
    }
    let newData = await _repository.findOneAndUpdate({ _id: id }, rawData, {
      new: true
    });
    if (!newData) {
      throw new ApiError("Invalid Id", 400);
    }
    return newData;
  }
  async delete(id) {
    let data = await _repository.findOneAndUpdate(
      { _id: id },
      { closed: true }
    );
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
  }
}

const bugsService = new BugsService();
export default bugsService;
