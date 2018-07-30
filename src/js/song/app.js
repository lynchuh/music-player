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
    togglePlayStatus(status) {
      if (status) {
        this.$el.find('.disc-container').addClass('active')
        this.audio.play()
      } else {
        this.$el.find('.disc-container').removeClass('active')
        this.audio.pause()
      }
    },
    toggleLoopStatus(status){
      if(status){
        this.$el.find('.loopControl').addClass('active')
      }else{
        this.$el.find('.loopControl').removeClass('active')
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
      audio:undefined,
      loopStatus:false,
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
    bindEvent() {
      let timeId
      this.view.$el.on('click', '.icon-wrapper', (e) => {
        e.preventDefault()
        this.model.data.status = !this.model.data.status
        this.view.togglePlayStatus(this.model.data.status)
      })
      this.view.$el.on('click','.loopControl',(e)=>{
        this.model.data.loopStatus =!this.model.data.loopStatus
        this.view.toggleLoopStatus(this.model.data.loopStatus)
      })




      this.view.audio.addEventListener('ended', () => {
        this.model.data.status = false
        this.view.$el.find('.disc-container').removeClass('active')
        console.log('歌曲播放完了')
        window.clearInterval(timeId)
      })
      this.view.audio.addEventListener('play', () => {
        let total = this.view.audio.duration
        this.view.$el.find('progress')[0].max=total
        
        timeId = window.setInterval((e) => {
          this.model.currentTime = this.view.audio.currentTime
          let total = this.view.audio.duration
          this.view.$el.find('progress')[0].value=this.model.currentTime
        }, 500)
      })
      this.view.audio.addEventListener('pause', () => {
        window.clearInterval(timeId)
      })




      this.view.$el.on('click','.loopControl',(e)=>{
        this.view.audio.loop=!this.view.audio.loop
        this.view.toggleLoopStatus(this.view.audio.loop)
      })
      voiceControl.addEventListener('change',(e)=>{
        this.view.audio.volume=voiceControl.value/100
      })
    },

  }
  controller.init(view, model)
}