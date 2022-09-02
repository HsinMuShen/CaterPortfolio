import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import { RootState } from '../../reducers'
import { useSelector,useDispatch } from 'react-redux'


import firebase from '../../utilis/firebase'


import cater from "./cater.png"
import EditText from '../../utilis/EditText'

const Wrapper = styled.div`
    display:flex ;
    flex-direction:column ;
    align-items: center;
`

const ResumeEditor = styled.div`
    width: 960px;
    margin: 60px auto;
    border: 1px solid;
    border-radius: 15px;
    padding: 20px 40px;
`
const ResumeHeader = styled.div`
    display:flex ;
    justify-content:center ;
    align-items:center ;
`

const ImageContainer =styled.div`
    display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`
const ImagePreview = styled.div<{ previewUrl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: solid 1px black;
  border-radius: 90px;
  background-position: center;
  background-image: url(${(props) => props.previewUrl});
  background-size: cover;
`
const ImageLabel =styled.label`
  font-size: 150%;
  cursor: pointer;
`
const ImageInput = styled.input`
    display: none;
`

const ResumeBody = styled.div``

const ResumeFooter = styled.div``

const ResumeBtn = styled.button`
    width: 200px ;
`

const HeaderForm = [
    {
        placeholder: "姓名",
        key: "name",
    },
    {
        placeholder: "職業",
        key: "profession",
    },
    {
        placeholder: "地區",
        key: "region",
    },
    {
        placeholder: "email",
        key: "電子郵件",
    },
]

const Resume:React.FC = () => {
    const [imageFile, setImageFile] = useState<File|null>(null);
    const resumeData = useSelector((state: RootState) =>state.ResumeReducer)
    const previewUrl = imageFile? URL.createObjectURL(imageFile): cater;
    const dispatch = useDispatch();
    
    const uploadResume = async() => {
        if(imageFile === null){
            alert("請上傳照片")
            return
        }
        const imageUrl = await firebase.getImageUrl(imageFile);
        const tempResumeData = resumeData;
        tempResumeData.content[0]={...tempResumeData.content[0],image:[imageUrl]}
        firebase.uploadDoc("resumes",tempResumeData);
    }
    
  return (
    <Wrapper >
        <ResumeEditor>        
            <ResumeHeader>
            <ImageContainer>
                <ImagePreview previewUrl={previewUrl}><ImageLabel htmlFor='postImage'>+</ImageLabel></ImagePreview>
                <ImageInput type="file" id='postImage' onChange={(e)=>{setImageFile(e.target.files![0])}}/>
            </ImageContainer>
            <EditText type={"resume"}/>
        </ResumeHeader>
        <ResumeBody></ResumeBody>
        <ResumeFooter></ResumeFooter>
        </ResumeEditor>
        <ResumeBtn onClick={uploadResume}>送出!</ResumeBtn>
        <div dangerouslySetInnerHTML={{__html: resumeData.content[0].text}} />
        
    </Wrapper>
  )
}

export default Resume