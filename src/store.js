import { combineReducers } from 'redux';

export default combineReducers({
    app: (state, action) => {
        return {
            platform: 'Startroom.js',
            libraries: ['React.js', 'Redux']
        };
    }
});
