import React from 'react';
import './styles/AddAuthorForm.css';


class AuthorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: []
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    handleAddBook(){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        })
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    render() {
        return  <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm-input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm-input">
                <label htmlFor="imageurl">ImageUrl</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm-input">
                <label htmlFor="bookTemp">Books</label>
                {this.state.books.map((book)=> <p key={book}>{book}</p>)}
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                <input type="button" value="+" onClick={this.handleAddBook}/>
            </div>
            <div>
                <input type="submit" className="btn btn-success" value="Save"/>
            </div>
        </form>
    }

}

function AddAuthorForm({onAddAuthor}) {
    return (<div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>);
}

export default AddAuthorForm;