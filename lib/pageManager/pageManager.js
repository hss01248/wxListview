

function netStateBean(){
        this.emptyMsg='暂时没有内容,去别处逛逛吧',
        this.emptyHidden = true,

        this.errorHidden=true,
        this.errorMsg='',

        this.loadmoreMsg='加载中...',
        this.loadmoreHidden=true,
        this.contentHidden = true,

        this.hasSuccessed = false,
        this.hasMore = true

}


function init(page,emptyMsg,retryAction,isShowContentFirst){
    var bean = new netStateBean();
    if(emptyMsg != undefined && emptyMsg != ""){
        bean.emptyMsg = emptyMsg;
    }


    if(isShowContentFirst == true){
        bean.contentHidden = false;
    }else {
        showLoading();
    }

    page.data.netStateBean = bean;
    page.setData({
        netStateBean: bean
    });

    var retry ;
    if(retryAction == undefined) {
        if (page.onPullDownRefresh != undefined) {
            retry = page.onPullDownRefresh;
        }else if(page.onRefresh != undefined){
            retry = page.onRefresh;
        }
    }else {
        retry = retryAction;
    }
    page.onRetry = function(){
        if(retry != undefined){
            showLoading();
            retry();
        }

    }
}

function  loadMoreError(that,stateBean){
    var bean = stateBean;
    bean.loadmoreHidden = false;
    bean.loadmoreMsg= '加载出错,请上拉重试';
    that.setData({
        netStateBean: bean
    });

}

function loadMoreStart(that){

    var bean = that.data.netStateBean;
    bean.loadmoreHidden = false;
    bean.loadmoreMsg= '加载中...';
    that.setData({
        netStateBean: bean
    });

}

function loadMoreNoData(that){
    var bean = that.data.netStateBean;
    bean.loadmoreHidden = false;
    bean.loadmoreMsg= '没有了...';
    that.setData({
        netStateBean: bean
    });
}

function  hideLoadingDialog(that){
    wx.hideToast();

}

//以下三个方法是用于页面状态管理
function showEmptyPage(that){
    hideLoadingDialog(that);
    var bean = that.data.netStateBean;
    bean.emptyHidden = false;
    bean.loadingHidden = true;


    bean.contentHidden=true;
    bean.errorHidden = true;
    that.setData({
        netStateBean: bean
    });
}

function showErrorPage(that,msg){
    hideLoadingDialog(that);
    var bean = that.data.netStateBean;
    bean.errorHidden = false;
    bean.errorMsg= msg;
    bean.loadingHidden = true;
    bean.contentHidden=true;
    that.setData({
        netStateBean: bean
    });

}
function showContent(that){
    hideLoadingDialog(that);
    var bean = that.data.netStateBean;
    bean.errorHidden = true;
    bean.emptyHidden = true;
    bean.contentHidden=false;
    bean.loadingHidden = true;
    that.setData({
        netStateBean: bean
    });
}

function showLoading(){
    wx.showToast({
        title: "加载中",
        icon: 'loading',
        duration: 10000
    })
}

module.exports = {
    showLoading:showLoading,
    showContent: showContent,
    showErrorPage:showErrorPage,
    showEmptyPage:showEmptyPage,


    loadMoreStart:loadMoreStart,
    loadMoreNoData:loadMoreNoData,
    loadMoreError:loadMoreError,
    init:init




}

