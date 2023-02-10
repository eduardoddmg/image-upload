import {
  getDownloadURL, 
  uploadBytes, 
  listAll, 
  ref 
} from 'firebase/storage';
import { storage, uploadImage, getImage } from '../../firebase';
import { useRef, useCallback } from 'react';
import { Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

export const CardInitial = ({ setCurrent, selectedFile, setSelectedFile, setImageUrl }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const submitImage = () => {
    setCurrent(1);    
    const storageRef = ref(storage, selectedFile.name);
    
    if (uploadImage(storageRef, selectedFile)) {
          const listRef = ref(storage, '/');
              listAll(listRef)
                .then((res) => {
                  res.items.forEach((item) => {
                    const currentItem = item._location.path_;
                    if (currentItem === selectedFile.name)
                      getDownloadURL(item).then(url => {
                        setImageUrl(url);
                        setCurrent(2);
                      })
                  });
                }).catch((error) => {
                  console.log(error);
                });
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    setSelectedFile(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  return (
    <>
      <Heading size='md'>
        {selectedFile ? 'File selected' : 'Upload your image'}
      </Heading>
      <Text fontSize='xs'>
        {selectedFile ? selectedFile.name : 'File should be Jpeg, Png'}
      </Text>
      
      {!selectedFile && <VStack 
        borderRadius='md' 
        border="1px dashed #97BEF4"
        w='full' 
        py={20}
        {...getRootProps()}
        bg={isDragActive ? "#97BEF4" : "#F6F8FB"}
      >
        <input {...getInputProps()} />
        <Text fontSize={15}>
          {isDragActive ? 'File up' : 'Drag and Drop'}
        </Text>
      </VStack>}
      
      <Button 
        colorScheme='blue' 
        my={5} 
        onClick={handleClick} 
        display={selectedFile ? 'none' : 'block'}
        px={10}
      >
        Choose a file
      </Button>
      <Button 
        colorScheme='blue' 
        my={5} 
        onClick={submitImage}
        display={selectedFile ? 'block' : 'none'}
      >
        Submit
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={e => setSelectedFile(e.target.files[0])}
        style={{ display: 'none' }}
      />
    </>
  )
};