import React from "react";
import { resumeComContent } from "./Resume";

import TextAndImg0 from "./ResumeComponents/TextAndImg0";
import TextAndImg1 from "./ResumeComponents/TextAndImg1";
import TextAndImg2 from "./ResumeComponents/TextAndImg2";
import FullImg0 from "./ResumeComponents/FullImg0";
import FullImg1 from "./ResumeComponents/FullImg1";
import MultiImg0 from "./ResumeComponents/MultiImg0";
import MultiImg1 from "./ResumeComponents/MultiImg1";
import Text0 from "./ResumeComponents/Text0";
import Text1 from "./ResumeComponents/Text1";
import Text2 from "./ResumeComponents/Text2";
import FullImg2 from "./ResumeComponents/FullImg2";

export const resumeChoice = [
  {
    image: [""],
    text: [],
    comName: "FullImg0",
    id: "",
  },
  {
    image: [""],
    text: [],
    comName: "FullImg1",
    id: "",
  },
  {
    image: [""],
    text: [],
    comName: "FullImg2",
    id: "",
  },
  {
    image: ["", ""],
    text: [],
    comName: "MultiImg0",
    id: "",
  },
  {
    image: ["", "", ""],
    text: [],
    comName: "MultiImg1",
    id: "",
  },
  {
    image: [""],
    text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
    comName: "TextAndImg0",
    id: "",
  },
  {
    image: [""],
    text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
    comName: "TextAndImg1",
    id: "",
  },
  {
    image: [""],
    text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
    comName: "TextAndImg2",
    id: "",
  },
  {
    image: [],
    text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
    comName: "Text0",
    id: "",
  },
  {
    image: [],
    text: [
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
    ],
    comName: "Text1",
    id: "",
  },
  {
    image: [],
    text: [
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
    ],
    comName: "Text2",
    id: "",
  },
];

export const ResumeComponents = {
  FullImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <FullImg0 index={index} content={content} />;
  },
  FullImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <FullImg1 index={index} content={content} />;
  },
  FullImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <FullImg2 index={index} content={content} />;
  },
  MultiImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <MultiImg0 index={index} content={content} />;
  },
  MultiImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <MultiImg1 index={index} content={content} />;
  },
  TextAndImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <TextAndImg0 index={index} content={content} />;
  },
  TextAndImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <TextAndImg1 index={index} content={content} />;
  },
  TextAndImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <TextAndImg2 index={index} content={content} />;
  },
  Text0: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <Text0 index={index} content={content} />;
  },
  Text1: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <Text1 index={index} content={content} />;
  },
  Text2: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <Text2 index={index} content={content} />;
  },
};
