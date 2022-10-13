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
    name: "FullImg0",
    comIndex: 0,
    comContent: {
      image: [""],
      text: [],
      type: 0,
      comName: "FullImg0",
      id: "",
    },
  },
  {
    name: "FullImg1",
    comIndex: 1,
    comContent: {
      image: [""],
      text: [],
      type: 1,
      comName: "FullImg1",
      id: "",
    },
  },
  {
    name: "FullImg2",
    comIndex: 2,
    comContent: {
      image: [""],
      text: [],
      type: 2,
      comName: "FullImg2",
      id: "",
    },
  },
  {
    name: "MultiImg0",
    comIndex: 3,
    comContent: {
      image: ["", ""],
      text: [],
      type: 3,
      comName: "MultiImg0",
      id: "",
    },
  },
  {
    name: "MultiImg1",
    comIndex: 4,
    comContent: {
      image: ["", "", ""],
      text: [],
      type: 4,
      comName: "MultiImg1",
      id: "",
    },
  },
  {
    name: "TextAndImg0",
    comIndex: 5,
    comContent: {
      image: [""],
      text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
      type: 5,
      comName: "TextAndImg0",
      id: "",
    },
  },
  {
    name: "TextAndImg1",
    comIndex: 6,
    comContent: {
      image: [""],
      text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
      type: 6,
      comName: "TextAndImg1",
      id: "",
    },
  },
  {
    name: "TextAndImg2",
    comIndex: 7,
    comContent: {
      image: [""],
      text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
      type: 7,
      comName: "TextAndImg2",
      id: "",
    },
  },
  {
    name: "Text0",
    comIndex: 8,
    comContent: {
      image: [],
      text: ["<h2>標題</h2><p>內容</p><p>內容</p>"],
      type: 8,
      comName: "Text0",
      id: "",
    },
  },
  {
    name: "Text1",
    comIndex: 9,
    comContent: {
      image: [],
      text: [
        "<h2>標題</h2><p>內容</p><p>內容</p>",
        "<h2>標題</h2><p>內容</p><p>內容</p>",
      ],
      type: 9,
      comName: "Text1",
      id: "",
    },
  },
  {
    name: "Text2",
    comIndex: 10,
    comContent: {
      image: [],
      text: [
        "<h2>標題</h2><p>內容</p><p>內容</p>",
        "<h2>標題</h2><p>內容</p><p>內容</p>",
        "<h2>標題</h2><p>內容</p><p>內容</p>",
      ],
      type: 10,
      comName: "Text2",
      id: "",
    },
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
