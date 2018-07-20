console.log('我是module2')
{
  let view={
    el:'section.songs',
    init(){
      this.$el=$(this.el)
    }
  }
  let model={
    data:{}
  }
  let controller={
    init(view,model){
      this.view=view
      this.view.init()
      this.model=model
    },
    bindEvent(){}
  }
  controller.init(view,model)
}