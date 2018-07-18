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
      let liList = songs.map((song) => $('<li></li>').text(song.name))
      $el.find('ul.songList').empty()
      liList.map((domLi) => {
        $el.find('ul').append(domLi)
      })
      r
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
      window.eventHub.on('creat', (data) => {
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
      this.getAllsongs()
    },
    getAllsongs(){
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
  }
  controller.init(view, model)
}