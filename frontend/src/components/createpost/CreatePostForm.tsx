import React, { useEffect, useState } from "react";

import {
  Box, Flex, Stack, Text, Grid, GridItem, Input, Textarea, FormControl,
  FormLabel,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  useDisclosure,
  FormErrorMessage,
  useToast,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { CreatedPost } from '../../types/CreatedPost'

import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { MdImageSearch } from 'react-icons/md';
import { gql, useQuery, useMutation } from "@apollo/client";

import styles from '../../styles/CreatePost.module.scss'

import { Tag } from "../../types/Tag"


import {
  getTitleValidateAlertMessage,
  validateTitle,
  checkImageFile,
  getTagValidateAlertMessage,
  validateTag,
} from '../../utils/formValidation';

type Props = {
  postData: CreatedPost
  document: {
    fileId: string,
    text: string,
    title: string[]
  },
  toNextPage: Function,
  backPage: Function
}

const containerWidth = { base: '100%', sm: '90%', md: '90%', lg: '85%', xl: '70%' };

const permissionWidth = { base: "100%", md: "50%", lg: "30%" };
const titleOcrWidth = { base: "100%" };
const dropzoneWidth = { base: "9rem", md: "8rem", lg: "9rem", xl: '9rem' };
const dropzoneHeight = { base: "13rem", md: "12rem", lg: "13rem", xl: '13rem' };

const GET_TAGS_LIST = gql`
query Tag{
  tags{
    name
    _id
}
}
`

const CreatePostForm = ({ postData, document, toNextPage, backPage }: Props) => {

  const { loading, error, data, refetch } = useQuery(GET_TAGS_LIST)

  const inputRef = React.createRef<HTMLInputElement>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState(postData.title);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const [titleType, setTitleType] = useState(postData.titleType)

  const [description, setDescription] = useState(postData.description ? postData.description : document.text);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const [contact, setContact] = useState(postData.contact);
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => setContact(e.target.value);

  const [tag, setTag] = useState<Tag[]>(postData.tag);
  const [tagInput, setTagInput] = useState("");
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value);

  const [permission, setPermission] = useState(postData.permission ? postData.permission : "public");
  const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPermission(e.target.value);

  const [titleOcr, setTitleOcr] = useState(postData.titleOcr ? postData.titleOcr : document.title[0]);
  const handleOcrTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setTitleOcr(e.target.value);

  const [tagsList, setTagsList] = useState(loading ? [] : data.tags)

  const [images, setImages] = useState<File[]>(postData.image);

  const [selectTag, setSelectTag] = useState(tagsList.length ?? tagsList[0].name)

  const [isValidatedTitle, setValidatedTitle] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>();

  const [isValidatedTagInput, setValidatedTagInput] = useState<boolean>(false);
  const [validationTagMessage, setValidationTagMessage] = useState<string>();

  const [isError, setError] = useState<boolean>(true);


  useEffect(() => {
    if (data) {
      setTagsList(data.tags);
      if(!selectTag){
        setSelectTag(data.tags[0].name)
      }
    }
  }, [data, selectTag])

  const toast = useToast()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0].type)) {
      if (images.length < 3) {
        var newImage = [...images];
        newImage.push(e.target.files[0]);
        setImages(newImage);
        toast({
          title: `Upload success.`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: `Upload error`,
        description: 'Please upload .png or .jpg file.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }

    const element = e.target as HTMLInputElement;
    element.value = '';

  }

  useEffect(() => {
    setValidatedTitle(validateTitle(title))
    setValidationMessage(getTitleValidateAlertMessage(title))
  }, [title])

  useEffect(() => {
    setValidatedTagInput(validateTag(tagInput))
    setValidationTagMessage(getTagValidateAlertMessage(tagInput))
  }, [tagInput])

  const addTag = () => {
    if (tag.length < 5) {
      let filter = tagsList.filter((t:Tag)=>t.name===selectTag)
      var newTag = [...tag];
      if(!newTag.includes(filter[0])){
        newTag.push(filter[0])
        setTag(newTag);
        onClose();
      }else{
        toast({
          title: `Add tag error`,
          description: 'duplicate tag',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
    }
  }

  const deleteTag = (e: React.BaseSyntheticEvent) => {
    var newTag = [...tag];
    newTag.splice(tag.indexOf(e.target.innerText), 1);
    setTag(newTag);
  }

  const deleteImage = (index: number) => {
    var newImageList = [...images];
    newImageList.splice(index, 1);
    setImages(newImageList);
  }

  const renderPreviewImage = () => {

    var imageList = [];

    for (let i = 0; i < 3; i++) {
      if (i < images.length) {
        imageList.push(

          <Box className={styles.previewImage}
            width={dropzoneWidth} height={dropzoneHeight}
            key={`image-${i}`}>
            <CloseIcon className={styles.deleteImageButton} onClick={() => deleteImage(i)} />
            <img src={URL.createObjectURL(images[i])} />
          </Box>

        )
      } else {
        imageList.push(

          <Box className={styles.imageDropzone}
            width={dropzoneWidth} height={dropzoneHeight}
            cursor="pointer"
            onClick={() => imageInputHandler()}
            key={`image-${i}`}>
            <input type='file' onChange={onSelectFile} ref={inputRef} style={{ display: 'none' }} />
            <Stack width="100%" height="100%"
              display="flex" justifyContent="center" alignItems="center">
              <MdImageSearch color="black" fontSize="4rem" />
              <Text>Drop Image Here</Text>
            </Stack>
          </Box>

        )
      }
    }

    return imageList;

  }

  const imageInputHandler = () => {
    if (inputRef.current)
      inputRef.current.click()
  }

  const nextButtonHandler = () => {
    if(images.length){
      const createdPost: CreatedPost = {
        title: title,
        description: description,
        contact: contact,
        tag: tag,
        permission: permission,
        image: images,
        titleOcr: titleOcr,
        titleType: titleType,
      }
  
      toNextPage(createdPost);
    }else{
      toast({
        title: `Error`,
        description: 'Please upload preview image',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }

  }

  return (
    <Grid templateColumns='repeat(2, 1fr)'
      gap={6} width={containerWidth}
      alignSelf="center" color="white"
    >

      <GridItem colSpan={{ base: 2, md: 1, lg: 1 }} paddingRight="3rem">

        <FormControl marginTop="2rem">
          <FormLabel htmlFor='title' fontSize="1.5rem">Title</FormLabel>
          {titleType === "2" ?
            <>
              <Input
                id='title'
                type='text'
                value={title}
                size="lg"
                backgroundColor="white"
                color="black"
                onChange={handleTitleChange}
              />
              {!isValidatedTitle && (
                <Text style={{ color: "red" }}>{validationMessage}</Text>
              )}
            </> :
            <Select backgroundColor="white" color="black"
              value={titleOcr}
              onChange={(e) => handleOcrTitleChange(e)}
              width={titleOcrWidth}>
              {document.title.map((title) => {
                return (
                  <option value={title} key={title}>{title}</option>
                )
              })}
            </Select>
          }
          <RadioGroup onChange={(value: string) => setTitleType(value)} defaultValue={titleType}>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='red' value='1'>
                OCR
              </Radio>
              <Radio colorScheme='green' value='2'>
                Custom
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl marginTop="2rem">
          <FormLabel htmlFor='description' fontSize="1.5rem">Description</FormLabel>
          <Textarea
            id='description'
            value={description}
            size="lg"
            backgroundColor="white"
            color="black"
            onChange={handleDescriptionChange}
          />
        </FormControl>

        <FormControl marginTop="2rem">
          <FormLabel htmlFor='contact' fontSize="1.5rem">Contact</FormLabel>
          <Input
            id='contact'
            type='text'
            value={contact}
            size="lg"
            backgroundColor="white"
            color="black"
            onChange={handleContactChange}
          />
        </FormControl>

        <Box w="100%" marginTop="2rem">

          <Text fontSize="1.5rem">Tag</Text>

          <Flex flexWrap="wrap" alignItems="center" marginTop="0.5rem">

            {tag?.map((item: Tag, index: number) => {
              return (
                <Flex justify="center" align="center" key={`newest-tag-${index}`}
                  className={styles.tagBox}
                  color={'black'}
                  cursor="pointer"
                  onClick={(e) => deleteTag(e)}>
                  <span>{item.name}</span>
                </Flex>
              )
            })}

            {tag.length < 5 ? (
              <AddIcon marginLeft="0.8rem" cursor="pointer" onClick={()=>{
                setSelectTag(tagsList[0].name)
                onOpen()
              }} />
            ) : null}

          </Flex>

        </Box>

      </GridItem>

      <GridItem colSpan={{ base: 2, md: 1, lg: 1 }}>

        <FormControl marginTop="2rem">
          <FormLabel htmlFor='contact' fontSize="1.5rem">Permission</FormLabel>
          <Select backgroundColor="white" color="black"
            value={permission}
            onChange={(e) => handlePermissionChange(e)}
            width={permissionWidth}>
            <option value='public'>Public</option>
            <option value='private'>Private</option>
            <option value='onlyme'>Only me</option>
          </Select>
        </FormControl>

        <Box w="100%" marginTop="2.5rem">
          <Text fontSize="1.5rem">Preview Image</Text>

          <Flex flexWrap="wrap">

            {renderPreviewImage()}

          </Flex>

        </Box>

        <Stack w="100%" marginTop="2.5rem">
          {/* <Button colorScheme="teal" width="12rem" size="lg" onClick={() => ocrButtonHandler()}>Auto Fill By OCR</Button> */}
          <Stack w="100%" marginTop="0.5rem" direction="row">
            <Button colorScheme="teal" width="8rem" size="lg"
              onClick={() => backPage()}>Back</Button>
            <Button colorScheme="teal" width="8rem" size="lg"
              onClick={() => nextButtonHandler()}><div id="next-btn-2">Next</div></Button>
          </Stack>
        </Stack>

      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody paddingTop="1rem">
            <Select
              onChange={(e) => setSelectTag(e.target.value)}
            >
              {
                tagsList.map((tag: Tag) => {
                  return (
                    <option value={tag.name} key={tag.name}>{tag.name}</option>
                  )
                })
              }
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              size="sm"
              onClick={() => addTag()}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Grid>
  )
}

export default CreatePostForm