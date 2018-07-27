{
  let view = {
    el: 'section.topbar',
    init() {
      this.$el = $(this.el)
    },

  }
  let model = {
    data: {
      songs: []
    },
    fetch() {
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
        this.data.songs=songs.map((song)=>{
          return {id:song.id,...song.attributes}
        })
        return songs
      })
    },
    query() {}
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.model.fetch()
      this.bindEvent()
      this.bindEventHub()
    },
    bindEvent() {},
    bindEventHub() {},


  }
  controller.init(view, model)
}