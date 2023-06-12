// import { ButtonComponent } from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

function findCommonElements(acc, lists) {
    // console.log(lists)
    // console.log(lists)
    // Используем метод reduce() для последовательного сравнения списков
    // console.log(commonElements)

    return lists.reduce((acc, list) => {
        // Используем метод filter() для фильтрации элементов текущего списка,
        // которые также присутствуют в аккумуляторе (предыдущих обработанных списках)
        return acc.filter(item => list.includes(item));
    });
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }

    // getData() {
    //     ajax.post(urls.getGroupMembers(groupId), (data) => {
    //         this.renderData(data.response.items)
    //     })
    // }

    getData2() {
        const all_friends = new Set()
        let all_friend_lists = []
        const promises = []; // Создаем массив промисов
        let acc = []
        ajax.post(urls.getGroupManagers(groupId))
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data)
                const lst = []
                // this.renderData(data.response.items)
                lst.push(...data.response.items)
                let is_first = true;
                for (const item of lst) {
                    const promise = new Promise((resolve) => {
                        // console.log(item)
                        ajax.post(urls.getFriends(item.id))
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {
                                // console.log(data)
                                all_friend_lists = [...data.response.items];
                                if (acc.length === 0 && is_first) {
                                    // console.log('hello')
                                    acc = [...all_friend_lists];
                                    is_first = false;
                                }
                                // acc = findCommonElements(acc, all_friend_lists)
                                // acc = acc.filter(element => all_friend_lists.includes(element));
                                acc = acc.filter(item1 => all_friend_lists.find(item2 => item2.id === item1.id));

                                // all_friend_lists.reduce((acc, list) => {
                                //     // Используем метод filter() для фильтрации элементов текущего списка,
                                //     // которые также присутствуют в аккумуляторе (предыдущих обработанных списках)
                                //     return acc.filter(item => list.includes(item));
                                // });
                                // for (const item of data.response.items) {
                                //     all_friends.add(item);
                                // }
                                // all_friends.add(...data.response.items)

                                // console.log(data.response.items)
                                // this.renderData(data.response.items)
                                resolve();
                            });
                        // promises.push(promise);
                    })
                    promises.push(promise);
                }


                Promise.all(promises).then(() => { // Ждем выполнения всех промисов
                    // console.log(all_friend_lists[0])
                    // console.log('all');
                    // console.log(all_friend_lists);
                    // console.log(all_friend_lists[0]);
                    // console.log(all_friend_lists[0])
                    // console.log('hello')

                    // const commonElements = findCommonElements(...all_friend_lists)
                    // console.log(commonElements)
                    // console.log(commonElements)
                    this.renderData(acc)
                    console.log(acc)
                    // const unique_all_friends = Array.from(new Set(all_friends.map(JSON.stringify)), JSON.parse); // Создаем уникальный массив объектов
                    // const unique_all_friends = [...new Set(all_friends)]
                    // console.log('unique:');
                    // console.log(unique_all_friends);
                });
            })


    }


    // getData3() {
    //     ajax.post(urls.status())
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.renderData(data.response.items)
    //         })
    // }

    renderData(items) {
        console.log(items)
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const lst = this.getData2()
        // console.log(lst)
        // const testComponent = new TestComponent(this.pageRoot)
        // testComponent.render()

        // this.getData2()
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
}



