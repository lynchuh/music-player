{
  let view = {
    el: '#app',
    template: `
      <audio src={{url}}></audio>
    `,
    render() {

    },
    find(selector) {
      return $(this.el).find(selector)[0]
    },
    uploadMusic(data) {
      let audio = this.find('audio')
      audio.src = data.url
    },
    toggleStatus(status) {
      let audio = this.find('audio')
      if (status) {
        $(this.find('.disc-container')).addClass('active')
        audio.play()
      } else {
        $(this.find('.disc-container')).removeClass('active')
        audio.pause()
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
      this.model = model
      this.getSongId()
      this.model.fetch().then((data) => {
        this.view.uploadMusic(this.model.data.song)
      })
      this.bindEvent()
    },
    bindEvent() {
      $(this.view.el).on('click', '.icon-wrapper', (e) => {
        e.preventDefault()
        this.model.data.status = !this.model.data.status
        console.log(this.model.data)
        this.view.toggleStatus(this.model.data.status)
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