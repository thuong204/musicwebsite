"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const favorite_songs_route_1 = require("./favorite-songs.route");
const search_route_1 = require("./search.route");
const routes = (app) => {
    app.use("/topics", topic_route_1.topicRoutes);
    app.use("/songs", song_route_1.songRoutes);
    app.use("/favorite-songs", favorite_songs_route_1.favoriteRoutes);
    app.use("/search", search_route_1.searchRoutes);
};
exports.default = routes;
