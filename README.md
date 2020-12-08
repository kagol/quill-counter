# quill-counter

Quill字符统计模块

# 安装

```
npm i quill-counter
```

## 注册

```
import Quill from 'quill';
import Counter from 'quill-counter';

Quill.register('modules/counter', Counter);
```

## 开启

```
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    counter: true
  }
});
```
