const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAY_STORAGE_KEY = 'music_player'

const playlist = $('.playlist')
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const btnPlay = $('.btn-toggle-play')
const progress = $('.progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')

const app = {
    songs: [
        {
            name: "Ghost (Joe Stone Remix)",
            singer: "Au/Ra, Alan Walker",
            path: "https://mp3-s1-zmp3.zmdcdn.me/413403408d0764593d16/5619016255325671577?authen=exp=1658679175~acl=/413403408d0764593d16/*~hmac=53fa666fcdbc26e743bcf393e435265d&fs=MTY1ODUwNjM3NTE5NXx3ZWJWNnwwfDQyLjExOS4xOTkdUngMTAx",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/c/b/9/ccb9f75f57062efec993642d9959b993.jpg"
        },
        {
            name: "Heartbreak Anthem",
            singer: "Galantis, David Guetta",
            path: "https://mp3-s1-zmp3.zmdcdn.me/529c3f103051d90f8040/5073351931962444976?authen=exp=1658679545~acl=/529c3f103051d90f8040/*~hmac=e643a0f89c4e5a2895205a5d785f505c&fs=MTY1ODUwNjmUsIC0NTQ1NHx3ZWJWNnwwfDQyLjExOS4xOTkdUngMTAx",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/7/7/f/e77fdcc3c919cc8f517544f879efdc8a.jpg"
        },
        {
            name: "Stay With Me",
            singer: "Calvin Harris, Justin Timberlake",
            path: "https://mp3-s1-zmp3.zmdcdn.me/876f920e464faf11f65e/1545999004916752951?authen=exp=1658679144~acl=/876f920e464faf11f65e/*~hmac=992dd04542418a684df3f417caa4fca2&fs=MTY1ODUwNjM0NDU4MHx3ZWJWNnwwfDIxMC44Ni4yMzgdUngMQ",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/a/6/1/ba6166fd86de139f452bd7659969caee.jpg"
        },
        {
            name: "Thousand Miles",
            singer: "The Kid LAROI",
            path: "https://mp3-s1-zmp3.zmdcdn.me/5f4b88a537e4deba87f5/7988162183024441555?authen=exp=1658679657~acl=/5f4b88a537e4deba87f5/*~hmac=4c92a011c7ced72f781c040c388b50c2&fs=MTY1ODUwNjg1NzYzN3x3ZWJWNnwxMDIxNjUyOTY5fDExNi4xMTAdUngNDMdUngMzM",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/3/c/8/33c8bff04fefb94c2e12bd961f7b3da6.jpg"
        },
        {
            name: "Don't You Hold Me Down",
            singer: "Alan Walker, Georgia Ku",
            path: "https://mp3-s1-zmp3.zmdcdn.me/2f568a26a2674b391276/3652322529240301639?authen=exp=1658679742~acl=/2f568a26a2674b391276/*~hmac=612894d30e4af725d2f51f3486f0e85d&fs=MTY1ODUwNjk0MjmUsICwOHx3ZWJWNnwwfDQyLjExOS4xOTkdUngMTAx",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/2/7/a/b27adf2f5e687d8b084ae1625ef775a2.jpg"
        },
        {
            name: "Stars Align",
            singer: "R3hab, Jolin Tsai",
            path: "https://mp3-s1-zmp3.zmdcdn.me/290ceeff8eb967e73ea8/1445501676287971756?authen=exp=1658679607~acl=/290ceeff8eb967e73ea8/*~hmac=eb25d2ff06668a916efa93e6e3cdc469&fs=MTY1ODUwNjgwNzE2M3x3ZWJWNnwwfDE3MS4yMzIdUngMjUdUngMTk3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/5/5/7/a55773fc10832107079c6c8b225fcf69.jpg"
        },
        {
            name: "At My Worst",
            singer: "Sympton X Collective",
            path: "https://mp3-s1-zmp3.zmdcdn.me/3b661c7868398167d828/6144470722138992585?authen=exp=1658679886~acl=/3b661c7868398167d828/*~hmac=038285ed35130c00b5e18a7dea0fc1a5&fs=MTY1ODUwNzA4NjM1NXx3ZWJWNnwwfDQyLjExOS4xOTkdUngMTAx",
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/8/3/9/5/8395c8b202b930eec67dfc88e3a2e6f8.jpg"
        }
    ],

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    config:  JSON.parse(localStorage.getItem(PLAY_STORAGE_KEY)) || {},

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAY_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function() {
        const htmls = this.songs.map((song, index ) => {
            return `
            <div class="song" data-id=${index}>
                <div class="thumb" style="background-image: url('${song.image}')">
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
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        const songActive = $('.song.active')
        if (songActive) {
            songActive.classList.remove('active')
        }
        $(`.song[data-id='${this.currentIndex}'`).classList.add('active')
    },

    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xu ly quay CD
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xứ lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop


            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play
        btnPlay.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            
        }
        // Khi bài hát được phát
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Khi bài hát dừng
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Khi tien do bai hat thay doi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            } 
        }
        // Xu ly khi tua bai hat
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        // Xu ly next song
        btnNext.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else { 
                _this.nextSong()
            }
        }
        // Xu ly prev song
        btnPrev.onclick = function() {
            if (_this.isRandom) {
                _this.randomSong()
            } else { 
                _this.prevSong()
            }
        }
        // Xu ly random song
        btnRandom.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            btnRandom.classList.toggle('active', _this.isRandom)
        }
        // Xu ly repeat song
        btnRepeat.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            btnRepeat.classList.toggle('active', _this.isRepeat)
        }
        // Xu ly ket thu bai hat
        audio.onended = function() {
            if ( _this.isRepeat) {
                audio.play()
            } else {
                btnNext.click()
            }  
        }

        // Lang nghe click vao playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            const songOption = e.target.closest('.option')
            if (songNode || songOption) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.id)
                    _this.loadCurrentSong()
                    audio.play()
                }
                if (e.target.closest('.option')) {

                }
            }
        }
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        audio.play()
        this.scrollToActiveSong()
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        audio.play()
        this.scrollToActiveSong()
    },

    randomSong: function() {
        let newIndex
        do {
            
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        audio.play()
        this.scrollToActiveSong()
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            const blockType = this.currentIndex < 3 ? 'end' : 'nearest'   
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: blockType            
            })
        }, 300)
    },

    start: function() {
        // Load config
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()
        // Lắng nghe / xử lý dự kiên 
        this.handleEvents()
        // Render danh sách bài hát
        this.render()
        // Load thông tin bài hát đầu tiên vào UI khi reload page
        this.loadCurrentSong()

        // Active
        btnRepeat.classList.toggle('active', this.isRepeat)
        btnRandom.classList.toggle('active', this.isRandom)
    }

}

app.start()