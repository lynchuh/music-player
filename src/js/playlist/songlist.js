{
  let view = {
    el: 'section#songList',
    init() {
      this.$el = $(this.el)
    },
    template: `<li>
        <img src="{{song.cover}}" class="cover">
        <div class="songDescript">
          <span class="name">{{song.name}}</span>
          <span class="singer">{{song.singer}}</span>
        </div>
        <a class="play" href="./song.html?id={{song.id}}">
          <img src="./img/play.png" alt="">
        </a>
      </li>`,
    render(data) {
      let {
        songs
      } = data
      let Song = songs.map((song) => {
        song.cover = song.cover ? song.cover : './img/song-list/list-1.jpg'
        return li = this.template
          .replace('{{song.cover}}', song.cover)
          .replace('{{song.name}}', song.name)
          .replace('{{song.singer}}', song.singer)
          .replace('{{song.id}}', song.id)

      })
      this.$el.find('ol.list').append(Song.slice(0, 8))
    }
  }
  let model = {
    data: {
      songs: []
    },
    fetch(id) {
      var playlist=AV.Object.createWithoutData('Playlist',id)
      var Songs = new AV.Query('Song')
      Songs.equalTo('dependent',playlist)
      Songs.descending('createdAt')
      return Songs.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {
            id: song.id,
            ...song.attributes
          }
        })
        return songs
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.getId()
      this.model.fetch(this.model.data.id).then(()=>{
        this.view.render(this.model.data)
      })
    },
    getId() {
      let search = window.location.search
      let word = search.split('=')
      this.model.data.id = word[1]
    }
  }
  controller.init(view, model)
}
