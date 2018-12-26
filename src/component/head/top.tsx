import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './top.less'
import leftImage from '../../assets/img/left.png'
import searchImage from '../../assets/img/search.png'


class Top extends Component{
  render(){
    return([
      <View className='top'>
        <View className='left'>
          <Image className='img' src={leftImage} />
        </View>
        <View className='right'>
          <Image className='img' src={searchImage} />
        </View>
      </View>
    ])
  }
}

export default Top;
