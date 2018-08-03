{
  let view = {
    el: '#app',
    template: `
      <audio src={{url}}></audio>
    `,
    init() {
      this.audio = $(this.el).find('audio')[0]
      this.$el = $(this.el)
      this.canvas = $(this.el).find('#canvas')[0]
    },

    uploadMusic(data) {
      this.audio.src = data.url
      this.$el.find('.cover')[0].src = data.cover ? data.cover : './img/song-list/list-1.jpg'
      this.$el.find('.song-description h1').text(data.name)
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
    toggleLoopStatus(status) {
      if (status) {
        this.$el.find('.loopControl').addClass('active')
      } else {
        this.$el.find('.loopControl').removeClass('active')
      }
    },
    drawProgressCircle(canvas, percentage) {
      let radius = Math.floor($(window).width() * 44.5 / 100) * 0.5
      let translate = $(window).width() / 2
      let context = canvas.getContext('2d')
      canvas.setAttribute('width', `${$(window).width()}px`)
      canvas.setAttribute('height', `${$(window).width() * 0.75}px`)
      context.translate(translate, translate * 0.75)
      context.beginPath()
      context.arc(0, 0, radius, 0, Math.PI * 2, false)
      context.lineWidth = 10
      context.strokeStyle = "rgba(0,0,0,0.1)"
      context.stroke()
      context.beginPath()
      context.arc(0, 0, radius, Math.PI * 3 / 2, (Math.PI * 3 / 2 + Math.PI * 2 / 180 + percentage * Math.PI * 2), false)
      context.lineWidth = 10
      context.strokeStyle = "rgba(70,70,70,0.5)"
      context.stroke()
    },
    parseLyric(lyrics) {
      lyrics.split('\n').map((lyric) => {
        let Reg = /\[([\d:.]+)\](.+)/
        let matches = lyric.match(Reg)
        if (matches) {
          let timepart = matches[1].split(':')
          let minutes = timepart[0],
            seconds = timepart[1]
          let newTime = parseInt(minutes, 10) * 60 + parseFloat(seconds, 10)
          $('<p></p>').text(matches[2])
            .attr('data-time', newTime)
            .appendTo('.lyric>.lines')
        } else {
          $('<p></p>').text(lyric).appendTo('.lyric>.lines')
        }
      })
    },
    showLyric(time){
      let lyrics = this.$el.find('.lyric .lines p')
      let currentlyric
      for (let i=0;i<lyrics.length;i++){
        if(i===lyrics.length-1){
          currentlyric=lyrics[i]
          break
        }else{
          let currentTime=lyrics.eq(i).attr('data-time'),
              nextTime=lyrics.eq(i+1).attr('data-time')
          if(time>=currentTime && time < nextTime){
            currentlyric=lyrics[i]
            break
          }
        }
      }
      let currentLyricHeight=currentlyric.getBoundingClientRect().top
      let linesHeight = this.$el.find('.lyric>.lines')[0].getBoundingClientRect().top
      let height = currentLyricHeight - linesHeight
      height >= 80 && this.$el.find('.lyric>.lines').css({
        transform: `translateY(${- (height - 60)}px)`
      })
      $(currentlyric).addClass('active').siblings('.active').removeClass('active')
    }
  }
  let model = {
    data: {
      song: {
        id: '',
        name: '',
        singer: '',
        url: '',
        lyric: '',
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
        this.view.uploadMusic(this.model.data.song)//加载歌曲信息
        this.view.drawProgressCircle(this.view.canvas)//进度条
        this.view.parseLyric(this.model.data.song.lyric)//歌词解析渲染
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
      this.view.$el.on('click', '.icon-wrapper', (e) => { //play/pause Btn
        this.model.data.status = !this.model.data.status
        this.view.togglePlayStatus(this.model.data.status)
      })
      this.view.$el.on('click', '.loopControl', (e) => { // loop Btn
        this.view.audio.loop = !this.view.audio.loop
        this.view.toggleLoopStatus(this.view.audio.loop)
      })
      this.view.audio.addEventListener('ended', () => { //歌曲结束状态
        this.model.data.status = false
        this.view.$el.find('.disc-container').removeClass('active')
        this.view.drawProgressCircle(this.view.canvas)
      })
      this.view.audio.addEventListener('timeupdate', () => { //歌曲播放时状态
        let percentage = this.view.audio.currentTime / this.view.audio.duration
        this.view.drawProgressCircle(this.view.canvas, percentage)
        this.view.showLyric(this.view.audio.currentTime)
      })
    },
    





  }
  controller.init(view, model)
}
