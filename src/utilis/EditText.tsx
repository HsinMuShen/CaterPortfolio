import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";

const MenuBar: React.FC<any> = ({ editor, isShowBtn }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="btns" style={{ display: isShowBtn ? "block" : "none" }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
    </div>
  );
};

interface props {
  text: string;
  setReducerText: (text: string, listIndex: number) => void;
  listIndex: number;
}

export default ({ text, setReducerText, listIndex }: props) => {
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
        e.path[0].parentElement.className === "btns"
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
        style={{ padding: "20px" }}
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
