# Oauth-Authorization
  Demo of Oauth2.0 Authorization ：How to Get Access Token

# Usage
1. 启动Oauth2.0 服务器并配置好相关参数
2. node app.js

# 各授权流程说明

## Authorization Code Grant

1. 访问授权服务器，Authorization为Basic base64(client_id:client_secret)
2. 要求输入用户名密码，跳转到3
3. 前2步可直接等价于，访问授权服务器，Authorization为Basic base64(username:password)
4. 输入相关授权选项，提交表单
5. 获取到重定向URI和code后，请求获取Access Token

## Implicit Grant

1. 访问授权服务器，Authorization为Basic base64(client_id:client_secret)
2. 要求输入用户名密码，跳转到3
3. 前2步可直接等价于，访问授权服务器，Authorization为Basic base64(username:password)
4. 输入相关授权选项，提交表单
5. 获取到的重定向URI提取中Access Token

## Password Grant

  填入用户名密码等相关参数来获取Access Token

## Client Credentials Grant

  填入相关参数来获取Access Token

--------------------------------------------------------------------------

# Oauth2.0授权流程的说明
  <http://blog.hiphone-chan.com/protocol/2016/04/28/oauth2-grant.html>
