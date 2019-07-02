<template>
  <div class="character">
    <h1>服务器部署</h1>
    <p>先购买服务器 可以选择<a href="https://my.vultr.com/subs/?SUBID=24150305">vultr</a>或者<a href="https://www.aliyun.com/?spm=5176.10695662.1280361.1.7d4a1ba4ImPAN4">阿里云服务器</a></p>
    <p>下载<a href="https://www.banwagongzw.com/108.html">Xshell5</a>、<a href="https://www.banwagongzw.com/108.html">Xftp5</a>， <a href="https://www.banwagongzw.com/106.html">如何破解</a></p>
    <p>连接主机之后修改服务器默认登录端口</p>
    <p>vi /etc/ssh/sshd_config</p>
    <p>光标移到Prot 22，修改这个数字，可选范围在0-65336，因为0-1024大多被系统占用，不要在这个范围内选择</p>
    <p>往下找到UseDNS，保证它为no，保存退出重启ssh服务</p>
    <p>因为我安装的是centos 7，重启命令是systemctl restart sshd，centos 6的命令是service ssh restart</p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
  </div>
</template>
<script>
export default {
  
}
</script>
