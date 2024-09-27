import { Request,Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import Topic from "../../models/topic.model"
import { systemconfig } from "../../config/config"
export const index= async(req:Request,res:Response) =>{
    const songs = await Song.find({
        deleted:false
    })
    for(const song of songs){
        const singer  = await Singer.findOne({
            deleted:false,
            _id: song.singerId
        }).select("fullName")
        const topic = await Topic.findOne({
            deleted:false,
            _id:song.topicId
        }).select("title")
        song["infoSinger"] = singer
        song["topic"] = topic
    }
 
    res.render("admin/pages/songs/index.pug",{
        pageTitle:"Trang quản lí bài hát",
        songs:songs
    })

}
export const create = async(req:Request,res:Response) =>{
    const singers = await Singer.find({
        deleted:false,
        status:"active"
    })
    const topics = await Topic.find({
        deleted:false,
        status:"active"
    })
    res.render("admin/pages/songs/create.pug",{
        pageTitle:"Thêm bài hát",
        singers: singers,
        topics:topics
    })

}
export const createPost = async(req:Request,res:Response) =>{
    const dataSong = {
        title:req.body.title,
        description:req.body.description,
        topicId:req.body.topicId,
        singerId:req.body.singerId,
        lyrics:req.body.lyrics,
        status:req.body.status,
        avatar:req.body.avatar

    }
    const song = new Song(dataSong)
    await song.save()
    res.redirect(`/${systemconfig.prefix_admin}/songs`)
}