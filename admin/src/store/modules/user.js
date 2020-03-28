import { getInfo, login, logout } from '@/api/user'

import { getToken, removeToken, setToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { CarBrand } from '@/api/tools'

import { getUserInfo, loginByUsername } from '@/api/login'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  muenroles: [],
  userinfo: {},
  group:'',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MUEN: (state, roles) => {
    state.muenroles = roles
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo
  },
  SET_CARLILSE: (state, data) => {
    state.brand = data
  },
  SET_GROUP: (state, data) => {
    state.group = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      var temp = {
        username: username.trim(),
        password: password
      }
      login(temp).then(response => {
        console.log('触发登录')

        const { data } = response

        console.log(data.userToken)
        commit('SET_TOKEN', data.userToken)
        setToken(data.userToken)
        console.log(getToken())
        CarBrand().then(res => {
          commit('SET_CARLILSE', res.data)
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {

        const { data } = response
        if (!data) {
          reject('验证失败,请重新登录')
        }

        const { roles, name, avatar, introduction } = data
        console.log(data)
        // roles must be a non-empty array
        if (data.access && data.groupId > 0) {
          commit('SET_ROLES', data.groupId)
        } else {
          reject('拉取用户权限失败')
        }
        // console.log(data.access)
        commit('SET_MUEN', data.access)

        // commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {

    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', 0)
      removeToken()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 获取用户信息
  GetUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
          reject('error')
        }
        const data = response.data
        if (data.access && data.groupId > 0) {
          commit('SET_ROLES', data.groupId)
        } else {
          reject('拉取用户权限失败')
        }

        CarBrand().then(res => {
          commit('SET_CARLILSE', res.data)

        })
        commit('SET_MUEN', data.access)
        commit('SET_NAME', data.userName)
        // commit('SET_AVATAR', data.img)
        commit('SET_USERINFO', data)
        // commit('SET_REALNAME', data.realName)
        // commit('SET_PHONE', data.phone)
        // commit('SET_EMAIL', data.email)
        commit('SET_GROUP', data.group)

        // commit('SET_ADMIN', data.id)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')

      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/GenerateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
