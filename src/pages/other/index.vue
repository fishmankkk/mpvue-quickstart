<template>
  <div class="container" @click="clickHandle('test click', $event)">
    其他页面
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
import Api from '@/helper/api'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'}
      ],
      index: 0,
      array: ['A', 'B', 'C']
    }
  },
  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = 'pages/logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getConfig () {
      Api.post('common/getConfig', {
      }).then(r => {
        console.log(r)
      }).catch(() => {
        // this.isSwitching = false
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
    },
    bindPickerChange (e) {
      console.log(e)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    // this.getConfig()
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getConfig()
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
