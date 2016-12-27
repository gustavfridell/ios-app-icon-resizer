var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')
var imageUploadZone = document.querySelector('#imageUploadZone')

function handleFileUpload (e) {
    e.stopPropagation()
    e.preventDefault()
    imageUploadZone.classList.remove('dragging')

    var files = e.target.files || e.dataTransfer.files
    var file = files && files[0]

    if (!(file && file.type.match('image.*'))) {
        return false
    }

    var reader = new FileReader()
    reader.onload = function (e) {
        var img = new Image()
        img.onload = function () {
            context.drawImage(img, 0, 0)
        }
        img.src = e.target.result
    }
    reader.readAsDataURL(file)
}

function handleDragenter () {
    imageUploadZone.classList.add('dragging')
}

function handleDragover (e) {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
}

function handleDragleave () {
    imageUploadZone.classList.remove('dragging')
}

imageUploadZone.addEventListener('change', handleFileUpload, false)
imageUploadZone.addEventListener('dragover', handleDragover, false)
imageUploadZone.addEventListener('dragenter', handleDragenter, false)
imageUploadZone.addEventListener('dragleave', handleDragleave, false)
imageUploadZone.addEventListener('drop', handleFileUpload, false)
