# 美味餐厅 H5 点餐演示

原微信小程序菜单数据已迁移为静态网页，无框架、无后端、无云数据库。支持分类、购物车、提交模拟订单、历史订单。所有订单只保存在当前浏览器 localStorage 中，**不会被商家收到**。微信内置浏览器和电脑浏览器之间不会同步历史订单；用户清理缓存后历史订单可能丢失。

## 本地预览

可直接双击 index.html；如浏览器限制本地资源，可在目录中执行 `python -m http.server 8000`，打开 http://localhost:8000 。

## 免费发布到 GitHub Pages

1. 登录 https://github.com/ ，新建 Public 仓库，名称建议 `meiwei-h5`。
2. 解压 ZIP 后，将 `index.html`、`styles.css`、`script.js`、`assets` 文件夹直接上传到仓库根目录（不是上传 ZIP）。`README.md` 和 `generate_qr.py` 可选。
3. 仓库 Settings -> Pages -> Build and deployment -> Source 选择 Deploy from a branch；Branch 选择 main，目录选择 /(root)，保存。
4. 等待 GitHub Pages 部署完成。常见地址是 `https://你的GitHub用户名.github.io/meiwei-h5/`，以 Pages 页面显示的实际地址为准。
5. 手机微信直接打开网址测试：添加菜品、提交订单、历史订单。
6. 生成二维码：在电脑上执行 `python -m pip install "qrcode[pil]"`，然后 `python generate_qr.py https://你的实际网址/`，会输出 `meiwei-qr.png`。也可以使用可信二维码生成器粘贴实际网址生成。
7. 手机微信扫一扫生成的二维码即可进入网页。扫码打开的是微信内网页，不是微信原生小程序。

## 免费费用和限制

- 项目代码本身零成本，GitHub Pages 对符合其条款的公开仓库提供免费静态网站托管，具体使用限额和服务政策以 GitHub 官方说明为准。
- GitHub Pages 网站源码所在的 Public 仓库可被公开查看，请勿放置密码、密钥、个人信息。
- 适合个人学习与非商业演示。GitHub Pages 不适合作为在线商业交易或真实餐厅运营的托管服务。
- 部署后 HTTPS 通常由 GitHub Pages 提供，不必单独购买域名。
- GitHub 服务在不同网络环境下的可访问性不同，务必用目标用户的手机微信实际测试。
- 本项目不收集客户个人信息、不提供在线支付，也不会把订单发送到商家。

## 修改菜单

编辑 `script.js` 开头 `dishes` 数组中的 `name`、`price`、`emoji`、`desc`、`category`，保存后重新上传即可。
