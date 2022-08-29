import playList from "./playList.js";
//import todoList from "./todoList.js";

const bodyPage = document.querySelector('.body');
const time = document.querySelector('.time');
const elemDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const inputNames = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonQuote = document.querySelector('.change-quote');
let randomNumberForQuotes;
let dataQuotesFromJson;

const bodySettings = document.querySelector('.body-settings');
const settings = document.querySelector('.settings');
const buttonSettings = document.querySelector('.button-settings');

const audio = new Audio();
let isPlay = false;
let playNum = 0;
let nextPlayNum;

const player = document.querySelector('.player');
const buttonPlay = document.querySelector('.play');
const buttonPlayPrev = document.querySelector('.play-prev');
const buttonPlayNext = document.querySelector('.play-next');
const playlist = document.querySelector('.play-list');
const playerTitle = document.querySelector('.player-title');

playerTitle.textContent = playList[playNum].title;

let isVolume = true;

const playerVolumeButton = document.querySelector('.player-volume-button');
const playerVolumeControl = document.querySelector('.player-volume-control');

let convertedValue;
let audioPlayId;
let currentTimeAtDteStart = 0;
const progressBar = document.querySelector('.progress-bar');
const progressCurrentTime = document.querySelector('.progress-current-time');
progressCurrentTime.textContent = '0:00';

const progressTotalTime = document.querySelector('.progress-total-time');
progressTotalTime.textContent = playList[0].duration;

//const arrOfTimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
const arrOfTimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
let randomNumber;

//display current time
const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = `${currentTime}`;
    setTimeout(showTime, 1000);
    setTimeout(showDate, 1000);
    setTimeout(showGreeting, 1000);
    setTimeout(setBg, 1000);  
};

let currentDate;
//display current date
const showDate = () => {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};

    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {
            currentDate = date.toLocaleDateString('en-US', options);
        }
        else if (localStorage.getItem('language') === 'ru') {
            currentDate = date.toLocaleDateString('ru-RU', options);
        }
    }
    else {
        currentDate = date.toLocaleDateString('en-US', options);
    }
    elemDate.textContent = currentDate;
};


//display time of day
const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    const numberByDividing = Math.floor(hours / 6);

    switch(numberByDividing) {
        case 0:
            return arrOfTimesOfDay[numberByDividing];

        case 1:
            return arrOfTimesOfDay[numberByDividing];

        case 2:
            return arrOfTimesOfDay[numberByDividing];
        case 3:
            return arrOfTimesOfDay[numberByDividing];
    }
};

let timeOfDay;
let gtreetingText;

//display greeting
const showGreeting = () => {
    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {
            timeOfDay = getTimeOfDay();
            gtreetingText =  `Good ${timeOfDay},`;
        }
        else if (localStorage.getItem('language') === 'ru') {
            timeOfDay = getTimeOfDay();

            if (timeOfDay === 'night') {
                gtreetingText = `Доброй ночи,`;
               
            }
            else if (timeOfDay === 'morning') {
                gtreetingText = `Доброе утро,`;
               
            }
            else if (timeOfDay === 'afternoon') {
                gtreetingText = `Добрый день,`;
               
            }
            else if (timeOfDay === 'evening') {
                gtreetingText = `Добрый вечер,`;
            }  
        }
    }
    else {
        timeOfDay = getTimeOfDay();
        gtreetingText =  `Good ${timeOfDay},`;
    }
    greeting.textContent = gtreetingText;
};

//save input name in local storage
const setLocalStorageName = () => {
    localStorage.setItem('name', inputNames.value); 
};

//save input city in local storage
const setLocalStorageCity = () => {
    localStorage.setItem('city', city.value);  
};

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageName);
window.addEventListener('beforeunload', setLocalStorageCity);

