import { Component } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import zh from "../locales/zh";
import en from "../locales/en";

import "./app.less";

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};
i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  interpolation: {
    escapeValue: false
  }
});

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
