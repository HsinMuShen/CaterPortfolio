import React from "react";
import { portfolioComContent } from "./Portfolio";
import FullImg0 from "./PortfolioComponents/FullImg0";
import FullImg1 from "./PortfolioComponents/FullImg1";
import MultiImg0 from "./PortfolioComponents/MultiImg0";
import MultiImg1 from "./PortfolioComponents/MultiImg1";
import MultiImg2 from "./PortfolioComponents/MultiImg2";
import MultiImg3 from "./PortfolioComponents/MultiImg3";
import TextAndImg1 from "./PortfolioComponents/TextAndImg1";
import TextAndImg2 from "./PortfolioComponents/TextAndImg2";
import Text0 from "./PortfolioComponents/Text0";
import Text1 from "./PortfolioComponents/Text1";
import Text2 from "./PortfolioComponents/Text2";
import Text3 from "./PortfolioComponents/Text3";
import Text4 from "./PortfolioComponents/Text4";

export const portfolioChoice = [
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
      image: ["", ""],
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
      image: ["", ""],
      text: [],
      type: 5,
      comName: "MultiImg3",
      id: "",
    },
  },
  {
    name: "TextAndImg1",
    comIndex: 6,
    comContent: {
      image: [""],
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
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
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
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
      text: ["<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>"],
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
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
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
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 10,
      comName: "Text2",
      id: "",
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
      ],
      type: 11,
      comName: "Text3",
      id: "",
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
        "<h2>您的姓名</h2><p>職位名稱</p><p>聯絡資訊</p>",
      ],
      type: 12,
      comName: "Text4",
      id: "",
    },
  },
];

export const PortfolioComponents = {
  FullImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <FullImg0 index={index} content={content} />;
  },
  FullImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <FullImg1 index={index} content={content} />;
  },
  MultiImg0: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <MultiImg0 index={index} content={content} />;
  },
  MultiImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <MultiImg1 index={index} content={content} />;
  },
  MultiImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <MultiImg2 index={index} content={content} />;
  },
  MultiImg3: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <MultiImg3 index={index} content={content} />;
  },
  TextAndImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <TextAndImg1 index={index} content={content} />;
  },
  TextAndImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <TextAndImg2 index={index} content={content} />;
  },
  Text0: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <Text0 index={index} content={content} />;
  },
  Text1: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <Text1 index={index} content={content} />;
  },
  Text2: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <Text2 index={index} content={content} />;
  },
  Text3: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <Text3 index={index} content={content} />;
  },
  Text4: function Text({
    index,
    content,
  }: {
    index: number;
    content: portfolioComContent;
  }) {
    return <Text4 index={index} content={content} />;
  },
};
