import { store } from "../../stores/store";
import { keep } from "../../stores/user";

export const AuthTokenInterceptor = async (config: any) => {
    const authState = store.getState().auth;
    if(authState){
        const { accessExpiresAt } = authState;
        const now = new Date().getTime();
        if(now > Number(accessExpiresAt)) {
            const state = undefined;
            if( state )
                store.dispatch(keep(state));
                //config.headers['Authorization'] = `Bearer ${state?.accessToken}`;
        }
    }
    return config;
}