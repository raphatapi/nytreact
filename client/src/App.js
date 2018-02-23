import React, { Component } from "react";
import API from "./utils/API";
import { Form } from "./components/Form";
import { Results } from "./components/Results";
import { Saved } from "./components/Saved";
const axios = require('axios');

// This is the main component. 
class App extends Component {
  	state = {
		topic: "",
		startYear: "",
		endYear: "",
		results: [],
		savedArticles: []
  	};

  	setTerm = (tpc, stYr, endYr) => {
		this.setState({
			topic: tpc,
			startYear: stYr,
			endYear: endYr
		})
  	};
  
  	saveArticle = (title, date, url) => {
		API.postArticle(title, date, url);
		this.getArticle();
	};

	getArticle = () => {
			axios.get('/api/saved')
				.then(function(response){
					this.setState({
						savedArticles: response.data
					});
				}.bind(this));
	}

	// This function will respond to the user input
	handleChange = event => {
		// Here we create syntax to capture any change in text to the query terms (pre-search).
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	};

	// When a user submits... 
	handleClick = (props) => {
		// Set the parent to have the search term
		this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);
	};

	// When a user clicks save article
	clickToSave = (result) => {
		this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
	};

	componentWillReceiveProps = (nextProps) => {
		var that = this;
		var myResults = nextProps.results.map(function(search, i){
			var boundClick = that.clickToSave.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.web_url} target="_blank">{search.headline.main}</a><br />{search.pub_date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Save</button></div>
		});

		this.setState({results: myResults});
	};

	clickToDelete = (result) => {
		this.props.deleteArticle(result);
	};

	componentWillReceiveProps = (nextProps) => {
		var that = this;
		console.log(nextProps);
		var myResults = nextProps.savedArticles.map(function(search, i){
			var boundClick = that.clickToDelete.bind(that, search);
			return <div className="list-group-item" key={i}><a href={search.url} target="_blank">{search.title}</a><br />{search.date}<br /><button type="button" className="btn btn-success" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Delete</button></div>
		});

		this.setState({savedArticles: myResults});
	};
  
	componentDidUpdate = (prevProps, prevState) => {

		if(prevState.topic != this.state.topic){
			console.log("UPDATED");

			API.getArticles(this.state.topic, this.state.startYear, this.state.endYear)
				.then(function(data){
					console.log(data);
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})
					}
				}.bind(this))
		}
    };
  
	componentDidMount = () => {
			axios.get('/api/saved')
				.then(function(response){
					this.setState({
						savedArticles: response.data
					});
				}.bind(this));
	};
  
  render() {
		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron" style={{'backgroundImage': 'url(../assets/images/scan.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>
						<h2 className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '54px'}}>New York Times Article Search and Save</h2>
						<p className="text-center" style={{'color': 'white', 'textShadow': '3px 3px 10px black', 'fontSize': '24px'}}>Search for and save articles of interest!</p>
					</div>
				</div>
				<div className="row">

					<Form setTerm={this.setTerm}/>

				</div>

				<div className="row">
			
					<Results results={this.state.results} saveArticle={this.saveArticle}/>

				</div>

				<div className="row">
				
					<Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />

				</div>
			</div>
		);
	}
}

export default App;