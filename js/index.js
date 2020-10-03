let direction = "",
    cord = {
  oldx: 0,
  oldy: 0
};

function createSq(el) {
  let sq = {};
  sq.n = el.offset().top;
  sq.w = el.offset().left;
  sq.s = el.offset().top + el.height();
  sq.e = el.offset().left + el.width();
  sq.flag = false;
  sq.toggle = false;

  sq.limit = function (cord) {
    let isIn = {
      x: false,
      y: false
    };
    cord.oldx > sq.w && cord.oldx < sq.e ? isIn.x = true : isIn.x = false;
    cord.oldy > sq.n && cord.oldy < sq.s ? isIn.y = true : isIn.y = false;

    switch (true) {
      case !isIn.x && !isIn.y && !sq.flag:
        //在外面也沒觸發過
        sq.flag = false; // console.log('在外面也沒觸發過')

        break;

      case isIn.x && isIn.y && !sq.flag && !sq.toggle:
        //初次進入
        el.css('background', '#fff');
        sq.flag = true;
        console.log('初次進入');
        break;

      case (!isIn.x || !isIn.y) && sq.flag && !sq.toggle:
        //初次離開
        sq.flag = false;
        sq.toggle = true;
        console.log('初次離開');
        break;

      case isIn.x && isIn.y && !sq.flag && sq.toggle:
        //二次進入
        el.css('background', '#845');
        sq.flag = true;
        console.log('二次進入');
        break;

      case (!isIn.x || !isIn.y) && sq.flag && sq.toggle:
        //二次離開
        sq.flag = false;
        sq.toggle = false;
        console.log('二次離開');
        break;
    }
  };

  return sq;
}

let sqAry = [];

for (let i = 0; i < $('.sq').length; i++) {
  sqAry[i] = new createSq($('.sq').eq(i));
  touchLimit(sqAry[i]);
}

function touchLimit(sq) {
  $('body').on('touchstart', function (e) {
    cord.oldx = e.touches[0].pageX;
    cord.oldy = e.touches[0].pageY;
    sq.limit(cord);
  });
  $('body').on('touchmove', function (e) {
    cord.oldx = e.touches[0].pageX;
    cord.oldy = e.touches[0].pageY;
    sq.limit(cord);
  });
  $('body').on('touchend', function (e) {
    cord.oldx = e.changedTouches[0].pageX;
    cord.oldy = e.changedTouches[0].pageY;
    sq.limit(cord);
  });
}