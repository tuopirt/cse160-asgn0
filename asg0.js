// DrawRectangle.js
let ctx;

function main() {
    // Retrieve <canvas> element <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');

    // Draw a black rectangle <- (3)
    ctx.fillStyle = 'black'; // Set a black color
    ctx.fillRect(0, 0, 400, 400); //canvas size

    // Create vector v1 with Vector3
    var v1 = new Vector3([2.25, 2.25, 0]); // Example vector (1, 1, 0)

    // Call drawVector
    drawVector(v1, "red");
}

function drawVector(v, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();

    // Origin value to center
    var originX = 200;
    var originY = 200;
    ctx.moveTo(originX, originY);

    // Scale coord by 20
    var x = v.elements[0] * 20;
    var y = v.elements[1] * 20;
    // Draw
    ctx.lineTo(originX + x, originY - y);
    ctx.stroke();
}

function handleDrawEvent() {
    // Clear the canvas.
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Read the values of the text boxes to create v1.
    var xCoordV1 = parseFloat(document.getElementById('xCoordV1').value);
    var yCoordV1 = parseFloat(document.getElementById('yCoordV1').value);
    var v1 = new Vector3([xCoordV1, yCoordV1, 0]);

    // Call drawVector(v1, "red") 
    drawVector(v1, "red");

    // Read the values of the text boxes to create v2.
    var xCoordV2 = parseFloat(document.getElementById('xCoordV2').value);
    var yCoordV2 = parseFloat(document.getElementById('yCoordV2').value);
    var v2 = new Vector3([xCoordV2, yCoordV2, 0]);

    // Call drawVector(v1, "red") 
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    // Clear the canvas.
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Read the values of the text boxes to create v1 and call drawVector(v1, "red") .  
    var xCoordV1 = parseFloat(document.getElementById('xCoordV1').value);
    var yCoordV1 = parseFloat(document.getElementById('yCoordV1').value);
    var v1 = new Vector3([xCoordV1, yCoordV1, 0]);
    drawVector(v1, "red");

    // Read the values of the text boxes to create v2 and call drawVector(v2, "blue") .
    var xCoordV2 = parseFloat(document.getElementById('xCoordV2').value);
    var yCoordV2 = parseFloat(document.getElementById('yCoordV2').value);
    var v2 = new Vector3([xCoordV2, yCoordV2, 0]);
    drawVector(v2, "blue");
    
    // Read the value of the selector and call the respective Vector3 function. 
    var operation = document.getElementById('operationSelect').value;
    var scalar = parseFloat(document.getElementById('scalarInput').value);
        // For add and sub operations, draw a green vector v3 = v1 + v2  or v3 = v1 - v2. 
        if (operation === 'add') {
            var v3 = new Vector3(v1.elements);
            v3.add(v2); // v3 = v1 + v2
            drawVector(v3, "green");
        } else if (operation === 'sub') {
            var v3 = new Vector3(v1.elements);
            v3.sub(v2); // v3 = v1 - v2
            drawVector(v3, "green");

        // For mul and div operations, draw two green vectors v3 = v1 * s and v4 = v2 * s.
        } else if (operation === 'mul') {
            var v3 = new Vector3(v1.elements);
            v3.mul(scalar); // v3 = v1 * s
            drawVector(v3, "green");
    
            var v4 = new Vector3(v2.elements);
            v4.mul(scalar); // v4 = v2 * s
            drawVector(v4, "green");
        } else if (operation === 'div') {
            var v3 = new Vector3(v1.elements);
            v3.div(scalar); // v3 = v1 / s
            drawVector(v3, "green");
    
            var v4 = new Vector3(v2.elements);
            v4.div(scalar); // v4 = v2 / s
            drawVector(v4, "green");

        // Magnitude & Normalize
        } else if (operation === 'magnitude') {
            console.log("Magnitude v1: " + v1.magnitude());
            console.log("Magnitude v2: " + v2.magnitude());
        } else if (operation === 'normalize') {
            v1.normalize();
            v2.normalize();
            drawVector(v1, "green");
            drawVector(v2, "green");

        } else if (operation === 'angleBetween') {
            angleBetween(v1, v2);

        } else if (operation === 'area') {
            areaTriangle(v1, v2);
        }
}

function angleBetween(v1, v2){
    // Dot product
    let dotProd = Vector3.dot(v1, v2);

    // Find magnitudes
    let magV1 = v1.magnitude();
    let magV2 = v2.magnitude();

    // Compute angle
    let cosAngle = dotProd / (magV1 * magV2);
    let angleRad = Math.acos(cosAngle);
    let angleDeg = angleRad * (180 / Math.PI);

    // Print to console
    console.log("Angle: " + angleDeg );
    
    return angleDeg;
}

function areaTriangle(v1, v2){
    // Cross product
    let crossProd = Vector3.cross(v1, v2);

    // Find magnitudes
    let crossMag = crossProd.magnitude();

    // Calculate area
    let area = 0.5 * crossMag;

    // Print to console
    console.log("Area: " + area);

    return area;
}