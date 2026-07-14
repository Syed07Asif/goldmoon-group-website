const Navigation = {

    init(){

        this.menu = document.querySelector(".nav-menu");

        this.toggle = document.querySelector(".menu-toggle");

        this.links = document.querySelectorAll(".nav-menu a");

        this.sections = document.querySelectorAll("main section");

        this.bindEvents();

        this.updateActiveLink();

        window.addEventListener("scroll", () => {

            this.updateActiveLink();

        });

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

    },

    updateActiveLink(){

        let currentSection = "";

        this.sections.forEach(section=>{

            const sectionTop = section.offsetTop - 150;

            if(window.scrollY >= sectionTop){

                currentSection = section.getAttribute("id");

            }

        });

        this.links.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + currentSection){

                link.classList.add("active");

            }

        });

    }

};