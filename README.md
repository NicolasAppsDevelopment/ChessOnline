# Chess online
## Initialise & start project
- git clone https://github.com/NicolasAppsDevelopment/chess-online.git
- Open 2 terminals from the root folder of the project:
   - In the first terminal :
     - cd server
     - npm install
     - npm run generate
     - npm run dev

   - In the second terminal :
     - cd client
     - npm install
     - npm run dev

## Access to the website
http://localhost:5173/

## Gameplay
- In a game :
    - Drag and drop a piece to move it
    - When you begin to drag a piece, the squares where you can move it are highlighted
    - Click on the "Draw" button to propose a draw
    - Click on the "Resign" button to resign

## Chess rules implemented
- Movements :
    - Pawn
    - Rook
    - Knight
    - Bishop
    - Queen
    - King
- Promotion :
    - into Queen
    - into Rook
    - into Bishop
    - into Knight
- Check
- Checkmate
- Draw :
    - propose a draw
    - make a draw :
        - Stalemate
- Resign :
    - voluntarily 

## Chess rules not implemented
- Castling ("roque" in french)
- take "en passant" ("prise en passant" in french)
- Draw :
    - because the king has repeated the same position 3 times in a row, escaping check
    - not enough material to checkmate
- Resign :
    - timeout