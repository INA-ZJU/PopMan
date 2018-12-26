import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./uploadPhoto.less";
import uploadButtonImage from "../../assets/img/uploadButton.png";
import generateButtonImage from "../../assets/img/generateButton.png";
import cloudImage from "../../assets/img/cloud.png";

export default class uploadPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-uploadPhoto"
  };
  constructor () {
    super(...arguments)
    this.state={
      picUrl: "https://user-images.githubusercontent.com/37944486/50434396-eb69fb80-0917-11e9-9cc3-38593daba3ca.png",
      isUploaded: false
    }
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  selectPhoto() {
    let self = this;
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        let value = res && res.tempFilePaths[0];
        self.setState({
          picUrl: value,
        });
      }
    })
  }
  render() {
    const { picUrl, isUploaded } = this.state;
    console.log(this.state.isUploaded);
    return (
      <View className="uploadPhotoPage">
        <Image className="uploadButton" src={uploadButtonImage} />
        <View
          className="uploadClickRegion"
          onClick={this.selectPhoto.bind(this)}
        />
        {/*{isUploaded && <Image className="generateButton" src={generateButtonImage} />}*/}
        {/*{isUploaded && <Image className="photo" src={picUrl} />}*/}
        {/*{isUploaded && <View className="generateClickRegion" />}*/}
        {isUploaded && <Image className="generateButton" src={generateButtonImage} />}
        {isUploaded && <Image className="photo" src={picUrl} />}
        {isUploaded && <View className="generateClickRegion" />}
        <Image className="cloud" src={cloudImage} />
      </View>
    );


  }
}
