// localStorage.name = '';
// localStorage.name = 'Restu';
let timeDelay = 4000;

const date = new Date(),
	y = date.getFullYear(),
	m = date.getMonth();

const firstDay = new Date(y, m, 1);
const firstDayWeek = firstDay.getDay();
const lastDay = new Date(y, m + 1, 0);

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthName = document.querySelector('#monthName');
monthName.innerHTML = monthNames[date.getMonth()];

const refreshQuote = document.querySelector('#refreshQuote');
refreshQuote.addEventListener('click', () => getQuotes());

const setTBodyInnerHTML = (tbody, html) => {
	const temp = tbody.ownerDocument.createElement('div');
	temp.innerHTML = '<table>' + html + '</table>';

	tbody.parentNode.replaceChild(temp.firstChild.firstChild, tbody);
};

const generateThisMonth = () => {
	const monthCal = document.querySelector('#dateList');

	let arrayWeek = new Array();
	let currentDay = 0;
	let currentWeek = 0;
	for (let index = 1; index <= lastDay.getDate(); index++) {
		if (currentDay == 7) {
			currentWeek++;
			currentDay = 0;
		}

		if (currentWeek == 0 && firstDayWeek != currentDay && arrayWeek.join('') == '') {
			arrayWeek.push('');
			index--;
		} else {
			arrayWeek.push(index);
		}
		currentDay++;
	}

	const currentLength = arrayWeek.length;
	const maxLength = 35;
	if (currentLength < maxLength) {
		for (let index = 0; index < maxLength - currentLength; index++) {
			arrayWeek.push('');
		}
	}

	let resultView = '';
	arrayWeek.forEach((element, key) => {
		let addClass = '';
		let addClass2 = '';
		addClass2 += element != '' && element < date.getDate() ? ' text-slate-700' : '';
		let addImage = '';
		if (element == date.getDate()) {
			addClass += ' today group-hover:scale-[2]';
			addClass2 += ' circle';
			addImage += '<svg class="z-0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M444.8,51.9C391.9,34,330.3,54.9,284.7,63C445.1-50.4,776,38.3,871.8,140.7c166.9,178.2,109.9,545.5-64.1,698.3c-65.4,57.4-192,141.5-298.9,149.6c-148.2,11.4-279.2-48.1-357.6-133C94,793.7,30.8,672.7,28.5,573C22.7,319.8,217.9,96.3,444.8,51.9L444.8,51.9z M615.6,76.7c52.5,28.6,141.7,47.4,153.3,100.8c-73.2-33.5-114-76.3-189-90.2C330.5,41.1,112,281.8,89.3,511.8c-13.6,137.8,60,262.8,138,329C296,899.2,418,946.3,544.1,925.7c71.4-11.6,172.8-76.8,235-132.7C991.1,602.9,980.5,83.6,615.6,76.7C609.6,60.6,615.7,67.2,615.6,76.7L615.6,76.7z"/></g></svg>';
		}
		const span = '<span class="dateSpan' + addClass + '">' + element + '</span>';
		const dateView = '<td class="group' + addClass2 + '">' + addImage + span + '</td>';
		if ((key + 1) % 7 == 1) {
			resultView += '<tr>' + dateView;
		} else if ((key + 1) % 7 == 0) {
			resultView += dateView + '</tr>';
		} else {
			resultView += dateView;
		}
	});
	setTBodyInnerHTML(monthCal, resultView);
};

const getQuotes = () => {
	const text = document.querySelector('#quoteText');
	const author = document.querySelector('#authorName');
	const authorDiv = document.querySelector('#quoteAuthor');
	text.classList.remove('opacity-100');
	text.classList.add('opacity-0');

	authorDiv.classList.remove('group-hover:opacity-50');
	authorDiv.classList.add('group-hover:opacity-0');

	setTimeout(() => {
		fetch('https://api.quotable.io/random?maxLength=100')
			.then((response) => response.json())
			.then((data) => {
				text.innerHTML = '';
				text.innerHTML = '"' + data.content + '"';
				author.innerHTML = data.author;

				text.classList.add('opacity-100');
				text.classList.remove('opacity-0');

				authorDiv.classList.add('group-hover:opacity-50');
				authorDiv.classList.remove('group-hover:opacity-0');
			});
	}, 500);
};

