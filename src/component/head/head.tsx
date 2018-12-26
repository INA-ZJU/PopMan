import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Top from './top'
import './head.less'

class Head extends Component{
  render() {
    return (
      <View className='head'>
        <Top />
        <Text>头部</Text>
      </View>
    )
  }
}

export default Head;
