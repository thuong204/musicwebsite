

  const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        console.log(file)
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}


const uploadAudio = document.querySelector("[upload-audio]")
if (uploadAudio) {
    const uploadAudioInput = document.querySelector("[upload-audio-input]")
    const uploadAudioPlay = document.querySelector("[upload-audio-play]")
    uploadAudioInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if(e.target.files.length){
          const audio = URL.createObjectURL(file)
          uploadAudioPlay.src=audio
        }
      
    })
}