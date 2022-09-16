import React from "react";
import { resumeComContent } from "./Resume";
import TextAndImg0 from "./ResumeComponents/TextAndImg0";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";
import ResumeCom3 from "./ResumeComponents/ResumeCom3";
import preImage from "../../utilis/cat.jpg";
import TextAndImg1 from "./ResumeComponents/TextAndImg1";
import TextAndImg2 from "./ResumeComponents/TextAndImg2";
import FullImg0 from "./ResumeComponents/FullImg0";
import FullImg1 from "./ResumeComponents/FullImg1";
import MultiImg0 from "./ResumeComponents/MultiImg0";
import MultiImg1 from "./ResumeComponents/MultiImg1";
import Text0 from "./ResumeComponents/Text0";
import Text1 from "./ResumeComponents/Text1";

export const resumeChoice = [
  {
    name: "FullImg0",
    comIndex: 0,
    comContent: {
      image: [preImage],
      text: [],
      type: 0,
      comName: "FullImg0",
    },
  },
  {
    name: "FullImg1",
    comIndex: 1,
    comContent: {
      image: [preImage],
      text: [],
      type: 1,
      comName: "FullImg1",
    },
  },
  {
    name: "MultiImg0",
    comIndex: 2,
    comContent: {
      image: [preImage, preImage],
      text: [],
      type: 2,
      comName: "MultiImg0",
    },
  },
  {
    name: "MultiImg1",
    comIndex: 3,
    comContent: {
      image: [preImage, preImage, preImage],
      text: [],
      type: 3,
      comName: "MultiImg1",
    },
  },
  {
    name: 4,
    comIndex: 4,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 4,
      comName: "TextAndImg0",
    },
  },
  {
    name: 5,
    comIndex: 5,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 5,
      comName: "TextAndImg1",
    },
  },
  {
    name: 6,
    comIndex: 6,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 6,
      comName: "TextAndImg2",
    },
  },
  {
    name: 7,
    comIndex: 7,
    comContent: {
      image: [],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 7,
      comName: "Text0",
    },
  },
  {
    name: 8,
    comIndex: 8,
    comContent: {
      image: [],
      text: [
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 8,
      comName: "Text1",
    },
  },
  {
    name: 1,
    comIndex: 1,
    comContent: {
      image: [preImage, preImage],
      text: [],
      type: 1,
      comName: "ResumeCom2",
    },
  },
  {
    name: 2,
    comIndex: 2,
    comContent: {
      image: [],
      text: [
        "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
        "<h3>標題</h3><p>您的英勇事蹟</p><p>您的英勇事蹟</p>",
      ],
      type: 2,
      comName: "ResumeCom3",
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

  ResumeCom2: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <ResumeCom2 index={index} content={content} />;
  },
  ResumeCom3: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <ResumeCom3 index={index} content={content} />;
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
};
