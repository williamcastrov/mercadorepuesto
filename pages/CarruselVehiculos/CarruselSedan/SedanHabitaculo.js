import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const items = [
    {
        src: "/imgcarrusel/sedan/Sedanhabitaculo1.png",
        altText: 'Imagen 1',
        //caption: 'Sedan Habitáculo 1'
    },
    {
        src: "/imgcarrusel/sedan/Sedanhabitaculo2.png",
        altText: 'Imagen 2',
        //caption: 'Sedan Habitáculo 2'
    },
    {
        src: "/imgcarrusel/sedan/Sedanhabitaculo3.png",
        altText: 'Imagen 3',
        //caption: 'Sedan Habitáculo 3'
    },
    {
        src: "/imgcarrusel/sedan/Sedanhabitaculo4.png",
        altText: 'Imagen 4',
        //caption: 'Sedan Habitáculo 4'
    }
];

class SedanHabitaculo extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} width="540px" height="300px" />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div className="tamañocarruselhabitaculo">
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    {
                        //<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    }
                    {slides}
                    <div>
                        <CarouselControl className='colorbotonescarrusel' direction="prev" directionText="Anterior" onClickHandler={this.previous} />
                        <CarouselControl className='colorbotonescarrusel'  direction="next" directionText="Siguiente" onClickHandler={this.next} />
                    </div>
                </Carousel>
            </div>

        );
    }
}


export default SedanHabitaculo;