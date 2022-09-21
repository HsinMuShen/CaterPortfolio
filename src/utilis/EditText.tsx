import { EditorContent, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faP,
  faListUl,
  faListOl,
  faAlignRight,
  faAlignJustify,
  faAlignLeft,
  faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";

const BtnWrapper = styled.div`
  position: absolute;
  top: -100px;
  transform: translate(0, 0);
  width: 330px;
  border: 2px solid;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #ffffff;
  z-index: 10;
`;

const StyleBtn = styled.button`
  background-color: #ffffff;
  padding: 3px;
  margin: 4px 3px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #555555;
    color: #ffffff;
  }
`;

const StyleInput = styled.input`
  background-color: #ffffff;
  padding: 3px;
  margin: 4px 3px;
  border-radius: 5px;
  border: 2px solid;
  font-weight: 600;
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
        <FontAwesomeIcon icon={faBold} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faItalic} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </StyleBtn>

      <StyleBtn
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faP} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        H5
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        H6
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListUl} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faListOl} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        —
      </StyleBtn>
      <StyleBtn onClick={() => editor.chain().focus().setHardBreak().run()}>
        空白行
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faAlignCenter} />
      </StyleBtn>
      <StyleBtn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <FontAwesomeIcon icon={faAlignRight} />
      </StyleBtn>
      <StyleInput
        type="color"
        onInput={(event) =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLTextAreaElement).value)
            .run()
        }
        value={editor.getAttributes("textStyle").color}
      />
    </BtnWrapper>
  );
};

interface props {
  text: string;
  setReducerText: (text: string, listIndex: number) => void;
  listIndex: number;
  style?: any;
}

export default ({ text, setReducerText, listIndex, style }: props) => {
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
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
        style={style}
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
