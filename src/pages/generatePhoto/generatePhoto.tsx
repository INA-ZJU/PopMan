import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./generatePhoto.less";
import generateButtonImage from "../../assets/img/generateButton.png";
import cloudImage from "../../assets/img/cloud.png";


export default class uploadPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-generatePhoto"
  };
  constructor () {
    super(...arguments)
    this.state={
      picUrl: "https://user-images.githubusercontent.com/37944486/50434396-eb69fb80-0917-11e9-9cc3-38593daba3ca.png",
    }
  }
  componentWillMount() {
    this.setState({
      picUrl: this.$router.params.pic
    })
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { picUrl } = this.state;
    return (
      <View className="uploadPhotoPage">
        <Image className="generateButton" src={generateButtonImage} />
        <View className='photoRegion' style={{backgroundImage: `url(${picUrl})`}} />
        <View className="generateClickRegion" />
        <Image className="cloud" src={cloudImage} />
      </View>
    );
  }
}
