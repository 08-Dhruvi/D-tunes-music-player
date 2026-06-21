const audio = new Audio();

const songs = [

    {
        title: "Night Vibes",
        artist: "Lo-fi Beats",
        image:
            "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",

        song:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",

        color:
            "linear-gradient(135deg,#1a1a2e,#3a0ca3)"
    },

    {
        title: "Focus Mode",
        artist: "Deep Focus",
        image:
            "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",

        song:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",

        color:
            "linear-gradient(135deg,#0f2027,#203a43,#2c5364)"
    },

    {
        title: "Workout Mix",
        artist: "Gym Energy",
        image:
            "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",

        song:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",

        color:
            "linear-gradient(135deg,#3a0f0f,#ff6b00)"
    }

];

let currentSong = 0;

function loadSong(index) {
    function smoothPlay(index) {

        document.body.style.opacity =
            '0.92';

        setTimeout(
            () => {

                loadSong(
                    index
                );

                document.body.style.opacity =
                    '1';

            },
            150
        );

    }

    const queueList =
        document.getElementById(
            'queueList'
        );
    function updateQueue() {

        queueList.innerHTML =
            '';

        songs.forEach(
            (song, index) => {

                if (
                    index !== currentSong
                ) {

                    const queueItem =
                        document.createElement(
                            'div'
                        );

                    queueItem.className =
                        'queue-item';

                    queueItem.innerText =
                        song.title;

                    queueItem.addEventListener(
                        'click',
                        () => {

                            currentSong =
                                index;

                            loadSong(
                                currentSong
                            );

                        });

                    queueList.appendChild(
                        queueItem
                    );

                }

            });

    }


    cards.forEach(card => {
        card.classList.remove(
            'active'
        );
    });

    cards[index]
        .classList.add(
            'active'
        );

    songTitle.innerText =
        songs[index].title;

    songArtist.innerText =
        songs[index].artist;

    songImage.src =
        songs[index].image;

    audio.src =
        songs[index].song;

    document.querySelector(
        '.bg-overlay'
    ).style.background =
        songs[index].color;

    document.body.style.backgroundSize =
        "cover";

    document.body.style.backgroundRepeat =
        "no-repeat";

    audio.play();

    isPlaying = true;

    playIcon.style.display =
        'none';

    pauseIcon.style.display =
        'block';

    if (songs[index].title === "Night Vibes") {
        document.body.style.background =
            "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    }

    updateQueue();

}

let greeting =
    document.getElementById(
        "greeting"
    );

let hour =
    new Date().getHours();

if (hour < 12) {

    greeting.innerText =
        "Good Morning ☀️";

}

else if (hour < 17) {

    greeting.innerText =
        "Good Afternoon 🌤️";

}

else if (hour < 21) {

    greeting.innerText =
        "Good Evening 🌙";

}

else {

    greeting.innerText =
        "Good Night 🌌";

}

// --- State Management ---
let isPlaying = false;
let totalDuration = 215; // 3 minutes 35 seconds total
let currentSeconds = 0;

// --- DOM Elements ---
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseWrapper = document.getElementById('playPauseWrapper');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const currentTimeEl = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const waveformWrapper = document.getElementById('waveformWrapper');
const progressFill = document.getElementById('progressFill');

// --- Formatted Time Helper ---
function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// --- Line Progress Rendering ---
function resizeWaveform() {
    updateProgressBar();
}

function updateProgressBar() {
    const progressPercent = Math.min(Math.max(currentSeconds / totalDuration, 0), 1);
    progressFill.style.width = `${progressPercent * 100}%`;
}

// --- Interactive Scrubbing ---
function handleScrub(e) {
    const rect = waveformWrapper.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let clickX = clientX - rect.left;
    if (clickX < 0) clickX = 0;
    if (clickX > rect.width) clickX = rect.width;

    const percentage = clickX / rect.width;
    currentSeconds = percentage * totalDuration;

    if (audio.src) {
        audio.currentTime = currentSeconds;
    }

    currentTimeEl.textContent = formatTime(currentSeconds);
    resizeWaveform();
}

let isDragging = false;
waveformWrapper.addEventListener('mousedown', (e) => { isDragging = true; handleScrub(e); });
window.addEventListener('mousemove', (e) => { if (isDragging) handleScrub(e); });
window.addEventListener('mouseup', () => isDragging = false);

waveformWrapper.addEventListener('touchstart', (e) => { isDragging = true; handleScrub(e); });
window.addEventListener('touchmove', (e) => { if (isDragging) handleScrub(e); });
window.addEventListener('touchend', () => isDragging = false);


// --- Audio Event Sync ---
audio.addEventListener(
    'play',
    () => {

        isPlaying = true;

        playIcon.style.display =
            'none';

        pauseIcon.style.display =
            'block';

        songImage.classList.add(
            'playing'
        );

    });
audio.addEventListener(
    'pause',
    () => {

        isPlaying = false;

        playIcon.style.display =
            'block';

        pauseIcon.style.display =
            'none';

        songImage.classList.remove(
            'playing'
        );

    });

audio.addEventListener(
    'ended',
    () => {

        if (
            isRepeat
        ) {

            loadSong(
                currentSong
            );

        }

        else {

            if (
                isShuffle
            ) {

                currentSong =
                    Math.floor(
                        Math.random()
                        * songs.length
                    );

            }

            else {

                currentSong++;

                if (
                    currentSong >=
                    songs.length
                ) {

                    currentSong = 0;

                }

            }

            loadSong(
                currentSong
            );

        }

    });

audio.addEventListener('loadedmetadata', () => {
    totalDuration = Math.floor(audio.duration) || totalDuration;
    durationTime.textContent = formatTime(totalDuration);
});

audio.addEventListener('timeupdate', () => {
    currentSeconds = audio.currentTime;
    currentTimeEl.textContent = formatTime(currentSeconds);
    updateProgressBar();

});

// Setup Engine Triggers
window.addEventListener('resize', () => { resizeWaveform(); });
currentTimeEl.textContent = formatTime(currentSeconds);
durationTime.textContent = formatTime(totalDuration);

resizeWaveform();

const cards =
    document.querySelectorAll(
        '.card'
    );

const songTitle =
    document.getElementById(
        'songTitle'
    );

const songArtist =
    document.getElementById(
        'songArtist'
    );

const songImage =
    document.getElementById(
        'songImage'
    );

cards.forEach((card, index) => {

    card.addEventListener(
        'click',
        () => {

            currentSong = index;

            loadSong(currentSong);

        });

});

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    sidebar.querySelectorAll('ul li').forEach(item => {
        item.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });
}


