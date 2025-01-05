Initialise project :
-git clone https://github.com/NicolasAppsDevelopment/chess-online.git
-Open 2 terminals :

    In the first terminal :
    -cd server
    -npm install
    -npm run generate
    -npm run dev

    In the second terminal :
    -cd client
    -npm install
    -npm run dev


Access to the website :
http://localhost:5173/


Chess rules implemented:
-Movements :
    -Pawn
    -Rook
    -Knight
    -Bishop
    -Queen
    -King
-Promotion :
    -into Queen
    -into Rook
    -into Bishop
    -into Knight
-Check
-Checkmate
-Draw :
    -propose a draw
    -make a draw :
        -Stalemate
-Resign :
    -voluntarily 

Chess rules not implemented:
-Castling ("roque" in french)
-take "en passant" ("prise en passant" in french)
-Draw :
    -because the king has repeated the same position 3 times in a row, escaping check
    -when only kings remain
-Resign :
    -timeout