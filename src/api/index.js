import express from "express";
import axios from "axios";
const app = express();

import AemI18nDataDE from "../data/aemStaticMockDataDE.json";
import AemI18nDataEN from "../data/aemStaticMockDataEN.json";

app.get("/AemI18nData", async (req, res) => {
  const lang = req.query.lang ? req.query.lang : "en";
  const aemData = await axios 
    .get(
      `https://ct1.raitt.low.tefde-aws-raitt01-dev.aws.de.pri.o2.com/content/dam/ortel-mobile/de/${lang}/content-fragments/direct-debit.tefmodel.json`
    )
    .then(resp => resp)
    .catch(e => {
      return lang === "en" ? AemI18nDataEN : AemI18nDataDE;
    });
  res.send(aemData);
});

export default {
  path: "/api/",
  handler: app
};
