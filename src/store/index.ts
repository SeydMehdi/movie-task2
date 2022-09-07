import { createStore } from "vuex";
import { genreMovieList } from "../plugins/postman";

export class genre{
    id:number
    name :string
}
const genres : genre[] =  []
export const store = createStore({
    state() {
        return {
            genres : genres , 
            page : 1,
        }
    },
    mutations: {
        setPage(state, page:number) {
            state.page = page;
        }
    }
})
genreMovieList((genrelist) => {
    store.state.genres = genrelist;
});