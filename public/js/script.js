const aplayer = document.querySelector("#aplayer")
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song")
    let dataSinger = aplayer.getAttribute("data-singer")
    dataSong = JSON.parse(dataSong)
    dataSinger = JSON.parse(dataSinger)


    const ap = new APlayer({
    container: aplayer,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
    },],
    autoplay:true
});
const avatar = document.querySelector(".song-detail .singer-avatar .img-fluid")
ap.on('play',function (){
    avatar.style.animationPlayState= "running"
})
ap.on('pause',function (){
    avatar.style.animationPlayState= "paused"
})
}




