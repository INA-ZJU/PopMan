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
      isGenerated: false
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
      // base64 = [
      //   'data:',
      //   mediaType ? mediaType + ';':'',
      //   'base64,',
      //   btoa(binary)
      // ].join('');
      base64 = [btoa(binary)];
      onSuccess(base64);
    };
    xhr.send();
  }

  requestList = base64 => {
    console.log(base64);
    // base64Img.requestBase64(this.state.picUrl, (err, res, body) => {
    //   axios.post("", { params: body }).then(response => {
    //     let result = response.result.picUrl;
    //     this.setState({
    //       picUrl: `data:image/png;base64,${result}`,
    //       isGenerated: true
    //     });
    //   });
    // })

    axios
      .post("http://10.214.130.31:3000/upload", { params: base64 })
      .then(response => {
        let result = response.image;
        this.setState({
          picUrl: `data:image/png;base64,${result}`,
          isGenerated: true
        });
      });
  };

  handleGenerate() {
    // this.requestList();
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
    const { picUrl, isGenerated } = this.state;
    const randomNum = Math.floor(Math.random() * 3);
    console.log(randomNum);
    const bgArray = [
      "https://user-images.githubusercontent.com/37944486/50607515-6dec4f80-0f04-11e9-8fa1-02026ad75808.jpeg",
      "https://user-images.githubusercontent.com/37944486/50607516-6e84e600-0f04-11e9-80e7-aae8d0624a6b.jpeg",
      "https://user-images.githubusercontent.com/37944486/50607517-6e84e600-0f04-11e9-88b4-ff58051934e7.jpeg"
    ];
    return (
      <View className="generatePhotoPage">
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
        {/*<Image className="photoRegion" id="imageid" src={picUrl} />*/}
        <Image className="cloud" src={cloudImage} />
      </View>
    );
  }
}
