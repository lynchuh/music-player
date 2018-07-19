{
  let view = {
    el: '#uploadSong',
    findItem(selector) {
      return $(this.el).find(selector)[0]
    }

  }
  let model = {
    data: {

    }

  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.findItem('#uploadBtn')
      this.initQiniu()
    },
    initQiniu() {
      let uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: this.view.findItem('#uploadBtn'),
        uptoken_url: 'http://localhost:8888/uptoken',
        domain: 'http://pbkpe4nsx.bkt.clouddn.com/',
        get_new_uptoken: false,
        container: $(this.view.el)[0],
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        max_retries: 3,
        dragdrop: true,
        drop_element: $(this.view.el)[0],
        chunk_size: '4mb',
        auto_start: true,
        init: {
          'FilesAdded':(up, files)=>{
            plupload.each(files,(file)=>{
              // 文件添加进队列后,处理相关的事情
            });
          },
          'BeforeUpload':(up, file)=>{
            // 每个文件上传前,处理相关的事情
          },
          'UploadProgress':(up, file)=>{
            window.eventHub.emit('uploading')
          },
          'FileUploaded':(up, file, info)=>{
            let domain = up.getOption('domain');
            let response = JSON.parse(info.response);
            let sourceLink = domain + encodeURIComponent(response.key);
            window.eventHub.emit('uploaded', {
              response: response,
              name: response.key,
              url: sourceLink
            })
          },
          'Error':(up, err, errTip)=>{
            //上传出错时,处理相关的事情
          },
          'UploadComplete':()=>{
            //队列文件处理完毕后,处理相关的事情
          },

        }
      });
    }
  }
  controller.init(view, model)
}