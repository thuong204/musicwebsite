const aplayer = document.querySelector("#aplayer")
if (aplayer) {
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
        autoplay: true
    });
    const avatar = document.querySelector(".song-detail .singer-avatar .img-fluid")
    ap.on('play', function () {
        avatar.style.animationPlayState = "running"
    })
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused"
    })
    ap.on('ended', function () {
        const songId = dataSong._id
        const link = `/songs/listen/${songId}`;
        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const elementListen = document.querySelector(".song-detail .song-listen span")
                elementListen.innerHTML =`&nbsp; ${data.listen} lượt nghe`
            })

        
        
    })
}

//like 
const buttonLike = document.querySelector("[button-like]")
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const songId = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        const typeLike = isActive ? "dislike" : "like"
        const link = `/songs/like/${typeLike}/${songId}`;
        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {

                const span = buttonLike.parentElement.querySelector("span")
                span.innerHTML = `${data.like} thích`
                buttonLike.classList.toggle("active")
                buttonLike.parentElement.classList.toggle("active")
            })


    })

}

//favourite
const listButtonFavorite = document.querySelectorAll("[button-favorite]")
if (listButtonFavorite.length > 0) {
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const songId = buttonFavorite.getAttribute("button-favorite")
            const isActive = buttonFavorite.classList.contains("active")
            const typeFavorite = isActive ? "unfavorite" : "favorite"
            const link = `/songs/favorite/${typeFavorite}/${songId}`;
            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    const span = buttonFavorite.parentElement.querySelector("span")
                    span.innerHTML = `&nbsp; Bài hát yêu thích`
                    buttonFavorite.classList.toggle("active")
                    buttonFavorite.parentElement.classList.toggle("active")
                })


        })

    });
}

// Search Suggest
const boxSearch = document.querySelector(".box-search")
const boxSuggest = document.querySelector(".inner-suggest")
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']")
    input.addEventListener("keyup", () => {
        const keyword = input.value
        const link = `/search/suggest?keyword=${keyword}`;
        fetch(link)
            .then(res => res.json())
            .then(data => {
                const songs = data.songs
                if (songs.length > 0) {
                    boxSuggest.classList.add("show")
                    const htmls = songs.map(song => {
                        return `
                        <div class="inner-item">
                            <div class="inner-image">
                                <img src= ${song.avatar} alt="Image">
                            </div>
                            <div class="inner-info mt-2">
                                <a href="/songs/detail/${song.slug}">
                                    <div class="inner-title">
                                        <a href="/songs/detail/${song.slug}" class="text-decoration-none text-danger">${song.title}</a>
                                    </div>
                               
                                    <div class="inner-singer text-success">
                                        <i class="fas fa-microphone"></i> ${song.infoSinger.fullName}
                                    </div> 
                                </a>
                            </div>
                        </div>
                            `
                    })
                    
                    boxSuggest.innerHTML = htmls.join("")
                } else {
                    boxSuggest.classList.remove("show")
                }

            })
    })
}

//End Search Suggest

