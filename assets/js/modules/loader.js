/*=========================================================
                    LOADER MODULE
=========================================================*/

const Loader={

    loader:null,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.loader=document.getElementById("loader");

        if(!this.loader){

            return;

        }

        window.addEventListener(

            "load",

            ()=>{

                this.hideLoader();

            }

        );

    },

    /*=====================================================
                    HIDE LOADER
    =====================================================*/

    hideLoader(){

        setTimeout(()=>{

            this.loader.classList.add("hide");

        },1000);

    }

};