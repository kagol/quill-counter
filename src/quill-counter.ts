import * as Quill from 'quill';

class Counter {
  quill: any;
  container: HTMLElement;
  constructor(quill: any, options: object) {
    this.quill = quill;
    this.container = quill.addContainer('fe-counter');
    this.render();
    quill.on(Quill.events.TEXT_CHANGE, this.render.bind(this));
  }
  render() {
    const text = this.quill.getText(); // 获取编辑器中的纯文本内容
    const char = text.replace(/\s/g, ''); // 使用正则表达式将空白字符去掉
    this.container.innerHTML = `当前字数：${char.length}`;
  }
}
  
export default Counter;
