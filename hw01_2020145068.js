const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2');

if(!gl){
    console.error('WebGL2 is not supported by your browser');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const halfWidth = canvas.width/2;
const halfHeight = canvas.height/2;

gl.enable(gl.SCISSOR_TEST);
render();

function render(){
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;

    // Top-left viewport (blue)
    gl.viewport(0, halfHeight, halfWidth, halfHeight);
    gl.scissor(0, halfHeight, halfWidth, halfHeight);
    gl.clearColor(0.8, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Top-right viewport (green)
    gl.viewport(halfWidth, halfHeight, halfWidth, halfHeight);
    gl.scissor(halfWidth, halfHeight, halfWidth, halfHeight);
    gl.clearColor(0, 0.7, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bottom-left viewport (blue)
    
    gl.clearColor(0, 0, 0.8, 1.0);
    gl.viewport(0, 0, halfWidth, halfHeight);
    gl.scissor(0, 0, halfWidth, halfHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bottom-right viewport (yellow)
    gl.viewport(halfWidth, 0, halfWidth, halfHeight);
    gl.scissor(halfWidth, 0, halfWidth, halfHeight);
    gl.clearColor(1.0, 1.0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,canvas.width, canvas.height);
    render();
});