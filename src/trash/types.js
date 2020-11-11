export default {
    namespace: 'types',
    state: {
        cant: 0,
    },

    effects: {
        *sum({payload}, {call, put}) {
            const temp = cant + 1
            yield put({
                type: 'suma', 
                payload:  {cant1: temp}  });
        },
        

    },
    reducers: {
        suma(state, action) {
            return {...state, ...action.payload};
        },

    }
}