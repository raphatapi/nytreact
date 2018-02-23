import axios from "axios";
const apiKey = "268dbc4c0354462788aff644b3d7dc91";

export default {
  getArticles: (query, startYear, endYear) => {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + query + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101")
    .then( response => {
      let newResults = [];
				let fullResults = response.data.response.docs;
				let counter = 0;

				//Gets first 5 articles that have all 3 components
				for(let i = 0; i < fullResults.length; i++){

					if(counter > 4) {
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}

				return newResults;
    })
  },

  postArticle: (title, date, url) => {
		return axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){
			console.log("Posted to MongoDB");
			return(results);
		})
	},

	deleteArticle: article => {
		console.log(article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	}
};