const nextBtn =
    document.getElementById(
        'nextBtn'
    );

nextBtn.addEventListener(
    'click',
    () => {

        currentSong++;

        if (
            currentSong >= songs.length
        ) {

            currentSong = 0;

        }

        smoothPlay(currentSong);
    });

const prevBtn =
    document.getElementById(
        'prevBtn'
    );

prevBtn.addEventListener(
    'click',
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        smoothPlay(currentSong);

    });

const searchBar =
    document.getElementById(
        'searchBar'
    );

if (searchBar) {

    searchBar.addEventListener(
        'input',
        () => {

            const searchText =
                searchBar.value
                    .toLowerCase();

            cards.forEach(
                (card) => {

                    const title =
                        card.querySelector(
                            'h4'
                        ).innerText
                            .toLowerCase();

                    const artist =
                        card.querySelector(
                            'p'
                        ).innerText
                            .toLowerCase();

                    if (
                        title.includes(searchText) ||
                        artist.includes(searchText)
                    ) {

                        card.style.display =
                            'block';

                    }

                    else {

                        card.style.display =
                            'none';

                    }

                });

        });

}

const volumeSlider =
    document.getElementById(
        'volumeSlider'
    );

const volumeIcon =
    document.getElementById(
        'volumeIcon'
    );

