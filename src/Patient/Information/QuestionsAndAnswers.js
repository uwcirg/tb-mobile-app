import { Box } from "@material-ui/core";
import React from "react";

import Markdown from "markdown-to-jsx";
import raw from "raw.macro";
import MarkdownRender from "./Panel";
import { useTranslation } from "react-i18next";

const es = raw("../../Content/faq.md");
const id = raw("../../Content/faq-id.md");

export default function QuestionsAndAnswers() {
  const { i18n } = useTranslation();

  return (
    <Box>
      <Markdown
        options={{ overrides: { Drawer: { component: MarkdownRender } } }}
        children={i18n.language === "id" ? id : es}
      />
    </Box>
  );
}
