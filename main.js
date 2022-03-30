alert('LIST MUSIC BY Trường Sơn ❤❤❤ WITH LOVE 😂😘')

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Toàn bộ biến
const playList = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const currentimeSecond = $('.currentimeSecond')
const durationTime = $('.durationTime')
const volume = $('#volume')
const muteVolume = $('.volume-0')


const LOCAL_SETTING = 'LISTMUSIC'


// render songs ==>  OK
// play / pause / seek ==> OK
// cd rotate === > OK
// next , prev song ==> OK
// random song ==>  OK
// repeat song ===> OK
// active Song ==>  OK
// scroll Active ==> Ok
// active song ==> Ok
// cấu hình lại những cài đăt ==> OK

// danh sách các bài hát
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isOption: false,
    isMute: false,
    isConfig: JSON.parse(localStorage.getItem(LOCAL_SETTING)) || {},
    config: function(key, value) {
        this.isConfig[key] = value
        localStorage.setItem(LOCAL_SETTING, JSON.stringify(this.isConfig))
    },
    songs: [{
            name: 'phiêu',
            singer: 'Vladimir Vladimirovich Putin',
            path: './assets/sing/englishmusic.mp3',
            img: './assets/img/song_6.jfif'
        },

        {
            name: 'Nhạc Lofi 2022  Những Bản Lofi Mix Chill...',
            singer: 'Trường Sơn',
            path: './assets/sing/lofi.mp3',
            img: './assets/img/0 (1).jpg'
        },

        {
            name: 'EDM Tik Tok  Top 12 Bản Nhạc Tik Tok...',
            singer: 'Trường Sơn',
            path: './assets/sing/EDM1.mp3',
            img: './assets/img/0 (2).jpg'
        },

        {
            name: 'Già Cùng Nhau Là Được  TeA ft PC  Prod ',
            singer: 'Trường Sơn',
            path: './assets/sing/gia.mp3',
            img: './assets/img/0.jpg'
        },

        {
            name: 'EDM TikTok Hay 2022  BXH Nhạc Trẻ Remix Hay...',
            singer: 'Trường Sơn',
            path: './assets/sing/EDM2.mp3',
            img: './assets/img/0 (3).jpg'
        },

        {
            name: 'Urra - Vladimir Vladimirovich Putin',
            singer: 'Vladimir Vladimirovich Putin',
            path: './assets/sing/Urra.mp3',
            img: './assets/img/song_1.jfif'
        }, {
            name: 'Đau Đớn Nhất là im lặng',
            singer: 'ERIK',
            path: './assets/sing/daunhatlalangim.mp3',
            img: './assets/img/song_4.jfif'
        }, {
            name: 'Ngày Đầu Tiên',
            singer: 'Đức Phúc',
            path: './assets/sing/ngaydautien.mp3',
            img: './assets/img/song_3.jfif'
        }, {
            name: 'Xin Đừng Lặng Im',
            singer: 'Subin Trường Sơn',
            path: './assets/sing/xindunglangim.mp3',
            img: './assets/img/song_5.jfif'
        }, {
            name: 'Đừng yêu em nữa em mệt rồi',
            singer: 'min',
            path: './assets/sing/dungyeunua.mp3',
            img: './assets/img/song_2.jfif'
        }, {
            name: 'Nắm - Hương Ly',
            singer: 'hương ly',
            path: './assets/sing/nam.mp3',
            img: './assets/img/song_8.jfif'
        }, {
            name: 'let me down slowly',
            singer: 'Trường Sơn',
            path: './assets/sing/donmysoly.mp3',
            img: './assets/img/song_9.jfif'
        }, {
            name: 'IDM _ Phiêu Lắm Ý ',
            singer: 'Trường Sơn CSS',
            path: './assets/sing/new.mp3',
            img: './assets/img/song_10.jfif'
        }


    ],
    render: function() {

        const html = this.songs.map((song, index) => {

            return `

            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        
        `

        })

        playList.innerHTML = html.join(' ')

    },

    definedProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })


    },

    //xử lí tất cả các sự kiện
    handeleEvent: function() {
        const _this = this
            // xu li việc thu nhỏ cd để thích nghi
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrollTop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }

        //rotate cd
        const ratateCd = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 4500,
            iterations: Infinity
        })

        ratateCd.pause()


        //click play btn
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()

            } else {
                audio.play()

            }
        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            ratateCd.play()
        }
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            ratateCd.pause()
        }

        // thanh seek chay theo tiến độ bài hát songs
        audio.ontimeupdate = function() {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            if (audio.duration) {
                progress.value = progressPercent
            }
            currentimeSecond.innerText = _this.formatTime(audio.currentTime)
        }

        // seek (tua) bai hat
        progress.onchange = function(e) {
            audio.currentTime = (audio.duration / 100 * e.target.value)
        }

        // click next btn
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSongs()
            } else {
                _this.nextSong()
            }
            _this.activeSongIntoView()
            audio.play()
        }

        // click Prev btn
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.randomSongs()
            } else {
                _this.prevSong()
            }
            _this.activeSongIntoView()
            audio.play()
        }

        // click random songs and repeat song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
            _this.config('isRandom', _this.isRandom)
        }

        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            _this.config('isRepeat', _this.isRepeat)
        }

        //khi hết bài hát endedSongs
        audio.onended = function() {
            if (_this.isRepeat) {
                _this.repeatSong()
                audio.play()
            } else {
                _this.nextSong()
                audio.play()
            }
        }

        // active songs
        playList.onclick = function(e) {
            const activeSongs = e.target.closest('.song:not(.active)')
            if (activeSongs || e.target.closest('.option')) {
                if (activeSongs) {
                    _this.currentIndex = Number(e.target.closest('.song:not(.active)').dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                }

                if (e.target.closest('.option')) {
                    const songOptions = playList.querySelectorAll('.song .option')
                    Array.from(songOptions).map(songOption => {


                        songOption.onclick = function() {
                            if (_this.isOption) {
                                _this.isOption = false
                                songOption.innerHTML = `
                                    <i class="fas fa-ellipsis-h"></i
                                `
                            } else {
                                _this.isOption = true;


                                songOption.innerHTML = `
                                <i class="fas fa-ellipsis-h"></i>
                                <ul class="option-list">
                                    <li class="options-item options-item-load">
                                        Tải lại trang</li>
                                    <li class="options-item">
                                        <a href="https://www.facebook.com/profle.php.id.3107.100035504550108/" class="option-link">
                                            <i class="options-icon fa-brands fa-facebook"></i> Facebook
                                        </a>
                                    </li>
                                    <li class="options-item">
                                        <a href="https://www.instagram.com/truongson0911/" class="option-link">
                                            <i class="options-icon fa-brands fa-instagram"></i> Intagram
                                        </a>
                                    </li>
                                </ul>
                            `
                            }

                        }

                    })

                }

            }
        }

        audio.volume = 0.4
        volume.onchange = function(e) {
            audio.volume = volume.value / 100
            muteVolume.classList.remove('active')
        }
        muteVolume.onclick = function(e) {
            _this.isMute = !_this.isMute
            if (_this.isMute) {
                audio.volume = 0
                muteVolume.classList.toggle('active', _this.isMute)
            } else {
                audio.volume = volume.value / 100
                muteVolume.classList.remove('active')
            }
        }
    },

    // xử lí load bì hát
    loadCurrentSong: function() {
        heading.innerHTML = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
        setInterval(function() {
            if (audio.duration) {
                durationTime.innerText = app.formatTime(audio.duration)
            }
        }, 100)
        this.render()
    },

    // next songs
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.activeSongIntoView()
    },

    // Prev Songs
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    // xu lí random songs
    randomSongs: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    // Repeat song
    repeatSong: function() {
        this.loadCurrentSong()
    },

    // songs into view 
    activeSongIntoView: function() {
        if (this.currentIndex > 2) {
            setTimeout(function() {
                $('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }, 500)
        } else {
            setTimeout(function() {
                $('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 500)
        }
    },

    // định nghĩa lại thời gian

    formatTime: function(number) {
        const minutes = Math.floor(number / 60);
        const seconds = Math.floor(number - minutes * 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    },


    //tải cấu hình
    loadConfig: function() {
        this.isRandom = this.isConfig.isRandom
        this.isRepeat = this.isConfig.isRepeat
    },

    // khơi chạy App
    start: function() {
        // render ra danh sách bài hát
        this.render()

        // tạo ra một đối tượng
        this.definedProperties()

        //Tải thông tin bài hát
        this.loadCurrentSong()

        // xử lí toàn bộ hành vi và sự kiện của người dùng
        this.handeleEvent()

        // load cau hình
        this.loadConfig()

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)


    }
}

app.start();