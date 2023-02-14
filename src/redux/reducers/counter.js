export const initialState = {
	server: '',
	client: '',
	counter: 0,
};

// Creating my reducer
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'incrementCounter':
			return { ...state, counter: action.payload };
		case 'decrementCounter':
			return { ...state, counter: action.payload };
		case 'setCounter':
			return { ...state, counter: action.payload };
		default:
			return state;
	}
}
