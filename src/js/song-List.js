{
  let view = {
    el: '#songList',
    template: `<h1>新建歌单</h1>
      <ul class="songList">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    `,
    render(data={}){
      $(this.el).html(this.template)
    }
  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.render(this.model.data)

    },

  }
  controller.init(view,model)
}