volumeSlider.addEventListener(
    'input',
    () => {

        audio.volume =
            volumeSlider.value;

        if (
            volumeSlider.value == 0
        ) {

            volumeIcon.innerText =
                '🔇';

        }

        else if (
            volumeSlider.value < 0.5
        ) {

            volumeIcon.innerText =
                '🔉';

        }

        else {

            volumeIcon.innerText =
                '🔊';

        }

    });

playPauseBtn.addEventListener(
    'click',
    () => {

        if (!audio.src)
            return;

        if (
            audio.paused
        ) {

            audio.play();

        }

        else {

            audio.pause();

        }

    });

let isRepeat = false;

const repeatBtn =
    document.getElementById(
        'repeatBtn'
    );

repeatBtn.addEventListener(
    'click',
    () => {

        isRepeat =
            !isRepeat;

        if (
            isRepeat
        ) {

            repeatBtn.style.color =
                '#f39c12';

        }

        else {

            repeatBtn.style.color =
                '#8b949e';

        }

    });

let isShuffle = false;

const shuffleBtn =
    document.getElementById(
        'shuffleBtn'
    );

shuffleBtn.addEventListener(
    'click',
    () => {

        isShuffle =
            !isShuffle;

        if (
            isShuffle
        ) {

            shuffleBtn.style.color =
                '#f39c12';

        }

        else {

            shuffleBtn.style.color =
                '#8b949e';

        }

    });


const favButtons =
    document.querySelectorAll(
        '.fav-btn'
    );

let favorites =
    JSON.parse(
        localStorage.getItem(
            'favorites'
        )
    ) || [];


favButtons.forEach(
    (button, index) => {

        if (
            favorites.includes(
                index
            )
        ) {

            button.classList.add(
                'active'
            );

            button.innerText =
                '♥';
        }

        button.addEventListener(
            'click',
            () => {

                button.classList.toggle(
                    'active'
                );

                if (
                    button.classList.contains(
                        'active'
                    )
                ) {

                    button.innerText =
                        '♥';

                    favorites.push(
                        index
                    );

                }

                else {

                    button.innerText =
                        '♡';

                    favorites =
                        favorites.filter(
                            fav =>
                                fav !== index
                        );

                }

                localStorage.setItem(
                    'favorites',
                    JSON.stringify(
                        favorites
                    )
                );

            });

    });

const homeBtn =
    document.getElementById(
        'homeBtn'
    );

const favoritesBtn =
    document.getElementById(
        'favoritesBtn'
    );

homeBtn.addEventListener(
    'click',
    () => {

        cards.forEach(
            (card) => {

                card.style.display =
                    'block';

            });

    });

favoritesBtn.addEventListener(
    'click',
    () => {

        cards.forEach(
            (card, index) => {

                if (
                    favorites.includes(
                        index
                    )
                ) {

                    card.style.display =
                        'block';

                }

                else {

                    card.style.display =
                        'none';

                }

            });

    });

const queueList =
    document.getElementById(
        'queueList'
    );

function updateQueue() {

    queueList.innerHTML =
        '';

    songs.forEach(
        (song, index) => {

            if (
                index !== currentSong
            ) {

                queueList.innerHTML +=
                    `
                    <div class="queue-item">
                        ${song.title}
                    </div>
                    `;
            }

        });

}

document.addEventListener(
    'keydown',
    (e) => {

        // Space = Play/Pause
        if (
            e.code === 'Space'
        ) {

            e.preventDefault();

            if (
                !audio.src
            ) return;

            if (
                audio.paused
            ) {

                audio.play();

            }

            else {

                audio.pause();

            }

        }

        // Right Arrow = Next Song
        if (
            e.code ===
            'ArrowRight'
        ) {

            currentSong++;

            if (
                currentSong >=
                songs.length
            ) {

                currentSong = 0;

            }

            loadSong(
                currentSong
            );

        }

        // Left Arrow = Previous Song
        if (
            e.code ===
            'ArrowLeft'
        ) {

            currentSong--;

            if (
                currentSong < 0
            ) {

                currentSong =
                    songs.length - 1;

            }

            loadSong(
                currentSong
            );

        }

    });