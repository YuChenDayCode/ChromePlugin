$(function () {
    var url = window.location.href;
    let observer = new MutationObserver(callback);
    observer.observe(document.body, { 'childList': true, 'attributes': true });
    function callback() {
        if (document.readyState == 'complete') { DelDom(url); }
        if (window.location.host.indexOf('.baidu.com') > -1) { BaiDuIndex(); }
        if (window.location.host.indexOf('blog.csdn.net') > -1) { $('#article_content').height('auto'); }

    }
    DelDom(url);
    var uuu = window.location.host;
    if (uuu.indexOf('.baidu.com') > -1) { 
        BaiDuIndex(); BaiduFilter();
    }
      
});

var DelDom = function (url) {
    var ad_name = [      //##全局       "baidu.com@@.s-news-banner-wrap", "baidu.com@@#s_form_wrapper",
        "csdn.net@@.recommend-ad-box", "csdn.net@@.mediav_ad", "csdn.net@@body>.pulllog-box", "csdn.net@@.advert-cur", "csdn.net@@.4paradigm_target", "csdn.net@@.J_adv","csdn.net@@#writeGuide",
        "csdn.net@@.fourth_column", "csdn.net@@#asideFooter", "csdn.net@@.hide-article-box", "csdn.net@@.indexSuperise",
   
        "zhidao.baidu.com@@#qb-side",
        "zhihu.com@@.Sticky>.Banner", "zhihu.com@@.TopstoryItem--advertCard", "zhihu.com@@.Banner .Banner-image", "zhihu.com@@.Banner-image[alt='广告]",
        "news.china.com@@.epbWrap", "news.china.com@@.chan_wntj",
        "##.gg200x300", "###js-epBobo", "###epContentRight", "###adfdiv", "###ft_Div_ftcpvrich3699B", "##.rFixedBox",
        "bilibili.com@@#bili_live","bilibili.com@@#reportFirst2","bilibili.com@@#bili_manga",

        "##a[href*='click.aliyun.com']",
        "##div[class*='ad-box'],[baidu_imageplus_sensitive_judge='true']"
    ];

    var rd = [];
    for (var c = 0; c < ad_name.length; c++) {
        var $this = ad_name[c];
        var admoudle = $this.split('@@');
        if ($this.indexOf('##') != 0 && url.indexOf(admoudle[0]) == -1)
            continue;
        if ($(admoudle[1]).length > 0) {
            rd.push(admoudle[1]);
        }
        $(admoudle[1]).remove();
    }
    rd.length == 0 || console.log(rd.join(','));

    $("ul>li").has("div>span:contains('广告')").remove();
}

/**去百度首页广告**/
var BaiDuIndex = function () {

    $('#content_leftList li.clearfix+style').prev().remove();//贴吧首页
    $('#content_leftList li.clearfix+style').remove();
    $('.p_postlist > div.l_post.l_post_bright.j_l_post.clearfix+style').prev().remove();//贴吧帖子
    $('.p_postlist > div.l_post.l_post_bright.j_l_post.clearfix+style').remove();//贴吧帖子
    $('.p_postlist > div.l_post.l_post_bright.j_l_post.clearfix:not([data-field])').remove();


    $("#content_left>div,#content_right>div").has("a+span:contains('广告'),a>span:contains('广告')").remove();//a:contains('广告'), a:contains('推广链接'), a:contains('商业推广'),
    $("#content_right div").has("div>a:contains('广告')").remove();
    setTimeout(() => {
        $("#content_left>div,#content_right>div").has("a+span:contains('广告'),a>span:contains('广告')").remove();
        $("#content_right div").has("div>a:contains('广告')").remove();
    }, 2222);
    $('#con-ar').next().remove();
    $('.c-container').css({"border-radius": "8px","box-shadow": "0 1px 4px 0 rgba(0,0,0,0.37)","padding":"15px"});
}

/**过滤搜索结果网址**/
var BaiduFilter = function (){
    var filter_URL=['cncrk.com','ddooo.com','xue51.com','jb51.net','33lc.com', 'kxdw.com', '05sun.com','zdfans.com','recomm.cnblogs.com','bubuko.com'];
    for(var i=0;i<filter_URL.length;i++){
        $("#content_left>div").has("div>a:contains('"+filter_URL[i]+"')").remove();
    }
}