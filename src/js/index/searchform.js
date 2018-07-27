{
  let view = {
    el: 'section.topBar',
    init() {
      this.$el = $(this.el)
    },
    active(){
      this.$el.addClass('active')
    },
    deactive(){
      this.$el.removeClass('active')

    }
  }
  let model = {
    data: {
      songs: []
    },
    fetch() {

    },
    query() {}
  }                    
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.bindEvent()
      this.bindEventHub()

    },
    bindEvent(){
      this.view.$el.find('.searchMusic').on('click',(e)=>{
        e.stopPropagation()
        this.view.active()
      })
      $(document).on('click',()=>{
        this.view.deactive()
      })
      this.view.$el.find('#myForm').on('submit',(e)=>{
        e.preventDefault()
        var v= JSON.stringify( $('#myForm').serializeArray())
        console.log('1')
        axios({
          method: 'GET',
          url: '/src/search.html',
          data: v
        });
        console.log('2')
      })
    },
    bindEventHub(){},


  }
  controller.init(view, model)
}