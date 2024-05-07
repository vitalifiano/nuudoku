var numSelected = null;
var tileSelected = null;

var errors = 0;

var puzzles = [
    {
        board: [
            "--74916-5",
            "2---6-3-9",
            "-----7-1-",
            "-586----4",
            "--3----9-",
            "--62--187",
            "9-4-7---2",
            "67-83----",
            "81--45---"
        ],
        solution: [
            "387491625",
            "241568379",
            "569327418",
            "758619234",
            "123784596",
            "496253187",
            "934176852",
            "675832941",
            "812945763"
        ]
    },
    {
        board: [
            "-7--2--46",
            "-6----89-",
            "2--8--715",
            "-84-97---",
            "71-----59",
            "---13-48-",
            "697--2--8",
            "-58----6-",
            "43--8--7-"

        ],
        solution: [
            "875921346",
            "361754892",
            "249863715",
            "584697123",
            "713248659",
            "926135487",
            "697412538",
            "158379264",
            "432586971"
        ]
    },
    {
        board: [
            "--4-5-----",
            "9--7346--",
            "--3-21-49",
            "-35-9-48-",
            "-9-----3-",
            "-76-1-92-",
            "31-97-2--",
            "--9182--3",
            "----6-1--"
        ],
        solution: [
            "264859317",
            "981734652",
            "753621849",
            "135297486",
            "892546731",
            "476318925",
            "318975264",
            "649182573",
            "527463198"
        ]
    },
    {
        board: [
            "8-6-1----",
            "--3-64-9-",
            "9-----816",
            "-8-396---",
            "7-2-4-3-9",
            "---572-8-",
            "521-----4",
            "-3-75-2--"
        ],
        solution: [
            "856917423",
            "213864597",
            "947235816",
            "185396742",
            "762148359",
            "394572681",
            "521683974",
            "439751268",
            "678429135"
        ]
    },
    {
        board: [
            "38-9--2-5",
            "-----873-",
            "-6-3--98-",
            "-----35-1",
            "91-5-7-23",
            "7-31-----",
            "-746-----",
            "8-1--2-67"
        ],
        solution: [
            "387964215",
            "549218736",
            "162375984",
            "426893571",
            "918547623",
            "753126849",
            "635781492",
            "274639158",
            "891452367"
        ]
    },
    {
        board: [
            "6----9--4",
            "-895---16",
            "5---6-3-9",
            "831---7-5",
            "-2-----6-",
            "9-7---842",
            "2-6-1---8",
            "37---692-",
            "1--3----7"
        ],
        solution: [
            "613279584",
            "789543216",
            "542861379",
            "831624795",
            "425798163",
            "967135842",
            "256917438",
            "378456921",
            "194382657"
        ]
    },
    {
        board: [
            "5-72---9-",
            "--6-3-7-1",
            "4------6-",
            "1--49---7",
            "---5-8---",
            "8---27--5",
            "-7------9",
            "2-9-8-6--",
            "-4---93-8"
        ],
        solution: [
            "517264893",
            "926835741",
            "483971562",
            "135496287",
            "792518436",
            "864327915",
            "378642159",
            "259183674",
            "641759328"
        ]
    },
    {
        board: [
            "2-----69-",
            "-5---3---",
            "17---94-5",
            "--3-25-18",
            "----4----",
            "72-38-5--",
            "5-26---41",
            "---5---7-",
            "-67-----3"
        ],
        solution: [
            "234158697",
            "956473182",
            "178269435",
            "643925718",
            "815746329",
            "729381564",
            "592637841",
            "381594276",
            "467812953"
,
        ]
    },
];



window.onload = function() {
    setGame();
}

function setGame() {
// Select a random puzzle
var puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
board = puzzle.board;
solution = puzzle.solution;



    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}


function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

