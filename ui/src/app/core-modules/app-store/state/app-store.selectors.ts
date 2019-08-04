export function getViewLoading(state: any) {
    let flag = state.appStore.viewLoading;
    return flag;
}

export function getListLoading(state: any) {
    let flag = state.appStore.listLoading;
    return flag;
}

export function getModalState(state: any) {
    let flag = state.appStore.modalState;
    return flag;
}

export function getSearchResults(state: any) {
    let results = state.appStore.searchResults;
    return results;
}

export function getRouterUrl(state: any) {
    let url =state.appStore.routerUrl;
    return url;
}

export function getSearchTerm(state: any) {
    let term = state.appStore.searchTerm;
    return term;
}