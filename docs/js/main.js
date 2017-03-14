var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;

window.addEventListener('load', init);

var canvas;
var ctx;
var lastTimestamp = null;

// モーション用変数
var mikanX = 0;
var mikanY = 0;


// アセット定義
var Asset = {};
Asset.assets = [
  {type: 'image', name: 'back', src: 'assets/back.png'},
  {type: 'image', name: 'box', src: 'assets/box.png'}
];

// 画像
Asset.images = {};

/**
 * アセットの読み込み
 */
Asset.loadAssets = function(onComplete) {
  var total = Asset.assets.length;
  var loadCount = 0;

  // アセットが読み込み終わった時に呼ばれるコールバック
  var onLoad = function () {
    loadCount++;
    if (loadCount >= total) {
      onComplete();
    }
  };

  // すべてのアセットを読み込む
  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

/**
 * 画像の読み込み
 */
Asset._loadImage = function(asset, onLoad) {
  var image = new Image();
  image.src = asset.src;
  image.onload = onLoad;
  Asset.images[asset.name] = image;
}

/**
 * 初期化
 */
function init () {
  canvas = document.getElementById('mainCanvas');
  ctx = canvas.getContext('2d');
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  Asset.loadAssets(function() {
    // アセットがすべて読み込み終わったら、
    // ゲームの更新処理を始めるようにする
    requestAnimationFrame(update);
  });
}

/**
 * 更新
 */
function update (timestamp) {
  var delta = 0; // 前回フレーム時間からの経過時間(単位:秒)
  if (lastTimestamp != null) {
    delta = (timestamp - lastTimestamp) / 1000;  // ミリ秒を1000で割ると秒になる(1000ミリ秒÷1000は1秒)
  }
  lastTimestamp = timestamp;

  // ここに移動等を書く
  mikanX += 100 * delta;
  mikanY += 100 * delta;
  // ここまで
  requestAnimationFrame(update);
  render();
}

/**
 * 描画
 */
function render () {
  // 表示クリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 背景表示
  ctx.drawImage(Asset.images['back'], 0, 0);
  // 箱表示
  ctx.drawImage(Asset.images['box'], mikanX, mikanY);
}