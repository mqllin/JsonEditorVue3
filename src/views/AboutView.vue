<template>
  <div class="about">
    <h1>装修中</h1>
    <pre>
      json编辑器使用方法：
      本工具用于解决长JSON配置文件的编辑问题，通过树形结构展示JSON配置，方便查看和修改。
      工具使用方法：
      - 1.在左侧粘入需要修改的JSON配置，ctrl+S保存并刷新节点树。
      - 2.点击节点树到最后一个节点或者在需要修改的节点按下ctrl+左键点击，在右侧编辑框查看和修改配置。
      - 3.修改完毕后，点击右侧编辑框的保存按钮，ctrl+S保存并刷新节点树。
      - 4.从左侧的编辑框全选并复制，粘贴到需要的地方。

    </pre>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
