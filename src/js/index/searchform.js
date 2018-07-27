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
        let formdata= JSON.stringify( $('#myForm').serializeArray())
        let value
        $('#myForm').serializeArray().map((data)=>{
          value=data.value
        })
        console.log('form表单提交的数据')
        console.log(formdata)
        console.log('您要搜索的内容是：')
        console.log(value)
      })
    },
    bindEventHub(){},


  }
  controller.init(view, model)
}