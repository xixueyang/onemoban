/*
 * 横竖屏检测 + 横屏 1 秒后触发星球碰撞动画
 */
(function () {
  var stage = document.getElementById('planetStage')
  var tip = document.querySelector('.rotate-tip')
  var content = document.querySelector('.landscape-content')
  var timer = null

  // 横屏：1 秒后播放星球碰撞
  function startCollision() {
    if (!stage) return
    // 先移除，强制重排以便重复进入横屏时能重新播放
    stage.classList.remove('playing')
    void stage.offsetWidth
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      stage.classList.add('playing')
    }, 1000)
  }

  // 竖屏：停止并复位
  function stopCollision() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (stage) stage.classList.remove('playing')
  }

  function checkOrientation() {
    var isPortrait = window.innerHeight > window.innerWidth
    // 仅在明显是手机尺寸时强制提示，避免桌面窄窗口误拦
    var isSmallScreen = Math.min(window.innerWidth, window.innerHeight) < 600
    if (isPortrait && isSmallScreen) {
      tip.style.display = 'flex'
      content.style.display = 'none'
      stopCollision()
    } else {
      tip.style.display = 'none'
      content.style.display = 'flex'
      startCollision()
    }
  }

  window.addEventListener('orientationchange', function () {
    setTimeout(checkOrientation, 300)
  })
  window.addEventListener('resize', checkOrientation)
  checkOrientation()
})()
