/*=========================================================
                    PROJECTS MODULE
=========================================================*/

const Projects={

    lightbox:null,

    lightboxImage:null,

    closeButton:null,

    grid:null,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.grid=document.getElementById("projectsGrid");

        this.lightbox=document.getElementById("projectLightbox");

        this.lightboxImage=document.getElementById("lightboxImage");

        this.closeButton=document.getElementById("closeProjectLightbox");

        this.renderProjects();

        this.preloadImages();

        this.animateCards();

        this.bindEvents();

    },

    /*=====================================================
                        EVENTS
    =====================================================*/

    bindEvents(){

        this.closeButton.addEventListener("click",()=>{

            this.closeLightbox();

        });

        this.lightbox.addEventListener("click",(e)=>{

            if(e.target===this.lightbox){

                this.closeLightbox();

            }

        });

        document.addEventListener("keydown",(e)=>{

            if(e.key==="Escape"){

                this.closeLightbox();

            }

        });

    },

    /*=====================================================
                    CREATE CARD
    =====================================================*/

    createProjectCard(project){

        const statusClass=this.getStatusClass(project.status);

        return`

        <article class="project-card">

            <div
                class="project-image"
                data-image="${project.image}">

                <span
                    class="project-status ${statusClass}">

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
                    RENDER PROJECTS
    =====================================================*/

    renderProjects(){

        this.grid.innerHTML="";

        PROJECTS.forEach(project=>{

            this.grid.insertAdjacentHTML(

                "beforeend",

                this.createProjectCard(project)

            );

        });

        this.attachImageEvents();

    },

    /*=====================================================
                    IMAGE EVENTS
    =====================================================*/

    attachImageEvents(){

        const images=

            document.querySelectorAll(".project-image");

        images.forEach(image=>{

            image.addEventListener("click",()=>{

                const src=image.dataset.image;

                this.openLightbox(src);

            });

        });

    },

    /*=====================================================
                    OPEN LIGHTBOX
    =====================================================*/

    openLightbox(image){

        this.lightboxImage.src=image;

        this.lightbox.classList.add("active");

        document.body.style.overflow="hidden";

    },

    /*=====================================================
                    CLOSE LIGHTBOX
    =====================================================*/

    closeLightbox(){

        this.lightbox.classList.remove("active");

        document.body.style.overflow="";

        setTimeout(()=>{

            this.lightboxImage.src="";

        },300);

    },
    /*=====================================================
                    STATUS CLASS
    =====================================================*/

    getStatusClass(status){

        switch(status.toLowerCase()){

            case "completed":

                return "completed";

            case "ongoing":

                return "ongoing";

            case "upcoming":

                return "upcoming";

            default:

                return "completed";

        }

    },

    /*=====================================================
                    IMAGE PRELOAD
    =====================================================*/

    preloadImages(){

        PROJECTS.forEach(project=>{

            const image=new Image();

            image.src=project.image;

        });

    },

    /*=====================================================
                    ANIMATE CARDS
    =====================================================*/

    animateCards(){

        const cards=document.querySelectorAll(".project-card");

        cards.forEach((card,index)=>{

            card.style.animationDelay=`${index*0.15}s`;

        });

    },

    /*=====================================================
                    REFRESH
    =====================================================*/

    refresh(){

        this.renderProjects();

        this.animateCards();

    },

    /*=====================================================
                    DESTROY
    =====================================================*/

    destroy(){

        document.body.style.overflow="";

        if(this.lightbox){

            this.lightbox.classList.remove("active");

        }

    }

};