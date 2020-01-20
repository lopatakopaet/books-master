export default class Slider {
    constructor(photos) {
        this.photos = photos;
        this.count = 0;
        this.render();
        this.photoElem = document.querySelector('.photo');
        if (this.photoElem) {
            this.photoElem.src = photos[0];
        }
        this.setHandlers();
    }

    destroy() {
        document.querySelector('.slider_wrap').innerHTML = '';
    }

    setHandlers() {
        document.querySelector('.rightArrow').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.photos.length > 1) {
                this.movePhotosRight();
            }
            e.stopPropagation()
        });
        document.querySelector('.leftArrow').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.photos.length > 1) {
                this.movePhotosLeft();
            }
            e.stopPropagation()
        });
        document.addEventListener('click', (e) => {
            let _this = e.target;
            if (!_this.matches('.leftArrow') && !_this.matches('.rightArrow') && !_this.matches('.block_photo img')) {
                this.destroy();
            }
        });
        // document.querySelector('.book_img').addEventListener('click', (e) => {
        //     let _this = e.target;
        //     if (!_this.matches('.leftArrow') && !_this.matches('.rightArrow') && !_this.matches('.block_photo img')) {
        //         this.destroy();
        //     }
        // });
    }

    movePhotosRight() {
        this.count++;
        if (this.count >= this.photos.length) {
            this.count = 0;
        }
        this.photoElem.src = this.photos[this.count];
    }

    movePhotosLeft() {
        this.count--;
        if (this.count < 0) {
            this.count = this.photos.length - 1;
        }
        this.photoElem.src = this.photos[this.count];
    }

    hideArrow() {
        if (this.photos.length == 1) {
            return 'hide'
        }
    }

    // render() {
    //     document.querySelector('.slider_wrap').innerHTML = `
    //         <div class="slider">
    //             <div class="leftArrow ${this.hideArrow()}">
    //                 <img src="./assets/img/arrow.png" alt="">
    //             </div>
    //             <div class="block_photo">
    //                 <img src="" alt="" class="photo">
    //             </div>
    //             <div class="rightArrow ${this.hideArrow()}">
    //                 <img src="./assets/img/arrow.png" alt="">
    //             </div>
    //         </div>
    // `
    // }

    render() {
        document.querySelector('.slider_wrap').innerHTML = `
            <div class="slider">
                <div class="leftArrow ${this.hideArrow()}">
                    <img src="./assets/img/arrow.png" alt="">
                </div>
                <div class="block_photo">
                    <img src="" alt="" class="photo">
                </div>
                <div class="rightArrow ${this.hideArrow()}">
                    <img src="./assets/img/arrow.png" alt="">
                </div>
            </div>
    `
    }
}
