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

const player = new Player()

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
}

animate()


addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
        case 65:
            console.log('Left')
            break
        case 83:
            console.log('Down')
            break
        case 68:
            console.log('Right')
            break
        case 87:
            console.log('Up')
            player.velocity.y -= 20
            break
    } 
})