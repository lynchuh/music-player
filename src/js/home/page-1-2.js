console.log('我是module2')
{
  let view={
    el:'section.songs',
    init(){
      this.$el=$(this.el)
    }
  }
  let model={
    data:{
      songs:[]
    },
    fetch(){
      var query = new AV.Query('Song')
      return query.find().then((songs)=>{
        this.data.songs=songs.map((song)=>{
          return {id:song.id,...song.attributes}
        })
        return songs
      })
    }
  }
  let controller={
    init(view,model){
      this.view=view
      this.view.init()
      this.model=model
      this.model.fetch().then(()=>{
        console.log(this.model.data)
      })
    },
    bindEvent(){}
  }
  controller.init(view,model)
}