//get value of input name from the local storage
const getLocalStorageName = () => {
    if (localStorage.getItem('name')) {
        inputNames.value = localStorage.getItem('name');
    }
        
    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {
            inputNames.placeholder = '[Enter name]';
        
        }
        else if (localStorage.getItem('language') === 'ru') {
            inputNames.placeholder = '[Введите имя]';
        }
    }
    else {
        inputNames.placeholder = '[Enter name]';
    }
};

//get value of input city from local storage
const getLocalStorageCity = () => {
    
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
};

//before loading the page the input value needs to be displayed
window.addEventListener('load', getLocalStorageName);
window.addEventListener('load', getLocalStorageCity);

const getRandomNum = () => {
    randomNumber = Math.floor(Math.random() * 20) + 1;
};

//set image background
const setBg = () => {
    const timeOfDay = getTimeOfDay();
    let bgNum = randomNumber;
    bgNum = String(bgNum).padStart(2, "0");

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

    //if image is loaded
    img.onload = () => {
        document.body.style.backgroundImage = 'url(' + `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg` +')';
    };
};

//get next background-image
const getSlideNext = () => {
    if (randomNumber === 20) {
        randomNumber = 1;
    }
    else {
        randomNumber += 1;
    }
    setBg();
};

//get previous background-image
const getSlidePrev = () => {
    if (randomNumber === 1) {
        randomNumber = 20;
    }
    else {
        randomNumber -= 1;
    }
    setBg();
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

let url;
//display weather
async function getWeather() {
    if (city.value === '') {
        city.value = 'Minsk';
    }
    getLocalStorageCity();
    
    let url;
    
    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0bc92fedfc326ec47af8dabb7409b2bc&units=metric`;
        }
        else if (localStorage.getItem('language') === 'ru') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=0bc92fedfc326ec47af8dabb7409b2bc&units=metric`;
        }
    }
    else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0bc92fedfc326ec47af8dabb7409b2bc&units=metric`;
    }

    const res = await fetch(url);
    if (res.ok) {
        weatherError.textContent = '';
        const data = await res.json();
        
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        if (localStorage.getItem('language')) {
            if (localStorage.getItem('language') === 'en') {
                windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
                humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
            }
            else if (localStorage.getItem('language') === 'ru') {
                windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} m/s`;
                humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
            }
        }
        else {
            windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
        }
    //console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.name);
    }
    else {
        if (localStorage.getItem('language')) {
            if (localStorage.getItem('language') === 'en') {
                weatherError.textContent = 'You entered incorrect city name.';
            }
            else if (localStorage.getItem('language') === 'ru') {
                weatherError.textContent = 'Вы ввели некорректное название города.';
            }
        }
        else {
            weatherError.textContent = 'You entered incorrect city name.';
        }
        //weatherError.textContent = 'You entered incorrect city name.';
        temperature.textContent = '';
        weatherDescription.textContent = '';
        windSpeed.textContent = '';
        humidity.textContent = '';
    }
}

//if we change city, the weather changes automaticly
city.addEventListener('change', function() {
    setLocalStorageCity();
    getWeather();
});

//get random number for quotes
const getRandomNumForQuotes = () => {
    return Math.floor(Math.random() * 20);
};

let urlQuotes;
let numberOfCurrentQuote;
let resForQuotes;
let dataForQuotes;

//get random quote
async function getQuotes(numberOfQuoteFromLocal) {

    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {
            urlQuotes = 'js/data-en.json';
        }
        else if (localStorage.getItem('language') === 'ru') {
            urlQuotes = 'js/data.json';
        }
    }
    else {
        urlQuotes = 'js/data-en.json';
    }

   // urlQuotes = 'http://127.0.0.1:5500/js/data.json';
    resForQuotes = await fetch(urlQuotes);

    dataForQuotes = await resForQuotes.json();
    //dataQuotesFromJson = dataForQuotes;

    //if the argument is empty
    if (numberOfQuoteFromLocal === undefined) {
        randomNumberForQuotes = getRandomNumForQuotes();
        numberOfCurrentQuote = randomNumberForQuotes;
    }
    //if the argument is not empty
    else {
        numberOfCurrentQuote = numberOfQuoteFromLocal;
    }
    
    setLocalStorageNumberOfQuote();
    quote.textContent = `"${dataForQuotes[randomNumberForQuotes].text}"`;
    author.textContent = dataForQuotes[randomNumberForQuotes].author;
}

