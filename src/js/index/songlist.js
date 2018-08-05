{
  let view = {
    el: 'section#songList',
    init() {
      this.$el = $(this.el)
    },
    template:` <li data-id="__id__">
    <img src="__cover__" >
      <div class="title"><span>__title__</span></div>
  </li>`,
    render(data){
      let { playlists }=data
      let Playlists=playlists.map((playlist)=>{
        return li=this.template
        .replace('__id__',playlist.id)
        .replace('__cover__',playlist.cover)
        .replace('__title__',playlist.title)
      })
      this.$el.find('ol.songList').append(Playlists)
    }

  }
  let model = {
    data: {
      playlists: []
    },
    fetch() {
      var query = new AV.Query('Playlist')
      return query.find().then((playlists)=>{
        this.data.playlists=playlists.map((playlist)=>{
          return {id:playlist.id,...playlist.attributes}
        })
        return playlists

      })
    },
    query() {}
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.model.fetch().then(()=>{
        this.view.render(this.model.data)
      })
      this.bindEvent()
      this.bindEventHub()
    },
    bindEvent() {
      this.view.$el.on('click','ol.songList li',(e)=>{
        let id= $(e.currentTarget).attr('data-id')
        window.location = `./playlist.html?id=${id}`;
      })
    },
    bindEventHub() {},


  }
  controller.init(view, model)
}
