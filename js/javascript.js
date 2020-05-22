// @ts-check
let canvas = null
let ctx = null
let GoL = null
let x_grid_w = null
let y_grid_h = null
let grid_ratio = 2
let pause = false


window.addEventListener("load", ()=>{
    canvas = document.querySelector("canvas")
    ctx = canvas.getContext("2d")
    x_grid_w = Math.floor(canvas.width/grid_ratio)
    y_grid_h = Math.floor(canvas.height/grid_ratio)
    GoL = new GoLmodel(x_grid_w*2,y_grid_h*2)
    tick()
})

window.addEventListener("keydown",(event)=>{
    if(event.keyCode == 32){
        pause = true
        setTimeout(()=>{pause = false},10000)
    }
})

const tick = () =>{

    if(!pause){
        let newTiles = GoL.tick()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        let cpt = 0
        for(let y = 0; y < y_grid_h*2; y++ ){
            for(let x = 0; x < x_grid_w*2; x++){
                if (newTiles[cpt] >0) {
                    // let hue = (GoL.sh - (newTiles[cpt] * GoL.rg))%360
                    // ctx.fillStyle = 'hsl( '+ hue +',100%,50%)'
                    let hue = (newTiles[cpt] * GoL.rg) + 140
                    ctx.fillStyle = 'rgba( '+ hue +','+hue+','+hue+','+'1)'
                }
                else{
                    ctx.fillStyle = "rgba(0,0,0,0)"
                }
                ctx.fillRect(x*grid_ratio,y*grid_ratio,grid_ratio,grid_ratio)
                cpt++
            }
        }
    }
    setTimeout(() =>{window.requestAnimationFrame(tick)}, GoL.sp)
    
}


