import Board from "./board.js";
import Player from "./player.js";
import Pawn from "./gamePieces.js";
import Move from "./move.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ps = require("prompt-sync")
const prompt = ps()

// Represents a Match
class Match{
    constructor(){
        this.board = new Board();
        this.winner = null;
        this.player1 = null;
        this.player2 = null;
    }

    initializeMatch()
    {
        this.player1 = new Player('RED', 'P1');
        this.player2 = new Player('BLUE', 'P2');

        let player1PieceArr = this.takeInitialPieceInfo(this.player1);
        this.board.initializeBoard(player1PieceArr, this.player1);
        let player2PieceArr = this.takeInitialPieceInfo(this.player2);
        this.board.initializeBoard(player2PieceArr, this.player2);

    }

    takeInitialPieceInfo(player){
        let validInfoFound = false;
        while(!validInfoFound){
            let input = prompt(player.name + ' enter selected warriors:')
            //let input = "p1, p2,p3,p4,p5";
            let enteredInfoArr = input.split(',');
            if(enteredInfoArr.length == 5)
            {
                let pieceArr = []
                for(let i in enteredInfoArr)
                {
                    let pawnObj = new Pawn(enteredInfoArr[i], player)
                    pieceArr.push(pawnObj);
                }
                validInfoFound = true;
                return pieceArr;
            }
            console.log('Please enter correct warrior names. Try again')
        }
    }

    getInfoFromPlayerMoveInfo(playerMoveInput)
    {
        let playerInputArr = playerMoveInput.split(':');
        // Input not correct
        if(playerInputArr.length != 2)
            return null;

        return playerInputArr;
    }

    createMove(pieceName, moveDirection,board, player){
        let piece = board.getPieceObjFromBoard(pieceName, player);
        if(piece == null)
        {
            return null;
        }
        let temp = Move.getIndexChangeForMove(moveDirection, player);
        let rowIndex = temp[0];
        let colIndex = temp[1];

        let move = new Move(piece.rowIndex, piece.colIndex, piece.rowIndex + rowIndex, piece.colIndex + colIndex, piece)
        if(move.isMoveValid(board.board) == false)
        {
            return null;
        }
        return move;
    }

    checkMatchEnded()
    {
        if(this.player1.currentPiecesOnBoard ==0 ||
            this.player2.currentPiecesOnBoard==0)
            this.winner = true
    }

    startMatch()
    {
        this.initializeMatch();
        let currPlayer = this.player1;
        while(this.winner == null){
            let moveFound = false;
            while(!moveFound){
                console.log('')
                console.log('Current board is-')
                this.board.displayBoard();
                let currMoveUserInfo = prompt(currPlayer.name + 'Move: ');
                //let currMoveUserInfo = 'p1:R';
                let currMoveInfo = this.getInfoFromPlayerMoveInfo(currMoveUserInfo)
                if(currMoveInfo == null)
                {
                    console.log('Please enter correct move!')
                }
                else{
                    moveFound = true;
                    let move = this.createMove(currMoveInfo[0], currMoveInfo[1], this.board, currPlayer);
                    if(move == null)
                        console.log('Please enter correct move!')
                    else
                    {
                        this.board.updateBoard(move);
                        if(currPlayer == this.player1)
                            currPlayer = this.player2;
                        else
                            currPlayer = this.player1;
                    }
            }
                this.checkMatchEnded()
            }
            
        }
        if(this.player1.currentPiecesOnBoard == 0)
                console.log(this.player2.name + ' wins!!')
            else
            console.log(this.player1.name + ' wins!!')
    }
}
let newMatch = new Match()
newMatch.startMatch()

export default Match
