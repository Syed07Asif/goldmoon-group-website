/*=========================================================
                    PROJECTS MODULE
=========================================================*/

const Projects={

    /*=====================================================
                        ELEMENTS
    =====================================================*/

    track:null,

    prevButton:null,

    nextButton:null,

    pagination:null,

    lightbox:null,

    lightboxImage:null,

    closeButton:null,

    /*=====================================================
                        STATE
    =====================================================*/

    currentPage:0,

    cardsPerPage:3,

    totalPages:0,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.track=document.getElementById("projectsTrack");

        this.prevButton=document.getElementById("projectsPrev");

        this.nextButton=document.getElementById("projectsNext");

        this.pagination=document.getElementById("projectsPagination");

        this.lightbox=document.getElementById("projectLightbox");

        this.lightboxImage=document.getElementById("lightboxImage");

        this.closeButton=document.getElementById("closeProjectLightbox");

        if(

            !this.track ||

            !this.prevButton ||

            !this.nextButton ||

            !this.pagination ||

            !this.lightbox ||

            !this.lightboxImage ||

            !this.closeButton

        ){

            return;

        }

        this.updateCardsPerPage();

        this.calculatePages();

        this.renderPages();

        this.updateNavigation();

        this.createPagination();

        this.bindEvents();

    },

    /*=====================================================
                    RESPONSIVE
    =====================================================*/

    updateCardsPerPage(){

        if(window.innerWidth<=768){

            this.cardsPerPage=1;

        }

        else if(window.innerWidth<=1200){

            this.cardsPerPage=2;

        }

        else{

            this.cardsPerPage=3;

        }

    },

    /*=====================================================
                    TOTAL PAGES
    =====================================================*/

    calculatePages(){

        this.totalPages=Math.ceil(

            PROJECTS.length/

            this.cardsPerPage

        );

    },

    /*=====================================================
                    RENDER PAGES
    =====================================================*/

    renderPages(){

        this.track.innerHTML="";

        for(

            let page=0;

            page<this.totalPages;

            page++

        ){

            const pageElement=

                document.createElement("div");

            pageElement.className="projects-page";

            const start=

                page*this.cardsPerPage;

            const end=

                start+this.cardsPerPage;

            const pageProjects=

                PROJECTS.slice(

                    start,

                    end

                );

            pageProjects.forEach(project=>{

                pageElement.insertAdjacentHTML(

                    "beforeend",

                    this.createProjectCard(project)

                );

            });

            this.track.appendChild(

                pageElement

            );

        }

        this.slideToCurrentPage();

        this.attachImageEvents();

    },

    /*=====================================================
                    CREATE CARD
    =====================================================*/

    createProjectCard(project){

        return`

        <article class="project-card">

            <div

                class="project-image"

                data-image="${project.image}">

                <span

                    class="project-status ${project.status.toLowerCase()}">

                    ${project.status}

                </span>

                <img

                    src="${project.image}"

                    alt="${project.title}"

                    loading="lazy">

            </div>

            <div class="project-content">

                <h3 class="project-title">

                    ${project.title}

                </h3>

                <div class="project-details">

                    <div class="project-detail">

                        <div class="project-icon">

                            📍

                        </div>

                        <div class="project-text">

                            <span class="project-label">

                                Location

                            </span>

                            <span class="project-value">

                                ${project.location}

                            </span>

                        </div>

                    </div>

                    <div class="project-detail">

                        <div class="project-icon">

                            📅

                        </div>

                        <div class="project-text">

                            <span class="project-label">

                                Started

                            </span>

                            <span class="project-value">

                                ${project.started}

                            </span>

                        </div>

                    </div>

                    <div class="project-detail">

                        <div class="project-icon">

                            ⏳

                        </div>

                        <div class="project-text">

                            <span class="project-label">

                                Duration

                            </span>

                            <span class="project-value">

                                ${project.duration}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </article>

        `;

    },
    /*=====================================================
                    SLIDE TO PAGE
    =====================================================*/

