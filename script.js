const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
let puzzleImage = new Image();
let puzzlePieces = [];
let puzzleGrid = 3; // default size for 'easy' (3x3)
//we have 4x4 grid for medium
//we have 5x5 grid for hard

//it still zont work idk why 
//gotta work more ig
puzzleImage.src = 'https://via.placeholder.com/500'; 

puzzleImage.onload = () => {
    drawPuzzle();
};

function drawPuzzle() {
    puzzlePieces = [];
    const pieceWidth = canvas.width / puzzleGrid;
    const pieceHeight = canvas.height / puzzleGrid;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let row = 0; row < puzzleGrid; row++) {
        for (let col = 0; col < puzzleGrid; col++) {
            const piece = {
                x: col * pieceWidth,
                y: row * pieceHeight,
                width: pieceWidth,
                height: pieceHeight,
                imgX: col * pieceWidth,
                imgY: row * pieceHeight,
                imgWidth: pieceWidth,
                imgHeight: pieceHeight,
            };
            puzzlePieces.push(piece);
            ctx.drawImage(puzzleImage, piece.imgX, piece.imgY, piece.imgWidth, piece.imgHeight, piece.x, piece.y, piece.width, piece.height);
   //got help idk how to do this from stcreatch yes
        }
    }
}

document.getElementById('easyBtn').addEventListener('click', function() {
    setDifficulty(3); 
});

document.getElementById('mediumBtn').addEventListener('click', function() {
    setDifficulty(4); 
});

document.getElementById('hardBtn').addEventListener('click', function() {
    setDifficulty(5); 
});

function setDifficulty(gridSize) {
    puzzleGrid = gridSize;
    canvas.width = 500; 
    canvas.height = 500; 
    drawPuzzle(); 
}