//save numberOfCurrentQuote in local storage
const setLocalStorageNumberOfQuote = () => {
    localStorage.setItem('numberOfCurrentQuote', numberOfCurrentQuote); 
};

//before unloading or closing the page execute setLocalStorage
window.addEventListener('beforeunload', setLocalStorageNumberOfQuote);

//if clickon update button, quote is updated
buttonQuote.addEventListener('click', () => {
    randomNumberForQuotes = getRandomNumForQuotes();
    numberOfCurrentQuote = randomNumberForQuotes;
    setLocalStorageNumberOfQuote();
    quote.textContent = `"${dataForQuotes[randomNumberForQuotes].text}"`;
    author.textContent = dataForQuotes[randomNumberForQuotes].author;
});

let audioTime;
let audioLength;

//play the track
const playAudio = () => {
    const arrayOfLi = document.querySelectorAll('.play-item');
    //if track is not played and we need to play track
    if (!isPlay) {
        clearInterval(audioPlayId);
        isPlay = true;
        
        audio.src = playList[playNum].src;
        audio.currentTime = currentTimeAtDteStart;
        audio.play();
        audioPlayId = setInterval(() => {

            //get value on every second of the track
            audioTime = Math.round(audio.currentTime);

            //display current time of track in progress bar
            setBaseTime(audioTime, progressCurrentTime);

            //get all time of the track
            audioLength = Math.round(audio.duration);

            //display total time of track in progress bar
            setBaseTime(audioLength, progressTotalTime);
            progressBar.value = (audioTime * 100) / audioLength;

            //if the end of the track
            if (audioTime == audioLength && playNum < playList.length - 1) {
                clearInterval(audioPlayId);
                currentTimeAtDteStart = 0;
                playTrackAfterEnd();
                
            // Иначе проверяем тоже самое, но переменная treck больше или равна четырём
            }
            else if (audioTime == audioLength && playNum >= playList.length - 1) {
                clearInterval(audioPlayId);
                currentTimeAtDteStart = 0;
                playTrackAfterEnd();  
            }
        }, 1000);

        //remove class from playlist
        arrayOfLi.forEach(elem => {
            elem.classList.remove('play-item_active');
        });

        //add class for track is played
        arrayOfLi[playNum].classList.add('play-item_active');

        //display title of the track
        playerTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
    }
    //is track is played, and we need to pause track
    else {
        clearInterval(audioPlayId);
        isPlay = false;
        currentTimeAtDteStart = audio.currentTime;
        audio.pause();
        arrayOfLi[playNum].classList.remove('play-item_active'); 
    }
};

//switch class pause, i.e. change icon play on icon pause in player-controls
const togglePlayPause = () => {
    buttonPlay.classList.toggle('pause');
};

//run playing the track and change icon play on icon pause
buttonPlay.addEventListener('click', function() {
    if(isPlay === true) {
        clearInterval(audioPlayId);
    }
    togglePlayPause();
    playAudio();
});

//play track from the beginning after the end of the track
const playTrackAfterEnd = () => {
    isPlay = false;
    if (playNum < playList.length - 1) {
        playNum += 1;
    }
    else if (playNum >= playList.length - 1) {
        playNum = 0;
    }
    playAudio();
};


//play next track
const playNext = () => {
    isPlay = false;
    buttonPlay.classList.add('pause');
    if (playNum < playList.length - 1) {
        playNum += 1;
    }
    else if (playNum >= playList.length - 1) {
        playNum = 0;
    }
    currentTimeAtDteStart = 0;
    playAudio();
};

