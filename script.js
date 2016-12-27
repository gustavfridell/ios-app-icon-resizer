var imageUploadZone = document.querySelector('#imageUploadZone')

function handleFileUpload (e) {
    e.stopPropagation()
    e.preventDefault()
    imageUploadZone.classList.remove('dragging')

    var files = e.target.files || e.dataTransfer.files
    var file = files && files[0]

    if (!(file && file.type.match('image.png'))) {
        return false
    }

    var reader = new FileReader()
    reader.onload = function (e) {
        var img = new Image()
        img.onload = function () {
            // save image in original size
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img, 0, 0)


            // MOVE THIS
            var size = 100
            var resizedCanvas = document.createElement('canvas')
            var resizedContext = resizedCanvas.getContext('2d')
            resizedCanvas.width = size
            resizedCanvas.height = size
            resizedContext.drawImage(canvas, 0, 0, size, size)

            var data = resizedCanvas.toDataURL('image/png')
            var link = document.createElement('a')
            link.setAttribute('href', data)
            link.setAttribute('download', 'resized-image.png')
            link.click()
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
imageUploadZone.addEventListener('dragenter', handleDragenter, false)
imageUploadZone.addEventListener('dragover', handleDragover, false)
imageUploadZone.addEventListener('dragleave', handleDragleave, false)
imageUploadZone.addEventListener('drop', handleFileUpload, false)
