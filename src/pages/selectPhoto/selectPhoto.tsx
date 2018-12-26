import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./selectPhoto.less";

export default class selectPhoto extends Component {
  config: Config = {
    navigationBarTitleText: "PopMan-selectPhoto"
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

  render() {
    const { picUrl } = this.state;
    return (
        <View className='selectPhotoPage'>
          <Image className='selectedPhoto' src={picUrl}/>
          <Image className='cancelButton' src='https://user-images.githubusercontent.com/37944486/50434372-e86f0b00-0917-11e9-818e-78c25ea116f0.png' />
          <Image className='confirmButton' src='https://user-images.githubusercontent.com/37944486/50434382-e907a180-0917-11e9-932f-388062017dc4.png' />
        </View>
    );
  }
}
