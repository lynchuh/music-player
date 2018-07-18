{
  let view = {
    el: '#songList',
    template: `<h1>新建歌单</h1>
      <ul class="songList">
      </ul>
    `,
    render(data) {
      let $el = $(this.el)
      $el.html(this.template)
      let songs = data.songs
      let liList = songs.map((song) => $('<li></li>').text(song.name).attr('data-song-id',song.id))
      $el.find('ul.songList').empty()
      liList.map((domLi) => {
        $el.find('ul').append(domLi)
      })

    },
    reset() {
      this.render(this.model.data)
    },
    activeItem(selector) {
      let $el = $(this.el)
      $el.find('.active').removeClass('active')
      $el.find(selector).addClass('active')
    }
  }
  let model = {
    data: {
      songs: []
    },
    find() {
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
        this.data.songs=songs.map((song)=>{
          return {id:song.id,...song.attributes}
        })
        return songs
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.model.find()
      this.view.render(this.model.data)
      window.eventHub.on('upload', (data) => {
        this.view.activeItem('h1')
      })
      window.eventHub.on('create', (data) => {
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
      this.getAllsongs()
      this.bindEvent()
    },
    getAllsongs(){
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEvent(){
      $(this.view.el).on('click','li',(e)=>{
        let $li=$(e.currentTarget)
        this.view.activeItem($li)
        console.log($li)
        let songId=$li[0].getAttribute('data-song-id')
        console.log(songId)
      })
      $(this.view.el).on('click','h1',(e)=>{
        let $create=$(e.currentTarget)
        this.view.activeItem($create)
      })
    }
  }
  controller.init(view, model)
}