var netUtil=require("../utils/netUtil.js");

var actions = netUtil.action;



/*
{
 getListFromNetData:function(netData){
 return netData;
 },
 handleItemInfo:function(item){

 }
 }
 */
/**
 * data里的数据结构:tabDatas:[],里面都是bean
 * @param page
 * @param urlTail
 * @param params
 * @param tabIndex  这个listview属于哪个tab,一旦确定,不会更改
 * @param emptyMsg
 * @param setNetparams
 *  setNetparams: function (params) {
        params.userId =getApp().globalData.uid;
    },

 // 如果list数据是netData里一个字段,则更改此处
 getListFromNetData:function(netData){
        return netData;
    },

 // 数据的一些处理并刷新数据
 handldItemInfo:function(item){

        if(info.type==1){
            info.typeText='微课';
            info.classname='detail';
        }else  if(info.type==2){
            info.typeText='课单';
            info.classname='album';
        }

    },
 *
 */
function initLv(page,urlTail,setNetparams,getListFromNetData,handldItemInfo,emptyMsg,requestMethod){



    page.data.currentPageIndex = 1;
    page.data.currentAction = netUtil.action.request_none;
    page.data.urlTail = urlTail;

    page.data.netStateBean = new netUtil.netStateBean();
    if(requestMethod != undefined){
        page.data.requestMethod = requestMethod;
    }else {
        page.data.requestMethod = "POST";
    }



    if(emptyMsg != undefined && emptyMsg !=null && emptyMsg.length>0){
        page.data.netStateBean.emptyMsg = emptyMsg;
    }

    page.data.infos=[];

    page.onPullDownRefresh = function(){
        netUtil.requestSimpleList(page,1,netUtil.action.request_refresh);
    };

    page.onReachBottom = function(){
        netUtil.requestSimpleList(page,page.data.currentPageIndex +1,netUtil.action.request_loadmore);
    };

    page.onLoadMore = page.onReachBottom;
    page.onRetry = function(){
        netUtil.requestSimpleList(page,1,netUtil.action.request_refresh);
    };

    page.setNetparams = setNetparams;
    page.getListFromNetData = getListFromNetData;
    page.handldItemInfo = handldItemInfo;
    netUtil.requestSimpleList(page,1,netUtil.action.request_refresh);

}

module.exports = {
    initLv: initLv
}