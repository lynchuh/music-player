{
  let view = {
    el: '#app',
    template: `
      <audio src={{url}}></audio>
    `,
    init() {
      this.audio = $(this.el).find('audio')[0]
      this.$el = $(this.el)
    },

    uploadMusic(data) {
      this.audio.src = data.url
      this.$el.find('.cover')[0].src = data.cover
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
      currentTime: undefined,
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
      })
      this.bindEvent()
    },
    bindEvent() {
      let timeId 
      $(this.view.el).on('click', '.icon-wrapper', (e) => {
        e.preventDefault()
        this.model.data.status = !this.model.data.status
        this.view.toggleStatus(this.model.data.status)
      })
      this.view.audio.addEventListener('ended', () => {
        this.model.data.status = false
        this.view.$el.find('.disc-container').removeClass('active')
        console.log('歌曲播放完了')
        window.clearInterval(timeId)
      })
      this.view.audio.addEventListener('play', () => {
          timeId = window.setInterval((e) => {
          this.model.currentTime = this.view.audio.currentTime
          console.log(this.model.currentTime)
        }, 1000)
        // console.log(this.view.audio.duration)
      })
      this.view.audio.addEventListener('pause', () => {
        window.clearInterval(timeId)
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