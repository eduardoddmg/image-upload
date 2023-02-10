import { 
  ref, 
  uploadBytes, 
  listAll ,
  getDownloadURL
} from 'firebase/storage';

export const uploadImage = (storageRef, selectedFile) => {
    return uploadBytes(storageRef, selectedFile)
      .then((snapshot) => {
          return true;          
    });
};

export const getImage = (imagesRef, selectedFile) => {
  return listAll(imagesRef)
    .then((res) => {
      res.items.forEach((item) => {
        const currentItem = item._location.path_;
        if (currentItem === selectedFile.name)
          getDownloadURL(item).then(url => {
            return true;
          })
      });
    }).catch((error) => {
      console.log(error);
    });
}