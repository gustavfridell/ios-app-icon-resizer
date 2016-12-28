var imageUploadZone = document.querySelector('#imageUploadZone')
// https://developer.apple.com/library/content/qa/qa1686/_index.html
var imageSizes = [
    {
        name: 'iTunesArtwork',
        size: 512
    },
    {
        name: 'iTunesArtwork@2x',
        size: 1024
    },
    {
        name: 'Icon-60@2x.png',
        size: 120
    },
    {
        name: 'Icon-60@3x.png',
        size: 180
    },
    {
        name: 'Icon-76.png',
        size: 76
    },
    {
        name: 'Icon-76@2x.png',
        size: 152
    },
    {
       name: 'Icon-83.5@2x.png',
       size: 167
    },
    {
        name: 'Icon-Small-40.png',
        size: 40
    },
    {
        name: 'Icon-Small-40@2x.png',
        size: 80
    },
    {
        name: 'Icon-Small-40@3x.png',
        size: 120
    },
    {
        name: 'Icon-Small.png',
        size: 29
    },
    {
        name: 'Icon-Small@2x.png',
        size: 58
    },
    {
        name: 'Icon-Small@3x.png',
        size: 87
    }
]

function exportImages (zip) {
    zip.generateAsync({type: 'blob'}).then(function (blob) {
        saveAs(blob, 'app-icons.zip')
    })
}

function resizeImage (originalCanvas) {
    var zip = new JSZip()
    var resizedImages = []
    imageSizes.forEach(function (imageSize) {
        var resizedCanvas = document.createElement('canvas')
        resizedCanvas.width = imageSize.size
        resizedCanvas.height = imageSize.size
        pica.resizeCanvas(originalCanvas, resizedCanvas, {}, function () {
            resizedCanvas.toBlob(function (blob) {
                zip.file(imageSize.name, blob)
                if (Object.keys(zip.files).length === imageSizes.length) {
                    exportImages(zip)
                }
            }, 'image/png')
        })
    })
}

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
            var canvas = document.createElement('canvas')
            var context = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img, 0, 0)
            resizeImage(canvas)
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
