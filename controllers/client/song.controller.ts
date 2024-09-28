
import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite.model";
import { convertToSlug } from "../../helpers/convertToSlug";
export const list = async (req: Request, res: Response) => {
    const slugTopic: String = req.params.slugTopic
    const topic = await Topic.findOne({
        deleted: false,
        slug: slugTopic,
        status: "active"
    })
    if (!topic.id) {

    }
    const songs = await Song.find({
        deleted: false,
        topicId: topic.id,
        status: "active"
    }).select("avatar title slug singerId like lyrics")
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        })
        song["infoSinger"] = infoSinger

    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: "Nhac tre",
        songs: songs
    })


}
export const detail = async (req: Request, res: Response) => {
    const slugSong: string = req.params.slugSong;
    const slugSongRegex = new RegExp(slugSong,"i")

    try {
        const song = await Song.findOne({
            deleted: false,
            slug: slugSongRegex
        });

        if (!song) {
            return res.status(404).send("Song not found");
        }

        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");

        if (!singer) {
            return res.status(404).send("Singer not found");
        }

        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false,
        }).select("title");

        const favorite = await FavoriteSong.findOne({
            deleted: false,
            songId: song.id
        });

        song["isFavorite"] = !!favorite; // Set isFavorite based on whether the song is found in favorites

        res.render("client/pages/songs/detail.pug", {
            pageTitle: "Chi tiết bài hát",
            song: song,
            singer: singer,
            topic: topic
        });
    } catch (error) {
        console.error("Error fetching song details:", error);
        res.status(500).send("Internal server error");
    }
}

export const like = async (req: Request, res: Response) => {
    const idSong: String = req.params.idSong
    const typeLike: String = req.params.typeLike
    const song = await Song.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    })
    const likeNew: number = typeLike == "like" ? song.like + 1 : song.like - 1
    await Song.updateOne({
        _id: idSong
    }, {
        like: likeNew
    })
    res.json({
        code: 200,
        message: "thanhf coong",
        like: likeNew
    })


}
export const favorite = async (req: Request, res: Response) => {
    const songId = req.params.idSong
    const typeFavorite = req.params.typeFavorite
    const favorite: boolean = typeFavorite == "favorite" ? true : false
    if (favorite) {
        const existFavorite = await FavoriteSong.findOne({
            deleted: false,
            songId: songId
        })
        if (!existFavorite) {
            const record = new FavoriteSong({
                // userId:"",
                songId: songId
            })
            await record.save()
        }

    }
    else {
        const existFavorite = await FavoriteSong.findOne({
            deleted: false,
            songId: songId
        })
        if (existFavorite) {
            await FavoriteSong.deleteOne({
                songId: songId
            })
        }

    }
    res.json({
        code: 200,
        message: "Thanhf coong"
    })

}
export const listen = async (req: Request, res: Response) => {
    const songId: String = req.params.songId
    const song = await Song.findOne({
        _id: songId,
        deleted: false,
        status: "active"
    })
    await Song.updateOne({
        _id: songId
    }, {
        listen: song.listen + 1
    })
    const songNew = await Song.findOne({
        _id: songId
    })
    res.json({
        code: 200,
        message: "thanhf coong",
        listen: songNew.listen
    })

}