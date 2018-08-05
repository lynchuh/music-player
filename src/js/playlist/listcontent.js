{
  let view = {
    el: 'header#listContent',
    init() {
      this.$el = $(this.el)
    },
    template: `
    <div class="backgroundWrapper">
    <div class="background"></div>
      <img src="{{cover}}" class="cover">
      <div class="titleWrapper"> <span class="title">{{title}}</span> <span class="author"> Lyn's Music</span> </div>
    </div>
    <div class="content">
      <span class="duce">简介：</span>
      <div class="descript"></div>
    </div>`,
    render(data) {
      document.title = data.title
      let description = data.descript.split('\n').map((descript)=>{
        return $('<span></span>').html(descript)
      })
      let html = this.template
        .replace('{{cover}}', data.cover)
        .replace('{{title}}', data.title)
        // .replace('{{descript}}', data.descript)
      this.$el.html(html)
      this.$el.find('.background').css({
        'background': `url(${data.cover}) center no-repeat`,
        'background-size':'cover'
      })
      this.$el.find('.descript').append(description)
  }
}
let model = {
  data: {
    listContent: {

    },
  },
  fetch(id) {
    let query = new AV.Query('Playlist')
    return query.get(id).then((listContent) => {
      this.data.listContent = { ...listContent.attributes
      }
      return listContent
    })
  }
}
let controller = {
  init(view, model) {
    this.view = view
    this.view.init()
    this.model = model
    this.getId()
    this.model.fetch(this.model.data.id).then(() => {
      this.view.render(this.model.data.listContent)
      // console.log(this.model.data.listContent.descript)
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
