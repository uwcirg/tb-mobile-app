import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import { Box, Button } from "@material-ui/core";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import videoSources from "../../Content/video-sources";

const useStyles = makeStyles({
  preview: {
    width: "100%",
    height: "auto",
  },
  button: {
    color: Colors.buttonBlue,
    textTransform: "capitalize",
    padding: 0,
  }
});

export default function Videos() {
  const classes = useStyles();
  const { i18n } = useTranslation("translation");

  const localeVideos =
    i18n.language === "id" ? videoSources.id : videoSources["es-Ar"];

  return (
    <Box padding="2rem 1rem">
      {localeVideos.map(({ youtubeId, title }) => {
        const link = `https://www.youtube.com/watch?v=${youtubeId}`;

        return (
          <Box paddingBottom="1rem">
            <a href={link}>
              <img
                className={classes.preview}
                src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              ></img>
            </a>
            <Button className={classes.button} href={link}>
              {title}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