//play previous track
const playPrev = () => {
    isPlay = false;
    buttonPlay.classList.add('pause');
    if (playNum > 0 ) {
        playNum -= 1;
    }
    else {
        playNum = playList.length - 1;
    }
    currentTimeAtDteStart = 0;
    playAudio();
};


buttonPlayNext.addEventListener('click', function() {
    playNext();
});

buttonPlayPrev.addEventListener('click', function() {
    playPrev();
});

let titleOfActiveTrack = '';

//if click on playlist, we found element was clicked and run/stop track
playlist.addEventListener('click', function(event) {
    if (buttonPlay.classList.contains('pause')) {
        buttonPlay.classList.remove('pause');
    }
    else {
        
        buttonPlay.classList.add ('pause');
    }
    const element = event.target;
    let titleOfClickedElement = element.textContent;
    const arrayOfLi = document.querySelectorAll('.play-item');
    let indexOfLi;
    //define id of the track on which we clicked
    for (let i = 0; i < arrayOfLi.length; i++) {
        if (arrayOfLi[i].textContent === titleOfClickedElement) {
            indexOfLi = i;
        }
    }
    playNum = indexOfLi;

    //find title of the track which is played
    for (let i = 0; i < arrayOfLi.length; i++) {
        if (arrayOfLi[i].classList.contains('play-item_active')) {
            titleOfActiveTrack = arrayOfLi[i].textContent;
        }
    }

    //if title of clicked track matches with title of played track
    if (titleOfClickedElement === titleOfActiveTrack) {
        if (element.classList.contains('play-item_active')) {
            clearInterval(audioPlayId);
            isPlay = true;  
        }
        else {
            isPlay = false;
            buttonPlay.classList.add('pause');   
        }
    }
    //if title of clicked track doesn't matche with title of played track
    else {
        clearInterval(audioPlayId);
        isPlay = false;
        currentTimeAtDteStart = 0;
        buttonPlay.classList.add('pause');  
    }
    if (element.classList.contains('play-item_active')) {
        clearInterval(audioPlayId);
        isPlay = true;   
    }
    else {
        isPlay = false;
        buttonPlay.classList.add('pause');   
    }
    playAudio();
});

//set current time and totaltime in progress bar
const setBaseTime = (currentTimeOfTrack, elem) => {
    let wholePart = Math.floor(currentTimeOfTrack / 60);
    let remainder = currentTimeOfTrack % 60;

    if (currentTimeOfTrack < 10) {
        elem.textContent = `00:0${remainder}`;
    }
    else if (currentTimeOfTrack >= 10 && currentTimeOfTrack < 60) {
        elem.textContent = `00:${remainder}`;
    }
    else if (currentTimeOfTrack >= 60) {
        if (wholePart < 10 && remainder < 10) {
            elem.textContent = `0${wholePart}:0${remainder}`;
        }
        if (wholePart < 10 && remainder >= 10) {
            elem.textContent = `0${wholePart}:${remainder}`;
        }
    }
};

let timeOdAudio;
//change progress bar if we moove slider
const changeProgressBar = (valueOfProgressBar) => {
    //if track is played
    if (isPlay === true) {
        timeOdAudio = Math.round(audioLength * valueOfProgressBar / 100);
        audio.currentTime = timeOdAudio;
    }
     //if track is paused
    else {
        timeOdAudio = Math.round(audioLength * valueOfProgressBar / 100);
        currentTimeAtDteStart = timeOdAudio;
    }  
};

progressBar.addEventListener('input', function() {
    changeProgressBar(this.value);
});

//create tags li in playlist
const createPlayList = () => {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = playList[i].title;
        playlist.append(li);
    }
};

//set initial volume for audio
const setBaseVolume = () => {
    audio.volume = playerVolumeControl.value / 100;
}

//change audio volume
const changeAudioVolume = (valueOfPlayerVolumeControl) => {
    convertedValue = valueOfPlayerVolumeControl / 100;
    audio.volume = convertedValue;
};

