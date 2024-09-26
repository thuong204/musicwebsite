import mongoose from 'mongoose';
const favoriterSchema = new mongoose.Schema({
    userId:String,
    songId:String,
  deleted:{
    type:Boolean,
    default:false
  },
  deletedAt:Date
},{
    timestamps:true
});
const FavoriteSong = mongoose.model("FavoriteSong",favoriterSchema,"favorite-songs")
export default FavoriteSong