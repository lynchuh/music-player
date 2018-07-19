{
  let view={
    el:'#tabs',
    init(){
      this.$el=$(this.el)
    },
    activeItem($selector){
      $selector.siblings('.active').removeClass('active').end()
        .addClass('active')
    }

  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.init()
      this.bindEvent()
    },
    bindEvent(){
      this.view.$el.on('click','.tabs-nav>li',(e)=>{
        let $li= $(e.currentTarget)
        this.view.activeItem($li)
      })
    }
  }
  controller.init(view,model)
}