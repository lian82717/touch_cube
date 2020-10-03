let direction = "",
cord = {
    oldx: 0,
    oldy: 0
}

function CreateCube (el) {
    let cube = {}
    cube.n =  el.offset().top
    cube.w =  el.offset().left
    cube.s =  el.offset().top + el.height()
    cube.e =  el.offset().left + el.width()
    cube.flag = false
    cube.toggle = false
    cube.limit = function (cord) {
        let isIn = {
            x: false,
            y: false
        }
        
        cord.oldx > cube.w && cord.oldx < cube.e ? isIn.x = true : isIn.x = false
        cord.oldy > cube.n && cord.oldy < cube.s ? isIn.y = true : isIn.y = false

        switch (true) {
            case !isIn.x && !isIn.y && !cube.flag: //在外面也沒觸發過
                cube.flag = false
                // console.log('在外面也沒觸發過')
                break
            case isIn.x && isIn.y && !cube.flag && !cube.toggle: //初次進入
                el.css('background','#fff')
                cube.flag = true
                console.log('初次進入')
                break
            case (!isIn.x || !isIn.y) && cube.flag && !cube.toggle: //初次離開
                cube.flag = false
                cube.toggle = true
                console.log('初次離開')
                break
            case isIn.x && isIn.y && !cube.flag && cube.toggle: //二次進入
                el.css('background','#845')
                cube.flag = true
                console.log('二次進入')
                break
            case (!isIn.x || !isIn.y) && cube.flag && cube.toggle: //二次離開
                cube.flag = false
                cube.toggle = false
                console.log('二次離開')
                break
        }
    }
    return cube
}

let cubeAry = []
for(let i = 0; i < $('.cube').length; i ++) {
    cubeAry[i] = new CreateCube($('.cube').eq(i))
    touchLimit(cubeAry[i])
}
function touchLimit (cube) {
    $('body').on('touchstart',function (e) {
        cord.oldx = e.touches[0].pageX
        cord.oldy = e.touches[0].pageY
        cube.limit(cord)
    })
    $('body').on('touchmove',function (e) {
        cord.oldx = e.touches[0].pageX
        cord.oldy = e.touches[0].pageY
        cube.limit(cord)
    })
    $('body').on('touchend',function (e) {
        cord.oldx = e.changedTouches[0].pageX
        cord.oldy = e.changedTouches[0].pageY
        cube.limit(cord)
    })
}
