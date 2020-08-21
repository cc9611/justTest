// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件，子组件给父组件传参
    handleItemTap(e){
      // 获取索引
      const {index} = e.currentTarget.dataset;
      // 点击触发父元素时间
      this.triggerEvent('tabsItemChange',{index});
    }

  }
})