playerVolumeControl.addEventListener('input', function() {
    changeAudioVolume(this.value);
});

//switch on/off the volume
const toggleVolume = () => {
    //if volume is on, than we switch volume off
    if (isVolume) {
        isVolume = false;
        audio.volume = 0;
        playerVolumeButton.classList.remove('player-volume_on');
        playerVolumeButton.classList.add('player-volume_off');
    }
    //if volume is off, than we switch volume on
    else {
        if (convertedValue !== undefined) {
            audio.volume = convertedValue;
        }
        else {
            audio.volume = 0.7;
        }
        isVolume = true;

        playerVolumeButton.classList.remove('player-volume_off');
        playerVolumeButton.classList.add('player-volume_on');
    }
};

playerVolumeButton.addEventListener('click', toggleVolume);

//show settings block
const showSettings = () => {
    settings.classList.toggle('visible');
};

buttonSettings.addEventListener('click', function(){
    showSettings();
    bodySettings.classList.toggle('hidden');
    bodyPage.classList.toggle('lock');
    //bodySettings.classList.toggle('hidden');
    //bodyPage.classList.add('lock');

});

bodySettings.addEventListener('click', function() {
    showSettings();
    bodySettings.classList.toggle('hidden');
    bodyPage.classList.toggle('lock');
});


const arrOfInputRadio = document.querySelectorAll('.input-language');
const elementsWithLangEn = document.querySelectorAll('.lang-en');
const elementsWithLangRu = document.querySelectorAll('.lang-ru');
const inputWithLanguageEn = document.querySelector('.input-language-en');
const inputWithLanguageRu = document.querySelector('.input-language-ru');
//const languageEn = document.getElementById('language-en');
//const languageRu = document.getElementById('language-en');
const inputTime = document.querySelector('.input-time');
const inputDate = document.querySelector('.input-date');
const inputGreeting = document.querySelector('.input-greeting');
const inputQuote = document.querySelector('.input-quote');
const inputWeather = document.querySelector('.input-weather');
const inputAudio = document.querySelector('.input-audio');
const inputTodolist = document.querySelector('.input-todolist');

let opacityOfTime;
let opacityOfDate;
let opacityOfGreeting;
let opacityOfQuote;
let opacityOfWeather;
let opacityOfPlayer;
let opacityOfTodolist;
let language;

const showHideTime = () => {
    if (inputTime.checked == true) {
       inputTime.checked = true;
        opacityOfTime = '1';
        time.style.opacity = opacityOfTime;
    } else {
        //inputTimeChecked = false;
        inputTime.checked = false;
        opacityOfTime = '0';
        time.style.opacity = opacityOfTime;
    }
};

const showHideDate = () => {
    if (inputDate.checked == true) {
        inputDate.checked = true;
        opacityOfDate = '1';
        elemDate.style.opacity = opacityOfDate;
    } else {
        inputDate.checked = false;
        opacityOfDate = '0';
        elemDate.style.opacity = opacityOfDate;
    }
};

const showHideGreeting = () => {
    if (inputGreeting.checked == true) {
        inputGreeting.checked = true;
        opacityOfGreeting = '1';
        greetingContainer.style.opacity = opacityOfGreeting;
    } else {
        inputGreeting.checked = false;
        opacityOfGreeting = '0';
        greetingContainer.style.opacity = opacityOfGreeting;
    }
};

const showHideQuote = () => {
    if (inputQuote.checked == true) {
        inputQuote.checked = true;
        opacityOfQuote = '1';
        quoteContainer.style.opacity = opacityOfQuote;
    } else {
        inputQuote.checked = false;
        opacityOfQuote = '0';
        quoteContainer.style.opacity = opacityOfQuote;
    }
};

const showHideWeather = () => {
    if (inputWeather.checked == true) {
        inputWeather.checked = true;
        opacityOfWeather = '1';
        weather.style.opacity = opacityOfWeather;
    } else {
        inputWeather.checked = false;
        opacityOfWeather = '0';
        weather.style.opacity = opacityOfWeather;
    }
};

