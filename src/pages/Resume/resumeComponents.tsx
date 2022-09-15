import React from "react";
import { resumeComContent } from "./Resume";
import TextAndImg0 from "./ResumeComponents/TextAndImg0";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";
import ResumeCom3 from "./ResumeComponents/ResumeCom3";
import preImage from "../../utilis/cat.jpg";

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
      comName: "TextAndImg2",
    },
  },
  {
    name: 6,
    comIndex: 6,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 6,
      comName: "TextAndImg3",
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
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
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
  TextAndImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <TextAndImg0 index={index} content={content} />;
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
};
