import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./selectPhoto.less";

export default class selectPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-selectPhoto"
  };
  constructor() {
    super(...arguments);
    this.state = {
      picUrl:
        "https://user-images.githubusercontent.com/37944486/50434396-eb69fb80-0917-11e9-9cc3-38593daba3ca.png",
      isUploaded: false
    };
  }
  componentWillMount() {
    this.setState({
      picUrl: this.$router.params.title
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 取消选择该图片，跳转回上传图片页面
   */
  cancelSelect() {
    Taro.navigateTo({
      url: `/pages/generatePhoto/generatePhoto`
    });
  }

  /**
   * 确认选择该图片，跳转回上传图片页面并且将图片url传出，将该页面state中picUrl进行替换，将该页面state的isUploaded改成true
   */
  confirmSelect({ param }) {
    Taro.redirectTo({
      url: `/pages/generatePhoto/generatePhoto?pic=${param}`
    });
  }

  render() {
    const { picUrl } = this.state;
    return (
      <View className="selectPhotoPage">
        <View
          className="selectedPhotoRegion"
          style={{ backgroundImage: `url(${picUrl})` }}
        />
        <Image
          onClick={this.cancelSelect.bind(this)}
          className="cancelButton"
          src="https://user-images.githubusercontent.com/37944486/50434372-e86f0b00-0917-11e9-818e-78c25ea116f0.png"
        />
        <Image
          onClick={this.confirmSelect.bind(this, { param: picUrl })}
          className="confirmButton"
          src="https://user-images.githubusercontent.com/37944486/50434382-e907a180-0917-11e9-932f-388062017dc4.png"
        />
      </View>
    );
  }
}