const showHidePlayer = () => {
    if (inputAudio.checked == true) {
        inputAudio.checked = true;
        opacityOfPlayer = '1';
        player.style.opacity = opacityOfPlayer;
    } else {
        inputAudio.checked = false;
        opacityOfPlayer = '0';
        player.style.opacity = opacityOfPlayer;
    }
};

const showHideTodolisOpacity = () => {
    if (inputTodolist.checked == true) {
        inputTodolist.checked = true;
        opacityOfTodolist = '1';

        buttonsOpenToDoList.forEach(item => {
            item.style.opacity = opacityOfTodolist;
        });
        
        //buttonOpenToDoList.style.opacity = opacityOfTodolist;
    } else {
        inputTodolist.checked = false;
        opacityOfTodolist = '0';

        buttonsOpenToDoList.forEach(item => {
            item.style.opacity = opacityOfTodolist;
        });
        //buttonOpenToDoList.style.opacity = opacityOfTodolist;
    }
};

//switch the language when click on inputRadio
async function toggleLanguage(inputRadio) {
	if (inputRadio.classList.contains('input-language-en')) {
        language = 'en';

        elementsWithLangEn.forEach(elem => {
            elem.style.display = 'block';
        });

        elementsWithLangRu.forEach(elem => {
            elem.style.display = 'none';
        });

        setLocalStorageLanguage();
        numberOfCurrentQuote = localStorage.getItem('numberOfCurrentQuote');
        getQuotes(numberOfCurrentQuote);
        getWeather();
        getLocalStorageName();
    }

    if (inputRadio.classList.contains('input-language-ru')) {
        language = 'ru';

        elementsWithLangEn.forEach(elem => {
            elem.style.display = 'none';
        });

        elementsWithLangRu.forEach(elem => {
            elem.style.display = 'block';
        });

        setLocalStorageLanguage();
        numberOfCurrentQuote = localStorage.getItem('numberOfCurrentQuote');
        getQuotes(numberOfCurrentQuote);
        getWeather();
        getLocalStorageName();
    } 
};

//save value of isTime in local storage
const setLocalStorageTime = () => {
    localStorage.setItem('time', opacityOfTime); 
};

const setLocalStorageDate = () => {
    localStorage.setItem('date', opacityOfDate); 
};

const setLocalStorageGreeting = () => {
    localStorage.setItem('greeting', opacityOfGreeting); 
};

const setLocalStorageQuote = () => {
    localStorage.setItem('quote', opacityOfQuote); 
};

const setLocalStorageWeather = () => {
    localStorage.setItem('weather', opacityOfWeather); 
};

const setLocalStoragePlayer = () => {
    localStorage.setItem('player', opacityOfPlayer); 
};

const setLocalStorageToDolist = () => {
    localStorage.setItem('todolist', opacityOfTodolist); 
};

const setLocalStorageLanguage = () => {
    localStorage.setItem('language', language); 
};

window.addEventListener('beforeunload', setLocalStorageTime);
window.addEventListener('beforeunload', setLocalStorageDate);
window.addEventListener('beforeunload', setLocalStorageGreeting);
window.addEventListener('beforeunload', setLocalStorageQuote);
window.addEventListener('beforeunload', setLocalStorageWeather);
window.addEventListener('beforeunload', setLocalStoragePlayer);
window.addEventListener('beforeunload', setLocalStorageToDolist);
window.addEventListener('beforeunload', setLocalStorageLanguage);

//get value of opacity of the variable named time from local storage
const getLocalStorageTime = () => {
    if (localStorage.getItem('time')) {
        if (localStorage.getItem('time') === '1') {
            time.style.opacity = 1;
            opacityOfTime = 1;
            inputTime.checked = true;
        }
        else if (localStorage.getItem('time') === '0') {
            time.style.opacity = 0;
            opacityOfTime = 0;
            inputTime.checked = false;
        }
    }
};

