---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: games 
published: true 
comments: false     
sitemap: false
image: /assets/2024-05-03/4.jpg
---

[Tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe) (US) or noughts and crosses (UK)

- What is the best strategy?
- Is this a fun game for introducing kids to Python?
- How good is an LLM at making this game

## Python and Pipenv

I'm using [pipenv](https://github.com/pypa/pipenv) to isolate dependencies in Python projects.

```bash
# is pipenv up to date?
# it will tell you what to run if update needed
# on my Ubuntu 22.04 I've only got 3.10 installed
pip install --upgrade pipenv

# setup a new environment
# as 3.12 is not available on my machine, it downgrades to 3.10
# creates a new Pipfile to put in dependencies
pipenv --python 3.12
```

## LLM

Using ChatGPT 4o on 1st of August 2024

> can you make a python program to play tic tac toe?

and it came up with

```py
def print_board(board):
    for row in board:
        print("|".join(row))
        print("-" * 5)

def check_winner(board, player):
    # Check rows
    for row in board:
        if all([cell == player for cell in row]):
            return True
    
    # Check columns
    for col in range(3):
        if all([board[row][col] == player for row in range(3)]):
            return True
    
    # Check diagonals
    if all([board[i][i] == player for i in range(3)]) or all([board[i][2-i] == player for i in range(3)]):
        return True
    
    return False

def check_draw(board):
    for row in board:
        if any([cell == " " for cell in row]):
            return False
    return True

def tic_tac_toe():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"
    
    while True:
        print_board(board)
        
        try:
            row = int(input(f"Player {current_player}, enter the row (0, 1, 2): "))
            col = int(input(f"Player {current_player}, enter the column (0, 1, 2): "))
        except ValueError:
            print("Invalid input. Please enter numbers 0, 1, or 2.")
            continue

        if row not in range(3) or col not in range(3):
            print("Invalid move. The row and column must be between 0 and 2.")
            continue

        if board[row][col] != " ":
            print("Invalid move. The cell is already taken.")
            continue

        board[row][col] = current_player

        if check_winner(board, current_player):
            print_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_draw(board):
            print_board(board)
            print("It's a draw!")
            break

        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    tic_tac_toe()
```

Which ran the first time!