import React from "react";
import { websiteComContent } from "./Website";
import FullImg0 from "./WebsiteComponents/FullImg0";
import FullImg1 from "./WebsiteComponents/FullImg1";
import MultiImg0 from "./WebsiteComponents/MultiImg0";
import MultiImg1 from "./WebsiteComponents/MultiImg1";
import MultiImg2 from "./WebsiteComponents/MultiImg2";
import MultiImg3 from "./WebsiteComponents/MultiImg3";
import TextAndImg1 from "./WebsiteComponents/TextAndImg1";
import TextAndImg2 from "./WebsiteComponents/TextAndImg2";
import Text0 from "./WebsiteComponents/Text0";
import Text1 from "./WebsiteComponents/Text1";
import Text2 from "./WebsiteComponents/Text2";
import Text3 from "./WebsiteComponents/Text3";
import Text4 from "./WebsiteComponents/Text4";
import PortfolioAreaCom from "./WebsiteComponents/PortfolioAreaCom";

export const websiteChoice = [
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
    image: ["", ""],
    text: [],
    comName: "MultiImg2",
    id: "",
  },
  {
    image: ["", ""],
    text: [],
    comName: "MultiImg3",
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
    ],
    comName: "Text2",
    id: "",
  },
  {
    image: [],
    text: [
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
    ],
    comName: "Text3",
    id: "",
  },
  {
    image: [],
    text: [
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
      "<h2>標題</h2><p>內容</p><p>內容</p>",
    ],
    comName: "Text4",
    id: "",
  },
  {
    image: [],
    text: [],
    comName: "Portfolio0",
    id: "",
    portfolioID: [],
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
  MultiImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <MultiImg2 index={index} content={content} />;
  },
  MultiImg3: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <MultiImg3 index={index} content={content} />;
  },
  TextAndImg1: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <TextAndImg1 index={index} content={content} />;
  },
  TextAndImg2: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <TextAndImg2 index={index} content={content} />;
  },
  Text0: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <Text0 index={index} content={content} />;
  },
  Text1: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <Text1 index={index} content={content} />;
  },
  Text2: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <Text2 index={index} content={content} />;
  },
  Text3: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <Text3 index={index} content={content} />;
  },
  Text4: function Text({
    index,
    content,
  }: {
    index: number;
    content: websiteComContent;
  }) {
    return <Text4 index={index} content={content} />;
  },
  Portfolio0: function Text({
    index,
    content,
    userID,
  }: {
    index: number;
    content: websiteComContent;
    userID: string;
  }) {
    return <PortfolioAreaCom index={index} content={content} userID={userID} />;
  },
};