//get value of opacity of the variable named date from local storage
const getLocalStorageDate = () => {
    if (localStorage.getItem('date')) {
        if (localStorage.getItem('date') === '1') {
            elemDate.style.opacity = 1;
            opacityOfDate = 1;
            inputDate.checked = true;
        }
        else if (localStorage.getItem('date') === '0') {
            elemDate.style.opacity = 0;
            opacityOfDate = 0;
            inputDate.checked = false;
        }
    }
};

//get value of opacity of the variable named greeting from local storage
const getLocalStorageGreeting = () => {
    if (localStorage.getItem('greeting')) {
        if (localStorage.getItem('greeting') === '1') {
            greetingContainer.style.opacity = 1;
            opacityOfGreeting = 1;
            inputGreeting.checked = true;
        }
        else if (localStorage.getItem('greeting') === '0') {
            greetingContainer.style.opacity = 0;
            opacityOfGreeting = 0;
            inputGreeting.checked = false;
        }
    }
};

//get value of opacity of the variable named quote from local storage
const getLocalStorageQuote = () => {
    if (localStorage.getItem('quote')) {
        if (localStorage.getItem('quote') === '1') {
            quoteContainer.style.opacity = 1;
            opacityOfQuote = 1;
            inputQuote.checked = true;
        }
        else if (localStorage.getItem('quote') === '0') {
            quoteContainer.style.opacity = 0;
            opacityOfQuote = 0;
            inputQuote.checked = false;
        }
    }
};

//get value of opacity of the variable named weather from local storage
const getLocalStorageWeather = () => {
    if (localStorage.getItem('weather')) {
        if (localStorage.getItem('weather') === '1') {
            weather.style.opacity = 1;
            opacityOfWeather = 1;
            inputWeather.checked = true;
        }
        else if (localStorage.getItem('weather') === '0') {
            weather.style.opacity = 0;
            opacityOfWeather = 0;
            inputWeather.checked = false;
        }
    }
};

//get value of opacity of the variable named player from local storage
const getLocalStoragePlayer = () => {
    if (localStorage.getItem('player')) {
        if (localStorage.getItem('player') === '1') {
            player.style.opacity = 1;
            opacityOfPlayer = 1;
            inputAudio.checked = true;
        }
        else if (localStorage.getItem('player') === '0') {
            player.style.opacity = 0;
            opacityOfPlayer = 0;
            inputAudio.checked = false;
        }
    }
};

//get value of opacity of the variable named todolist from local storage
const getLocalStorageTodolist = () => {
    if (localStorage.getItem('todolist')) {
        if (localStorage.getItem('todolist') === '1') {
            buttonsOpenToDoList.forEach(item => {
                item.style.opacity = 1;
            });
            //buttonOpenToDoList.style.opacity = 1;
            opacityOfTodolist = 1;
            inputTodolist.checked = true;
        }
        else if (localStorage.getItem('todolist') === '0') {
            buttonsOpenToDoList.forEach(item => {
                item.style.opacity = 0;
            });
            //buttonOpenToDoList.style.opacity = 0;
            opacityOfTodolist = 0;
            inputTodolist.checked = false;
        }
    }
};

//get value of the variable named language from local storage and do elements visible or hidden
const getLocalStorageLanguage = () => {
    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') === 'en') {

            elementsWithLangEn.forEach(elem => {
                elem.style.display = 'block';
            });
        
            elementsWithLangRu.forEach(elem => {
                elem.style.display = 'none';
            });
            
            language = 'en';
            inputWithLanguageEn.checked = true;
            
        }
        else if (localStorage.getItem('language') === 'ru') {

            elementsWithLangEn.forEach(elem => {
                elem.style.display = 'none';
            });
        
            elementsWithLangRu.forEach(elem => {
                elem.style.display = 'block';
            });

            language = 'ru';
            inputWithLanguageRu.checked = true; 
            
        }
    }
};