const todoLists = document.querySelector('#todo-list');
const todoItems = todoLists.querySelectorAll('li');

todoItems.forEach((item) => {
	item.onclick = (e) => {
		e.target.classList.toggle('font-semibold');
		// e.target.classList.toggle('font-medium');
		e.target.classList.toggle('line-through');
	};
});

const name = document.querySelector('#name');

const loadMain = () => {
	timeDelay = 500;
	document.querySelector('#welcome').classList.add('hidden');
	document.querySelector('#main-content').classList.remove('hidden');
	generateThisMonth();
	setTimeout(() => {
		const todoSection = document.querySelector('#todo-card');
		todoSection.classList.remove('opacity-0');
		todoSection.classList.add('opacity-100');
	}, (timeDelay));

	setTimeout(() => {
		const monthCalSection = document.querySelector('#monthly-view');
		monthCalSection.classList.remove('opacity-0');
		monthCalSection.classList.add('opacity-100');
	}, (timeDelay+=500));

	setTimeout(() => {
		const quoteSection = document.querySelector('#quote-view');
		quoteSection.classList.remove('opacity-0');
		quoteSection.classList.add('opacity-100');
		getQuotes();
	}, (timeDelay+=500));
};

const welcomeView = () => {
	const hello = document.querySelector('#hello');
	const askName = document.querySelector('#ask-name');
	const nameInput = document.querySelector('#name-input');
	if (localStorage.name != '' && typeof localStorage.name != 'undefined') {
		hello.classList.remove('animate-fade-in');
		hello.classList.add('animate-fade-in-out');
		hello.innerHTML = 'Good morning, ' + localStorage.name;
		setTimeout(() => {
			hello.classList.add('hidden');
			loadMain();
		}, (timeDelay+=1000));
	} else {
		setTimeout(() => {
			hello.classList.add('hidden');
			askName.classList.remove('hidden');
		}, 3000);
		setTimeout(() => {
			nameInput.classList.add('animate-fade-in');
			if ('name' in localStorage) {
				name.value = localStorage.name;
			}
		}, 5500);
	}
};

const btnGo = document.querySelector('#btn-go');
btnGo.addEventListener('click', (e) => {
	e.preventDefault();
	const nameInput = name.value;
	if (nameInput != '' && typeof nameInput != 'undefined') {
		localStorage.name = nameInput;
		setTimeout(() => {
			loadMain();
		}, 1000);
	}
});

window.onload = (event) => {
	welcomeView();
	// loadMain();
};

let currentBg = 'bg-splash1';
let currentBg2 = 'bg-splash2';
let activeBg = 2;
let bgSource = '';
let fileName = '';

const refreshBg = () => {
	console.log('clicked refresh');
	const bgImage = document.querySelector('#bg-image1');
	const bgImage2 = document.querySelector('#bg-image2');

	if (activeBg == 2) {
		bgImage.classList.remove('opacity-0');
		bgImage.classList.add('opacity-100');

		bgImage2.classList.add('opacity-0');
		bgImage2.classList.remove('opacity-100');
	} else {
		bgImage2.classList.remove('opacity-0');
		bgImage2.classList.add('opacity-100');

		bgImage.classList.add('opacity-0');
		bgImage.classList.remove('opacity-100');
	}

	let newFileName = Math.floor(Math.random() * 17) + 1;
	while (newFileName == fileName) {
		newFileName = Math.floor(Math.random() * 17) + 1;
	}
	fileName = newFileName;

	setTimeout(() => {
		bgSource = 'bg-splash' + fileName;

		if (currentBg != '' && activeBg == 1) {
			bgImage.classList.remove(currentBg);
			bgImage.classList.add(bgSource);
			currentBg = bgSource;
		}

		if (currentBg2 != '' && activeBg == 2) {
			bgImage2.classList.remove(currentBg2);
			bgImage2.classList.add(bgSource);
			currentBg2 = bgSource;
		}

		activeBg = activeBg == 1 ? 2 : 1;
		console.log(activeBg);
	}, 1100);
};

const bgChange = document.querySelector('#bg-change');
bgChange.addEventListener('click', refreshBg);
