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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    if (songs.length > 0) {
        let singer = "";
        let topic = "";
        for (const song of songs) {
            if (song.singerId) {
                singer = yield singer_model_1.default.findOne({
                    deleted: false,
                    _id: song.singerId
                });
                song["infoSinger"] = singer;
            }
            if (song.topicId) {
                const topic = yield topic_model_1.default.findOne({
                    deleted: false,
                    _id: song.topicId
                });
                song["topic"] = topic;
            }
        }
    }
    res.render("admin/pages/songs/index.pug", {
        pageTitle: "Trang quản lí bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    });
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    });
    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Thêm bài hát",
        singers: singers,
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    let audio = "";
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const slug = (0, convertToSlug_1.convertToSlug)(req.body.title);
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        lyrics: req.body.lyrics,
        status: req.body.status,
        avatar: avatar,
        slug: slug,
        audio: audio,
    };
    const song = new song_model_1.default(dataSong);
    console.log(dataSong);
    yield song.save();
    res.redirect(`/${config_1.systemconfig.prefix_admin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        deleted: false,
        _id: req.params.songId
    });
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    res.render(`${config_1.systemconfig.prefix_admin}/pages/songs/edit.pug`, {
        pageTitle: "Chỉnh sữa bài hát",
        song: song,
        singers: singers,
        topics: topics
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = (0, convertToSlug_1.convertToSlug)(req.body.title);
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        lyrics: req.body.lyrics,
        status: req.body.status,
        slug: slug,
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({
        _id: req.params.songId
    }, dataSong);
    res.redirect(`/${config_1.systemconfig.prefix_admin}/songs`);
});
exports.editPatch = editPatch;
