import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./uploadPhoto.less";
import uploadButtonImage from "../../assets/img/uploadButton.png";
import cloudImage from "../../assets/img/cloud.png";

export default class uploadPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-uploadPhoto"
  };
  constructor() {
    super(...arguments);
    this.state = {
      picUrl:
        "https://user-images.githubusercontent.com/37944486/50434396-eb69fb80-0917-11e9-9cc3-38593daba3ca.png",
      isSelected: false
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  selectPhoto() {
    let self = this;
    Taro.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album"],
      success: (res) => {
        let value = res && res.tempFilePaths[0];
        self.setState({
          picUrl: value,
          isSelected: true
        });
      }
    });
  }
  skipToSelect({ param }) {
    Taro.navigateTo({
      url: `/pages/selectPhoto/selectPhoto?title=${param}`
    });
  }
  render() {
    const { picUrl, isSelected } = this.state;
    if (isSelected) {
      this.skipToSelect({ param: picUrl });
    }
    return (
      <View className="uploadPhotoPage">
        <Image className="uploadButton" src={uploadButtonImage} />
        <View
          className="uploadClickRegion"
          onClick={this.selectPhoto.bind(this)}
        />
        <Image className="cloud" src={cloudImage} />
      </View>
    );
  }
}
