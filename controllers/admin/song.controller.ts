import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import Topic from "../../models/topic.model"
import { systemconfig } from "../../config/config"
import { convertToSlug } from "../../helpers/convertToSlug"
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted: false
    })

    if (songs.length > 0) {
        let singer = ""
        let topic = ""
        for (const song of songs) {
            if (song.singerId) {
                singer = await Singer.findOne({
                    deleted: false,
                    _id: song.singerId
                })
                song["infoSinger"] = singer
            }

            if (song.topicId) {
                const topic = await Topic.findOne({
                    deleted: false,
                    _id: song.topicId
                })
                song["topic"] = topic
            }
        }
    }


    res.render("admin/pages/songs/index.pug", {
        pageTitle: "Trang quản lí bài hát",
        songs: songs
    })

}
export const create = async (req: Request, res: Response) => {
    const singers = await Singer.find({
        deleted: false,
        status: "active"
    })
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    })
    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Thêm bài hát",
        singers: singers,
        topics: topics
    })

}
export const createPost = async (req: Request, res: Response) => {
    let avatar = ""
    if (req.body.avatar) {
        avatar = req.body.avatar[0]
    }
    let audio = ""
    if (req.body.audio) {
        audio = req.body.audio[0]

    }

    const slug = convertToSlug(req.body.title)

    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        lyrics: req.body.lyrics,
        status: req.body.status,
        avatar: avatar,
        slug:slug,
        audio: audio,
    }

    const song = new Song(dataSong)
    console.log(dataSong)
    await song.save()
    res.redirect(`/${systemconfig.prefix_admin}/songs`)
}
export const edit  =async(req:Request,res:Response) =>{
    const song = await Song.findOne({
        deleted:false,
        _id:req.params.songId
    })
    const singers  = await Singer.find({
        deleted:false
    })
    const topics = await Topic.find({
        deleted:false
    })
    res.render(`${systemconfig.prefix_admin}/pages/songs/edit.pug`,{
        pageTitle:"Chỉnh sữa bài hát",
        song:song,
        singers:singers,
        topics:topics
    })
}
export const editPatch = async(req:Request, res:Response) =>{

    const slug = convertToSlug(req.body.title)

    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        lyrics: req.body.lyrics,
        status: req.body.status,
        slug:slug,
    }
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0]
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0]

    }
    await Song.updateOne({
        _id:req.params.songId
    }, dataSong )

    res.redirect(`/${systemconfig.prefix_admin}/songs`)
    
}