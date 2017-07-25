
THREE = THREE || {};

THREE.IFS  = THREE.IFS    || {};

THREE.IFS.SierpinskiDodecahedron = THREE.IFS.SierpinskiDodecahedron  || {};

THREE.IFS.SierpinskiDodecahedron.createBufferGeometry = function(iterations) {
    var GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
    var scaleFactor = 1/(1+GOLDEN_RATIO);

    var dodecahedronVertices = new Float32Array([
        (2*Math.cos(2*0*Math.PI/5)), (2*Math.sin(2*0*Math.PI/5)), GOLDEN_RATIO+1, // 0
        (2*Math.cos(2*1*Math.PI/5)), (2*Math.sin(2*1*Math.PI/5)), GOLDEN_RATIO+1, // 1
        (2*Math.cos(2*2*Math.PI/5)), (2*Math.sin(2*2*Math.PI/5)), GOLDEN_RATIO+1, // 2
        (2*Math.cos(2*3*Math.PI/5)), (2*Math.sin(2*3*Math.PI/5)), GOLDEN_RATIO+1, // 3
        (2*Math.cos(2*4*Math.PI/5)), (2*Math.sin(2*4*Math.PI/5)), GOLDEN_RATIO+1, // 4

        (2*GOLDEN_RATIO*Math.cos(2*0*Math.PI/5)), (2*GOLDEN_RATIO*Math.sin(2*0*Math.PI/5)), GOLDEN_RATIO-1, // 5
        (2*GOLDEN_RATIO*Math.cos(2*1*Math.PI/5)), (2*GOLDEN_RATIO*Math.sin(2*1*Math.PI/5)), GOLDEN_RATIO-1, // 6
        (2*GOLDEN_RATIO*Math.cos(2*2*Math.PI/5)), (2*GOLDEN_RATIO*Math.sin(2*2*Math.PI/5)), GOLDEN_RATIO-1, // 7
        (2*GOLDEN_RATIO*Math.cos(2*3*Math.PI/5)), (2*GOLDEN_RATIO*Math.sin(2*3*Math.PI/5)), GOLDEN_RATIO-1, // 8
        (2*GOLDEN_RATIO*Math.cos(2*4*Math.PI/5)), (2*GOLDEN_RATIO*Math.sin(2*4*Math.PI/5)), GOLDEN_RATIO-1, // 9

        (-2*GOLDEN_RATIO*Math.cos(2*0*Math.PI/5)), (-2*GOLDEN_RATIO*Math.sin(2*0*Math.PI/5)), -(GOLDEN_RATIO-1), // 10
        (-2*GOLDEN_RATIO*Math.cos(2*1*Math.PI/5)), (-2*GOLDEN_RATIO*Math.sin(2*1*Math.PI/5)), -(GOLDEN_RATIO-1), // 11
        (-2*GOLDEN_RATIO*Math.cos(2*2*Math.PI/5)), (-2*GOLDEN_RATIO*Math.sin(2*2*Math.PI/5)), -(GOLDEN_RATIO-1), // 12
        (-2*GOLDEN_RATIO*Math.cos(2*3*Math.PI/5)), (-2*GOLDEN_RATIO*Math.sin(2*3*Math.PI/5)), -(GOLDEN_RATIO-1), // 13
        (-2*GOLDEN_RATIO*Math.cos(2*4*Math.PI/5)), (-2*GOLDEN_RATIO*Math.sin(2*4*Math.PI/5)), -(GOLDEN_RATIO-1), // 14

        (-2*Math.cos(2*0*Math.PI/5)), (-2*Math.sin(2*0*Math.PI/5)), -(GOLDEN_RATIO+1), // 15
        (-2*Math.cos(2*1*Math.PI/5)), (-2*Math.sin(2*1*Math.PI/5)), -(GOLDEN_RATIO+1), // 16
        (-2*Math.cos(2*2*Math.PI/5)), (-2*Math.sin(2*2*Math.PI/5)), -(GOLDEN_RATIO+1), // 17
        (-2*Math.cos(2*3*Math.PI/5)), (-2*Math.sin(2*3*Math.PI/5)), -(GOLDEN_RATIO+1), // 18
        (-2*Math.cos(2*4*Math.PI/5)), (-2*Math.sin(2*4*Math.PI/5)), -(GOLDEN_RATIO+1), // 19
    ]);

    var dodecahedronFaceIndexes = new Uint8Array([
        // one of pair of opposite pentagons parallel to xy plane
        // 0, 1, 2, 3, 4
        1, 3, 0, 
        1, 2, 3,
        0, 3, 4,

        // 0, 4, 5, 9, 12
        4, 12, 0,
        12, 5, 0,
        12, 4, 9,

        // 3, 4, 8, 9, 11
        3, 11, 4,
        3, 8, 11,
        4, 11, 9,
        
        // 2, 3, 7, 8, 10
        2, 10, 3,
        2, 7, 10,
        3, 10, 8,
        
        // 1, 2, 6, 7, 14
        1, 14, 2,
        1, 6, 14,
        2, 14, 7,

        // 0, 1, 5, 6, 13
        0, 13, 1,
        0, 5, 13,
        1, 13, 6,


        // 15, 16, 17, 18, 19
        15, 18, 16,
        15, 19, 18,
        16, 18, 17,

        // 15, 19, 10, 14, 7
        15, 7, 19,
        15, 10, 7,
        19, 7, 14,

        // 18, 19, 13, 14, 6
        19, 6, 18,
        6, 13, 18,
        6, 19, 14, 

        // 17, 18, 12, 13, 5
        18, 5, 17,
        5, 12, 17,
        5, 18, 13, 

        // 16, 17, 11, 12, 9
        17, 9, 16,
        9, 11, 16,
        9, 17, 12, 

        // 15, 16, 10, 11, 8
        16, 8, 15,
        8, 10, 15,
        8, 16, 11
    ]);

    var texCoordLookup = [          
        [0.7847, 0.0639, 0.5, 0.9375, 0.2167, 0.0639 ],
        [0.7847, 0.0639, 0.9597, 0.6056, 0.5, 0.9375 ],
        [0.2167, 0.0639, 0.5, 0.9375, 0.0417, 0.6056 ]
    ];
    
    var contractionMappings = BuildContractionMappings(dodecahedronVertices, scaleFactor);

    var vertices;
    var normals; // normals calculated automatically by PolyhedronBufferGeometry?
    var uvs;

    ComputeVerticesNormalsIndexes();

    for(var i=0; i<iterations; i++)
        ApplyContractionMappings();

    // var indices = new Uint32Array(vertices.length);
    // for(var i=0; i<indices.length; i++)
    //  indices[i] = i;

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ));
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

    return geometry;

    // helper functions
    function BuildContractionMappings(vertices, scaleFactor){
        var cm = [[]];

        for (var i = 0; i < 20; i++)
        {
            var x = vertices[i * 3];
            var y = vertices[1 + i * 3];
            var z = vertices[2 + i * 3];

            cm.push([
                scaleFactor,
                0.0,
                0.0,
                0.0,
                scaleFactor,
                0.0,
                0.0,
                0.0,
                scaleFactor,
                x - scaleFactor*x,
                y - scaleFactor*y,
                z - scaleFactor*z ]);
        }

        return cm;
    };

    function ComputeVerticesNormalsIndexes(){
        var localVertices = [];
        var localNormals = [];
        var localUvs = [];
        var pentagonSegment = 0;
        
        console.log("dodecahedronFaceIndexes.length = " + dodecahedronFaceIndexes.length);

        for (var i = 0; i < dodecahedronFaceIndexes.length; i += 3)
        {
            var i1 = dodecahedronFaceIndexes[i] * 3;
            var i2 = dodecahedronFaceIndexes[i + 1] * 3;
            var i3 = dodecahedronFaceIndexes[i + 2] * 3;

            // get the vertices for this triangular pentagon segement
            var ax = dodecahedronVertices[i1];
            var ay = dodecahedronVertices[i1 + 1];
            var az = dodecahedronVertices[i1 + 2];

            var bx = dodecahedronVertices[i2];
            var by = dodecahedronVertices[i2 + 1];
            var bz = dodecahedronVertices[i2 + 2];

            var cx = dodecahedronVertices[i3];
            var cy = dodecahedronVertices[i3 + 1];
            var cz = dodecahedronVertices[i3 + 2];

            var ux = bx - ax;
            var uy = by - ay;
            var uz = bz - az;

            var vx = bx - cx;
            var vy = by - cy;
            var vz = bz - cz;

            var nx = (uz * vy) - (uy * vz);
            var ny = (ux * vz) - (uz * vx);
            var nz = (uy * vx) - (ux * vy);

            // get the texture coordinates
            var texa_x, texa_y, texb_x, texb_y, texc_x, texc_y;

            texa_x = texCoordLookup[pentagonSegment][0];
            texa_y = texCoordLookup[pentagonSegment][1];
            texb_x = texCoordLookup[pentagonSegment][2];
            texb_y = texCoordLookup[pentagonSegment][3];
            texc_x = texCoordLookup[pentagonSegment][4];
            texc_y = texCoordLookup[pentagonSegment][5];

            pentagonSegment = pentagonSegment >= 2 ? 0 : pentagonSegment + 1;

            // append vertices, normals and texcoords to list
            localVertices.push(ax, ay, az, bx, by, bz, cx, cy, cz);
            localNormals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz);
            localUvs.push(texa_x, texa_y, texb_x, texb_y, texc_x, texc_y);
        }
        
        vertices = Float32Array.from(localVertices);
        normals = Float32Array.from(localNormals);
        uvs = Float32Array.from(localUvs);
    }

    function ApplyContractionMappings(){
        var localVertices = new Float32Array(vertices.length*contractionMappings.length);
        var localNormals = new Float32Array(normals.length*contractionMappings.length);
        var localUvs = new Float32Array(uvs.length*contractionMappings.length);

        // copy the uvs.
        for(var p=0; p<contractionMappings.length; p++) {
            localUvs.set(uvs, p*uvs.length);
            localNormals.set(normals, p*normals.length);
        }
        uvs = localUvs;
        normals = localNormals;

        var index = 0;
        for (var m = 0; m < contractionMappings.length; m++)
        {
            var a = contractionMappings[m][0];
            var b = contractionMappings[m][1];
            var c = contractionMappings[m][2];
            var d = contractionMappings[m][3];
            var e = contractionMappings[m][4];
            var f = contractionMappings[m][5];
            var g = contractionMappings[m][6];
            var h = contractionMappings[m][7];
            var i = contractionMappings[m][8];
            var j = contractionMappings[m][9];
            var k = contractionMappings[m][10];
            var l = contractionMappings[m][11];
            
            for (var n = 0; n < vertices.length; n += 3)
            {
                var x = vertices[n];
                var y = vertices[n + 1];
                var z = vertices[n + 2];

                var xdash = a * x + b * y + c * z + j;
                var ydash = d * x + e * y + f * z + k;
                var zdash = g * x + h * y + i * z + l;

                localVertices[index] = xdash;
                //localNormals[index] = normals[n];
                index++;

                localVertices[index] = ydash;
                //localNormals[index] = normals[n+1];
                index++;

                localVertices[index] = zdash;
                //localNormals[index] = normals[n+2];
                index++;
            }
        }
        vertices = localVertices;
        normals = localNormals;
    }

}