const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth // you dont need window
canvas.height = window.innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        } else{
            this.velocity.y = 0
        }

        if(player.position.y < 0){
            player.velocity.y = 0
            player.position.y = 0
        }

        

    }
}

class Platform {
    constructor({x,y}) {
        this.position = {
            x,
            y  // same as y: y
        }
        this.width = 200
        this.height = 20
    }
    
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
const platforms = [new Platform({x:300,y:400}), new Platform({x:600,y:500})]


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    }) 

    if(keys.right.pressed && player.position.x < 800) {
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }else{

        player.velocity.x = 0

        if(keys.right.pressed){
            platforms.forEach(platform => {
                platform.position.x -= 5
            }) 
        } else if (keys.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 5
            }) 
        }
    }
    //platform collision
    platforms.forEach(platform => {
        if(
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x <= platform.position.x + platform.width &&
            player.position.x + player.width >= platform.position.x
            ){
            player.velocity.y = 0
        }
    }) 
    
}

animate()


addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
        case 65:
            console.log('Left')
            keys.left.pressed = true
            break
        case 83:
            console.log('Down')
            break
        case 68:
            console.log('Right')
            keys.right.pressed = true

            break
        case 87:
            console.log('Up')
            if(player.velocity.y === 0){
                player.velocity.y -= 20
            }
            break
    } 
})
addEventListener('keyup', ({ keyCode }) => {
    switch(keyCode) {
        case 65:
            console.log('Left')
            keys.left.pressed = false
            break
        case 83:
            console.log('Down')
            break
        case 68:
            console.log('Right')
            keys.right.pressed = false
            break
        case 87:
            console.log('Up')
            break
    } 
})