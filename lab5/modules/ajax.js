class Ajax {
    post(url) {
        const getDataFromServer = async () => {
            try {
                // Делаем GET запрос на указанный урл
                // возвращаем результат в случае успеха
                return await fetch(url);
            } catch (e) {
                console.log(e);
            }
        }
        return getDataFromServer()
    }
}

export const ajax = new Ajax();