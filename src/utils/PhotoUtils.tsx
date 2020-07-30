class PhotoUtils {
  static getImage (photo: string, size?: string) {
    if (!size || !photo) {
      return photo
    }
    return photo.replace('full', size)
  }
}

export default PhotoUtils
