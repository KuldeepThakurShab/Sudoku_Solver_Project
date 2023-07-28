var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
 }
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    // xhrRequest.open('GET', 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=1337');
	// xhr.open('GET', 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=81&difficulty=easy');
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
    
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isValid( board,  i,  j, num,  n){
    //row
    for( x=0; x<n; x++ ){
        if(board[i][x]==num || board[x][j]==num){
            return false;
        }
    }
    

    //SubMatrix
    for( x=0; x<n; x++){
        if(board[3*(i/3)+x/3][3*(j/3)+x%3]==num) return false;
    }
      return true;
       
}




function SudokuSolver(board,  i,  j,  n){
    //base case
    if(i==n){
        // Print(board,n);
        FillBoard(board)
        return true;
    }

    //if we not inside the board
    if(j==n){
        return SudokuSolver(board,i+1,0,n);
    }
    

    // if cell is already filled ---- just move ahead
    if(board[i][j]!=0){
        return SudokuSolver(board, i, j+1,n);
    }

    //recursive case
    //we try to fill the cell with appropriate num
    for(let num=1; num<=9; num++){
        //check the num is valid to fill
        if(isValid(board, i, j, num,n)){
            board[i][j]=num;
            let subAns= SudokuSolver(board,i,j+1,n);
           if(subAns) return true;

           //backtrack ---> to undo the change
           board[i][j]=0;

        }
    }
    return false;
}

 

