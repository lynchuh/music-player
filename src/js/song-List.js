{
  let view = {
    el: '#songList',
    template: `<h1>新建歌单</h1>
      <ul class="songList">
      </ul>
    `,
    render(data){
      let $el=$(this.el)
      $el.html(this.template)
      console.log(data)
      let songs=data.songs
      let liList=songs.map((song)=>$('<li></li>').text(song.name))
      console.log(liList)
      $el.find('ul').empty()
      liList.map((domLi)=>{
        $el.find('ul').append(domLi)
      })
    },
    reset(){
      this.render(this.model.data)
    },
    activeItem(selector){
      let $el=$(this.el)
      $el.find('.active').removeClass('active')
      $el.find(selector).addClass('active')
    }
    
  }
  let model={
    data:{
      songs:[]
    }
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.render(this.model.data)
      window.eventHub.on('upload',(data)=>{
        this.view.activeItem('h1')
      })
      window.eventHub.on('creat',(data)=>{
        this.model.data.songs.push(data)
        this.view.render(this.model)
      })
    },
    

  }
  controller.init(view,model)
}