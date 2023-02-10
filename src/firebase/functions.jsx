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
        const item = res.items.find(i => i._location.path_ == selectedFile.name);
        
        const currentItem = item._location.path_;
        
        if (currentItem === selectedFile.name)
            return getDownloadURL(item).then(url => {
              return url;
            })
      
    }).catch((error) => {
      console.log(error);
    });
}