<template>
  <form @submit='formSubmit' report-submit class="form">
    <div v-if="type === 'common'">
      <button formType='submit'
              class="button">
        <slot></slot>
      </button>
    </div>
    <div v-else-if="type === 'phone'">
      <button formType='submit'
              open-type='getPhoneNumber'
              @getphonenumber='getPhoneNumber'
              class="button">
        <slot></slot>
      </button>
    </div>
    <div v-else-if="type === 'userinfo'">
      <button formType='submit'
              open-type='getUserInfo'
              @getuserinfo='getUserInfo'
              class="button">
        <slot></slot>
      </button>
    </div>
    <div v-else-if="type === 'share'">
      <button formType='submit'
              open-type='share'
              :data-type="shareType"
              class="button">
        <slot></slot>
      </button>
    </div>
  </form>
</template>

<script>
import Api from '@/helper/api'

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    business: {
      type: String,
      default: 'syllabus_reserve'
    },
    businessId: {
      type: Number,
      default: -1
    },
    businessMode: {
      type: String,
      default: 'common'
    },
    businessType: {
      type: String,
      default: 'common'
    },
    businessItem: {
      type: Object,
      default: {}
    },
    shareType: {
      type: String,
      default: ''
    },
    extra: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      eventBusinessId: -1
    }
  },
  events: {
    authorizePhone (businessId) {
      this.eventBusinessId = businessId
    }
  },
  methods: {
    formSubmit (e) {
      const { formId } = e.mp.detail
      if (
        formId &&
        formId !== 'the formId is a mock one' &&
        this.businessType === 'common'
      ) {
        let params = {
          formId,
          businessType: (this.businessType || '').toUpperCase()
        }
        if (this.businessTypeId) {
          params.businessTypeId = this.businessTypeId
        }
        Api.post('common/commitFormId', params)
      }
      this.$emit('saveFormId', formId)
    },
    getPhoneNumber (e) {
      // console.log(e)
      const { encryptedData, iv } = e.mp.detail
      if (encryptedData) {
        wx.showLoading({
          title: '正在确认授权',
          mask: true
        })
        this.$apply()
        this.decryptCustomerData(encryptedData, iv)
      } else {
        this.$emit('cancelSavePhoneNumber')
      }
    },
    getUserInfo (e) {
      if (e.mp.detail.userInfo) {
        this.$emit('saveUserInfo', e.mp.detail)
      } else {
        this.$emit('cancelSaveUserInfo')
      }
    }
  },
  mounted () {
    // console.log(this.type)
  },
  decryptCustomerData (encryptedData, iv) {
    const cb = function () {
      wx.hideLoading()
    }
    Api.getOpenIdPromise().then(({ openid, session_key }) => {
      return Api.post('customer/decryptCustomerData', {
        encryptedData,
        iv,
        sessionKey: session_key
      }).then(data => {
        cb()
        const result = JSON.parse(data.decryptedData)
        const { phoneNumber } = result
        if (this.business === 'profileEvent') {
          this.$emit('profileEvent', phoneNumber, this.app.recommendOpenId, this.businessType)
        } else {
          let realBusinessId = this.businessItem[this.businessId] || (this.businessId > 0 ? this.businessId : this.eventBusinessId)
          let realBusinessMode = this.businessMode || 'common'
          let realBusiness = this.business
          // mk分享获取grant需要具体到分享的类别
          if (realBusinessMode === 'mk_pull_new' && this.app.mkSecId && this.app.shareTicket) {
            realBusiness = realBusiness + '_from_mk_share'
          }

          Api.post('customer/authPhone', Object.assign({
            phoneNumber,
            business: realBusiness,
            businessId: realBusinessId,
            businessMode: realBusinessMode,
            shareTicket: this.app.shareTicket,
            rOpenId: this.app.recommendOpenId
          }, this.extra))
            .then((data) => {
              // store.dispatch({
              //   type: UpdateUserInfoSuccess,
              //   payload: {
              //     ...data,
              //     phoneNumber
              //   }
              // })
              this.$emit('savePhoneNumber', phoneNumber, this.businessItem)
            })
        }
      }, cb)
    }, cb)
  }
}
</script>

<style lang="less">
.form {
  display: block;
  width: 100%;
}
.form .button{
  text-align: left;
}
.button {
  border: 0 none;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
  height: auto;
  line-height: inherit;
  border-radius: 0;
}

.button-hover {
  color: inherit;
  background: transparent;
}

.button:after {
  border: 0 none;
}
</style>
