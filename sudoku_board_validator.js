/*
 * Sudoku is a game played on a 9x9 grid. The object of the game is to fill in
 * every square on the grid with a number, 1-9, so that:
 *
 *   Every row contains the numbers 1-9
 *   Every column contains the numbers 1-9
 *   Each of the 9 3x3 sub-grids contains the numbers 1-9
 *
 * In addition to the numbers 1-9, we will also use the number 0 to indicate an
 * empty space that has not been filled in yet. Duplicate 0 entries in rows,
 * columns, and 3x3 sub-grids are valid.
 * 
 * We are going to write a validator for a Sudoku Board. Imagine you are solving
 * a Sudoku (http://www.colinj.co.uk/Sudoku_help.htm) puzzle. You want to know
 * if the current board has any non-zero duplicates in its rows, columns, and 3x3
 * subgrids.
 *
 *
 * Represent the Sudoku board as a two-dimensional array of integers.
 *
 * boolean isValidBoard(int[][] board) {
 *  // TODO: fill this in
 *  return false;
 * }
 *
 */
 
var tests = {
    BOARD_VALID_COMPLETE:[
        [ 1,2,3, 4,5,6, 7,8,9 ],
        [ 4,5,6, 7,8,9, 1,2,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,3,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,7, 8,9,1, 2,3,4 ],
        [ 6,7,8, 9,1,2, 3,4,5 ],
        [ 9,1,2, 3,4,5, 6,7,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
    BOARD_VALID_INCOMPLETE:[
        [ 1,2,3, 4,5,6, 7,8,9 ],
        [ 4,5,6, 7,8,9, 0,2,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,0,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,7, 8,9,1, 2,3,4 ],
        [ 6,0,8, 9,1,2, 3,4,5 ],
        [ 9,1,2, 3,4,5, 6,0,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
    BOARD_INVALID_COMPLETE_ROW:[
        [ 1,2,3, 4,4,6, 7,8,9 ],
        [ 4,5,6, 7,8,9, 1,2,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,3,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,7, 8,9,1, 2,3,4 ],
        [ 6,7,8, 9,1,2, 3,4,5 ],
        [ 9,1,2, 3,0,5, 6,7,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
    BOARD_INVALID_COMPLETE_COL:[
        [ 1,2,3, 4,5,6, 7,8,9 ],
        [ 4,5,6, 7,8,9, 1,2,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,3,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,0, 8,9,7, 2,3,4 ],
        [ 6,7,8, 9,1,2, 3,4,5 ],
        [ 9,1,2, 3,4,5, 6,7,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
    BOARD_INVALID_INCOMPLETE:[
        [ 1,2,3, 4,5,6, 7,8,9 ],
        [ 4,8,6, 7,8,9, 1,2,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,3,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,7, 8,0,1, 2,3,4 ],
        [ 6,7,8, 9,1,2, 3,4,5 ],
        [ 9,1,2, 3,4,5, 6,7,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
    BOARD_INVALID_COMPLETE_SUBGRID:[
        [ 1,0,2, 4,5,6, 7,8,9 ],
        [ 4,2,6, 7,8,9, 1,0,3 ],
        [ 7,8,9, 1,2,3, 4,5,6 ],
        [ 8,9,1 ,2,3,4, 5,6,7 ],
        [ 2,3,4, 5,6,7, 8,9,1 ],
        [ 5,6,7, 8,9,1, 2,3,4 ],
        [ 6,7,8, 9,1,2, 3,4,5 ],
        [ 9,1,0, 3,4,5, 6,7,8 ],
        [ 3,4,5, 6,7,8, 9,1,2 ]
    ],
};

function isValidBoard(board) {
    var seen = {};
    for(var r=0; r<9; r++) {
        for(var c=0; c<9; c++) {
            var cur = board[r][c];
            if( cur!=0 ) {
                var rId = 'r_'+r+'_'+cur;
                var cId = 'c_'+c+'_'+cur;
                var bId = 'b_'+Math.floor(r/3)+'_'+Math.floor(c/3)+'_'+cur;
                if( seen[rId] 
                    || seen[cId]
                    || seen[bId] ) {
                    return false;
                } else {
                    seen[rId] 
                      = seen[cId] 
                      = seen[bId]
                      = true;
                }
            }
        }
    }
    return true;
}

for(var test in tests) {
    console.log(test+':'+isValidBoard(tests[test]));
}

