console.log('我是module1')
{
  let view={
    el:'',
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
      this.model=model
    },
    bindEvent(){}
  }
  controller.init(view,model)
}