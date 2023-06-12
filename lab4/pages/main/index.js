// import { ButtonComponent } from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {groupId} from "../../modules/consts.js";

import {TestComponent} from "../../components/test/test.js"

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

    getData() {
        ajax.post(urls.getGroupMembers(groupId), (data) => {
            this.renderData(data.response.items)
        })
    }

    getData2() {
        const lst = []
        const all_friends = []
        ajax.post(urls.getGroupManagers(groupId), (data) => {
            this.renderData(data.response.items)
            // console.log(data)
            // lst.push(...data.response.items)
            for (const item of data.response.items) {
                console.log(item)
                ajax.post(urls.getFriends(item.id), (data) => {
                    // this.renderData(data.response.items)
                    // console.log('=====')
                    // console.log(all_friends)
                    // console.log('=====')
                    all_friends.push(...data.response.items)
                });
            }
            console.log(all_friends)
            console.log(new Set(all_friends))
            const unique_all_friends = [...new Set(all_friends)]
            console.log('unique:')
            console.log(unique_all_friends)
        })

        // return unique_all_friends
    }

    getDataFriends(lst) {
        console.log(lst)
        console.log(lst.length)
        console.log(lst[0])
        const all_friends = []
        for (const item of lst) {
            console.log(item);

            ajax.post(urls.getFriends(item.id), (data) => {
                this.renderData(data.response.items)
                console.log('=====')
                console.log(all_friends)
                console.log('=====')
                all_friends.push()
            });
        }
        return all_friends
    }


    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const all_friends = this.getData2()
        console.log(all_friends)
        // console.log(lst.length)
        // console.log(lst)
        // console.log(lst[0].id)
        // const all_friends = this.getDataFriends(lst)
        // console.log(all_friends)

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



