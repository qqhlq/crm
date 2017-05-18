# 微思敦企业门户

## 浏览器兼容性
当前项目浏览器兼容性为 IE9+，iOS9+，安卓大部分流行机型，其中，手机端兼容性要求相对低点，但是需要做到不影响正常使用，web 浏览器的兼容性要求相对高点

## 项目描述
当前项目主要是用了以下框架：

- [vue.js](https://cn.vuejs.org/)
- [vu-cli](https://github.com/vuejs/vue-cli)
- [vue-webpack-boilerplate](http://vuejs-templates.github.io/webpack/)
- [vuex](https://vuex.vuejs.org/)
- [vue-router2](https://router.vuejs.org/zh-cn/)
- [vue-resource](https://github.com/pagekit/vue-resource)
- [element](http://element.eleme.io/#/zh-CN)

项目中开发人员开发代码主要涉及的文件夹有以下几个 `src`，`static`，`test`，下面是对这三个文件夹的简单介绍:

- `src`，主要存放业务逻辑代码，其中，包含以下文件夹、文件
  - `assets`，主要存放需要 `webpack` 编译的静态文件
  - `components`，主要存放项目的公共组件
  - `plugin`，主要存放项目的插件
  - `router`，主要存放项目路由配置
  - `store`，主要存放项目状态管理（`vuex`）
  - `styles`，主要存放项目公共样式
  - `views`，主要存放项目视图文件（跟 `component` 定义方式一样，但是用途不一样）
  - `app.vue`，入口组件
  - `main.js`，入口文件
- `static`，主要存放不需要 `webpack` 编译的组件
- `test`，主要存放测试用例

## 约定

- 所有文件使用小写字母，半角符号命名，字母间使用下划线分割
- 在写 `vue.js` 时，组件的颗粒要分得够细，这样做的原因是为了避免组件过大增加不必要的复杂度。
- 当前项目的路由定义需要以平台划分，如，管理后台使用 `/admin/具体路径`，客户后台使用 `/manage/具体路径`，客户前台使用 `/delivery/具体路径`
- `.vue` 文件中的 `<style>` 使用 `scoped` 属性隔离作用域`app.vue` 除外，`app.vue` 中的 `<style>` 项目公共样式，项目中只能使用 `scss` 定义样式，变量和 `mixins` 调用 `src/styles` 中的 `core/var.scss` 和 `mixins/`
- `src/styles` 文件夹定义组件公共样式，如果涉及到这个文件夹的修改，需要支会开发 `WeAD` 项目的各个人，并将修改同步到各个项目，`src/plugins` 和 `src/components` 的修改同样也需要支会开发 `WeAD` 项目的各个人
- 项目中的异步操作全部使用 `async/await`，不要使用 `.then` 链式调用代码（`.then` 不能很好地解决回调地狱）

## 配置 host
开发项目需要配置域名 `dev-www.wead.cc` 指向 `127.0.0.1`

## 启动项目
从远程服务器 `clone` 下项目后，使用以下步骤启动项目:

```
# 安装依赖
cnpm install

# 启动本地服务器
npm run dev
```

## 如何开发需求
在本地从 `master` `checkout` 出一个分支，开发完需求后合并到 `test`，并将 `test` 分支推送到 `gitlab`，如：

```
git checkout master

git checkout -b 1002_sw_desc

git commit -a -m "fix xx bug"

git checkout test

git merge 1002_sw_desc

git push origin test
```

## 正式环境构建命令

```
npm run build
```
