var app = angular.module("carousel", []); 

app.controller("carouselCtrl", function($http, $scope) {
    
    function activate() {

    	getXMLRssFeed((err, feedData) => {
    		if (err) {
    			return;
    		}

    		buildArticles(feedData)
    	});
    }

    function getXMLRssFeed(callback) {
    	$http({
    		url: 'http://cors-passthrough.herokuapp.com/?url=https://www.pointsource.com/feed/&responseType=XML',
    		method: 'GET',
    		transformResponse: function(data) {
                // string -> XML document object
                return $.parseXML(data);
            }
    	})
		.then((res) => {
			callback(null, res.data);
		}, (err) => {
			callback(err, null);
		});
    }

    function buildArticles(data) {
    	$scope.articles = [];

    	let nodeCount = data.documentElement.childNodes[1].childNodes.length;
    	let usableNodes = data.documentElement.childNodes[1].childNodes;
        console.log('a', nodeCount, usableNodes)
    	for (let i = 0; i < nodeCount; i++) {
    		if (usableNodes[i].nodeName === 'item') { // Item represents article from WP
    			$scope.articles.length < 3 && $scope.articles.push({
    				title: usableNodes[i].getElementsByTagName('title')[0].textContent,
    				content: usableNodes[i].getElementsByTagName('description')[0].textContent.replace(/(<([^>]+)>)/ig,'').substr(0, 75) + '...',
    				link: usableNodes[i].getElementsByTagName('link')[0].textContent,
    				img: 'assets/article-placeholder.jpg'
    			});
    		}
    	}
    }

    activate();
});