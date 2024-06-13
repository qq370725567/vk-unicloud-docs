## 发行

本地开发调试后，务必上传到uniCloud服务空间才能在现网生效。

发行分为云端资源发行和客户端发行。

## 云资源发行

各种云函数、公共模块等都需要上传发行。

右键 cloudfunctions 目录，

![](https://cdn.fsq.pub/vkdoc/vk-client/1718278237754rr95efdt2bg.png)

### 小程序中使用uniCloud

各家小程序平台，均要求在小程序管理后台配置小程序应用的联网服务器域名，否则无法联网。

使用uniCloud后，开发者将不再需要自己购买、备案域名，直接将uniCloud的域名填写在小程序管理后台即可。（如需使用前端网页托管仍需进行域名备案）

根据下表，在小程序管理后台设置request合法域名、uploadFile合法域名（如没有上传文件业务，可不设置）。下表的域名均为阿里云或腾讯云自有域名，并非DCloud所属域名。

|   服务提供商	   |request合法域名						|uploadFile合法域名																															|          download合法域名																																								           |
|:----------:|:-:												|:-:																																						|:-----------------------------------------------------------------------:|
|   阿里云			   |api.next.bspapp.com				|请在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)服务空间的总览页面查看| 请在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)服务空间的总览页面查看								 |
|   腾讯云			   |tcb-api.tencentcloudapi.com|~~cos.ap-shanghai.myqcloud.com~~	(2023年8月17日腾讯云更新了上传域名，如果遇到小程序因为安全域名无法上传的问题可以把小程序开发工具内提示的不在白名单的域名添加到上传安全域名内)																									|            需要从云存储下载文件的时候才需要配置，不同服务空间域名不同，可以在web控制台查看文件详情里面看到            |
| 支付宝云			 |{spaceId}.api-hz.cloudbasefunction.cn|https://u.object.cloudrun.cloudbaseapp.cn|                 {spaceId}.normal.cloudstatic.cn                 |

**注意**

- 如果需要用uni.request请求云存储内的文件，需要将云存储域名（即上表中的download合法域名）配置到request合法域名内
- 如果项目使用了uni-push，还需要将uni-push的socket域名添加到白名单[详情查看](https://uniapp.dcloud.net.cn/unipush-v2.html#useinmp)
- 支付宝云的域名是动态的，需要在小程序管理后台配置`{spaceId}.api-hz.cloudbasefunction.cn`，其中`{spaceId}`是服务空间的id，可以在uniCloud web控制台的服务空间总览页面查看

**阿里云查看上传、下载安全域名**

![阿里云查看上传、下载安全域名](https://cdn.fsq.pub/vkdoc/vk-client/1718282722568td7kruikkq.png)

小程序开发工具的真机预览功能，必须添加上述域名白名单，否则无法调用云函数。模拟器的PC端预览、真机调试不受此影响。

如果遇到正确配置了合法域名但是依然报`url not in domain list`，请尝试删除手机上的小程序、清理小程序所在的客户端缓存、重启对应的小程序开发工具后重试

如果遇到`invalid ip xxx, not in whitelist`，请检查是否在小程序管理后台开启了域名白名单。如果没用到可以关闭，如果确认需要使用ip白名单，请参考：[固定IP](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/eip.html)

**关于云函数本地调试服务在小程序中的使用**

HBuilderX内使用运行菜单运行到小程序时会连接本地调试服务，即使你运行之前就选择了连接云端云函数，小程序也会发送一条请求到本地调试服务检测调用云函数是本地还是云端。

**在开发模式下推荐直接忽略域名校验。**

即使在开发工具勾选了忽略域名校验，体验版与正式版不会忽略域名校验。

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/cloudstorage/28b1b554-395f-4f43-8937-02cd44077c39.png)

### 已经加了白名单，但小程序体验版和正式版还是无法请求云函数

请务必在HBuilderX内使用【发行】菜单打包小程序，【运行】菜单打包的代码只能用于本地调试，【发行】菜单打包的代码才能发布体验版和正式版。

如果域名白名单提示 `127.0.0.1` 这个ip没有加入白名单，那代表你点的就是【运行】菜单发布的体验版，请务必点【发行】发布小程序。**uni-app项目发行与运行输出的目录不同，请注意不要选错了**

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/cloudstorage/28b1b554-395f-4f43-8937-02cd44077c39.png)

### Web端使用uniCloud

云函数的域名是bspapp.com或tencentcloudapi.com。但开发者的web前端肯定是部署在其他域名下（含unicloud的前端网页托管）。那么Web前端js访问云函数就涉及跨域问题，导致前端js无法连接云函数服务器。

此时需要在uniCloud后台操作，为云函数绑定安全域名。哪个域名下的前端网页的js想访问云函数，就配置哪个域名。如使用unicloud前端网页托管，不管是自带测试域名还是开发者的域名，只要想访问云函数，都得把域名配在这里。

![](https://cdn.fsq.pub/vkdoc/vk-client/171828287058137ssro1f8l8.png)

> 注意跨域配置需要带上端口信息。例如：前端页面运行于：www.xxx.com:5001，跨域配置内配置：www.xxx.com不会对此页面生效，需要配置为：www.xxx.com:5001，端口部分也支持通配符

> 注意跨域配置需要带上端口信息。例如：前端页面运行于：localhost:8080，跨域配置内配置：localhost不会对此页面生效，需要配置为：localhost:8080，端口部分也支持通配符

**注意**

- 跨域配置同时对云函数、前端网页托管、云存储生效
- 阿里云云存储默认不支持localhost跨域，如有需求请添加`127.0.0.1:*`到跨域配置内
- 访问云存储文件时，如果客户端存在缓存，可能会出现已配置跨域域名的情况下仍然跨域的问题。建议这种场景下在请求头内加上`{"cache-control": "no-cache","pragma": "no-cache"}`

## 客户端资源发行

### 前端网页托管

uniCloud支持前端静态网页托管，在HBuilderX中点发行菜单，生成Web，将生成的前端文件部署在uniCloud的前端网页托管内即可。

需要注意的是你仍需在[uniCloud web控制台](https://unicloud.dcloud.net.cn) 配置绑定安全域名（见上一章节），这样前端网页的js才能访问云函数。

### App升级中心

uniCloud通过云端一体的升级检测、管理端版本维护。[传送门](https://vkdoc.fsq.pub/admin/6/app-upgrade-center.html)

### 应用统一发布页

app、小程序、web统一发布页面。[传送门](https://vkdoc.fsq.pub/admin/6/app.html#%E7%94%9F%E6%88%90%E7%BB%9F%E4%B8%80%E5%8F%91%E5%B8%83%E9%A1%B5)

