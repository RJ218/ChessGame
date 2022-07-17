const pawnForntMovement = 1;
const pawnBackMovement = 1;
const pawnRightMovement = 1;
const pawnLeftMovement = 1;

// Represents a piece in the game
class Piece{
    constructor(name, player){
         this.name = name.trim();
         // Color represents the plaer to which this pawn belongs
         this.player = player;
         // True implies that this pawn is alive in the match
         this.isAlive = true;

         this.rowIndex = null;
         this.colIndex = null;
    }

    killPiece(){
        this.isAlive = false;
    }
}

// Represents a pawn in the game
class Pawn extends Piece{
    constructor(name, color)
    {
        super(name, color);
    }

}


export default Pawn