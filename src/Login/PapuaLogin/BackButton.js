import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BackButton() {
  const { t } = useTranslation("translation");
  return <Link to="/login">{t("commonWords.back")}</Link>;
}
