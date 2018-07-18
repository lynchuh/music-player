{
  let view = {
    el: '#songForm',
    template: `
    
    <form action="">
      <div class="row">
        <label for="">歌名
          <input name="name" type="text" value="__name__">
        </label>
      </div>
      <div class="row">
        <label for="">歌手
          <input name="singer" type="text" value="__singer__">
        </label>
      </div>
      <div class="row">
        <label for="">外链
          <input name="url" type="text" value="__url__">
        </label>
      </div>
      <div class="row">
        <button type="submit">保存</button>
      </div>
    </form>
    `,
    // 务必搞懂↓
    render(data = {}) { //data={} 给参数一个默认值，默认值为{}
      let placeholders = ['name', 'url', 'singer']
      let html = this.template
      placeholders.map((string) => {
        html = html.replace(`__${string}__`, data[string] || '')
      })
      $(this.el).html(html)
      if (data.id) {
        $(this.el).prepend('<h1>编辑歌曲</h1>')
      } else {
        $(this.el).prepend('<h1>新建歌曲</h1>')
      }
    },
    reset() {
      this.render({})
    }
    //务必搞懂↑
  }
  let model = {
    data: {
      name: '',
      singer: '',
      url: '',
      id: ''
    },
    create(data) { //将form上的信息保存到leancloud，会生成一个id
      var Song = AV.Object.extend('Song');
      var songs = new Song();
      songs.set('name', data.name);
      songs.set('singer', data.singer);
      songs.set('url', data.url);
      return songs.save().then((newSong) => {
        let {
          id,
          attributes
        } = newSong
        this.data = {
          id,
          ...attributes
        } //ES6新语法
        //错误用法 这样data的内存地址一直没变，变的是内容。
        // Object.assign(this.data,{id,...attributes})
      }, (error) => {
        console.error(error.message);
      });
    },
    update(data) { //将form上的信息更新到leancloud，id不变
      var song = AV.Object.createWithoutData('Song', this.data.id);
      song.set('name', data.name)
      song.set('singer', data.singer)
      song.set('url', data.url)
      return song.save()
        .then(() => {
          Object.assign(this.data, data)
        })

    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEvent()
      window.eventHub.on('upload', (data) => {
        if (this.model.data.id) {
          this.model.data = {
            id: '',
            name: '',
            singer: '',
            url: ''
          }
        } else {
          Object.assign(this.model.data, data)
        }
        this.view.render(this.model.data)
      })
      window.eventHub.on('selectLi', (data) => {
        this.model.data = data
        this.view.render(this.model.data)
      })
      window.eventHub.on('selectCreate', (data) => {
        console.log(data)
        this.model.data = data
        this.view.render(this.model.data)
      })
    },
    bindEvent() {
      $(this.view.el).on('submit', 'form', (e) => {
        e.preventDefault()
        let need = 'name singer url'.split(' ') //得到一个数组
        let data = []
        need.map((string) => {
          data[string] =
            $(this.view.el).find(`input[name="${string}"]`).val()
        })
        if (this.model.data.id) { //id存在，即是要更新信息
          this.model.update(data).then(() => {
            //更新数据到数据库之后要做的事
            console.log(data)
            window.eventHub.emit('update', this.model.data)
          })
        } else {//id 不存在，即是要增加信息
          this.model.create(data)
            .then(() => {
              this.view.reset()
              window.eventHub.emit('create', this.model.data)
            })
        }
      })
    }
  }
  controller.init(view, model)
}
