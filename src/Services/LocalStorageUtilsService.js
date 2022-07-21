
export class LocalStorageUtilsService {

    lsGet(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    lsSet(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }

}

const lsu = new LocalStorageUtilsService()
export default lsu;