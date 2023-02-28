import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        return [
            {
                id: 1,
                src: "images/small_dog.jpg",
                title: "Маленькие собаки",
                text: "Породы"
            },
            {
                id: 2,
                src: "images/middle_dog.jpg",
                title: "Средние собаки",
                text: "Породы"
            },
            {
                id: 3,
                src: "images/big_dog.jpg",
                title: "Большие собаки",
                text: "Породы"
            }
        ]
    }

    getAccordionData() {
        return [
            {
                id: 1,
                lst: [
                    {
                        id: 1,
                        src: "images/small_dogs/Kli-Kai.jpg",
                        title: "Аляскинский кли-кай",
                        text: "Аляскинский кли-кай – миниатюрная копия хаски и счастливый обладатель недюжинного обаяния, которое растопит ваше сердце! Вы не сдержите улыбку, глядя на столь харизматичного питомца."
                    },
                    {
                        id: 2,
                        src: "images/small_dogs/Pug.jpg",
                        title: "Мопс",
                        text: "Мопс является древней и неизменно популярной на протяжении всей своей истории породой. Это прекрасная собака-компаньон для городских жителей."
                    }
                ]
            },
            {
                id: 2,
                lst: [
                    {
                        id: 1,
                        src: "images/middle_dogs/Shiba-Inu.jpg",
                        title: "Сиба-Ину",
                        text: "Сиба-ину – очаровательная собака с плюшевой шерстью и своенравным характером. Быть хозяином такого питомца непросто, но если вы завоюете его уважение и доверие, то получите массу удовольствия от общения с умным и любознательным другом."
                    },
                    {
                        id: 2,
                        src: "images/middle_dogs/Border-Collie.jpg",
                        title: "Бордер-Колли",
                        text: "Бордер-колли – самая умная порода в мире, используется как компаньон или рабочая собака. С большим желанием «пасет» все живое, даже человека, если рядом нет овец или коров."
                    }
                ]
            },
            {
                id: 3,
                lst: [
                    {
                        id: 1,
                        src: "images/big_dogs/Azawak.jpg",
                        title: "Азавак",
                        text: "Азавак (африканская борзая) – вид грациозных, тонкошерстных собак, исторически обитающий в африканском регионе Сахель. Азавак относится к аборигенным примитивным породам, испытавшим минимальное влияние человека."
                    },
                    {
                        id: 2,
                        src: "images/big_dogs/Boxer.jpg",
                        title: "Боксер",
                        text: "Немецкий боксёр, или просто боксер – представитель крупной, коренастой и гладкошерстной породы. Выведенный в Германии, он получил широкую известность благодаря отличным охранным качествам. Боксер становится для своего хозяина прекрасным компаньоном и настоящим другом."
                    }
                ]
            }
        ]
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const product = new ProductComponent(this.pageRoot)
        product.render(data[this.id - 1])

        const accordion_data = this.getAccordionData()
        const accordion = new AccordionComponent(this.pageRoot)
        accordion.render(accordion_data[this.id - 1].lst)
    }
}
