{
  let view = {
    el: 'section#songList',
    init() {
      this.$el = $(this.el)
    },
    template:` <li data-dependent="__dependent__">
    <img src="__cover__" >
      <div class="title"><span>__title__</span></div>
  </li>`,
    render(data){
      let { playlists }=data
      let Playlists=playlists.map((playlist)=>{
        return li=this.template
        .replace('__dependent__',playlist.dependent)
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
          return {dependent:playlist.id,...playlist.attributes}
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
    },
    bindEvent() {
      this.view.$el.on('click','ol.songList li',(e)=>{
        let dependent= $(e.currentTarget).attr('data-dependent')
        window.location = `./playlist.html?dependent=${dependent}`;
      })

    },


  }
  controller.init(view, model)
}
