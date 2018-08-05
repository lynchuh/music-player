// var Playlist = AV.Object.extend('Playlist');
// var playlist = new Playlist()
// playlist.set('cover','http://pbkpe4nsx.bkt.clouddn.com/109951163414353171.jpg')
// playlist.set('descript',` ——————————————
// 今天的城市很闷
// 只是突然很想
// 那条沿海公路
// 海风、林荫、砂砾还有……
// 你。
// ————————————————
// 封面：电影《溺水小刀》菅田将晖&小松菜奈。`)
// playlist.set('title','城市季候 | 跟我逃离或是大梦一场')
// playlist.save()
// var huayu = AV.Object.createWithoutData('Playlist', '5b668a5d808ca4003c7bf8a9');
// var chengshi = AV.Object.createWithoutData('Playlist', '5b668bfffe88c2005adb61fe');
// var nuli = AV.Object.createWithoutData('Playlist', '5b668b6e17d009003587745a');


// var river = AV.Object.createWithoutData('Song', '5b6695d267f35600357c306a');
// var TheGoodSide = AV.Object.createWithoutData('Song', '5b6305710b616000316ba434');
// var youth = AV.Object.createWithoutData('Song', '5b669b3ad50eee0031110d4c');
// var e = AV.Object.createWithoutData('Song', '5b669aa417d009003587f541');
// var a = AV.Object.createWithoutData('Song', '5b6697b3ee920a003be92936');
// var c = AV.Object.createWithoutData('Song', '5b6697249f54540035c91414');


// river.set('dependent',chengshi)
// river.save()
// TheGoodSide.set('dependent',chengshi)
// TheGoodSide.save()
// youth.set('dependent',nuli)
// youth.save()
// e.set('dependent',nuli)
// e.save()
// a.set('dependent',nuli)
// a.save()
// c.set('dependent',nuli)
// c.save()
// lixiang.set('dependent',nuli)
// lixiang.save()


// yiran.set('dependent', 'huayu')
// yiran.save()
// yiran.set('dependent', 'huayu')
// yiran.save()
var Songs=[]
var query = new AV.Query('Song')
console.log(query)
query.descending('createdAt')
query.find().then((songs) => {
  Songs= songs.map((song) => {
    return {
      id: song.id,...song.attributes
    }
  })
  console.log(Songs)
})
