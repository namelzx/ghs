import { asyncRoutes, constantRouterMap, constantRoutes } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRouters = data

        accessedRouters.map(function(item) {
          const item_component = item.component
          // console.log(import(`@/views/${item_component}`))
          item.component = () => import(`@/views/${item_component}`)
          item.children.map(function(child) {
            const child_component = child.component
            child.component = () => import(`@/views/${child_component}`)
            if (child.children) {
              child.children.map(function(ch) {
                const ch_component = ch.component
                ch.component = () => import(`@/views/${ch_component}`)
              })
            }

          })
        })

        accessedRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
