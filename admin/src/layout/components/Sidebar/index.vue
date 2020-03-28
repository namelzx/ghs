<template>
  <div class="has-logo">
    <logo :collapse="false"/>

    <div class="bartar">
      <div class="broadside">
        <div :class="['br—item',tar_num===index?'br-active':'']" v-for="(item,index) in tablist" :key="index"
             @click="totimes(index)">
          <div class="item-img"><i class="el-icon-delete"></i></div>
          <div class="item-name">{{item.title}}</div>
        </div>
      </div>
      <div class="brlist" v-for="(item,index) in tablist" :key="index" v-if="index===tar_num">
       <div  v-for="(list,index) in item.list"
             :key="index">
        <div v-if="list.children" :class="['brlist-name',tar_num_list===index?'brlist-active':'',list.children]"
            >
          <a   v-show="!list.hidden">
            {{list.name}}
          </a>

        </div>

         <div v-else>
           <div  v-if="!list.hidden" :class="['brlist-name',tar_num_list===index?'brlist-active':'',list.children]">
             <a  @click="tobarlist(index)" :href="list.url"  v-show="!list.hidden">
               {{list.name}}

             </a>
         </div>


         </div>

        <div v-if="list.children" style="margin-left: 30"
            v-for="(clist,cindex) in list.children"
             :class="['brlist-name',tar_num_list_c===cindex+'-'+list.url?'brlist-active':'',]"
             :key="index" class="child">

          <a @click="tobarlistc(cindex,list.url)" :href="list.url+'/'+clist.path" v-show="!clist.hidden">
            <!--{{clist.name}}-->
            {{clist.meta.title}}

          </a>
        </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    components: { SidebarItem, Logo },
    data() {
      return {
        tar_num: 0,
        tar_num_list: 0,
        tar_num_list_c:undefined,//
        tablist: []
      }
    },
    created() {
      var that = this
      let arr = []
      for (let i = 0; i < this.muenroles.length; i++) {
        // arr[i].title=this.muenroles[i].meta
        let temp = {
          title: '',
          icon: '',
          list: []
        }
        if (this.muenroles[i].meta !== undefined) {
          if (this.muenroles[i].meta.title !== undefined) {
            temp.title = this.muenroles[i].meta.title
            if (this.muenroles[i].children !== undefined) {
              for (let k = 0; k < this.muenroles[i].children.length; k++) {

                if (this.muenroles[i].children[k].children) {

                  temp.list.push({
                    name: this.muenroles[i].children[k].meta.title,
                    hidden: this.muenroles[i].children[k].hidden,
                    url: '#' + this.muenroles[i].path + '/' + this.muenroles[i].children[k].path,
                    children: this.muenroles[i].children[k].children
                  })
                } else {
                  temp.list.push({
                    name: this.muenroles[i].children[k].meta.title,
                    hidden: this.muenroles[i].children[k].hidden,
                    url: '#' + this.muenroles[i].path + '/' + this.muenroles[i].children[k].path
                  })
                }

              }
            }
          }
        }
        if (temp.title !== '') {
          arr.push(temp)
        }
      }
      this.tablist = arr
      for (let i = 0; i < arr.length; i++) {

        for (let k = 0; k < arr[i].list.length; k++) {
          if ('#/' + this.$route.name === arr[i].list[k].url) {
            that.tar_num_list = k
            that.tar_num = i
          }
        }
      }

    },
    methods: {
      totimes(index) {
        this.tar_num = index
        this.tar_num_list_c = undefined
        this.tar_num_list = undefined


      },
      tobarlist(index) {
        this.tar_num_list = index
        this.tar_num_list_c = undefined

      },
      tobarlistc(cindex,url) {

        this.tar_num_list_c = cindex+'-'+url
        this.tar_num_list = undefined

      }
    },
    watch: {
      $route(to, from) {

        for (let i = 0; i < this.tablist.length; i++) {
          for (let k = 0; k < this.tablist[i].list.length; k++) {
            if ('#' + to.path === this.tablist[i].list[k].url) {
              this.tar_num_list = k
              return
            }
          }
        }

      }
    },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar',
        'muenroles'
      ]),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" >
  .bartar {
    overflow-y: auto;
    display: flex;
    height: 100%;
    background: #304156;
    padding-bottom: 100px;
  }

  .broadside {
    width: 100px;
    overflow-y: auto;

    border-right: 1px solid #999999;
  }

  .broadside::-webkit-scrollbar {
    display: none;
  }

  .broadside .br—item {
    height: 85px;
    overflow: hidden;
    color: #999999;
  }

  .broadside .br-active {
    color: #ffffff;
    position: relative;
  }

  .broadside .br-active::before {
    content: '';
    width: 2px;
    height: 12px;
    position: absolute;
    top: 36px;
    right: 5px;
    background: #009CFF;
    cursor: pointer;
  }

  .br—item .item-img {
    text-align: center;

    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 10px;

  }

  .br—item .item-name {
    font-size: 7px;
    font-weight: bold;
    text-align: center;
  }

  .brlist .brlist-name {
    width: 110px;
    height: 50px;
    line-height: 50px;
    color: #999999;
    font-size: 7px;
    font-weight: bold;
    margin-left: 30px;
    cursor: pointer;
  }

  .brlist .brlist-active {
    color: #ffffff;
    position: relative;
  }

  .brlist .brlist-active::before {
    content: '';
    width: 2px;
    height: 12px;
    position: absolute;
    top: 19px;
    left: -6px;
    background: #009CFF;
  }

  .brlist {

  .child {
    height: 30px !important;
    line-height: 30px !important;
    padding-left: 10px;

  }

  .child::before {
    content: '';
    width: 2px;
    height: 12px;
    position: absolute;
    top: 9px !important;
    left: 3px;
    background: #009CFF;
  }

  }

</style>
