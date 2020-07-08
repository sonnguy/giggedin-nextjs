
const getImageUrl = (image) => {
    if (image) {
        return process.env.REACT_APP_IMAGE_BASE_URL + image;
    }
    return '';
}

export { getImageUrl }

