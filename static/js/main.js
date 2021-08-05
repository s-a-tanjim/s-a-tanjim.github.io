window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-EFSLHHNZ5Z');

/*console.log(
  "%c ",
  "font-size:800px; background:url(https://s-a-tanjim.netlify.app/img/console.jpg) no-repeat;"
);*/

printImage = function (url, size = 60) {
  var image = new Image();
  image.onload = function () {
    var style = [
      'font-size: 1px;',
      'padding: ' + this.height / 100 * size + 'px ' + this.width / 100 * size + 'px;',
      'background: url(' + url + ') no-repeat;',
      'background-size: contain;'
    ].join(' ');
    console.log('%c ', style);
  };
  image.src = url;
};

printImage('https://s-a-tanjim.netlify.app/img/console.jpg');
console.log("This site is created by s-a-tanjim")
