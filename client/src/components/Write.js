import React from "react";
import Editor from "./write/Editor";
import Responsive from "./common/Responsive";
import TagBox from "./write/TagBox";
import WriteActionButtons from "./write/WriteActionButtons";
import { Helmet } from "react-helmet-async";

const Write = () => {
  return (
    <Responsive>
      <Helmet>
        <title>WRITE - VOID</title>
      </Helmet>
      <Editor />
      <TagBox />
      <WriteActionButtons />
    </Responsive>
  );
};

export default Write;
