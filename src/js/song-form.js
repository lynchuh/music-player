{
  let view = {
    el: '#songForm',
    template: `
    <h1>新建歌曲</h1>
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
        this.data={id,...attributes}//ES6新语法
        console.log(this.data)
      }, (error) => {
        console.error(error.message);
      });
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEvent()
      window.eventHub.on('upload', (data) => {
        this.view.render(data)
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
        this.model.create(data)
          .then(() => {
            this.view.reset()
            window.eventHub.emit('creat', this.model.data)
          })

      })
    }
  }
  controller.init(view, model)
}