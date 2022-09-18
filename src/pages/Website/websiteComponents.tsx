import React from "react";
import { websiteComContent } from "./Website";
import preImage from "../../utilis/cat.jpg";
import { v4 } from "uuid";
import FullImg0 from "./WebsiteComponents/FullImg0";
import FullImg1 from "./WebsiteComponents/FullImg1";
import MultiImg0 from "./WebsiteComponents/MultiImg0";
import MultiImg1 from "./WebsiteComponents/MultiImg1";

export const websiteChoice = [
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
    name: "MultiImg0",
    comIndex: 2,
    comContent: {
      image: ["", ""],
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
      image: ["", "", ""],
      text: [],
      type: 3,
      comName: "MultiImg1",
      id: "",
    },
  },
  {
    name: "MultiImg2",
    comIndex: 4,
    comContent: {
      image: [preImage, preImage],
      text: [],
      type: 4,
      comName: "MultiImg2",
      id: "",
    },
  },
  {
    name: "MultiImg3",
    comIndex: 5,
    comContent: {
      image: [preImage, preImage],
      text: [],
      type: 5,
      comName: "MultiImg3",
      id: "",
    },
  },
  {
    name: "TextAndImg0",
    comIndex: 6,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 6,
      comName: "TextAndImg0",
      id: v4(),
    },
  },
  {
    name: "TextAndImg1",
    comIndex: 7,
    comContent: {
      image: [preImage],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 7,
      comName: "TextAndImg1",
      id: v4(),
    },
  },
  {
    name: "Text0",
    comIndex: 8,
    comContent: {
      image: [],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
      type: 8,
      comName: "Text0",
      id: v4(),
    },
  },
  {
    name: "Text1",
    comIndex: 9,
    comContent: {
      image: [],
      text: [
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 9,
      comName: "Text1",
      id: v4(),
    },
  },
  {
    name: "Text2",
    comIndex: 10,
    comContent: {
      image: [],
      text: [
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 10,
      comName: "Text2",
      id: v4(),
    },
  },
  {
    name: "Text3",
    comIndex: 11,
    comContent: {
      image: [],
      text: [
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 11,
      comName: "Text3",
      id: v4(),
    },
  },
  {
    name: "Text4",
    comIndex: 12,
    comContent: {
      image: [],
      text: [
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 12,
      comName: "Text4",
      id: v4(),
    },
  },
];

export const WebsiteComponents = {
  FullImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <FullImg0 index={index} content={content} />;
  },
  FullImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <FullImg1 index={index} content={content} />;
  },
  MultiImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <MultiImg0 index={index} content={content} />;
  },
  MultiImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <MultiImg1 index={index} content={content} />;
  },
};
