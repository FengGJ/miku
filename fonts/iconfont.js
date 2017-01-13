;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-xin" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M288.105209 122.228809C174.0475 122.211413 64.69086 231.686756 64.69086 388.095016c0 176.070064 156.746974 241.891166 261.854846 312.283376 101.96223 68.26578 174.057221 161.601538 185.453782 201.3928 9.742898-38.935778 91.030249-135.019113 185.447642-203.372897 103.196337-74.726935 261.860986-136.189775 261.860986-312.261886 0-152.117536-109.339244-260.294304-222.907813-260.294304-86.792739 0-167.781284 15.753799-224.419236 128.441301C446.388165 142.306076 373.485785 122.241089 288.105209 122.228809"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yinliang" viewBox="0 0 1090 1024">'+
      ''+
      '<path d="M953.6 512l121.6-121.6c19.2-19.2 19.2-51.2 0-70.4-19.2-19.2-51.2-19.2-70.4 0l-121.6 121.6L761.6 320c-19.2-19.2-51.2-19.2-70.4 0-19.2 19.2-19.2 51.2 0 70.4L806.4 512l-121.6 121.6c-19.2 19.2-19.2 51.2 0 70.4 19.2 19.2 51.2 19.2 70.4 0l121.6-121.6 121.6 121.6c19.2 19.2 51.2 19.2 70.4 0 19.2-19.2 19.2-51.2 0-70.4L953.6 512zM512 70.4c57.6-44.8 102.4-19.2 102.4 51.2l0 800c0 70.4-44.8 89.6-96 44.8l-230.4-192-128 0c-70.4 0-128-57.6-128-128L32 384c0-70.4 57.6-128 128-128l121.6 0L512 70.4z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-zhongxinzhifu" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M576 133.44 576 64 320 224l256 160L576 263.744C704 292.992 800 407.232 800 544c0 158.784-129.218 288-288 288-158.784 0-288-129.216-288-288 0-35.392-28.608-64-64-64-35.394 0-64 28.608-64 64 0 229.376 186.624 416 416 416 229.375 0 416-186.624 416-416C928 336.448 774.976 164.352 576 133.44z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-zanting" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M422.336 909.248c0 42.368-41.088 76.672-91.776 76.672l0 0c-50.688 0-91.776-34.304-91.776-76.672L238.784 124.288c0-42.368 41.088-76.672 91.776-76.672l0 0c50.688 0 91.776 34.304 91.776 76.672L422.336 909.248z"  ></path>'+
      ''+
      '<path d="M786.624 909.248c0 42.368-41.088 76.672-91.776 76.672l0 0c-50.688 0-91.776-34.304-91.776-76.672L603.072 124.288c0-42.368 41.088-76.672 91.776-76.672l0 0c50.688 0 91.776 34.304 91.776 76.672L786.624 909.248z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-yinliang1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M476.8 72c57.6-44.8 102.4-20.8 102.4 51.2l0 784c0 68.8-44.8 89.6-96 44.8L252.8 763.2 126.4 763.2c-72 0-126.4-57.6-126.4-126.4L0 379.2c0-68.8 57.6-126.4 126.4-126.4l120 0L476.8 72zM712 718.4c-14.4 0-24-6.4-30.4-14.4-20.8-20.8-20.8-44.8 0-62.4 75.2-75.2 75.2-188.8 0-264-20.8-20.8-20.8-44.8 0-62.4 20.8-20.8 44.8-20.8 65.6 0 116.8 105.6 116.8 276.8 0 384C729.6 715.2 726.4 718.4 712 718.4zM838.4 790.4c-20.8-20.8-20.8-44.8 0-62.4 120-120 120-308.8 0-428.8-20.8-20.8-20.8-44.8 0-62.4 20.8-20.8 44.8-20.8 65.6 0 75.2 75.2 120 171.2 120 270.4s-44.8 201.6-120 270.4c-6.4 6.4-20.8 14.4-30.4 14.4C859.2 801.6 846.4 793.6 838.4 790.4z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-kaishi" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M771.413333 454.186667c25.386667 15.36 39.466667 39.893333 39.466667 68.906667s-14.08 53.546667-39.466667 68.906667L341.76 851.413333c-26.666667 16-57.813333 16.853333-85.333333 2.133333-27.52-14.72-43.306667-40.533333-43.306667-71.04L213.12 263.893333c0-30.293333 15.786667-56.32 43.306667-71.04 27.52-14.72 58.666667-13.866667 85.333333 2.133333L771.413333 454.186667z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
