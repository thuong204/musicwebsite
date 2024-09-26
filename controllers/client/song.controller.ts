
import { Request,Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
export const list = async(req:Request, res:Response) =>{
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
export const detail = async(req:Request, res:Response) =>{
    const slugSong: String = req.params.slugSong;
    const song = await Song.findOne({
        deleted:false,
        slug: slugSong
    })  
    
    const singer = await Singer.findOne({
            _id: song.singerId,
            deleted:false,
            status:"active"
        }).select("fullName")
    const topic = await Topic.findOne({
            _id:song.topicId,
            deleted:false,
            status:"active"
        }).select("title")


   
    res.render("client/pages/songs/detail.pug",{
        pageTitle:"Chi tiết bài hát",
        song:song,
        singer:singer,
        topic:topic
    })
}