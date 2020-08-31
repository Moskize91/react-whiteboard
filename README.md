

# react-whiteboard

![](https://white-sdk.oss-cn-beijing.aliyuncs.com/images/react-whiteoard-home.png)

![whiteboard](https://white-sdk.oss-cn-beijing.aliyuncs.com/icons/whiteboard.png)

体验地址：https://demo.netless.link/

## 1. 适用开发者

- 从事在线教育软件、在线会议、远程协作软件开发工作，想短期快速植入一个互动白板的 web 开发者。
- 具有一定的 TypeScript、React 的编码或者阅读基础。
- 如果要二次开发组件需要安装 lerna 来启动。

## 2. 优势

全程组件化，如果对组件的 UI 不挑剔可以直接是用项目中 `whiteboard` 文件夹内的代码即可。如果想要更改组件的样式，可以在了解 lerna 的作用和 阅读 `DEV_README.md` 的前提下自定义组件。

## 3. 注意事项

Demo 中各种 Token 都写死在前端是不安全的，上生产环境后建议都有服务器来调用。

## 4. 单纯启动项目

单纯启动项目是指直接应用项目中的组件代码样式，自己只编写“胶水”代码。

### 4.1 获取 Netless 白板的 SDK Token

1. 注册 Netless 账号 

   [控制台](https://console.netless.link)

2. 获取 AppIdentifier

   控制台 -> 应该管理 -> 点击复制

3. 获取 SDK Token

   控制台 -> 应该管理 -> 配置 -> 点击生成

4. 完善配置，填入配置文件
   
   `.env.example`  文件名字改为 `.env`

   ```typescript
   APPIDENTIFIER=283/VGixxxxxx2HJg // 白板 APPIDENTIFIER
   SDKTOKEN=NETLESSSDK_YWs9eDRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxRkNTIyYjMwMmIyZGRj // 白板 SDKTOKEN
   ```

5. 安全事项

   上线后此 Token **建议维护在后端**

### 4.2 获取阿里云的 `AK` `SK`（可选）

白板同步视频、图片等富媒体的过程中并没有去通过长连接直接传递这些大体积数据，而是将其上传到阿里云的云存储后将云存储返回的 url 地址同步出去。开发者在理解了同步的是**地址**的前提之下，应该能推测出调试时对 OSS 的配置需要的几个基本要素：

1. 本地调试我们没有再打包层配置代理，所以要开启跨域访问。

2. 允许共有读，上线后可以改为支持各种防盗链。

3. 自己能上传（这个不用多说吧，看 OSS 的文档）

4. 调试配置参考 https://developer.netless.link/docs/faq/oss-config/

5. 完善配置，填入配置文件

   `.env.example`  文件名字改为 `.env`

   ```typescript
   AK=LTAI4xxxxxxxxxxuDmu
   SK=ycdfrOxxxxxxxxxxxxxxxxxxWqsy
   OSSREGION=oss-cn-hangzhou
   BUCKET=bxxxxxxxgs
   FOLDER=testxxxxx
   PREFIX=https://bxxxxxxxgs.oss-cn-hangzhou.aliyuncs.com/
   ```

6. 如果不想配置云存储，请注释掉以下代码直接运行。但是不能使用上传图片、音视频、PPT 等核心功能

   ```tsx
    <ToolBox room={room} customerComponent={
           [
               <OssUploadButton oss={ossConfigObj}
                    room={room}
                    whiteboardRef={whiteboardLayerDownRef}/>,
               <PluginCenter oss={ossConfigObj}
                     room={room}/>
           ]
   }/>
   
   // 改为
   <ToolBox room={room}/>
   ```

### 4.3 启动项目

```bash
# 访问到 whiteboard 文件夹下
cd whiteboard
# 加载依赖
yarn
# 启动项目
yarn start
# 打包项目
yarn build
```

## 5. 组件二次开发

我们假定需要二次开发的开发者都是深度玩家，需要熟悉一些前端工程化、组件化相关的工具。

- yarn or npm
- lerna（下面有简单的运行起来的方法，详细用法请自行搜索学习）

### 5.1 组件介绍

采用 lerna 管理的优势在于：组件化白板的常用功能，方便使用和维护管理。下面简单罗列一下核心组件，并介绍其作用和样式。

#### 5.1.1 白板专有控件

![全部控件位置](https://white-sdk.oss-cn-beijing.aliyuncs.com/images/react-whiteboard.jpg)

### 5.2 启动项目构建

```bash
# STEP 1
yarn
# STEP 2
lerna bootstrap
# STEP 3
# 以下两个依赖，依赖于 package 中其他库，优先构建完其他库，再构建这两个库
lerna run --ignore @netless/docs-center --ignore @netless/preview-controller build:lib
lerna run --scope @netless/docs-center --scope @netless/preview-controller build:lib
lerna run --scope whiteboard build
```



### 5.3 常用命令介绍

```bash
# 安装全局 lerna
yarn global add lerna
# or npm install
npm install lerna -g

# 单独 yarn
yarn

# lerna 准备工作
lerna bootstrap

# 启动所有脚本的热更新
lerna run --parallel start

# 构建所有库的 yarn build 命令
lerna run build

# 只运行 toolbox 的 yarn dev 脚本
lerna run --scope `lib-name` dev

# 运行除 tool-box 外的 run dev 脚本
lerna run --ignore @netless/tool-box dev

# build 所有库
lerna run --parallel build:lib
```





