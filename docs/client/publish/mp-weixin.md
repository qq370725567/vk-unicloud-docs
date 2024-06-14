# 发行微信小程序

注意：其他小程序发行方式基本和微信小程序一致。

## 发行前要做的事情

1. 微信小程序必须已通过微信认证
2. 微信支付已申请通过
3. 进行微信小程序备案（备案也可以发行后再备案）

## HBX编译代码

点击HBX上方菜单【发行】-【小程序-微信】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/cb408b09-3e36-4b20-b8c4-d2239a0324fb.png)

确认appid正确后，点击【发行】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1683dd14-8d0c-44a7-bc22-1ae401775d81.png)

## 配置小程序域名白名单

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

**已经加了白名单，但小程序体验版和正式版还是无法请求云函数**

请务必在HBuilderX内使用【发行】菜单打包小程序，【运行】菜单打包的代码只能用于本地调试，【发行】菜单打包的代码才能发布体验版和正式版。

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

**如果要发布`体验版`或`正式版`，请务必在HBuilderX内使用发行菜单。uni-app项目发行与运行输出的目录不同，请注意不要选错了**

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/cloudstorage/28b1b554-395f-4f43-8937-02cd44077c39.png)

## 将代码上传到微信小程序后台

微信小程序后台地址：[前往](https://mp.weixin.qq.com/)

等待HBX编译完成后，会自动打开微信小程序开发者工具，然后点击在微信小程序开发者工具中点击【上传】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/6fc33946-c18f-492b-8e83-474cae83cdee.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/f112d919-669e-426e-b23d-a1b0cf80626a.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/ea6511d8-924a-47d3-8ab6-075fc0c99719.png)

## 设置订单中心的path

微信小程序新增了规则，如果你的小程序有售卖产品，则必须设置订单中心的path

假设你的小程序订单中心的path为：（需替换成你实际的页面地址）

```
pages/user/order/list
```

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/92ffdec3-c90a-45ee-8112-2f5f54125886.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/9d6597b9-fdcf-451a-9be4-ad5376c81c30.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/d34e1096-738a-469e-b683-888d6f71cdd2.png)

## 设置隐私协议

微信小程序必须设置【用户隐私保护指引设置】

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e8602a24-6942-4c9b-97f4-f7514d3bf806.png)

### 协议内的填空参考

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/0500/509.png)

### 协议内的填空快速复制

注意：此文案仅供参考，根据你实际业务情况填写，不需要和下面的一模一样

1.开发者处理的信息

根据法律规定，开发者仅处理实现小程序功能所必要的信息。

* 为了 `使用手机号快速登录`，开发者将在获取你的明示同意后，收集你的手机号。
* 为了 `满足用户设置账号昵称和头像`，开发者将在获取你的明示同意后，收集你的微信昵称、头像。
* 为了 `满足用户查看附近的店铺`，开发者将在获取你的明示同意后，收集你的位置信息。
* 为了 `商家能够使用扫一扫扫码核销订单`，开发者将在获取你的明示同意后，访问你的摄像头。
* 为了 `满足用户保存自己的专属推广码`，开发者将在获取你的明示同意后，使用你的相册(仅写入)权限。
* 开发者读取你的剪切板，用于 `满足用户剪切板中识别收货地址`
* 开发者收集你的地址，用于 `快速填写收货地址`
* 开发者收集你选中的照片或视频信息，用于 `用户发布商品评论`
* 开发者获取你选择的位置信息，用于 `快速填写收货地址`
* 开发者收集你的订单信息，用于 `商家针对订单信息进行发货`
* 开发者收集你的发布内容，用于 `向用户展示商品评论`

## 设置用户生成内容场景声明

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/0500/510.png)

设置内容参考如下

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/0500/511.png)

## 发行后还需要做的事情

1. 进行小程序备案（如果发行前已备案，则请无视）

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/0500/512.png)