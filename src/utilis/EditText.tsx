import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { resumeFillContent } from '../action'

const MenuBar: React.FC<any> = ({ editor, isShowBtn }) => {
  if (!editor) {
    return null
  }
  
  return (
    <div style={{display: isShowBtn? "block" :"none"}}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
    </div>
  )
}

interface props {
  type: string,
}

export default (props:props) => {
const [isShowBtn, setIsShowBtn] =useState<boolean>(false);
const dispatch = useDispatch();
console.log(props.type)
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <h2>
        姓名,
      </h2>
      <p>
        Email
      </p>
    `,
    onUpdate: ({ editor }) => {
        const html = editor.getHTML()
        if(props.type==="resume"){
          dispatch(resumeFillContent(0,html))
        }
        
      },
  })

  return (
    <div  className="text">
      <MenuBar editor={editor} isShowBtn={isShowBtn}/>
      <EditorContent editor={editor} onClick={()=>{setIsShowBtn(true)}}/>
    </div>
  )
}

// onBlur={()=>{setIsShowBtn(false)}}
// onClick={(e)=>{
//     const element = (e.target as HTMLElement).parentElement;
//     console.log(element)}}
// onFocus={(e)=>{console.log(e.target); setIsShowBtn(true)}}