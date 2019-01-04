import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./generatePhoto.less";
import generateButtonImage from "../../assets/img/generateButton.png";
import cloudImage from "../../assets/img/cloud.png";
import saveTextImage from "../../assets/img/saveText.png";
import changeFaceImage from "../../assets/img/changeFace.png";
import shareButtonImage from "../../assets/img/shareButton.png";
import axios from "axios";

export default class generatePhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-generatePhoto"
  };
  constructor() {
    super(...arguments);
    this.state = {
      picUrl:
        "https://user-images.githubusercontent.com/37944486/50434396-eb69fb80-0917-11e9-9cc3-38593daba3ca.png",
      isGenerated: false,
      isLoading: false
    };
  }
  componentWillMount() {
    this.setState({
      picUrl: this.$router.params.pic
    });
  }

  componentDidMount() {}

  getBase64FromImage(url, onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = "arraybuffer";
    xhr.open("GET", url);

    xhr.onload = function() {
      var base64, binary, bytes, mediaType;

      bytes = new Uint8Array(xhr.response);
      //NOTE String.fromCharCode.apply(String, ...
      //may cause "Maximum call stack size exceeded"
      binary = [].map
        .call(bytes, function(byte) {
          return String.fromCharCode(byte);
        })
        .join("");
      mediaType = xhr.getResponseHeader("content-type");
      base64 = [btoa(binary)].join("");
      onSuccess(base64);
    };
    xhr.send();
  }

  requestList = base64 => {
    console.log("hello");
    console.log(base64.toString());
    let formData = new FormData();
    formData.append("image", base64.toString());
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    axios
      .post("http://10.214.130.31:3000/upload", formData, config)
      .then(response => {
        let result = response.data;
        this.setState({
          picUrl: `data:image/png;base64,${result}`,
          isGenerated: true,
          isLoading: false
        });
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      });
  };

  handleGenerate() {
    // this.requestList();
    this.setState({ isLoading: true });
    this.getBase64FromImage(this.state.picUrl, this.requestList);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  skipToUpload() {
    Taro.redirectTo({
      url: `/pages/uploadPhoto/uploadPhoto`
    });
  }
  shareImg() {}

  render() {
    const { picUrl, isGenerated, isLoading } = this.state;
    const randomNum = Math.floor(Math.random() * 3);
    console.log(randomNum);
    const bgArray = [
      "https://user-images.githubusercontent.com/37944486/50607515-6dec4f80-0f04-11e9-8fa1-02026ad75808.jpeg",
      "https://user-images.githubusercontent.com/37944486/50607516-6e84e600-0f04-11e9-80e7-aae8d0624a6b.jpeg",
      "https://user-images.githubusercontent.com/37944486/50607517-6e84e600-0f04-11e9-88b4-ff58051934e7.jpeg"
    ];
    return (
      <View className="generatePhotoPage">
        {isLoading && <View className="loader" />}
        {!isGenerated && (
          <Image className="generateButton" src={generateButtonImage} />
        )}
        {!isGenerated && (
          <View
            className="generateClickRegion"
            onClick={this.handleGenerate.bind(this)}
          />
        )}
        {isGenerated && <Image className="saveText" src={saveTextImage} />}
        {isGenerated && (
          <View
            className="changeFaceRegion"
            onClick={this.skipToUpload.bind(this)}
          />
        )}
        {isGenerated && <Image className="changeFace" src={changeFaceImage} />}
        {isGenerated && (
          <Image
            className="shareButton"
            onClick={this.shareImg.bind(this)}
            src={shareButtonImage}
          />
        )}
        {isGenerated && (
          <View
            className="shareButtonRegion"
            onClick={this.shareImg.bind(this)}
          />
        )}
        {isGenerated && (
          <View
            className="photoBg"
            style={{ backgroundImage: `url(${bgArray[randomNum]})` }}
          />
        )}
        <View
          className="photoRegion"
          style={{ backgroundImage: `url(${picUrl})` }}
        />
        {isLoading && (
          <View
            className="photoRegion"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />
        )}
        {/*<Image className="photoRegion" id="imageid" src={picUrl} />*/}
        <Image className="cloud" src={cloudImage} />
      </View>
    );
  }
}
