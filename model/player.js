
//Represents a player
class Player{
    constructor(color, name){
        this.color = color;
        this.name = name.trim();
        this.currentPiecesOnBoard = 0;
    }
}


export default Player