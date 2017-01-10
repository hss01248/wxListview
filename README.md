# wxListview
微信小程序里的listview,内置了上拉刷新下拉加载更多的功能,以及页面状态显示



适用于页面内有一个可上拉刷新下拉加载的list的情况



# 使用

1.拷贝lib文件夹到根目录

2.拷贝utils中的lvUtil和netUtil到你的utils文件夹

3.根据你的网络请求的字段特点修改netUtil和app.js中的相应字段.



4.页面的js引入:

```
var lvUtil=require("../../utils/lvUtil.js");
```

只需要在页面的onLoad方法中调用方法:lvUtil.initLv.

其他下拉刷新,上拉加载更多的方法都无需书写,在此方法内部已经实现.

```
 lvUtil.initLv(that,"lesson/search/v1.json",
        function(params){
          params.type = 2;
          params.sourceType = 0;
          params.labelId = 0;
          params.priceType = 2;
          params.categoryIds = "";
        },
        function (netData){

          return netData;
        },
        function(item){
         // utils.showAlbumItemPriceText(item);
        }
    )
```

5.wxml中:

```
  <!--至少要绑定onLoadMore方法,因为原生onReachBottom方法经常不起作用-->
 <scroll-view  wx:if="{{!netStateBean.contentHidden}}"  scroll-y="true" style="height:1300rpx;position:relative; z-index:999;" lower-threshold="50" bindscrolltolower="onLoadMore" bindscrolltoupper="onRefesh" >
   
    <!--列表数据list, 字段必须使用infos-->
      <block wx:for="{{infos}}" wx:for-item="item" wx:for-index="index" wx:key="unique">
        <!--todo 这里写页面的具体内容 ,上方style也需自定义-->

        <navigator url="/pages/lession/detail?id={{item.id}}&title={{item.title}}" hover-class="" >
          
          <!--分隔线,可有可无-->
          <!--<view wx:if="{{infos.length-1 > index}}" class="lession-split-line"/>-->
        </navigator>

      </block>

<!--加载更多的状态显示,这里指定条目少于8条时不显示-->
    <view class="loadmore_view" wx:if="{{!netStateBean.loadmoreHidden && infos.length>8 }}" >
      {{netStateBean.loadmoreMsg}}
    </view>
  </scroll-view>


<!--页面状态,引用模板-->
<import src="../../lib/pageManager/pageManager.wxml"/>
<view class="pageStateWrapper" wx:if="{{netStateBean.contentHidden}}">
  <template is="pagestate" data="{{...netStateBean}}"/>
</view>
```

6.wxss中:

```
@import "../../lib/pageManager/pageManager.wxss";
```