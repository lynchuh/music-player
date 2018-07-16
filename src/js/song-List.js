{
  let view = {
    el: '#songList',
    template: `<h1>新建歌单</h1>
      <ul class="songList">
      <li class="active">1</li>
      <li>2</li>
      </ul>
    `,
    render(data={}){
      $(this.el).html(this.template)
    },
    reset(){
      this.render(data)
    },
    activeItem(selector){
      let $el=$(this.el)
      $el.find('.active').removeClass('active')
      $el.find(selector).addClass('active')
    }
    
  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.render(this.model.data)
      window.eventHub.on('upload',(data)=>{
        this.view.activeItem('h1')
      })
    },
    

  }
  controller.init(view,model)
}