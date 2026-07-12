const Navigation = {

    init(){

        this.menu=document.querySelector(".nav-menu");

        this.toggle=document.querySelector(".menu-toggle");

        this.links=document.querySelectorAll(".nav-menu a");

        this.bindEvents();

    },

    bindEvents(){

        this.toggle.addEventListener("click",()=>{

            this.toggle.classList.toggle("active");

            this.menu.classList.toggle("active");

        });

        this.links.forEach(link=>{

            link.addEventListener("click",()=>{

                this.menu.classList.remove("active");

                this.toggle.classList.remove("active");

            });

        });

    }

};