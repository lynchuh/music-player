{
  let view={
    el:'#songForm',
    template:`
    <h1>新建歌曲</h1>
    <form action="">
      <div class="row">
        <label for="">歌名
          <input type="text">
        </label>
      </div>
      <div class="row">
        <label for="">歌手
          <input type="text">
        </label>
      </div>
      <div class="row">
        <label for="">外链
          <input type="text">
        </label>
      </div>
      <div class="row">
        <button type="submit">保存</button>
      </div>
    </form>
    `,
    render(){
      $(this.el).html(this.template)
    }
  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.render()
      window.eventHub.on('upload',(data)=>{
        console.log(data)
      })
    }
  }
  controller.init(view,model)
}