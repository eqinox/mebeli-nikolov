"use client"
// import Image from 'next/image';
import Image from 'next/legacy/image';
import styles from './page.module.css';
import { BiExpandAlt } from "react-icons/bi";
import { useRef, useState } from 'react';
import Modal from '../components/modal';

const AboutUs = () => {
    const [welcomeImageForOpening, setWelcomeImageForOpening] = useState("");
    const [productionImageForOpening, setProductionImageForOpening] = useState("");
    const [productImageForOpening, setProductImageForOpening] = useState("");
    const [designImageForOpening, setDesignImageForOpening] = useState("");

    const [welcomeImageLinks, setWelcomeImageLinks] = useState([
        { src: '/about-us/20170423_105125.jpg', alt: 'working-team', id: 1 },
        { src: '/about-us/20170423_160800.jpg', alt: 'diploma', id: 2 }
    ])
    const [productionImageLinks, setProductionImageLinks] = useState([
        { src: '/about-us/20170423_104509.jpg', alt: 'work-process1', id: 3 },
        { src: '/about-us/20170423_104725.jpg', alt: 'work-process2', id: 4 },
        { src: '/about-us/20170423_104926.jpg', alt: 'work-process3', id: 5 },
    ])
    const [productImageLinks, setPOroductImageLinks] = useState([
        { src: '/about-us/20140417_150557.jpg', alt: 'kitchen-example', id: 6 },
        { src: '/about-us/20150708_123104-e1493010335693.jpg', alt: 'work-example', id: 7 },
        { src: '/about-us/20150203_134656.jpg', alt: 'wardrobe-example', id: 8 },
    ])
    const [designImageLinks, setDesignImageLinks] = useState([
        { src: '/about-us/20170423_114112.jpg', alt: 'kitchen-drawinmg', id: 9 },
        { src: '/about-us/20170423_114330.jpg', alt: 'kitchen-drawing2', id: 10 }
    ])
    const [partnersImageLinks, setPartnersImageLinks] = useState([
        { src: '/partners/orma.png', alt: 'orma', id: 11 },
        { src: '/partners/glunz.png', alt: 'glunz', id: 12 },
        { src: '/partners/fundermax.png', alt: 'fundermax', id: 13 },
        { src: '/partners/kastamonu.png', alt: 'kastamonu', id: 14 },
        { src: '/partners/thermopal.png', alt: 'thermopal', id: 15 },
        { src: '/partners/kronospan.png', alt: 'kronospan', id: 16 },
        { src: '/partners/duropal.png', alt: 'duropal', id: 17 },
        { src: '/partners/akritas2.png', alt: 'akritas', id: 18 },
        { src: '/partners/getalit.jpg', alt: 'getalit', id: 19 },
        { src: '/partners/wodego2.png', alt: 'wodego', id: 20 },
        { src: '/partners/Egger.png', alt: 'egger', id: 21 },
    ])
    const welcomeRef = useRef(null);
    const productionRef = useRef(null);
    const productRef = useRef(null);
    const designRef = useRef(null);

    const handleOpeningWelcomeModal = (href) => {
        setWelcomeImageForOpening(href);
        if (href) {
            welcomeRef.current.showModal();
        }
    }

    const handleOpeningProductionModal = (href) => {
        setProductionImageForOpening(href);
        if (href) {
            productionRef.current.showModal();
        }
    }

    const handleOpeningProductModal = (href) => {
        setProductImageForOpening(href);
        if (href) {
            productRef.current.showModal();
        }
    }

    const handleOpeningDesignModal = (href) => {
        setDesignImageForOpening(href);
        if (href) {
            designRef.current.showModal();
        }
    }

    const goToNextWelcomeImage = (url) => {
        const index = welcomeImageLinks.findIndex((item) => item.src === url);
        if (index + 1 === welcomeImageLinks.length) {
            setWelcomeImageForOpening(welcomeImageLinks[0].src);
        } else {
            setWelcomeImageForOpening(welcomeImageLinks[index + 1].src);
        }
    }

    const goToPrevWelcomeImage = (url) => {
        const index = welcomeImageLinks.findIndex((item) => item.src === url);
        if (index - 1 === -1) {
            setWelcomeImageForOpening(welcomeImageLinks[welcomeImageLinks.length - 1].src);
        } else {
            setWelcomeImageForOpening(welcomeImageLinks[index - 1].src);
        }
    }

    const goToNextProductionImage = (url) => {
        const index = productionImageLinks.findIndex((item) => item.src === url);
        if (index + 1 === productionImageLinks.length) {
            setProductionImageForOpening(productionImageLinks[0].src);
        } else {
            setProductionImageForOpening(productionImageLinks[index + 1].src);
        }
    }

    const goToPrevProductionImage = (url) => {
        const index = productionImageLinks.findIndex((item) => item.src === url);
        if (index - 1 === -1) {
            setProductionImageForOpening(productionImageLinks[productionImageLinks.length - 1].src);
        } else {
            setProductionImageForOpening(productionImageLinks[index - 1].src);
        }
    }

    const goToNextProductImage = (url) => {
        const index = productImageLinks.findIndex((item) => item.src === url);
        if (index + 1 === productImageLinks.length) {
            setProductImageForOpening(productImageLinks[0].src);
        } else {
            setProductImageForOpening(productImageLinks[index + 1].src);
        }
    }

    const goToPrevProductImage = (url) => {
        const index = productImageLinks.findIndex((item) => item.src === url);
        if (index - 1 === -1) {
            setProductImageForOpening(productImageLinks[productImageLinks.length - 1].src);
        } else {
            setProductImageForOpening(productImageLinks[index - 1].src);
        }
    }

    const goToNextDesignImage = (url) => {
        const index = designImageLinks.findIndex((item) => item.src === url);
        if (index + 1 === designImageLinks.length) {
            setDesignImageForOpening(designImageLinks[0].src);
        } else {
            setDesignImageForOpening(designImageLinks[index + 1].src);
        }
    }

    const goToPrevDesignImage = (url) => {
        const index = designImageLinks.findIndex((item) => item.src === url);
        if (index - 1 === -1) {
            setDesignImageForOpening(designImageLinks[designImageLinks.length - 1].src);
        } else {
            setDesignImageForOpening(designImageLinks[index - 1].src);
        }
    }

    return <section style={{
        marginBottom: '70px'
    }}
    >
        <Modal
            ref={welcomeRef}
            href={welcomeImageForOpening}
            resetImage={setWelcomeImageForOpening}
            handleNextImage={goToNextWelcomeImage}
            handlePrevImage={goToPrevWelcomeImage}
        />

        <Modal
            ref={productionRef}
            href={productionImageForOpening}
            resetImage={setProductionImageForOpening}
            handleNextImage={goToNextProductionImage}
            handlePrevImage={goToPrevProductionImage}
        />

        <Modal
            ref={productRef}
            href={productImageForOpening}
            resetImage={setProductImageForOpening}
            handleNextImage={goToNextProductImage}
            handlePrevImage={goToPrevProductImage}
        />

        <Modal
            ref={designRef}
            href={designImageForOpening}
            resetImage={setDesignImageForOpening}
            handleNextImage={goToNextDesignImage}
            handlePrevImage={goToPrevDesignImage}
        />

        <div onClick={() => { console.log('asdasdasdasd'); }}>
            test
        </div>
        <article className={styles.article}>
            <div
                className={styles.articleInfo}
            >
                <h2>Добре дошли в света на мебели Николов</h2>
                <p>Завършил съм Техникум по дървообработване и вътрешна архитектура – София. Занимавам се с мебели от 1995г. Предлагам цялостно обзавеждане на вашия дом с корпосна мебел от ПДЧ и ПДВ (MDF)</p>
            </div>

            <div className={styles.smallImageGallery}>
                {console.log('asd', styles)}
                {welcomeImageLinks.map((item) => <div
                    key={item.id}
                    className={styles['image-wrapper']}
                    onClick={() => handleOpeningWelcomeModal(item.src)}
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={200}
                        height={150}
                    />
                    <div className={styles.overlay}></div>
                    <div className={styles['expand-icon']}>
                        < BiExpandAlt />
                    </div>
                </div>)}
            </div>
        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Производство</h2>
                <p>Високотехнологичните машини са гаранция за качеството на крайният продукт. Производствената база е оборудвана със съвременни машини. Форматно – разкрояващ циркуляр на фирмата LAZZARI и кантираща машина NIKMANN.</p>
            </div>
            <div className={styles.smallImageGallery}>
                {productionImageLinks.map((item) =>

                    <div
                        key={item.id}
                        className={styles['image-wrapper']}
                        onClick={() => handleOpeningProductionModal(item.src)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={200}
                            height={150}
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles['expand-icon']}>
                            < BiExpandAlt />
                        </div>
                    </div>)}
            </div>



        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Продукти</h2>
                <p>Дейността на мебелният цел е свързана с производството на корпусна мебел, като по-голям дял заема производството на кухни и тяхното монтиране. Произвеждат се също така: гардероби, спални, детски стаи, входни антрета, бюра, легла, холни секции и др.</p>
            </div>

            <div className={styles.smallImageGallery}>
                {productImageLinks.map((item) =>
                    <div
                        key={item.id}
                        className={styles['image-wrapper']}
                        onClick={() => handleOpeningProductModal(item.src)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={200}
                            height={150}
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles['expand-icon']}>
                            < BiExpandAlt />
                        </div>
                    </div>)}
            </div>

        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Проектиране</h2>
                <p>Всяка поръчка е направена по индивидуален проект за всеки клиент. Индивидуалното проектиране дава възможност за пълноценното оползотворяване на пространствата, постигане на максимална функционалност на отделните детайли в помещението.</p>
            </div>

            <div className={styles.smallImageGallery}>
                {designImageLinks.map((item) =>
                    <div
                        key={item.id}
                        className={styles['image-wrapper']}
                        onClick={() => handleOpeningDesignModal(item.src)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={200}
                            height={150}
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles['expand-icon']}>
                            < BiExpandAlt />
                        </div>
                    </div>)}
            </div>
        </article>

        <article>
            <h3 style={{ textAlign: 'center', color: 'black' }}>Партньори</h3>
            <div style={{ width: '70%', margin: 'auto' }}>
                {partnersImageLinks.map((image) => {
                    return (<div
                        key={image.id}
                        className={styles.partner}
                        style={{ margin: '15px' }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={200}
                            height={100}
                            priority
                        />
                    </div>)
                })}
            </div>
        </article>


    </section>;
};

export default AboutUs;
