import mongoose from "mongoose";
// @ts-ignore
import Note from "../models/Note";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Note", Note);

class NotesService {
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async getNotesByBugId(bugId) {
    let data = await _repository.find({ bug: bugId });
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
    return data;
  }
  async delete(id) {
    // console.log("notesserv");
    let data = await _repository.findOneAndDelete({ _id: id });
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
  }
}

const notesService = new NotesService();
export default notesService;
