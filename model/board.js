const noOfRows = 5;
const noOfCols = 5;

// Represents the board
class Board{
    constructor(){
        this.board = new Array(noOfRows).fill(null).map(()=>new Array(noOfCols).fill(null));
    }

    initializeBoard(selectedPlayerArr, player)
    {
        let rowIndex = 0;
        let colIndex = 0;
        if(player.name == 'P1')
            rowIndex = noOfRows - 1;

        for(var i in selectedPlayerArr )
        {
            this.board[rowIndex][colIndex] = selectedPlayerArr[i];
            selectedPlayerArr[i].rowIndex = rowIndex;
            selectedPlayerArr[i].colIndex = colIndex
            colIndex++;
            player.currentPiecesOnBoard++;
        }
    }

    // This function displays the current board
    displayBoard(){
        for(var rowIndex = 0; rowIndex < noOfRows; rowIndex++)
        {
            let currentRow = "";
            for(var colIndex = 0; colIndex < noOfCols; colIndex++)
            {
                let currPiece = this.board[rowIndex][colIndex]
                if(currPiece == null)
                    currentRow += '_ ';
                else
                    currentRow += (currPiece.name + ' ');
            }
            console.log(currentRow);
        }
    }

    // This function updates the current board
    updateBoard(move){
        // For safe check, again checked
        if(move.isMoveValid(this.board)){

                let currPiece = this.board[move.prevRowIndex][move.prevColIndex]
                let newPosPiece = this.board[move.newRowIndex][move.newColIndex]

                if(newPosPiece != null)
                {
                    newPosPiece.player.currentPiecesOnBoard--;
                }
                this.board[move.newRowIndex][move.newColIndex] = currPiece;
                currPiece.rowIndex = move.newRowIndex;
                currPiece.colIndex = move.newColIndex;
                this.board[move.prevRowIndex][move.prevColIndex] = null;

        }
    }

    getPieceObjFromBoard(pieceName, player){
        for(var rowIndex = 0; rowIndex < noOfRows; rowIndex++)
        {
            for(var colIndex = 0; colIndex < noOfCols; colIndex++)
            {
                let currPiece = this.board[rowIndex][colIndex]
                if(currPiece == null)
                    continue
                if(currPiece.name == pieceName && currPiece.player == player)
                    return currPiece;
                
            }
        }
        return null; 

    }

    getPieceOnBoard(rowIndex, colIndex){
        //can check if provided indexes are on board
        return this.board[rowIndex][colIndex];
    }
}

export default Board