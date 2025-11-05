//@ts-nocheck

export const API_ROUTES = {
    APP: import.meta.env.VITE_API_ROUTE_APP,
    LIST: import.meta.env.VITE_API_ROUTE_LIST,
    UPDATEMETADATAS: import.meta.env.VITE_API_ROUTE_UPDATEMETADATAS,
}

export const getRouterUrl = (route, params = {}) => {
    const base = import.meta.env.VITE_BASE_URL_API;
    const queryParams = new URLSearchParams({ route, ...params });
    return `${base}?${queryParams.toString()}`;
};