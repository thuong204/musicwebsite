import { Request, Response } from "express"
import Song from "../../models/song.model";
import { convertToSlug } from "../../helpers/convertToSlug";
import Singer from "../../models/singer.model";
export const search = async (req: Request, res: Response) => {
    const keyword: string = `${req.query.keyword}`
    if (keyword) {
        let newSongs = []
        const keywordRegex = new RegExp(keyword, "i")
        const stringSlug = convertToSlug(keyword)
        const stringSlugRegex = new RegExp(stringSlug, "i")
        const songs = await Song.find({
            deleted: false,
            status: "active",
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        }).select("-lyrics")
        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId

            })
            // song["infoSinger"] = infoSinger
            newSongs.push({
                id: song.id,
                title:song.title,
                avatar:song.avatar,
                like:song.like,
                slug:song.slug,
                infoSinger:{
                    fullName:infoSinger.fullName
                }
            })

        }
        
        // newSongs = songs
        const type = req.params.type
        switch (type) {
            case "result":
                res.render("client/pages/search/result.pug", {
                    pageTitle: `Kết quả tìm kiếm:${keyword}`,
                    keyword: keyword,
                    songs: newSongs
                })
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "thanhf cong",
                    songs: newSongs
                })
                break;
            default:
                break;
    
        }

    }

}