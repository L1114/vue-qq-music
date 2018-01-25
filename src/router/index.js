import Vue from 'vue'
import Router from 'vue-router'
// import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
// import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
// import Tab from 'components/tab/tab'
import SingerDetail from 'components/singer-detail/singer-detail'
// const Recommend = () => import('components/recommend/recommend')
// const Tab = () => import('components/tab/tab')
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Tab = (resolve) => {
  import('components/tab/tab').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/tab',
      component: Tab
    }
  ]
})
