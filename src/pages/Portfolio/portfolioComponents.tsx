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