//before loading the page the input value needs to be displayed

window.addEventListener('load', getLocalStorageTime);
window.addEventListener('load', getLocalStorageDate);
window.addEventListener('load', getLocalStorageGreeting);
window.addEventListener('load', getLocalStorageQuote);
window.addEventListener('load', getLocalStorageWeather);
window.addEventListener('load', getLocalStoragePlayer);
window.addEventListener('load', getLocalStorageTodolist);
window.addEventListener('load', getLocalStorageLanguage);

inputTime.addEventListener('click', function() {
    showHideTime();
});

inputDate.addEventListener('click', function() {
    showHideDate();
});

inputGreeting.addEventListener('click', function() {
    showHideGreeting();
});

inputQuote.addEventListener('click', function() {
    showHideQuote();
});

inputWeather.addEventListener('click', function() {
    showHideWeather();
});

inputAudio.addEventListener('click', function() {
    showHidePlayer();
});

inputTodolist.addEventListener('click', function() {
    showHideTodolisOpacity();
});

for(let i = 0; i < arrOfInputRadio.length; i++) {
    arrOfInputRadio[i].onclick = function () {
        toggleLanguage(this);
    };
}

const todoList = document.querySelector('.todolist');
const todolistList = document.querySelector('.todolist-list');
const inputValueForAddItem = document.querySelector('.input-add');
const buttonsAddItem= document.querySelectorAll('.button-add');
const buttonsOpenToDoList = document.querySelectorAll('.open-todolist');
const errorText = document.querySelector('.error-text');

//array of points of ToDoList
let arrayToDo = [];


//add object Of Point Of ToDoList in arrayToDo
const addPointInToDo = (text) => {
    const pointToDo = {
        text,
        done: false,
        id: `${Math.random()}`
    };

    arrayToDo.push(pointToDo);
}

//delete object Of Point Of ToDoList from arrayToDo
const deletePointFromToDo = (id) => {
    arrayToDo.forEach(pointToDo => {
        if (pointToDo.id === id) {
            pointToDo.done = true;
        }
    });
}

//display points of ToDoList on the web-page
const displayPointsToDo = () => {
    console.log(arrayToDo);
    let htmlCode = '';

    arrayToDo.forEach((pointToDo, index) => {
        if (pointToDo.done) {
            return;
        }
        htmlCode += `
            <li class="todolist-list__item" data-id="${pointToDo.id}"><span>${pointToDo.text}</span><button class="button button-done">Done</button></li>
        `;
    });

    todolistList.innerHTML = htmlCode;
};

// when we click on the button named 'add new point'
buttonsAddItem.forEach(item => {
    item.addEventListener('click', function() {
        if (inputValueForAddItem.value === '') {
            errorText.textContent = '* Enter your task';
            inputValueForAddItem.style.border = '1px solid #ff0000';
        }
        else {
            errorText.textContent = '';
            inputValueForAddItem.style.border = 'none';
            const text = inputValueForAddItem.value;
            addPointInToDo(text);
            displayPointsToDo();
            inputValueForAddItem.value = ''; 
        }
    });
});


//when we click on the button named 'done'
todolistList.addEventListener('click', (event) => {
    console.log(event.target.parentElement);
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
      
    const id = event.target.parentElement.dataset.id;
    deletePointFromToDo(id);
    displayPointsToDo();
});

//switch hidden / visible todolist
const showHideTodolist = () => {
    todoList.classList.toggle('visible');
};

//show hidden todolist or hide visible todolist
buttonsOpenToDoList.forEach(item => {
    item.addEventListener('click', function() {
        showHideTodolist();
    });
});

/*
buttonOpenToDoList.addEventListener('click', function() {
    showHideTodolist();
    
});
*/

getQuotes();
showTime();
showDate();
showGreeting();
getRandomNum();
setBg();
getWeather();
createPlayList();
setBaseVolume();
