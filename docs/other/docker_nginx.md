> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [blog.csdn.net](https://blog.csdn.net/BThinker/article/details/123507820)

> [Docker 安装 (完整详细版)](https://blog.csdn.net/BThinker/article/details/123358697 "Docker 安装 (完整详细版)")
> 
> [Docker 日常命令大全 (完整详细版)](https://blog.csdn.net/BThinker/article/details/123355362 "Docker 日常命令大全(完整详细版)")

### 说明：

> [Docker](https://so.csdn.net/so/search?q=Docker&spm=1001.2101.3001.7020 "Docker") 如果想安装软件 , 必须先到 [Docker](https://so.csdn.net/so/search?q=Docker&spm=1001.2101.3001.7020 "Docker") 镜像仓库下载镜像。

[Docker 官方镜像](https://hub.docker.com/ "Docker官方镜像 ") 

### 1、寻找 [Nginx](https://so.csdn.net/so/search?q=Nginx&spm=1001.2101.3001.7020) 镜像 

![](https://img-blog.csdnimg.cn/936384cdefca4d5292438589bd4267b6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

![](https://img-blog.csdnimg.cn/f44d906902c84949bcc07b8cad99c22c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

###  2、下载 Nginx 镜像

<table><thead><tr><th>命令</th><th>描述</th></tr></thead><tbody><tr><td>docker pull nginx</td><td>下载最新版 Nginx 镜像 (其实此命令就等同于 : docker pull nginx:latest)</td></tr><tr><td>docker pull nginx:xxx</td><td>下载指定版本的 Nginx 镜像 (xxx 指具体版本号)</td></tr></tbody></table>

![](https://img-blog.csdnimg.cn/cfe33e6c9e16447a991e10067179beac.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

>  检查当前所有 [Docker](https://so.csdn.net/so/search?q=Docker&spm=1001.2101.3001.7020) 下载的镜像

```
docker images


```

###  3、创建 Nginx 配置文件 

> 启动前需要先创建 Nginx 外部挂载的配置文件（ /home/nginx/conf/nginx.conf）  
> 之所以要先创建 , 是因为 Nginx 本身容器只存在 / etc/nginx 目录 , 本身就不创建 nginx.conf 文件  
> 当服务器和容器都不存在 nginx.conf 文件时, 执行启动命令的时候 docker 会将 nginx.conf 作为目录创建 , 这并不是我们想要的结果 。

```
# 创建挂载目录
mkdir -p /home/nginx/conf
mkdir -p /home/nginx/log
mkdir -p /home/nginx/html
```

> 容器中的 nginx.conf 文件和 conf.d 文件夹复制到宿主机

```
# 生成容器
docker run --name nginx -p 9001:80 -d nginx
# 将容器nginx.conf文件复制到宿主机
docker cp nginx:/etc/nginx/nginx.conf /home/nginx/conf/nginx.conf
# 将容器conf.d文件夹下内容复制到宿主机
docker cp nginx:/etc/nginx/conf.d /home/nginx/conf/conf.d
# 将容器中的html文件夹复制到宿主机
docker cp nginx:/usr/share/nginx/html /home/nginx/
```

![](https://img-blog.csdnimg.cn/2a460adaab2446c7a6f805ebdfe1751a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

###  4、创建 Nginx 容器并运行

> Docker 创建 Nginx 容器

```
# 直接执行docker rm nginx或者以容器id方式关闭容器
# 找到nginx对应的容器id
docker ps -a
# 关闭该容器
docker stop nginx
# 删除该容器
docker rm nginx
 
# 删除正在运行的nginx容器
docker rm -f nginx
```

```
docker run \
-p 9002:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:latest
```

<table align="center" border="1" cellpadding="1" cellspacing="1"><thead><tr><th>命令</th><th>&nbsp; &nbsp;描述</th></tr></thead><tbody><tr><td>–name nginx</td><td>启动容器的名字</td></tr><tr><td>-d</td><td>后台运行</td></tr><tr><td>-p 9002:80</td><td>将容器的 9002(后面那个) 端口映射到主机的 80(前面那个) 端口</td></tr><tr><td>-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf</td><td>挂载 nginx.conf 配置文件</td></tr><tr><td>-v /home/nginx/conf/conf.d:/etc/nginx/conf.d</td><td>挂载 nginx 配置文件</td></tr><tr><td>-v /home/nginx/log:/var/log/nginx</td><td>挂载 nginx 日志文件</td></tr><tr><td>-v /home/nginx/html:/usr/share/nginx/html</td><td>挂载 nginx 内容</td></tr><tr><td>nginx:latest</td><td>本地运行的版本</td></tr><tr><td>\</td><td>shell 命令换行</td></tr></tbody></table>

![](https://img-blog.csdnimg.cn/e519e235ddd14f31aaa5cd53bb0bb741.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

> 单行模式

```
docker run -p 9002:80 --name nginx -v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/conf/conf.d:/etc/nginx/conf.d -v /home/nginx/log:/var/log/nginx -v /home/nginx/html:/usr/share/nginx/html -d nginx:latest

```

###  5、结果检测

![](https://img-blog.csdnimg.cn/e040a9897e7342eea38c554735a9b62b.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

### ![](https://img-blog.csdnimg.cn/e79b39ae161546aebfe0610005db9f07.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

###  6、修改内容进行展示

![](https://img-blog.csdnimg.cn/c48989901bcb4b679d95337aae10f661.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)

```
# 重启容器
docker restart nginx
```

![](https://img-blog.csdnimg.cn/e29c104638264865a4a6e51dc05c6e04.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAVG91Y2gm,size_20,color_FFFFFF,t_70,g_se,x_16)