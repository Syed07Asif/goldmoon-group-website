/*=========================================================
                    CONTACT MODULE
=========================================================*/

const Contact = {

    /*=====================================================
                    ELEMENTS
    =====================================================*/

    section: null,

    /*=====================================================
                        INIT
    =====================================================*/

    init(){

        this.section=document.getElementById("contact");

        if(!this.section){

            return;

        }

        this.bindEvents();

    },

    /*=====================================================
                    BIND EVENTS
    =====================================================*/

    bindEvents(){

        const links=

            this.section.querySelectorAll("a");

        links.forEach(link=>{

            link.addEventListener("click",()=>{

                this.linkClicked(link);

            });

        });

    },

    /*=====================================================
                    LINK CLICKED
    =====================================================*/

    linkClicked(link){

        console.log(

            "Contact Link Clicked:",

            link.href

        );

    }

};