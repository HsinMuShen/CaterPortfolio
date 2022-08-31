import React, {useState} from 'react'
import styled from 'styled-components'

import cater from "./cater.png"

const Wrapper = styled.div`
    width: 960px;
    margin: 60px auto;
    border: 1px solid;
    border-radius: 15px;
    padding: 20px 40px;
`
const ResumeHeader = styled.div`

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

const Resume = () => {
    const [file, setFile] = useState<File|null>(null);
    const previewUrl = file? URL.createObjectURL(file): cater
  return (
    <Wrapper>
        <ResumeHeader>
            <ImageContainer>
                <ImagePreview previewUrl={previewUrl}><ImageLabel htmlFor='postImage'>+</ImageLabel></ImagePreview>
                <ImageInput type="file" id='postImage' onChange={(e)=>{setFile(e.target.files![0])}}/>
            </ImageContainer>
            <></>
        </ResumeHeader>
        <ResumeBody></ResumeBody>
        <ResumeFooter></ResumeFooter>
    </Wrapper>
  )
}

export default Resume