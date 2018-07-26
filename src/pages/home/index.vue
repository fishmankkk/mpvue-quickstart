<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <formIdBtn type='common' >
      首页
    </formIdBtn>

    <div>
      <radio-group class="radio-group" @change="radioChange">
        <label class="radio" v-for="(item, index) in items" :key="index">
          <radio :value="item.name" :checked="item.checked"/> {{item.value}}
        </label>
      </radio-group>
    </div>


    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/index" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
import formIdBtn from '@/components/form-id-btn'
// import dot from '@/helper/report_analysis/index'
import dot from '@/store/dot'
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
  computed: {
    __dot_page () {
      return {
        title: '尚德机构公开课',
        category: '首页'
      }
    }
  },
  components: {
    card,
    formIdBtn
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
      dot.dotBehavior.clickElement({
        clickElement: `更多`,
        addition: `更多`,
        url: `/pages/home/more?categoryId`
      })
    },
    radioChange (e) {
      console.log('radio发生change事件，携带value值为：', e.target.value)
    },
    bindPickerChange (e) {
      console.log(e)
    }
  },

  mounted () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getConfig()

    // dot.reLoadPage({
    //   title: '公开课详情',
    //   category: '公开课详情',
    //   addition: 123
    // })
    dot.dotLoad.commit('set', {
      title: '公开课详情',
      category: '公开课详情',
      addition: 123
    })
  },
  onPullDownRefresh () {
    this.getConfig()
    wx.stopPullDownRefresh()
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
.test-module{
  font-size: 30px;
}
</style>
