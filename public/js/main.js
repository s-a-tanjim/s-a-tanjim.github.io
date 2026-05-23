window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-EFSLHHNZ5Z');

function printImage(url, scale) {
  scale = scale || 0.6;
  var image = new Image();
  image.onload = function () {
    var w = this.naturalWidth;
    var h = this.naturalHeight;
    var src = url;
    try {
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(this, 0, 0);
      src = canvas.toDataURL('image/jpeg', 0.85);
    } catch (e) { /* tainted canvas — fall back to URL */ }
    var style = [
      'font-size: 1px;',
      'line-height: ' + (h * scale) + 'px;',
      'padding: ' + (h * scale / 2) + 'px ' + (w * scale / 2) + 'px;',
      'background-image: url(' + src + ');',
      'background-repeat: no-repeat;',
      'background-size: ' + (w * scale) + 'px ' + (h * scale) + 'px;',
      'color: transparent;'
    ].join(' ');
    console.log('%c ', style);
    console.log('%cThanks for visiting! ♥', 'font-size: 14px; color: #ff4d6d;');
    console.log('%cDesigned & developed by s-a-tanjim', 'font-size: 12px; color: #4FA3FF;');
  };
  image.onerror = function () {
    console.log('Thanks for visiting! ♥');
    console.log('Designed & developed by s-a-tanjim');
  };
  image.src = url;
}

printImage('/img/console.jpg');
