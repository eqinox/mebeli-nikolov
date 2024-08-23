"use client"
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import styles from './page.module.css';

const AboutUs = () => {
    const welcomeImageLinks = [
        { src: '/about-us/20170423_105125.jpg', alt: 'working-team', id: 1 },
        { src: '/about-us/20170423_160800.jpg', alt: 'diploma', id: 2 }
    ]

    const productionImageLinks = [
        { src: '/about-us/20170423_104509.jpg', alt: 'work-process1', id: 3 },
        { src: '/about-us/20170423_104725.jpg', alt: 'work-process2', id: 4 },
        { src: '/about-us/20170423_104926.jpg', alt: 'work-process3', id: 5 },
    ]

    const productImageLinks = [
        { src: '/about-us/20140417_150557.jpg', alt: 'kitchen-example', id: 6 },
        { src: '/about-us/20150708_123104-e1493010335693.jpg', alt: 'work-example', id: 7 },
        { src: '/about-us/20150203_134656.jpg', alt: 'wardrobe-example', id: 8 },
    ]

    const designImageLinks = [
        { src: '/about-us/20170423_114112.jpg', alt: 'kitchen-drawinmg', id: 9 },
        { src: '/about-us/20170423_114330.jpg', alt: 'kitchen-drawing2', id: 10 }
    ]

    const partnersImageLinks = [
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
    ]

    return <section style={{
        marginBottom: '70px'
    }}
    >
        <article className={styles.article}>
            <div
                className={styles.articleInfo}
            >
                <h2>Добре дошли в света на мебели Николов</h2>
                <p>Завършил съм Техникум по дървообработване и вътрешна архитектура – София. Занимавам се с мебели от 1995г. Предлагам цялостно обзавеждане на вашия дом с корпосна мебел от ПДЧ и ПДВ (MDF)</p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div >
                        {welcomeImageLinks.map((image) => <PhotoView key={image.id} src={image.src}>
                            <Image
                                src={image.src}
                                alt="test"
                                width={250}
                                height={200}
                                className={styles.imageWithMargin}
                            />
                        </PhotoView>)}
                    </div>
                </PhotoProvider>
            </div>
        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Производство</h2>
                <p>Високотехнологичните машини са гаранция за качеството на крайният продукт. Производствената база е оборудвана със съвременни машини. Форматно – разкрояващ циркуляр на фирмата LAZZARI и кантираща машина NIKMANN.</p>
            </div>
            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div >
                        {productionImageLinks.map((image) => <PhotoView key={image.id} src={image.src}>
                            <Image
                                src={image.src}
                                alt="test"
                                width={250}
                                height={200}
                                className={styles.imageWithMargin}
                            />
                        </PhotoView>)}
                    </div>
                </PhotoProvider>
            </div>
        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Продукти</h2>
                <p>Дейността на мебелният цел е свързана с производството на корпусна мебел, като по-голям дял заема производството на кухни и тяхното монтиране. Произвеждат се също така: гардероби, спални, детски стаи, входни антрета, бюра, легла, холни секции и др.</p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div >
                        {productImageLinks.map((image) => <PhotoView key={image.id} src={image.src}>
                            <Image
                                src={image.src}
                                alt="test"
                                width={250}
                                height={200}
                                className={styles.imageWithMargin}
                            />
                        </PhotoView>)}
                    </div>
                </PhotoProvider>
            </div>

        </article>

        <article className={styles.article}>
            <div className={styles.articleInfo}>
                <h2>Проектиране</h2>
                <p>Всяка поръчка е направена по индивидуален проект за всеки клиент. Индивидуалното проектиране дава възможност за пълноценното оползотворяване на пространствата, постигане на максимална функционалност на отделните детайли в помещението.</p>
            </div>

            <div className={styles.smallImageGallery}>
                <PhotoProvider>
                    <div >
                        {designImageLinks.map((image) => <PhotoView key={image.id} src={image.src}>
                            <Image
                                src={image.src}
                                alt="test"
                                width={250}
                                height={200}
                                className={styles.imageWithMargin}
                            />
                        </PhotoView>)}
                    </div>
                </PhotoProvider>
            </div>
        </article>

        <article>
            <h3 style={{ textAlign: 'center', color: 'black' }}>Партньори</h3>
            <div className={styles.partnersImageContainer}>
                {partnersImageLinks.map((image) => {
                    return (<div
                        key={image.id}
                        className={styles.partner}
                        style={{ margin: '15px' }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>)
                })}
            </div>
        </article>


    </section>;
};

export default AboutUs;
