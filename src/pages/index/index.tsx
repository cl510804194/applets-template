import React from "react";
import { View, Text, Button } from "@tarojs/components";

import { useTranslation } from "react-i18next";

import "./index.less";

function Index() {
  const { t, i18n } = useTranslation();

  return (
    <View className="index">
      <Button
        onClick={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
      >
        切换语言
      </Button>
      <Text>{t("hello world")}</Text>
    </View>
  );
}
export default React.memo(Index);
