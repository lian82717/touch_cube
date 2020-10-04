let el
let start = false
let idAry = []
let elCord = {
    x: 0,
    y: 0
}
let cord = {
    x: 0,
    y: 0
}
let nextEl = [document.querySelectorAll('.cube')[1]]

//每個格子有16種可能性，0~15，每個邊代表二進制的個十百千，可通過為0，不可通過為1
//四方不可通行為0000，四方通行為1111(上右下左)
//四個編的編號為二進制1/2/4/8(上右下左)
//使用位元運算&，判斷格子是否能走，例如 6 & 2 !== 0 代表可以走 6 & 1 == 代表不可走


$('.cube[data-id="1"]').on('touchstart',function(){
    start = true
    this.setAttribute('is-touch','true')
})

$('.maze_wrap').on('touchstart',function (e) {
    e.preventDefault();
    cord.x = e.touches[0].pageX
    cord.y = e.touches[0].pageY
    el = document.elementFromPoint(cord.x, cord.y)
    setTouchEl()
    move()
})
$('.maze_wrap').on('touchmove',function (e) {
    e.preventDefault();
    cord.x = e.touches[0].pageX
    cord.y = e.touches[0].pageY
    el = document.elementFromPoint(cord.x, cord.y)
    setTouchEl()
    move()
})
$('.maze_wrap').on('touchend',function (e) {
    e.preventDefault();
    cord.x = e.changedTouches[0].pageX
    cord.y = e.changedTouches[0].pageY
    el = document.elementFromPoint(cord.x, cord.y)
    setTouchEl()
    move()
})

function setTouchEl () {
    elCord.x = $(el).offset().left
    elCord.y = $(el).offset().top
}

function move () {
    nextEl.forEach (e => {
        if (e) {
            if (document.elementFromPoint(elCord.x, elCord.y).getAttribute('data-id') === e.getAttribute('data-id')) {
                verifyLimit()
                console.log('test')
                if (el.getAttribute('is-touch') === 'false') {
                    idAry.push(el.getAttribute('data-id'))
                    el.setAttribute('is-touch','true')
                } else {
                    let prevEl = document.querySelector(`.cube[data-id="${idAry[idAry.length-1]}"]`)
                    prevEl.setAttribute('is-touch','false')
                    idAry.splice(idAry.indexOf(prevEl.getAttribute('data-id')),1)
                }
                console.log(idAry)
            }
        }
    })
    
    function verifyLimit () {
        let mazeID = parseInt(el.getAttribute('maze-id'))
        let cell = {
            t: dir(1),
            r: dir(2),
            b: dir(4),
            l: dir(8)
        }
        nextEl = []
        console.log(cell)
        if (cell.t) {
            nextEl.push(document.elementFromPoint(elCord.x, elCord.y - $(el).height()))
        }
        if (cell.r) {
            nextEl.push(document.elementFromPoint(elCord.x + $(el).width(), elCord.y))
        }
        if (cell.b) {
            nextEl.push(document.elementFromPoint(elCord.x, elCord.y + $(el).height()))
        }
        if (cell.l) {
            nextEl.push(document.elementFromPoint(elCord.x - $(el).width(), elCord.y))
        }
        function dir (num) {
            if (mazeID & num){
                return true
            } else {
                return false
            }
        }
    }
}

