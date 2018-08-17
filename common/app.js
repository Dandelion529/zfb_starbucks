const ApiRootUrl = "http://test.yoodex.net/"; // 请求环境
module.exports = {
	getAuthToken: ApiRootUrl + "zfb/member/getAuthToken", // 授权获取token
	getUserInfo: ApiRootUrl + "zfb/member/getUserInfo", // token传参获取用户信息
}
