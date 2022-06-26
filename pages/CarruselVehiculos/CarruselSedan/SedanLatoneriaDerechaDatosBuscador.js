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
        src: "/imgcarrusel/sedan/Sedanazulderecha1.jpg",
        altText: 'Imagen 1',
        //caption: 'Sedan Latoneria Derecha Vista1'
    },
    {
        src: "/imgcarrusel/sedan/Sedanazulderecha2.jpg",
        altText: 'Imagen 2',
        //caption: 'Sedan Latoneria Derecha Vista2'
    },
    {
        src: "/imgcarrusel/sedan/Sedanazulderecha3.jpg",
        altText: 'Imagen 3',
        //caption: 'Sedan Latoneria Derecha Vista3'
    },
    {
        src: "/imgcarrusel/sedan/Sedanazulderecha4.jpg",
        altText: 'Imagen 4',
        //aption: 'Sedan Latoneria Derecha Vista4'
    }
];

class SedanLatoneriaDerechaDatosBuscador extends Component {
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
                    <img src={item.src} alt={item.altText} width="520px" height="300px" />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div className="tamañocarruseldatosbuscador">
                <Carousel
                    activeIndex={activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    {
                        //<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    }
                    {slides}
                    <div className='colorbotonescarrusel'>
                        <CarouselControl direction="prev" directionText="Anterior" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Siguiente" onClickHandler={this.next} />
                    </div>
                </Carousel>
            </div>

        );
    }
}


export default SedanLatoneriaDerechaDatosBuscador;