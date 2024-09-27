import { Request,Response } from "express"
import FavoriteSong from "../../models/favorite.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
export const index = async(req:Request, res:Response) =>{
    const favoriteSongs = await  FavoriteSong.find({
        deleted:"false",
    })
    for(const favoriteSong of favoriteSongs){
        const song = await Song.findOne({
            deleted:false,
            status:"active",
            _id:favoriteSong.songId

        })
        const infoSinger =   await Singer.findOne({
            _id: song.singerId

        })
        favoriteSong["infoSong"] = song 
        favoriteSong["infoSinger"] = infoSinger
    }

   
    res.render("client/pages/favorite-songs/list.pug",{
        pageTitle: "Trang yêu thích",
        favoriteSongs :favoriteSongs
    })

}