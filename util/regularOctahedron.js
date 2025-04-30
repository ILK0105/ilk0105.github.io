export class Octahedron {
    constructor(gl, options = {}) {
        this.gl = gl;

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        // 정점 위치 (6개의 꼭짓점)
        this.vertices = new Float32Array([
            // 위쪽 정사면체
            0.0, 0.7071, 0.0,  // v0 (위쪽 꼭짓점)
            -0.5, 0.0, -0.5,   // v2
             0.5, 0.0, -0.5,   // v3
        
            0.0, 0.7071, 0.0,  // v0
             0.5, 0.0, -0.5,   // v3
             0.5, 0.0,  0.5,   // v4
        
            0.0, 0.7071, 0.0,  // v0
             0.5, 0.0,  0.5,   // v4
            -0.5, 0.0,  0.5,   // v5
        
            0.0, 0.7071, 0.0,  // v0
            -0.5, 0.0,  0.5,   // v5
            -0.5, 0.0, -0.5,   // v2
        
            // 아래쪽 정사면체
            0.0, -0.7071, 0.0, // v1 (아래쪽 꼭짓점)
            -0.5, 0.0, -0.5,   // v2
             0.5, 0.0, -0.5,   // v3
        
            0.0, -0.7071, 0.0, // v1
             0.5, 0.0, -0.5,   // v3
             0.5, 0.0,  0.5,   // v4
        
            0.0, -0.7071, 0.0, // v1
             0.5, 0.0,  0.5,   // v4
            -0.5, 0.0,  0.5,   // v5
        
            0.0, -0.7071, 0.0, // v1
            -0.5, 0.0,  0.5,   // v5
            -0.5, 0.0, -0.5    // v2
        ]);

        // 법선 벡터 (각 면의 방향)
        this.normals = new Float32Array([
            // 위쪽 정사면체 (4개의 삼각형)
            0.0, 1, -1,  // v0-v2-v3
            1, 1, 0.0,   // v0-v3-v4
            0.0, 1, 1,   // v0-v4-v5
            -1, 1, 0.0,  // v0-v5-v2

            // 아래쪽 정사면체 (4개의 삼각형)
            0.0, -1, -1, // v1-v2-v3
            1, -1, 0.0,  // v1-v3-v4
            0.0, -1, 1,  // v1-v4-v5
            -1, -1, 0.0  // v1-v5-v2
        ]);

        // 정점 색상 (각 면에 다른 색상)
        this.colors = new Float32Array([
            // 위쪽 정사면체
            1, 0, 0, 1,   1, 0, 0, 1,   1, 0, 0, 1,   // 빨강
            0, 1, 0, 1,   0, 1, 0, 1,   0, 1, 0, 1,   // 초록
            0, 0, 1, 1,   0, 0, 1, 1,   0, 0, 1, 1,   // 파랑
            1, 1, 0, 1,   1, 1, 0, 1,   1, 1, 0, 1,   // 노랑

            // 아래쪽 정사면체
            1, 0, 1, 1,   1, 0, 1, 1,   1, 0, 1, 1,   // 자홍
            0, 1, 1, 1,   0, 1, 1, 1,   0, 1, 1, 1,   // 청록
            1, 0.5, 0, 1, 1, 0.5, 0, 1, 1, 0.5, 0, 1, // 주황
            0.5, 0, 1, 1, 0.5, 0, 1, 1, 0.5, 0, 1, 1  // 보라
        ]);

        // 텍스처 좌표
        this.texCoords = new Float32Array([
            // 위쪽 정사면체
            0.5, 1.0,   0.0, 0.5,   0.25, 0.5, // v0-v2-v3
            0.5, 1.0,   0.25, 0.5,   0.5, 0.5, // v0-v3-v4
            0.5, 1.0,   0.5, 0.5,   0.75, 0.5, // v0-v4-v5
            0.5, 1.0,   0.75, 0.5,   1.0, 0.5, // v0-v5-v2
        
            // 아래쪽 정사면체
            0.5, 0.0,   0.0, 0.5,   0.25, 0.5, // v1-v2-v3
            0.5, 0.0,   0.25, 0.5,   0.5, 0.5, // v1-v3-v4
            0.5, 0.0,   0.5, 0.5,   0.75, 0.5, // v1-v4-v5
            0.5, 0.0,   0.75, 0.5,   1.0, 0.5  // v1-v5-v2
        ]);

        // 인덱스 데이터 (8개의 삼각형)
        this.indices = new Uint16Array([
            0, 1, 2,   // v0-v2-v3
            3, 4, 5,   // v0-v3-v4
            6, 7, 8,   // v0-v4-v5
            9, 10, 11, // v0-v5-v2
            12, 13, 14, // v1-v2-v3
            15, 16, 17, // v1-v3-v4
            18, 19, 20, // v1-v4-v5
            21, 22, 23  // v1-v5-v2
        ]);

        this.initBuffers();
    }
    initBuffers() {
        const gl = this.gl;

        const vSize = this.vertices.byteLength;
        const nSize = 0;//this.normals.byteLength=0;
        const cSize = this.colors.byteLength;
        const tSize = this.texCoords.byteLength;
        const totalSize = vSize + nSize + cSize + tSize;

        gl.bindVertexArray(this.vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, totalSize, gl.STATIC_DRAW);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize, this.normals);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize + nSize, this.colors);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize + nSize + cSize, this.texCoords);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, vSize);
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, vSize + nSize);
        gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, vSize + nSize + cSize);

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
    /*
    initBuffers() {
        const gl = this.gl;

        const vSize = this.vertices.byteLength;
        const tSize = this.texCoords.byteLength;
        const totalSize = vSize + tSize;

        gl.bindVertexArray(this.vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, totalSize, gl.STATIC_DRAW);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize, this.texCoords);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0); // Position
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, vSize); // Texture Coordinates

        gl.enableVertexAttribArray(0); // Enable position attribute
        gl.enableVertexAttribArray(1); // Enable texture coordinate attribute

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }
        */
    draw(shader) {
        const gl = this.gl;
        shader.use();
        gl.bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }

    delete() {
        const gl = this.gl;
        gl.deleteBuffer(this.vbo);
        gl.deleteBuffer(this.ebo);
        gl.deleteVertexArray(this.vao);
    }
}