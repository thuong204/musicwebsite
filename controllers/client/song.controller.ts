
import { Request,Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
export const index = async(req:Request, res:Response) =>{
    const slugTopic:String  = req.params.slugTopic
    const topic = await Topic.findOne({
        deleted:false,
        slug: slugTopic,
        status:"active"
    })
    if(!topic.id){

    }
    const songs = await Song.find({
        deleted:false,
        topicId: topic.id,
        status:"active"
    }).select("avatar title slug singerId like")
    for(const song of songs){
        const infoSinger = await Singer.findOne({
            _id:song.singerId,
            status:"active",
            deleted:false
        })
        song["infoSinger"] =infoSinger
     
    }
    res.render("client/pages/songs/list.pug",{
        pageTitle:"Nhac tre",
        songs:songs
    })
    

}