const Controller = {
        initialization: function () {
            if (!Module.data.welcomeScreen.welcomeScreenShown) {
                Module.initialization.showWelcomeScreen()
            }
            // load saved data or saved initial
            Module.loadData() || Module.saveGameData();
            Render.handlePlayersNum()
        },
        setPlayers: function () {
            Module.handlePlayerName.init();
            console.log('this log is from controller setPlayers')
        }
    }
;

const Module = {
    initialization: {

        showWelcomeScreen: function () {
            Render.sayHello();
            return Module.data.welcomeScreen.welcomeScreenShown = true
        }
    },

    data: {
        welcomeScreen: {
            welcomeScreenShown: false
        },
        loaded: false,
        players:
            {
                num: 0,
                data: [],
                names: []
            }
    },

    saveGameData: function () {
        const gameData = Module.data;
        localStorage.setItem('FarmerGame', JSON.stringify(gameData))
    },

    loadData: function () {
        const gameData = JSON.parse(localStorage.getItem('FarmerGame')) || 0;
        if (gameData === 0) return false;
        Module.data = gameData;
        Module.data.loaded = true
    },

    handlePlayerName: {
        checkPlayers: function () {
            if (Module.data.players.data.length === 0) return false
            //    check if any,
            //    add reset possibility
            //    get from render
            //    set as arr of objs containing name and id
            //    save game data
        },
        setPlayersData: function(arr) {
            if ( typeof arr !== 'object') {
                throw new Error('players data is not an array')
            }
            function createPlayer(name) {
                const playerName = name.toString();
                if (playerName.length <= 0 || playerName.length > 25) {
                    throw new Error('Module.createPlayer: playerName is too long/short');
                }
                return {
                    id: btoa(playerName),
                    name: playerName,
                    date: Date.now()
                }
            }
            arr.forEach(el => createPlayer(el))
            Module.saveGameData()
        },
        init: function () {
        //    put all logic from this module here
            const playersSaved = Module.handlePlayerName.checkPlayers();

            if (playersSaved) {
            //    ask user for reset or proceed
            } else {
                Render.getPlayersNames()
            //    wait till user types data
            //    invoke another fn from render
            }
        }
    }


};

const Render = {
    sayHello: function () {
        return console.log('hello');
    },
    clearModalContent: function() {
        document.querySelector('.modal__heading').textContent = '';
        document.querySelector('.modal__form').innerHTML = '';
    },
    handlePlayersNum: function () {
        //modal where user can set num of players

        //reset numOf players
        Module.data.players.num = 0;

        // declare dom elements
        const modalWrapper = document.querySelector('.modal__wrapper');
        const modalHeading = modalWrapper.querySelector('.modal__heading');
        const btnIncrease = modalWrapper.querySelector('.players__btn--increase');
        const btnDecrease = modalWrapper.querySelector('.players__btn--decrease');
        const btnSubmit = modalWrapper.querySelector('.counter__submit');

        //set modal heading
        modalHeading.textContent = 'Set number of players';
        //update value in html
        function updatePlayerCounter() {
            modalWrapper.querySelector('.players__number').textContent = Module.data.players.num.toString()
        }
        // final function in this handler
        //executes handlePlayersNames on Submit
        function setPlayersNum(e) {
            e.preventDefault();
            const players = Module.data.players.num;
            //todo: change alert to a separate fn
            if (players === 0) return alert('players can\'t be 0');
            console.log('submitted players num: ' + players);
            Render.clearModalContent();
            Controller.setPlayers()
        }

        // add listeners
        //update counter
        btnIncrease.addEventListener('click', () => {
            const currentNum = Module.data.players.num;
            if (currentNum >= 4) return;
            Module.data.players.num++;
            updatePlayerCounter()
        });

        btnDecrease.addEventListener('click', () => {
            const currentNum = Module.data.players.num;
            if (currentNum <= 0) return;
            Module.data.players.num--;
            updatePlayerCounter()
        });
        btnSubmit.addEventListener('click', setPlayersNum);
        //run counter on init
        updatePlayerCounter()
    },

    getPlayersNames() {
    // create modal here
    //    get values, set them as an array to the module on submit

    //    call this fn onSubmit
        const result = ['array with players names'];
        Module.handlePlayerName.setPlayersData(result)
    }
};

Controller.initialization();