slideToCurrentPage(){

    const offset=

        this.currentPage*100;

    this.track.style.transform=

        `translateX(-${offset}%)`;

},
    /*=====================================================
                    NEXT PAGE
    =====================================================*/

    nextPage(){

        if(

            this.currentPage>=

            this.totalPages-1

        ){

            return;

        }

        this.currentPage++;

        this.slideToCurrentPage();

        this.updateNavigation();

        this.updatePagination();

    },

    /*=====================================================
                    PREVIOUS PAGE
    =====================================================*/

    previousPage(){

        if(

            this.currentPage<=0

        ){

            return;

        }

        this.currentPage--;

        this.slideToCurrentPage();

        this.updateNavigation();

        this.updatePagination();

    },

    /*=====================================================
                    UPDATE NAVIGATION
    =====================================================*/

    updateNavigation(){

        if(

            this.currentPage===0

        ){

            this.prevButton.classList.add(

                "hidden"

            );

        }

        else{

            this.prevButton.classList.remove(

                "hidden"

            );

        }

        if(

            this.currentPage===

            this.totalPages-1

        ){

            this.nextButton.classList.add(

                "hidden"

            );

        }

        else{

            this.nextButton.classList.remove(

                "hidden"

            );

        }

    },

    /*=====================================================
                    CREATE PAGINATION
    =====================================================*/

    createPagination(){

        this.pagination.innerHTML="";

        for(

            let i=0;

            i<this.totalPages;

            i++

        ){

            const dot=

                document.createElement(

                    "button"

                );

            dot.className=

                "projects-dot";

            if(

                i===this.currentPage

            ){

                dot.classList.add(

                    "active"

                );

            }

            dot.addEventListener(

                "click",

                ()=>{

                    this.currentPage=i;

                    this.slideToCurrentPage();

                    this.updateNavigation();

                    this.updatePagination();

                }

            );

            this.pagination.appendChild(

                dot

            );

        }

    },

    /*=====================================================
                    UPDATE PAGINATION
    =====================================================*/

    updatePagination(){

        const dots=

            this.pagination.querySelectorAll(

                ".projects-dot"

            );

        dots.forEach(

            (dot,index)=>{

                dot.classList.toggle(

                    "active",

                    index===this.currentPage

                );

            }

        );

    },
    /*=====================================================
                    ATTACH IMAGE EVENTS
    =====================================================*/

    attachImageEvents(){

        const images=

            this.track.querySelectorAll(

                ".project-image"

            );

        images.forEach(image=>{

            image.addEventListener(

                "click",

                ()=>{

                    this.openLightbox(

                        image.dataset.image

                    );

                }

            );

        });

    },

    /*=====================================================
                    OPEN LIGHTBOX
    =====================================================*/

    openLightbox(image){

        this.lightboxImage.src=image;

        this.lightbox.classList.add(

            "active"

        );

        document.body.style.overflow=

            "hidden";

    },

    /*=====================================================
                    CLOSE LIGHTBOX
    =====================================================*/

    closeLightbox(){

        this.lightbox.classList.remove(

            "active"

        );

        document.body.style.overflow="";

        setTimeout(()=>{

            this.lightboxImage.src="";

        },300);

    },

    /*=====================================================
                    BIND EVENTS
    =====================================================*/

    bindEvents(){

        this.prevButton.addEventListener(

            "click",

            ()=>{

                this.previousPage();

            }

        );

        this.nextButton.addEventListener(

            "click",

            ()=>{

                this.nextPage();

            }

        );

        this.closeButton.addEventListener(

            "click",

            ()=>{

                this.closeLightbox();

            }

        );

        this.lightbox.addEventListener(

            "click",

            (event)=>{

                if(

                    event.target===

                    this.lightbox

                ){

                    this.closeLightbox();

                }

            }

        );

        document.addEventListener(

            "keydown",

            (event)=>{

                if(

                    event.key==="Escape"

                ){

                    this.closeLightbox();

                }

            }

        );

        window.addEventListener(

            "resize",

            ()=>{

                this.handleResize();

            }

        );

    },

    /*=====================================================
                    HANDLE RESIZE
    =====================================================*/

    handleResize(){

        const previous=

            this.cardsPerPage;

        this.updateCardsPerPage();

        if(

            previous!==

            this.cardsPerPage

        ){

            this.calculatePages();

            if(

                this.currentPage>=

                this.totalPages

            ){

                this.currentPage=

                    this.totalPages-1;

            }

            this.renderPages();

            this.createPagination();

            this.updateNavigation();

        }

    },
    /*=====================================================
                        REFRESH
    =====================================================*/

    refresh(){

        this.updateCardsPerPage();

        this.calculatePages();

        if(

            this.currentPage>

            this.totalPages-1

        ){

            this.currentPage=

                Math.max(

                    0,

                    this.totalPages-1

                );

        }

        this.renderPages();

        this.createPagination();

        this.updateNavigation();

    },

    /*=====================================================
                        DESTROY
    =====================================================*/

    destroy(){

        document.body.style.overflow="";

        this.track.innerHTML="";

        this.pagination.innerHTML="";

        this.currentPage=0;

    }

};


