import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BtnWrapper = styled.div`
  position: absolute;
  top: -100px;
  transform: translate(-31%, 0);
  width: 400px;
  border: 2px solid;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #ffffff;
`;

const StyleBtn = styled.button`
  background-color: #ffffff;
  padding: 3px;
  margin: 4px 3px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const MenuBar: React.FC<any> = ({ editor, isShowBtn }) => {
  if (!editor) {
    return null;
  }

  return (
    <BtnWrapper
      className="btns"
      style={{ display: isShowBtn ? "block" : "none" }}
    >
      <StyleBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </StyleBtn>

      <StyleBtn
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        horizontal rule
      </StyleBtn>
      <StyleBtn onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </StyleBtn>
    </BtnWrapper>
  );
};

interface props {
  text: string;
  setReducerText: (text: string, listIndex: number) => void;
  listIndex: number;
  styles?: any;
}

export default ({ text, setReducerText, listIndex, styles }: props) => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  const isPreview = useSelector(
    (state: RootState) => state.IsPreviewReducer.resume
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      ${text}
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setReducerText(html, listIndex);
    },
  });

  useEffect(() => {
    const closeBtn = (e: any) => {
      if (
        e.path[0].parentElement.className ===
          "ProseMirror ProseMirror-focused" ||
        e.path[0].parentElement.parentElement.className ===
          "ProseMirror ProseMirror-focused" ||
        e.path[0].parentElement.parentElement.className === "text"
      ) {
        return;
      }
      setIsShowBtn(false);
    };
    document.body.addEventListener("click", closeBtn);
  }, []);

  return (
    <div className="text">
      <MenuBar editor={editor} isShowBtn={isShowBtn} className="tex2" />
      <EditorContent
        style={styles}
        editor={editor}
        onClick={() => {
          setIsShowBtn(true);
        }}
      />
    </div>
  );
};

// onBlur={()=>{setIsShowBtn(false)}}
// onClick={(e)=>{
//     const element = (e.target as HTMLElement).parentElement;
//     console.log(element)}}
// onFocus={(e)=>{console.log(e.target); setIsShowBtn(true)}}
