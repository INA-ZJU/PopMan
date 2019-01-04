import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.less";
import enterButtonImage from "../../assets/img/enter.png";
import saoqiTextImage from "../../assets/img/saoqiText.png";


export default class Index extends Component {
  // state={
  //   clicked: false
  // }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "PopMan"
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  skipToUpload = url => {
    Taro.redirectTo({ url }).catch(e => {
      console.log(e);
    });
  };
  render() {
    return (
      <View className="homePage">
        <Image className="enterButton" src={enterButtonImage} />
        <Image className="saoqiText" src={saoqiTextImage}></Image>
        <View
          className="clickRegion"
          onClick={() => {
            this.skipToUpload("/pages/uploadPhoto/uploadPhoto");
          }}
        />
      </View>
    );
  }
}
