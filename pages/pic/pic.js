Page({
    data: {
        imgUrls: [],
        addImgText: "拍照/相册",
        canAddImg: true,
        maxAddImgNum: 6,
        i: 0,
        imgArr: [],
        picUrl: '',
    },

    addImg: function () {    // 上传照片
        var that = this;
        // 获取当前的图片路径
        my.chooseImage({
            count: that.data.maxAddImgNum,
            success: (res) => {
                console.log(res, 26)
                that.setData({ i: 0, imgArr: res.apFilePaths });
                that.uploadImg();
                if (res.apFilePaths) {
                    my.previewImage({
                        urls: res.apFilePaths, // 要预览的图片链接列表
                        success: (res) => {
                            console.log(res, 62)
                        },
                    });
                }
            },
        });
    },

    toUploadImg: function () {
        my.alert({
            content: '提交图片'
        });
    },

    preView: function () {
        console.log(this.data.imgArr, 32)

    },

    uploadImg: function () {
        var that = this;
        var ii = that.data.i;
        if (ii < that.data.imgArr.length) {
            // my.uploadFile({
            //     url: "",    //自己服务器接口地址
            //     fileType: 'image',
            //     fileName: 'file',
            //     filePath: that.data.imgArr[that.data.i],
            //     formData: {   //这里写自己服务器接口需要的额外参数
            //         session: my.getStorageSync({key:'session'}).data
            //     },
            //     success: (res) => {

            var res = {
                data: '{"data":{"image_url":' + JSON.stringify(that.data.imgArr[that.data.i]) + '},"code":0,"msg":"\u6210\u529f"}', errMsg: "uploadFile:ok", statusCode: 200
            };
            //res是自己服务器接口返回的数据（image_url的值为服务器上的图片链接），这里用假数据模拟
            var _imgUrls = that.data.imgUrls;
            _imgUrls.push(JSON.parse(res.data).data.image_url);   //取到包含所有图片的数组
            that.setData({ imgUrls: _imgUrls });
            _imgUrls.length == 0 && that.set_data(that, _imgUrls, "拍照/相册", true);
            (_imgUrls.length > 0 && _imgUrls.length < that.data.maxAddImgNum) && that.set_data(that, _imgUrls, "+", true);
            _imgUrls.length >= that.data.maxAddImgNum && that.set_data(that, _imgUrls.splice(0, that.data.maxAddImgNum), "+", false);
            that.setData({ i: ii + 1 });
            that.uploadImg();

            //     },
            // });
        }
    },
    delImg: function (e) {    // 删除照片
        var index = e.target.dataset.index;
        var _imgUrls = this.data.imgUrls;
        _imgUrls.splice(index, 1);
        _imgUrls.length == 0 && this.set_data(this, _imgUrls, "拍照/相册", true);
        (_imgUrls.length > 0 && _imgUrls.length < this.data.maxAddImgNum) && this.set_data(this, _imgUrls, "+", true);
    },

    set_data: function (that, imgUrls, addImgText, canAddImg) {
        that.setData({
            imgUrls: imgUrls,
            addImgText: addImgText,
            canAddImg: canAddImg
        });
    }
});