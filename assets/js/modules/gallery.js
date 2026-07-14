/*=========================================================
                    GALLERY MODULE
=========================================================*/

const Gallery = {

    /*=====================================================
                    ELEMENTS
    =====================================================*/

    grid: null,

    lightbox: null,

    lightboxImage: null,

    closeButton: null,

    prevButton: null,

    nextButton: null,

    /*=====================================================
                    STATE
    =====================================================*/

    currentImageIndex: 0,

    visibleImages: [],

    animationTimer: null,

    isPaused: false,

    isMobile: false,

    visibleTileCount: 9,

    currentTile: 0,

    nextImageIndex: 9,

    snakeOrder: [],

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.grid=document.getElementById("galleryGrid");

        this.lightbox=document.getElementById("galleryLightbox");

        this.lightboxImage=document.getElementById("galleryLightboxImage");

        this.closeButton=document.getElementById("galleryClose");

        this.prevButton=document.getElementById("galleryPrev");

        this.nextButton=document.getElementById("galleryNext");

        this.detectLayout();

        this.initializeVisibleImages();

        this.buildSnakeOrder();

        this.renderGallery();

        this.bindEvents();
        
        this.enableHoverPause();

        this.startAutoFlip();

        this.handleResize();

    },
        /*=====================================================
                DETECT DEVICE
    =====================================================*/

    detectLayout(){

        this.isMobile=window.innerWidth<=768;

        this.visibleTileCount=this.isMobile ? 3 : 9;

    },
        /*=====================================================
            INITIAL VISIBLE IMAGES
    =====================================================*/

    initializeVisibleImages(){

        this.visibleImages=[];

        for(let i=0;i<this.visibleTileCount;i++){

            this.visibleImages.push(

                i % GALLERY.length

            );

        }

        this.nextImageIndex=this.visibleTileCount;

        if(this.nextImageIndex>=GALLERY.length){

            this.nextImageIndex=0;

        }

    },
        /*=====================================================
                SNAKE ORDER
    =====================================================*/

    buildSnakeOrder(){

        if(this.isMobile){

            this.snakeOrder=[0,1,2];

        }

        else{

            this.snakeOrder=[

                0,1,2,

                5,4,3,

                6,7,8

            ];

        }

    },
        /*=====================================================
                    CREATE TILE
    =====================================================*/

    createTile(imageIndex){

        return `

            <div
                class="gallery-tile"
                data-index="${imageIndex}">

                <img

                    src="${GALLERY[imageIndex].image}"

                    alt="Gallery Image"

                    loading="lazy">

                <div class="gallery-overlay"></div>

            </div>

        `;

    },
        /*=====================================================
                    RENDER GALLERY
    =====================================================*/

    renderGallery(){

        this.grid.innerHTML="";

        this.visibleImages.forEach(imageIndex=>{

            this.grid.insertAdjacentHTML(

                "beforeend",

                this.createTile(imageIndex)

            );

        });

        this.attachTileEvents();

    },
        /*=====================================================
                TILE CLICK EVENTS
    =====================================================*/

    attachTileEvents(){

        const tiles=

            this.grid.querySelectorAll(".gallery-tile");

        tiles.forEach(tile=>{

            tile.addEventListener("click",()=>{

                this.currentImageIndex=

                    Number(tile.dataset.index);

                this.openLightbox();

            });

        });

    },
        /*=====================================================
                    REFRESH
    =====================================================*/

    refresh(){

        this.detectLayout();

        this.initializeVisibleImages();

        this.buildSnakeOrder();

        this.renderGallery();

    },
        /*=====================================================
                    OPEN LIGHTBOX
    =====================================================*/

    openLightbox(){

        this.lightboxImage.src=

            GALLERY[this.currentImageIndex].image;

        this.lightbox.classList.add("active");

        document.body.style.overflow="hidden";

    },

    /*=====================================================
                    CLOSE LIGHTBOX
    =====================================================*/

    closeLightbox(){

        this.lightbox.classList.remove("active");

        document.body.style.overflow="";

    },
        /*=====================================================
                    PREVIOUS IMAGE
    =====================================================*/

    showPreviousImage(){

        this.currentImageIndex--;

        if(this.currentImageIndex<0){

            this.currentImageIndex=

                GALLERY.length-1;

        }

        this.lightboxImage.src=

            GALLERY[this.currentImageIndex].image;

    },

    /*=====================================================
                    NEXT IMAGE
    =====================================================*/

    showNextImage(){

        this.currentImageIndex++;

        if(this.currentImageIndex>=GALLERY.length){

            this.currentImageIndex=0;

        }

        this.lightboxImage.src=

            GALLERY[this.currentImageIndex].image;

    },
        /*=====================================================
                    PREVIOUS IMAGE
    =====================================================*/

    showPreviousImage(){

        this.currentImageIndex--;

        if(this.currentImageIndex<0){

            this.currentImageIndex=

                GALLERY.length-1;

        }

        this.lightboxImage.src=

            GALLERY[this.currentImageIndex].image;

    },

    /*=====================================================
                    NEXT IMAGE
    =====================================================*/

    showNextImage(){

        this.currentImageIndex++;

        if(this.currentImageIndex>=GALLERY.length){

            this.currentImageIndex=0;

        }

        this.lightboxImage.src=

            GALLERY[this.currentImageIndex].image;

    },
        /*=====================================================
                    BIND EVENTS
    =====================================================*/

    bindEvents(){

        this.closeButton.addEventListener("click",()=>{

            this.closeLightbox();

        });

        this.prevButton.addEventListener("click",()=>{

            this.showPreviousImage();

        });

        this.nextButton.addEventListener("click",()=>{

            this.showNextImage();

        });

        this.lightbox.addEventListener("click",(event)=>{

            if(event.target===this.lightbox){

                this.closeLightbox();

            }

        });

        document.addEventListener("keydown",(event)=>{

            if(!this.lightbox.classList.contains("active")){

                return;

            }

            switch(event.key){

                case "Escape":

                    this.closeLightbox();

                    break;

                case "ArrowLeft":

                    this.showPreviousImage();

                    break;

                case "ArrowRight":

                    this.showNextImage();

                    break;

            }

        });

    },
        /*=====================================================
                    START AUTO FLIP
    =====================================================*/

    startAutoFlip(){

        this.animationTimer=setInterval(()=>{

            if(this.isPaused){

                return;

            }

            this.flipNextTile();

        },3500);

    },
        /*=====================================================
                    FLIP NEXT TILE
    =====================================================*/

    flipNextTile(){

        const tiles=

            this.grid.querySelectorAll(".gallery-tile");

        if(!tiles.length){

            return;

        }

        const tilePosition=

            this.snakeOrder[this.currentTile];

        const tile=

            tiles[tilePosition];

        if(!tile){

            return;

        }

        tile.classList.add("flip");

        setTimeout(()=>{

            if(this.nextImageIndex>=GALLERY.length){

                this.nextImageIndex=0;

            }

            const img=

                tile.querySelector("img");

            img.src=

                GALLERY[this.nextImageIndex].image;

            tile.dataset.index=

                this.nextImageIndex;

            this.visibleImages[tilePosition]=

                this.nextImageIndex;

            this.nextImageIndex++;

        },400);

        setTimeout(()=>{

            tile.classList.remove("flip");

        },800);

        this.currentTile++;

        if(this.currentTile>=this.snakeOrder.length){

            this.currentTile=0;

        }

    },
        /*=====================================================
                    HOVER PAUSE
    =====================================================*/

    enableHoverPause(){

        this.grid.addEventListener("mouseenter",()=>{

            this.isPaused=true;

        });

        this.grid.addEventListener("mouseleave",()=>{

            this.isPaused=false;

        });

    },
        /*=====================================================
                HANDLE WINDOW RESIZE
    =====================================================*/

    handleResize(){

        let resizeTimer;

        window.addEventListener("resize",()=>{

            clearTimeout(resizeTimer);

            resizeTimer=setTimeout(()=>{

                const wasMobile=this.isMobile;

                this.detectLayout();

                if(wasMobile!==this.isMobile){

                    this.restartGallery();

                }

            },250);

        });

    },
        /*=====================================================
                RESTART GALLERY
    =====================================================*/

    restartGallery(){

        clearInterval(this.animationTimer);

        this.currentTile=0;

        this.initializeVisibleImages();

        this.buildSnakeOrder();

        this.renderGallery();

        this.enableHoverPause();

        this.startAutoFlip();

    },
        /*=====================================================
                    DESTROY
    =====================================================*/

    destroy(){

        clearInterval(this.animationTimer);

        document.body.style.overflow="";

        if(this.lightbox){

            this.lightbox.classList.remove("active");

        }

    }

};
