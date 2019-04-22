import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AuthorQuiz from './App';
import AddAuthorForm from './AddAuthorForm';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c) {
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    const au = authors.find((author) => author.books.some((title) => title === answer));
    return {
        books: fourRandomBooks,
        author: au
    };
}


const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait%2C_Feb_7%2C_1871%2C_cropped_Repair.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing it'
        ]
    },
    {
        name: 'Shakespeare',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'London and theatrical career',
            'It is not known definitively'
        ]
    },
    {
        name: 'Muhammad ibn Musa al-Khwarizmi',
        imageUrl: 'https://thumbs.dreamstime.com/b/statue-muhammad-ibn-muso-al-khorazmiy-khiva-uzbekistan-great-mathematician-astronomer-geographer-80843717.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'Algebra',
            'Astronomy',
            'Trigonometry',
            'Arithmetic'
        ]
    }
];

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({},
                state,
                {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state, authors)
            });
        default:
            return state;
    }
}

let store = Redux.createStore(reducer);

function App() {
    return <ReactRedux.Provider store={store}>
        <AuthorQuiz/>
    </ReactRedux.Provider>;
}

const AuthorWrapper = withRouter(({history}) =>
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }}/>
);

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}/>
            <Route path="/add" component={AuthorWrapper}/>
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
