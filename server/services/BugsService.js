import mongoose from "mongoose";
// @ts-ignore
import Bug from "../models/Bug";

const _repository = mongoose.model("Bug", Bug);

class ValueService {
  async getAll() {
    return await _repository.find({});
  }
}

const valueService = new ValueService();
export default valueService;
