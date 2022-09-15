import React from "react";
import { resumeComContent } from "./Resume";
import ResumeCom1 from "./ResumeComponents/ResumeCom1";
import ResumeCom2 from "./ResumeComponents/ResumeCom2";
import ResumeCom3 from "./ResumeComponents/ResumeCom3";

export const ResumeComponents = {
  ResumeCom1: function Text({
    index,
    content,
  }: {
    index: number;
    content: resumeComContent;
  }) {
    return <ResumeCom1 index={index} content={content} />;
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
