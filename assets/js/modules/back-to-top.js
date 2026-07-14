/*=========================================================
                    BACK TO TOP MODULE
=========================================================*/

const BackToTop={

    button:null,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.button=document.getElementById("backToTop");

        if(!this.button){

            return;

        }

        this.bindEvents();

    },

    /*=====================================================
                    BIND EVENTS
    =====================================================*/

    bindEvents(){

        window.addEventListener("scroll",()=>{

            this.toggleButton();

        });

        this.button.addEventListener("click",()=>{

            this.scrollToTop();

        });

    },

    /*=====================================================
                    TOGGLE BUTTON
    =====================================================*/

    toggleButton(){

        if(window.scrollY>300){

            this.button.classList.add("show");

        }

        else{

            this.button.classList.remove("show");

        }

    },

    /*=====================================================
                    SCROLL TO TOP
    =====================================================*/

    scrollToTop(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

};