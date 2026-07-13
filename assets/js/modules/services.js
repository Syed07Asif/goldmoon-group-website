/*=========================================================
                    SERVICES MODULE
=========================================================*/

const Services = {

    currentIndex: 0,

    total: SERVICES.length,

    isAnimating: false,

    currentCard: null,

    incomingCard: null,

    previousButton: null,

    nextButton: null,

    leftStack: null,

    rightStack: null,

    pagination: null,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.currentCard=document.getElementById("currentCard");

        this.incomingCard=document.getElementById("incomingCard");

        this.previousButton=document.getElementById("previousService");

        this.nextButton=document.getElementById("nextService");

        this.leftStack=document.getElementById("leftStack");

        this.rightStack=document.getElementById("rightStack");

        this.pagination=document.getElementById("deckPagination");

        this.render();

        this.bindEvents();

    },

    /*=====================================================
                    EVENTS
    =====================================================*/

    bindEvents(){

        this.previousButton.addEventListener("click",()=>{

            this.previous();

        });

        this.nextButton.addEventListener("click",()=>{

            this.next();

        });

        document.addEventListener("keydown",(e)=>{

            if(e.key==="ArrowLeft"){

                this.previous();

            }

            if(e.key==="ArrowRight"){

                this.next();

            }

        });

    },

    /*=====================================================
                    CARD TEMPLATE
    =====================================================*/

    createCard(service){

        return `

        <div class="service-card-inner">

            <div class="service-front">

                <div class="service-image">

                    <img
                        src="${service.image}"
                        alt="${service.title}"
                        draggable="false">

                </div>

                <div class="service-content">

                    <h3 class="service-title">

                        ${service.title}

                    </h3>

                    <div class="service-actions">

                        <button
                            class="btn btn-primary learn-more">

                            Learn More

                        </button>

                    </div>

                </div>

            </div>

            <div class="service-back">

                <div class="service-back-content">

                    <h3 class="service-back-title">

                        ${service.title}

                    </h3>

                    <ul class="service-list">

                        ${service.services.map(item=>`

                            <li>${item}</li>

                        `).join("")}

                    </ul>

                    <div class="service-back-actions">

                        <button
                            class="btn btn-secondary close-card">

                            Close

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    },

    /*=====================================================
                    RENDER
    =====================================================*/

    render(){

        this.currentCard.innerHTML=

            this.createCard(

                SERVICES[this.currentIndex]

            );

        this.renderStacks();

        this.renderDots();

        this.updateButtons();

        this.attachCardEvents();

    },

    /*=====================================================
                    FLIP
    =====================================================*/

    attachCardEvents(){

        const learn=

            this.currentCard.querySelector(".learn-more");

        const close=

            this.currentCard.querySelector(".close-card");

        const inner=

            this.currentCard.querySelector(".service-card-inner");

        learn.addEventListener("click",()=>{

            inner.style.transform="rotateY(180deg)";

        });

        close.addEventListener("click",()=>{

            inner.style.transform="rotateY(0deg)";

        });

    },
        /*=====================================================
                    STACKS
    =====================================================*/

    renderStacks(){

        this.leftStack.innerHTML="";

        this.rightStack.innerHTML="";

        /* LEFT STACK */

        const leftCards=Math.min(this.currentIndex,3);

        for(let i=0;i<leftCards;i++){

            const card=document.createElement("div");

            card.className="stack-card";

            card.style.left=`${i*14}px`;

            card.style.zIndex=i+1;

            card.style.opacity=.45+(i*.15);

            card.style.transform=

                `rotate(${-6+(i*3)}deg)`;

            this.leftStack.appendChild(card);

        }

        /* RIGHT STACK */

        const remaining=

            this.total-this.currentIndex-1;

        const rightCards=Math.min(remaining,3);

        for(let i=0;i<rightCards;i++){

            const card=document.createElement("div");

            card.className="stack-card";

            card.style.right=`${i*14}px`;

            card.style.zIndex=rightCards-i;

            card.style.opacity=.45+(i*.15);

            card.style.transform=

                `rotate(${i*3}deg)`;

            this.rightStack.appendChild(card);

        }

    },

    /*=====================================================
                    PAGINATION
    =====================================================*/

    renderDots(){

        this.pagination.innerHTML="";

        const maxDots=5;

        let start=0;

        if(this.total>maxDots){

            start=Math.max(

                0,

                Math.min(

                    this.currentIndex-2,

                    this.total-maxDots

                )

            );

        }

        const end=Math.min(

            start+maxDots,

            this.total

        );

        for(let i=start;i<end;i++){

            const dot=document.createElement("button");

            dot.className="deck-dot";

            if(i===this.currentIndex){

                dot.classList.add("active");

            }

            dot.addEventListener("click",()=>{

                if(this.isAnimating) return;

                this.goTo(i);

            });

            this.pagination.appendChild(dot);

        }

    },

    /*=====================================================
                    BUTTONS
    =====================================================*/

    updateButtons(){

        this.previousButton.classList.toggle(

            "hidden",

            this.currentIndex===0

        );

        this.nextButton.classList.toggle(

            "hidden",

            this.currentIndex===this.total-1

        );

    },

    /*=====================================================
                    GO TO
    =====================================================*/

    goTo(index){

        if(index===this.currentIndex) return;

        if(this.isAnimating) return;

        if(index>this.currentIndex){

            this.animateNext(index);

        }

        else{

            this.animatePrevious(index);

        }

    },
        /*=====================================================
                    NEXT
    =====================================================*/

    next(){

        if(this.isAnimating) return;

        if(this.currentIndex>=this.total-1) return;

        this.animateNext(this.currentIndex+1);

    },

    /*=====================================================
                    PREVIOUS
    =====================================================*/

    previous(){

        if(this.isAnimating) return;

        if(this.currentIndex<=0) return;

        this.animatePrevious(this.currentIndex-1);

    },

    /*=====================================================
                    ANIMATE NEXT
    =====================================================*/

    animateNext(targetIndex){

        this.isAnimating=true;

        const service=SERVICES[targetIndex];

        this.incomingCard.innerHTML=this.createCard(service);

        this.incomingCard.classList.add("show");

        this.incomingCard.classList.add("from-right");

        requestAnimationFrame(()=>{

            this.currentCard.classList.add("move-left");

            this.currentCard.classList.add("animating");

            this.incomingCard.classList.add("to-center");

        });

        setTimeout(()=>{

            this.currentIndex=targetIndex;

            this.currentCard.innerHTML=

                this.incomingCard.innerHTML;

            this.afterAnimation();

        },550);

    },

    /*=====================================================
                    ANIMATE PREVIOUS
    =====================================================*/

    animatePrevious(targetIndex){

        this.isAnimating=true;

        const service=SERVICES[targetIndex];

        this.incomingCard.innerHTML=this.createCard(service);

        this.incomingCard.classList.add("show");

        this.incomingCard.classList.add("from-left");

        requestAnimationFrame(()=>{

            this.currentCard.classList.add("move-right");

            this.currentCard.classList.add("animating");

            this.incomingCard.classList.add("to-center");

        });

        setTimeout(()=>{

            this.currentIndex=targetIndex;

            this.currentCard.innerHTML=

                this.incomingCard.innerHTML;

            this.afterAnimation();

        },550);

    },
        /*=====================================================
                    TOUCH SUPPORT
    =====================================================*/

    touchStartX:0,

    touchEndX:0,

    bindSwipe(){

        const stage=document.querySelector(".card-stage");

        if(!stage) return;

        stage.addEventListener("touchstart",(e)=>{

            this.touchStartX=e.changedTouches[0].clientX;

        },{passive:true});

        stage.addEventListener("touchend",(e)=>{

            this.touchEndX=e.changedTouches[0].clientX;

            this.handleSwipe();

        });

    },

    handleSwipe(){

        const distance=this.touchEndX-this.touchStartX;

        const threshold=60;

        if(Math.abs(distance)<threshold) return;

        if(distance<0){

            this.next();

        }

        else{

            this.previous();

        }

    },

    /*=====================================================
                    KEYBOARD
    =====================================================*/

    bindKeyboard(){

        document.addEventListener("keydown",(e)=>{

            if(this.isAnimating) return;

            switch(e.key){

                case "ArrowLeft":

                    this.previous();

                    break;

                case "ArrowRight":

                    this.next();

                    break;

                default:

                    break;

            }

        });

    },

    /*=====================================================
                    REFRESH
    =====================================================*/

    refresh(){

        this.renderStacks();

        this.renderDots();

        this.updateButtons();

        this.attachCardEvents();

    },
        /*=====================================================
                    RESET INCOMING CARD
    =====================================================*/

    resetIncomingCard(){

        this.incomingCard.innerHTML="";

        this.incomingCard.className=

            "service-card incoming-card";

    },

    /*=====================================================
                    RESET CURRENT CARD
    =====================================================*/

    resetCurrentCard(){

        this.currentCard.classList.remove(

            "move-left",

            "move-right",

            "animating",

            "flipped"

        );

    },

    /*=====================================================
                    AFTER ANIMATION
    =====================================================*/

    afterAnimation(){

        this.resetCurrentCard();

        this.resetIncomingCard();

        this.refresh();

        this.isAnimating=false;

    }

};
