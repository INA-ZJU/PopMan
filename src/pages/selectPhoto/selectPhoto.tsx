import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
export default class selectPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-selectPhoto"
  };
  constructor () {
    super(...arguments)
    this.state={
      picUrl: null,
      isUploaded: false
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
        <View></View>
    );
  }
}
