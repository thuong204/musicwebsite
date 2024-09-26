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

//like 
const buttonLike = document.querySelector("[button-like]")
if(buttonLike){
    buttonLike.addEventListener("click",()=>{
        const songId = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        const typeLike =  isActive ?"dislike" :"like"
        const link = `/songs/like/${typeLike}/${songId}`;
        const option ={
            method:"PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data =>{
                
                const span = buttonLike.parentElement.querySelector("span")
                span.innerHTML =`&nbsp; ${data.like} thích`
                buttonLike.classList.toggle("active")
                buttonLike.parentElement.classList.toggle("active")
            })


})

}

//favourite
const buttonFavorite= document.querySelector("[button-favorite]")
if(buttonFavorite){
    buttonFavorite.addEventListener("click",()=>{
        const songId = buttonFavorite.getAttribute("button-favorite")
        const isActive = buttonFavorite.classList.contains("active")
        const typeFavorite =  isActive ?"unfavorite" :"favorite"
        const link = `/songs/favorite/${typeFavorite}/${songId}`;
        const option ={
            method:"PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data =>{
                const span = buttonFavorite.parentElement.querySelector("span")
                span.innerHTML =`&nbsp; Bài hát yêu thích`
                buttonFavorite.classList.toggle("active")
                buttonFavorite.parentElement.classList.toggle("active")
            })


})

}




