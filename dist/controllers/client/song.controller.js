"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_model_1 = __importDefault(require("../../models/favorite.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({
        deleted: false,
        slug: slugTopic,
        status: "active"
    });
    if (!topic.id) {
    }
    const songs = yield song_model_1.default.find({
        deleted: false,
        topicId: topic.id,
        status: "active"
    }).select("avatar title slug singerId like lyrics");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list.pug", {
        pageTitle: "Nhac tre",
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const slugSongRegex = new RegExp(slugSong, "i");
    try {
        const song = yield song_model_1.default.findOne({
            deleted: false,
            slug: slugSongRegex
        });
        if (!song) {
            return res.status(404).send("Song not found");
        }
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");
        if (!singer) {
            return res.status(404).send("Singer not found");
        }
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
        }).select("title");
        const favorite = yield favorite_model_1.default.findOne({
            deleted: false,
            songId: song.id
        });
        song["isFavorite"] = !!favorite;
        res.render("client/pages/songs/detail.pug", {
            pageTitle: "Chi tiết bài hát",
            song: song,
            singer: singer,
            topic: topic
        });
    }
    catch (error) {
        console.error("Error fetching song details:", error);
        res.status(500).send("Internal server error");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const likeNew = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: likeNew
    });
    res.json({
        code: 200,
        message: "thanhf coong",
        like: likeNew
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    const favorite = typeFavorite == "favorite" ? true : false;
    if (favorite) {
        const existFavorite = yield favorite_model_1.default.findOne({
            deleted: false,
            songId: songId
        });
        if (!existFavorite) {
            const record = new favorite_model_1.default({
                songId: songId
            });
            yield record.save();
        }
    }
    else {
        const existFavorite = yield favorite_model_1.default.findOne({
            deleted: false,
            songId: songId
        });
        if (existFavorite) {
            yield favorite_model_1.default.deleteOne({
                songId: songId
            });
        }
    }
    res.json({
        code: 200,
        message: "Thanhf coong"
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const song = yield song_model_1.default.findOne({
        _id: songId,
        deleted: false,
        status: "active"
    });
    yield song_model_1.default.updateOne({
        _id: songId
    }, {
        listen: song.listen + 1
    });
    const songNew = yield song_model_1.default.findOne({
        _id: songId
    });
    res.json({
        code: 200,
        message: "thanhf coong",
        listen: songNew.listen
    });
});
exports.listen = listen;
