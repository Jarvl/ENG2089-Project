var words = [];
var counts = [];


calculateUniqueWords(['a', 'b', 'c'])
calculateUniqueWords(['a', 'b'])
calculateUniqueWords(['a', 'b', 'c', 'd'])
calculateUniqueWords(['a', 'c'])


function calculateUniqueWords(inputs) {
	for (var i = 0; i < inputs.length; i++) {
		
		var isUnique = true;

		for (var j = 0; j < words.length; j++) {

			if (inputs[i] == words[j]) {
				isUnique = false;
				++counts[j];
			}
		}

		if (isUnique) {
			words.push(inputs[i]);
			counts.push(1);
		}

		isUnique = false;
	}
}