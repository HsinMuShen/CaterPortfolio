import React from "react";
import { resumeComContent } from "./Resume";
import { v4 } from "uuid";
import TextAndImg0 from "./ResumeComponents/TextAndImg0";
import preImage from "../../utilis/cat.jpg";
import TextAndImg1 from "./ResumeComponents/TextAndImg1";
import TextAndImg2 from "./ResumeComponents/TextAndImg2";
import FullImg0 from "./ResumeComponents/FullImg0";
import FullImg1 from "./ResumeComponents/FullImg1";
import MultiImg0 from "./ResumeComponents/MultiImg0";
import MultiImg1 from "./ResumeComponents/MultiImg1";
import Text0 from "./ResumeComponents/Text0";
import Text1 from "./ResumeComponents/Text1";
import Text2 from "./ResumeComponents/Text2";

export const resumeChoice = [
  {
    name: "FullImg0",
    comIndex: 0,
    comContent: {
      image: [preImage],
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
      image: [preImage],
      text: [],
      type: 1,
      comName: "FullImg1",
      id: "",
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
      id: "",
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
      id: "",
    },
  },
  {
    name: "TextAndImg0",
    comIndex: 4,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 4,
      comName: "TextAndImg0",
      id: "",
    },
  },
  {
    name: "TextAndImg1",
    comIndex: 5,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 5,
      comName: "TextAndImg1",
      id: "",
    },
  },
  {
    name: "TextAndImg2",
    comIndex: 6,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 6,
      comName: "TextAndImg2",
      id: "",
    },
  },
  {
    name: "Text0",
    comIndex: 7,
    comContent: {
      image: [],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 7,
      comName: "Text0",
      id: "",
    },
  },
  {
    name: "Text1",
    comIndex: 8,
    comContent: {
      image: [],
      text: [
        "<h3>工作經驗</h3><hr><ol><li><p>酪梨牧場 豬仔</p></li><li><p>西瓜農場 作業員</p></li><li><p>骨灰墳場 清潔員</p><p></p></li></ol>",
        "<p></p><p>2016 - 2019</p><p>2019 - 2021</p>",
      ],
      type: 8,
      comName: "Text1",
      id: "",
    },
  },
  {
    name: "Text2",
    comIndex: 9,
    comContent: {
      image: [],
      text: [
        "<h3>工作經驗</h3><hr><ol><li><p>酪梨牧場 豬仔</p></li><li><p>西瓜農場 作業員</p></li><li><p>骨灰墳場 清潔員</p><p></p></li></ol>",
        "<p></p><p>2016 - 2019</p><p>2019 - 2021</p>",
        "<p></p><p>2016 - 2019</p><p>2019 - 2021</p>",
      ],
      type: 9,
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
