const About = {

    init(){

        this.images = document.querySelectorAll(".about-photo");

        if(this.images.length <= 1){

            return;

        }

        this.current = 0;

        setInterval(() => {

            this.images[this.current].classList.remove("active");

            this.current = (this.current + 1) % this.images.length;

            this.images[this.current].classList.add("active");

        }, 5000);

    }

};