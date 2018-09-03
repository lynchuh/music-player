## 我的云播放器
> 歌曲及歌单的数据存储使用七牛和leancloud两个数据库进行部署。
本项目包含了管理端上传页面，但由于个人账号隐私问题，暂时无法提供token实现上传功能。
### preview
[项目在线演示地址](https://lynchuh.github.io/projectPreview/music-player/)

<img src="./previewImg/admin.png" width="500px"/>

<img src="./previewImg/index.jpg" width="250px"/><img src="./previewImg/songlist.jpg" width="250px"/>

<img src="./previewImg/songPlaying.jpg" width="250px"/><img src="./previewImg/songPlaying.gif" width="250px"/>

### 项目运行
```
git clone https://github.com/lynchuh/music-player.git
cd music-player
npm install
npm i -g http-server 
http-server -c-1
open http://localhost:8080/src
```
### 功能实现
- 歌单列表关联
- 在线最新歌曲
- 播放页面封面旋转显示
- 歌词滚动显示
- 歌曲进度条显示
- 循环播放控制

### 涉及技术点
- 原生js（ES6）&jQuery :DOM的操作使用jQuery，比原生的API好用太多，而ES6的一些新语法实在是太方便开发者了，像普通的浅拷贝一个对象，一个简单的解构赋值可以替代ES5的几行代码
- MVC架构：使用MVC架构思想是为了让代码看起来更直观，也更容易维护。而且这次的代码按功能模块化了，模块化的一个好处应该就是各个功能之间的业务逻辑更清晰也更专注吧。最近一直尝试使用这种架构思想来实现，其实也是为了之后理解React、Vue这些框架做一些充分准备吧。
- EventHub 发布/订阅事件：这个事件管理其实只在管理端使用，主要原因是管理端各个模块间数据的相互依赖太强了，使用EventHub来发布/订阅事件来促使各个模块间的运作。
- canvas绘图：看了网上很多人实现播放条进度都是直接用div，然后计算currentTime和总时长的百分比来动态改变div：：after的长度，然后正好之前也用过canvas做一个简单的画板，对canvas有些了解，于是尝试着用canvas来做一个圆圆的进度条，在UI上也更好看（其实实现原理跟上面的一样）
- CSS 3 动画：没什么好说的，CSS 3 动画就是好用
- audio媒体事件：做一个播放器，肯定需要用到audio的API啦。

### 数据处理
 ——
