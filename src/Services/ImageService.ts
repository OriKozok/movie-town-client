class ImageService{

    //This function recieves a string representing an image from the server and converts it to a blob
    public convertDataUrlToBlob(dataUrl: any): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }
}

const imageService = new ImageService();
export default imageService;