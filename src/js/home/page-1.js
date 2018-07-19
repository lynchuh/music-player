{
  let view={
    el:'#site-recommend',
    init(){
      this.$el=$(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    },
  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.init()
      console.log(this.view.$el)
      this.bindEvent()
      this.bindEventHub()
    },
    bindEvent(){},
    bindEventHub(){
      window.eventHub.on('selectTab',(tabName)=>{
        if(tabName==='page-1'){
          console.log('我要运行')
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }
  controller.init(view,model)
}