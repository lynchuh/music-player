{
  let view={
    el:'#app',
    template:`
      <audio src={{url}}></audio>
    `,
    render(){
      
    },
    find(selector){
      return $(this.el).find(selector)[0]
    },
    uploadMusic(data){
      let audio=this.find('audio')
      audio.src=data.url
    },
    play(){
      let audio=this.find('audio')
      audio.play()
    },
    pause(){
      let audio=this.find('audio')
      audio.pause()
    }
  }
  let model={
    data:{
      id:'',
      name:'',
      singer:'',
      url:''
    },
    fetch(){
      var query = new AV.Query('Song')
      return query.get(this.data.id).then((song) => {
        Object.assign(this.data,song.attributes)
        return song
      })
    },
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.getSongId()
      this.model.fetch().then((data)=>{
        this.view.uploadMusic(this.model.data)
      })
      this.bindEvent()
    },
    bindEvent(){
      let playBtn=this.view.find('.play')
      let pauseBtn=this.view.find('.pause')
      $(playBtn).on('click',(e)=>{
        this.view.play()
      })
      $(pauseBtn).on('click',(e)=>{
        this.view.pause()

      })
    },
    getSongId(){
      let search = window.location.search
      if(search.indexOf('?')===0){
        search=search.substring(1)
      }
      let array=search.split('&').filter((v=>v))
      let id = ''
      for(let i=0;i<array.length;i++){
        let kv=array[i].split('=')
        let key= kv[0]
        let value= kv[1]
        if(key==='id'){
          id=value
          break
        }
      }
      this.model.data.id=id 
    },
    


  }
  controller.init(view,model)
}