# CSS Interview Questions 

## 如何实现垂直水平方向上的居中
* 父元素设置`display: flex;`或者`display:grid;`, 子元素设置`margin: auto` 
* flex
  ```css
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
* 绝对定位
  ```css
  .container {
    position: relative;
  }
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ```
* 对于子元素为inline-box来说, 可设置`text-align`和`line-height`
  ```css
  .content {
    text-align: center;
    line-height: 500px;
    height:500px;
  }
  ```

## 实现左侧固定300px, 右侧自适应
* flex
  ```css
  .container {
    display: flex
  }

  .left {
    width:300px;
    /* flex-basis: 300px; */
    /* flex-shrink: 0; */
    flex: 0 0 300px;
  }

  .main {
    /* flex-grow: 1; */
    flex: 1 1 auto;
  }
  ```

## 实现两边固定, 中间动态宽度
```css
 .container {
  width: 500px;
  height: 500px;
  display: flex;
  background-color: aqua;
}

.left {
  flex: 0 0 30px;
  background-color: beige;
}

.right {
  flex: 0 0 30px;
  background-color: brown;
}

.main {
  flex: 1 1 auto;
  background-color: blue;
}
```

## 如何实现表格单双行条纹样式
通过 css3 中伪类 :nth-child 来实现。其中 :nth-child(an+b) 匹配下标 { an + b; n = 0, 1, 2, ...} 且结果为整数的子元素
* `nth-child(2n)/nth-child(even)`: 双行样式
* `nth-child(2n+1)/nth-child(odd)`: 单行样式

```css
<style>
tr:nth-child(2n) {
  background-color: burlywood;
}

tr:nth-child(2n+1) {
  background-color: coral;
}
```

## 实现多套CSS方案的解决办法
* 直接使用多个css文件进行配置
  ```
  <template>
    <p :class="darkmode? 'dark-text': 'light-text'">
  </template>
  <script>

  </script>
  ```

  ```scss
  @import '../styles/dark.scss';
  @import '../styles/light.scss'; 


  ```

* 通过CSS变量(以Vue为例), 可以参考[这个](https://juejin.cn/post/6844904141983072264)
  * 在开发阶段就用Atomic Design的设计思想去组件CSS组件
  * 项目中引入scss, 使用`sass-resources-loader`这个webpack插件
  * 新建一个css文件
    > 注意，scss文件名建议用下划线开头，如_themes.scss，防止执行时被编译成单独的css文件。

    ```scss
    //当HTML的data-theme为dark时，样式引用dark
    //data-theme为其他值时，就采用组件库的默认样式
    //这里我只定义了两套主题方案，想要再多只需在`$themes`里加就行了
    //注意一点是，每套配色方案里的key可以自定义但必须一致，不然就会混乱

    $themes: (
      light: (
          //字体
          font_color1: #414141,
          font_color2: white,
          
          //背景
          background_color1: #fff,
          background_color2: #f0f2f5,
          background_color3: red,
          background_color4: #2674e7,
          
          //边框
          border_color1: #3d414a,
      
      ),
      
      dark: (
          //字体
          font_color1: #a7a7a7,
          font_color2: white,
          
          //背景
          background_color1: #1b2531,
          background_color2: #283142,
          background_color3: #1e6ceb,
          background_color4: #323e4e,
      
          //边框
          border_color1: #3d414a,
      
      )
    );
    ```
  * 使用混入来处理配置
    ```scss
    @import "./_themes.scss";

    //遍历主题map
    @mixin themeify {
        @each $theme-name, $theme-map in $themes {
            //!global 把局部变量强升为全局变量
            $theme-map: $theme-map !global;
            //判断html的data-theme的属性值  #{}是sass的插值表达式
            //& sass嵌套里的父容器标识   @content是混合器插槽，像vue的slot
            [data-theme="#{$theme-name}"] & {
                @content;
            }
        }
    }

    //声明一个根据Key获取颜色的function
    @function themed($key) {
        @return map-get($theme-map, $key);
    }

    //获取背景颜色
    @mixin background_color($color) {
        @include themeify {
            background-color: themed($color)!important;
        }
    }

    //获取字体颜色
    @mixin font_color($color) {
        @include themeify {
            color: themed($color)!important;
        }
    }

    //获取边框颜色
    @mixin border_color($color) {
        @include themeify {
            border-color: themed($color)!important;
        }
    }
    ```


## 自定义滚动条的样式
```css
::-webkit-scrollbar — 常用, 整个滚动条.
::-webkit-scrollbar-button — 滚动条上的按钮 (上下箭头).
::-webkit-scrollbar-thumb — 常用, 滚动条上的滚动滑块.
::-webkit-scrollbar-track — 常用, 滚动条轨道.
::-webkit-scrollbar-track-piece — 滚动条没有滑块的轨道部分.
::-webkit-scrollbar-corner — 当同时有垂直滚动条和水平滚动条时交汇的部分.
::-webkit-resizer — 某些元素的 corner 部分的部分样式(例:textarea 的可拖动按钮).
```

## 如何开启浏览器的暗黑模式
使用`prefers-color-scheme`
```css
@media (prefers-color-scheme: dark) {
  :root {
  }
}
```

## 隐藏页面元素的几种方法

* `display:none` 移出文档流
* `content-visibility:hidden` 移出文档流
* `visibility: hidden` 透明度为0, 仍在文档流中
* `opacity: 0` 即透明度为0, 仍在文档流中, 但是点击时间等的不生效
* `position: absolute; top:-9000px; left: -9000px;`绝对定位于不可见位置
* 对于文本来说, 可设置字体大小为0

## CSS响应式布局: 实现大屏3等分, 中屏2等分, 小屏1等分
* 使用media-query定义边界来, 配合grid模型
  ```css
  @media (min-width:768px) {
    .container {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width:1024px) {
    .container {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .container {
    display: grid;
    background-color: azure;
    gap: 1rem;
  }

  .container>div {
    background-color: aqua;
    height: 300px;
  }
  ```
* 直接使用grid的autofill功能
  ```css
  .container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  ```

## 超出部分显示省略号
* 单行: 
* 多行:
* 走马灯: 

## css 如何匹配前 N 个子元素及最后 N 个子元素
* 如何匹配最前三个子元素: :nth-child(-n+3)
* 如何匹配最后三个子元素: :nth-last-child(-n+3)

## 伪类与伪元素有什么区别
* 伪类使用单个冒号`:`, 例如`:hover`
  * :link: 元素被定义了超链接但并未被访问过
  * :visited: 元素被定义了超链接并已被访问过
  * :active: 元素被激活
  * :hover: 鼠标悬停
  * :focus: 元素获取焦点  
* 
* 伪元素使用双冒号`::`, 例如`::before`
