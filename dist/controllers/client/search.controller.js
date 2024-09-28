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
exports.search = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.query.keyword}`;
    if (keyword) {
        let newSongs = [];
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.default.find({
            deleted: false,
            status: "active",
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        }).select("-lyrics");
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId
            });
            newSongs.push({
                id: song.id,
                title: song.title,
                avatar: song.avatar,
                like: song.like,
                slug: song.slug,
                infoSinger: {
                    fullName: infoSinger.fullName
                }
            });
        }
        const type = req.params.type;
        switch (type) {
            case "result":
                res.render("client/pages/search/result.pug", {
                    pageTitle: `Kết quả tìm kiếm:${keyword}`,
                    keyword: keyword,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "thanhf cong",
                    songs: newSongs
                });
                break;
            default:
                break;
        }
    }
});
exports.search = search;
