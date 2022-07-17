// need to look how to import values from board.js
const noOfRows = 5;
const noOfCols = 5;

// This class represents a move made by a player
class Move{
    constructor(prevRowIndex, prevColIndex, newRowIndex, newColIndex, forPiece){
        this.prevColIndex = prevColIndex;
        this.prevRowIndex = prevRowIndex;
        this.newColIndex = newColIndex;
        this.newRowIndex = newRowIndex;
        this.forPiece = forPiece;
    }

    // This function returns index change based on the move and player
    // An array is returned, first element is row changes, second element is col change
    static getIndexChangeForMove(move, player){
        if(move == 'F')
        {
            if(player.name == 'P1')
                return [-1, 0]
            else
                return [1, 0]
        }
        else if(move == 'B')
        {
            if(player.name == 'P1')
                return [1, 0]
            else
                return [-1, 0]
        }
        else if(move == 'L')
        {
            //if(player.name == 'P1')
                return [0, -1]
            //else
            //    return [0, 1]
        }
        else
        {
            //if(player.name == 'P1')
                return [0, 1]
            //else
            //    return [0, -1]
        }
    }

    // This API checks if the move is valid, 
    // returns True for valid move
    // returns False for invalid move
    isMoveValid(board, player){
        // move results in out of board
        if(this.newRowIndex >= noOfRows || this.newColIndex >= noOfCols || this.newColIndex < 0 || this.newRowIndex < 0)
        {
            return false;
        }
        let t = board[0][0]
        let currPiece = board[this.prevRowIndex][this.prevColIndex];
        let pieceAtNewPos = board[this.newRowIndex][this.newColIndex];
        

        // new posiion is empty
        if(pieceAtNewPos == null)
        {
            return true;
        }

        // to handle if a player attacks his own piece
        if(pieceAtNewPos.player == currPiece.player){
            
            return false;
        }

        return true;
    }
}

export default Move