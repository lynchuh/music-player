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
      this.bindEventHub()
      this.loadModule('./js/home/page-1-1.js')
      this.loadModule('./js/home/page-1-2.js')
    },
    bindEventHub(){
      window.eventHub.on('selectTab',(tabName)=>{
        if(tabName==='page-1'){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    },
    loadModule(src){
      let script=document.createElement('script')
      script.src=src
      script.onload=()=>{
        console.log('Module加载完毕')
      }
      document.body.appendChild(script)
    }
  }
  controller.init(view,model)
}