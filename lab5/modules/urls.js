import {accessToken, accessUserToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
        this.commonUserInfo = `access_token=${accessUserToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig,bdate&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }


    // status() {
    //     return `${this.url}/status.get?group_id=215661661&${this.commonInfo}`
    // }

    getGroupManagers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&filter=managers&${this.commonInfo}`
    }

    getFriends(userId) {
        return `${this.url}/friends.get?user_id=${userId}&&fields=photo_400_orig&${this.commonUserInfo}`
    }
}

export const urls = new Urls()