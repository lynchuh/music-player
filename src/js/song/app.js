{
  let view = {
    el: '#app',
    template: `
      <audio src={{url}}></audio>
    `,
    init() {
      this.audio=$(this.el).find('audio')[0]
      this.$el=$(this.el)
    },

    uploadMusic(data) {
      this.audio.src = data.url
    },
    toggleStatus(status) {
      if (status) {
        this.$el.find('.disc-container').addClass('active')
        this.audio.play()
      } else {
        this.$el.find('.disc-container').removeClass('active')
        this.audio.pause()
      }
    }
  }
  let model = {
    data: {
      song: {
        id: '',
        name: '',
        singer: '',
        url: ''
      },
      status: false,
    },
    fetch() {
      var query = new AV.Query('Song')
      return query.get(this.data.id).then((song) => {
        Object.assign(this.data.song, song.attributes)
        return song
      })
    },
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.getSongId()
      this.model.fetch().then((data) => {
        this.view.uploadMusic(this.model.data.song)
        console.dir(this.view.audio)
      })
      this.bindEvent()
    },
    bindEvent() {
      $(this.view.el).on('click', '.icon-wrapper', (e) => {
        e.preventDefault()
        this.model.data.status = !this.model.data.status
        this.view.toggleStatus(this.model.data.status)
      })
      this.view.audio.addEventListener('ended',()=>{
        this.model.data.status=true
        this.view.$el.find('.disc-container').addClass('active')
        console.log('歌曲播放完了')
      })
    },
    getSongId() {
      let search = window.location.search
      if (search.indexOf('?') === 0) {
        search = search.substring(1)
      }
      let array = search.split('&').filter((v => v))
      let id = ''
      for (let i = 0; i < array.length; i++) {
        let kv = array[i].split('=')
        let key = kv[0]
        let value = kv[1]
        if (key === 'id') {
          id = value
          break
        }
      }
      this.model.data.id = id
    },
  }
  controller.init(view, model)
}

