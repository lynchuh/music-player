{
  let view={
    el:'#songForm',
    template:`
    <h1>新建歌曲</h1>
    <form action="">
      <div class="row">
        <label for="">歌名
          <input type="text" value="__name__">
        </label>
      </div>
      <div class="row">
        <label for="">歌手
          <input type="text" value="__singer__">
        </label>
      </div>
      <div class="row">
        <label for="">外链
          <input type="text" value="__url__">
        </label>
      </div>
      <div class="row">
        <button type="submit">保存</button>
      </div>
    </form>
    `,
    // 务必搞懂↓
    render(data={}){//data={} 给参数一个默认值，默认值为{}
      let placeholders=['name','url','singer']
      let html=this.template
      placeholders.map((string)=>{
        html=html.replace(`__${string}__`,data[string]||'')
      })
      $(this.el).html(html)
    },
    reset(){
      this.render({})
    }
    //务必搞懂↑
  }
  let model={
    data:{},
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.view.render(this.model.data)
      window.eventHub.on('upload',(data)=>{
        this.view.render(data)
      })
    }
  }
  controller.init(view,model)
}