/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dayjs-random/index.min.js":
/*!************************************************!*\
  !*** ./node_modules/dayjs-random/index.min.js ***!
  \************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return(e,t,n)=>{n.between=(e,t)=>{const r=n(e).valueOf(),o=n(t).valueOf()-r,u=Math.floor(Math.random()*o+1),a=n(r+u);return n(a)},n.soon=(e=1,t=n())=>{const r=n(t),o=r.add(e,"day");return n.between(r,o)},n.recent=(e=1,t=n())=>{const r=n(t),o=r.subtract(e,"day");return n.between(o,r)},n.future=(e=1,t=n())=>{const r=n(t),o=r.add(e,"year");return n.between(r,o)},n.past=(e=1,t=n())=>{const r=n(t),o=r.subtract(e,"year");return n.between(o,r)}}}));

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),

/***/ "./src/mock/mock-comments.js":
/*!***********************************!*\
  !*** ./src/mock/mock-comments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateComments: () => (/* binding */ generateComments)
/* harmony export */ });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_random__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs-random */ "./node_modules/dayjs-random/index.min.js");
/* harmony import */ var dayjs_random__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_random__WEBPACK_IMPORTED_MODULE_2__);



dayjs__WEBPACK_IMPORTED_MODULE_1___default().extend((dayjs_random__WEBPACK_IMPORTED_MODULE_2___default()));

const emojis = ['angry.png', 'puke.png', 'sleeping.png', 'smile.png'];
const texts = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const authorNames = ['Patrik', 'Liza', 'Pashok', 'Barak Obama'];

const createComment = () => {
  const commentsDate = dayjs__WEBPACK_IMPORTED_MODULE_1___default().between('2023-03-18T03:00:00', dayjs__WEBPACK_IMPORTED_MODULE_1___default()()).format('YYYY/MM/DD HH:MM');

  return {
    emoji: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(emojis),
    text: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(texts),
    author: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(authorNames),
    date: commentsDate,
  }
};

const generateComments = () => {
  return new Array((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 5)).fill().map(createComment);

};



/***/ }),

/***/ "./src/mock/mock-film-card.js":
/*!************************************!*\
  !*** ./src/mock/mock-film-card.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateFilmCard: () => (/* binding */ generateFilmCard),
/* harmony export */   getShortDescription: () => (/* binding */ getShortDescription),
/* harmony export */   setFilmCardControl: () => (/* binding */ setFilmCardControl)
/* harmony export */ });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _mock_comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mock-comments.js */ "./src/mock/mock-comments.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs-random */ "./node_modules/dayjs-random/index.min.js");
/* harmony import */ var dayjs_random__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_random__WEBPACK_IMPORTED_MODULE_3__);




dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_random__WEBPACK_IMPORTED_MODULE_3___default()));

//Данные для карточки
const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const titles = ['The God Father', 'Good Fellas', 'Shutter Island', 'Once Upon a Time in America', 'Casino', 'The Quick and the Dead', 'Pulp Fiction'];
const genres = ['crime', 'drama', 'horror', 'comedy', 'action', 'triller'];
const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const directors = ['Alfred Hitchcock', 'John Ford', 'Charles Chaplin', 'Akira Kurosawa'];
const writers = ['Billy Wilder', 'Ethan Coen', 'Robert Towne', 'Quentin Tarantino', 'Charlie Kaufman'];
const actors = ['Jack Nicholson', 'Marlon Brando', 'Robert De Niro', 'Al Pacino', 'Daniel Day-Lewis', 'Dustin Hoffman', 'Tom Hanks'];
const countries = ['USA', 'Russia', 'France', 'Japan', 'Germany'];
const ageRaitings = ['18+', '16+', '14+', '6+'];


//Генерация полей для карточки
const generateFilmDescription = () => {
  const description = []
  for (let i = 0; i < (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(1, 5); i++) {
    description.push((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(descriptions));
  }
  return description.join('');
}

const generateFilmWorkers = (workersGroup) => {
  const workers = []
  for (let i = 0; i < 3; i++) {
    workers.push((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(workersGroup));
  }
  return workers.join(',');
}

const getShortDescription = (string) => {
  if (string.length > 140) {
    return `${string.slice(0, 139)}...`;
  }
  return string;
};

const generateGenres = () => {
  const filmGenres = []
  for (let i = 0; i < 3; i++) {
    filmGenres.push((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(genres));
  }
  return filmGenres;
}

const setFilmCardControl = {
  basic(isActive) {
    if (isActive) {
      return `film-card__controls-item--active`;
    }
  },
  popup(isActive) {
    if (isActive) {
      return `film-details__control-button--active`;
    }
  }
}

//Генерация карточки фильма

const generateFilmCard = () => {
  const date = dayjs__WEBPACK_IMPORTED_MODULE_2___default().between('1950-06-10T00:00:00', '2024-03-02T03:00:00');
  const duration = dayjs__WEBPACK_IMPORTED_MODULE_2___default().between('1950-06-10T01:00:00', '1950-06-10T04:00:00');

  return {
    poster: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(posters),
    title: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(titles),
    raiting: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)(0, 10).toFixed(1),
    releaseDate: date,
    duration: duration.format('h[h] m[min]'),
    genre: generateGenres(),
    description: generateFilmDescription(),
    comments: (0,_mock_comments_js__WEBPACK_IMPORTED_MODULE_1__.generateComments)(),
    filter: {
      isFavorite: Boolean((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 1)),
      isWatched: Boolean((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 1)),
      isWatchList: Boolean((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 1)),
    },
    director: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(directors),
    writers: generateFilmDescription(writers),
    actors: generateFilmWorkers(actors),
    country: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(countries),
    ageRaiting: (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArrayElement)(ageRaitings),
  }
}



/***/ }),

/***/ "./src/mock/mock-filters.js":
/*!**********************************!*\
  !*** ./src/mock/mock-filters.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setFiltersCount: () => (/* binding */ setFiltersCount)
/* harmony export */ });
const setFiltersCount = (filmCards) => {
  let filters = {
    watchList: 0,
    history: 0,
    favorite: 0,
    rank: 0,
  };

  if (filmCards.length === 0) {
    return filters;
  }

  filmCards.forEach((filmCard) => {
    if (filmCard.filter.isFavorite) {
      filters.favorite += 1;
    }
    if (filmCard.filter.isWatched) {
      filters.history += 1;
    }
    if (filmCard.filter.isWatchList) {
      filters.watchList += 1;
    }
  })

  if (filters.history === 0) {
    filters.rank = '';
  }
  if (filters.history > 1) {
    filters.rank = 'novice';
  }
  if (filters.history > 10) {
    filters.rank = 'fan';
  }
  if (filters.history > 21) {
    filters.rank = 'movie buff';
  };

  return filters;
};



/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkEsc: () => (/* binding */ checkEsc),
/* harmony export */   getRandom: () => (/* binding */ getRandom),
/* harmony export */   getRandomArrayElement: () => (/* binding */ getRandomArrayElement),
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
// ESCAPE
const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const checkEsc = (evt) => {
  return evt.key === Keys.ESC || evt.key === Keys.ESCAPE;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

//Функция получения рандомного элемента из массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};



/***/ }),

/***/ "./src/utils/film-cards.js":
/*!*********************************!*\
  !*** ./src/utils/film-cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareCommentsNumber: () => (/* binding */ compareCommentsNumber),
/* harmony export */   compareFilmRaiting: () => (/* binding */ compareFilmRaiting)
/* harmony export */ });
//Функция сравнения количества комментов у фильмов
const compareCommentsNumber = (filmCardA, filmCardB) => {
  return filmCardB.comments.length - filmCardA.comments.length;
};

//функция сравнения рейтинга у фильмов
const compareFilmRaiting = (filmCardA, filmCardB) => {
  return filmCardB.raiting - filmCardA.raiting;
};



/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenderPosition: () => (/* binding */ RenderPosition),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

//Функция отрисовки разметки
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

//Функция создания элемента, заполняемого разметкой
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};



/***/ }),

/***/ "./src/view/abstract.js":
/*!******************************!*\
  !*** ./src/view/abstract.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Abstract)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

/***/ }),

/***/ "./src/view/comment.js":
/*!*****************************!*\
  !*** ./src/view/comment.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Comments)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createCommentsTemplate = (comment) => {
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
}

class Comments extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment);
  }
}

/***/ }),

/***/ "./src/view/empty-film-list.js":
/*!*************************************!*\
  !*** ./src/view/empty-film-list.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmptyFilmList)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createEmptyFilmListTemplate = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>

    <!--
      Значение отображаемого текста зависит от выбранного фильтра:
        * All movies – 'There are no movies in our database'
        * Watchlist — 'There are no movies to watch now';
        * History — 'There are no watched movies now';
        * Favorites — 'There are no favorite movies now'.
    -->
  </section>
</section>`;
}

class EmptyFilmList extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createEmptyFilmListTemplate()
  }
}


/***/ }),

/***/ "./src/view/film-card.js":
/*!*******************************!*\
  !*** ./src/view/film-card.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmCard)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/mock-film-card.js */ "./src/mock/mock-film-card.js");



const createFilmCardTemplate = (filmCard) => {
  return `<article class="film-card">
          <h3 class="film-card__title">${filmCard.title}</h3>
          <p class="film-card__rating">${filmCard.raiting}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmCard.releaseDate.format('YYYY')}</span>
            <span class="film-card__duration">${filmCard.duration}</span>
            <span class="film-card__genre">${filmCard.genre[0]}</span>
          </p>
          <img src="./images/posters/${filmCard.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${(0,_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.getShortDescription)(filmCard.description)}</p>
          <a class="film-card__comments">${filmCard.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.basic(filmCard.filter.isWatchList)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.basic(filmCard.filter.isWatched)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.basic(filmCard.filter.isFavorite)}" type="button">Mark as favorite</button>
          </div>
        </article>`;
}

class FilmCard extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupShowClickHandler = this._popupShowClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  _popupShowClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupShowClick();
  }

  setPopupShowClickHandler(callback) {
    this._callback.popupShowClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._popupShowClickHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._popupShowClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._popupShowClickHandler);
  };
}

/***/ }),

/***/ "./src/view/film-list.js":
/*!*******************************!*\
  !*** ./src/view/film-list.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmList)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createFilmListTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">
    </div>

    </section>`;
}

class FilmList extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createFilmListTemplate();
  }
}

/***/ }),

/***/ "./src/view/film-section.js":
/*!**********************************!*\
  !*** ./src/view/film-section.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmList)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createFilmSectionTemplate = () => {
  return `<section class="films"></section>`;
}

class FilmList extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createFilmSectionTemplate();
  }
}

/***/ }),

/***/ "./src/view/films-count.js":
/*!*********************************!*\
  !*** ./src/view/films-count.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilmsCount)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createFilmsCountTemplate = (filmCards) => {
  return `<p>${filmCards.length} movies inside</p>`;
};

class FilmsCount extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmCards) {
    super();
    this._filmCards = filmCards;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmCards);
  }
}

/***/ }),

/***/ "./src/view/menu.js":
/*!**************************!*\
  !*** ./src/view/menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filters.watchList}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filters.history}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filters.favorite}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>

<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;
}

class Menu extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
};


/***/ }),

/***/ "./src/view/mostcommented-films.js":
/*!*****************************************!*\
  !*** ./src/view/mostcommented-films.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MostCommentedFilms)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createMostCommentedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra" id="most_commented">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  </div>
    </section>`;
}

class MostCommentedFilms extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createMostCommentedFilmsTemplate();
  }
}

/***/ }),

/***/ "./src/view/popup.js":
/*!***************************!*\
  !*** ./src/view/popup.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");
/* harmony import */ var _mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/mock-film-card.js */ "./src/mock/mock-film-card.js");



const createPopupTemplate = (filmCard) => {
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${filmCard.poster}" alt="">

          <p class="film-details__age">${filmCard.ageRaiting}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmCard.title}</h3>
              <p class="film-details__title-original">Original: ${filmCard.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmCard.raiting}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmCard.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmCard.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmCard.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmCard.releaseDate.format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmCard.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmCard.country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${filmCard.genre[0]}</span>
                <span class="film-details__genre">${filmCard.genre[1]}</span>
                <span class="film-details__genre">${filmCard.genre[2]}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">${filmCard.description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.popup(filmCard.filter.isWatchList)} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.popup(filmCard.filter.isWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_1__.setFilmCardControl.popup(filmCard.filter.isFavorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmCard.comments.length}</span></h3>

        <ul class="film-details__comments-list"></ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
}

class Popup extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._popupCloseClickHandler = this._popupCloseClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._filmCard);
  }

  _popupCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.popupCloseClick();
  }

  setPopupCloseClickHandler(callback) {
    this._callback.popupCloseClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseClickHandler);
  };
}

/***/ }),

/***/ "./src/view/showmore-button.js":
/*!*************************************!*\
  !*** ./src/view/showmore-button.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowMoreButton)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
}

class ShowMoreButton extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  };
}

/***/ }),

/***/ "./src/view/toprated-films.js":
/*!************************************!*\
  !*** ./src/view/toprated-films.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MostCommentedFilms)
/* harmony export */ });
/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ "./src/view/abstract.js");


const createTopRatedFilmsTemplate = () => {
  return `<section class="films-list films-list--extra" id="top_rated">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
  </div>
    </section>`;
}

class MostCommentedFilms extends _abstract__WEBPACK_IMPORTED_MODULE_0__["default"] {

  getTemplate() {
    return createTopRatedFilmsTemplate();
  }
}

/***/ }),

/***/ "./src/view/user-rank.js":
/*!*******************************!*\
  !*** ./src/view/user-rank.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserRank)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/view/abstract.js");


const createUserRankTemplate = (filters) => {
  if (filters.rank !== '') {
    return `<section class="header__profile profile">
  <p class="profile__rating">${filters.rank}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`
  }
};

class UserRank extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createUserRankTemplate(this._filters);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/menu.js */ "./src/view/menu.js");
/* harmony import */ var _view_film_card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/film-card.js */ "./src/view/film-card.js");
/* harmony import */ var _view_film_section_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/film-section.js */ "./src/view/film-section.js");
/* harmony import */ var _view_film_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/film-list.js */ "./src/view/film-list.js");
/* harmony import */ var _view_popup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/popup.js */ "./src/view/popup.js");
/* harmony import */ var _view_showmore_button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/showmore-button.js */ "./src/view/showmore-button.js");
/* harmony import */ var _view_toprated_films_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/toprated-films.js */ "./src/view/toprated-films.js");
/* harmony import */ var _view_mostcommented_films_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/mostcommented-films.js */ "./src/view/mostcommented-films.js");
/* harmony import */ var _view_user_rank_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/user-rank.js */ "./src/view/user-rank.js");
/* harmony import */ var _view_films_count_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view/films-count.js */ "./src/view/films-count.js");
/* harmony import */ var _mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/mock-film-card.js */ "./src/mock/mock-film-card.js");
/* harmony import */ var _mock_mock_filters_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/mock-filters.js */ "./src/mock/mock-filters.js");
/* harmony import */ var _view_comment_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./view/comment.js */ "./src/view/comment.js");
/* harmony import */ var _view_empty_film_list_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./view/empty-film-list.js */ "./src/view/empty-film-list.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _utils_film_cards_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/film-cards.js */ "./src/utils/film-cards.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");


















const EXTRA_FILMS_COUNT = 2;
const FILMS_START_COUNT = 5;
const FILM_CARDS_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const siteBody = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmFooterStatistic = document.querySelector('.footer__statistics');

//Генерация данных
const filmCards = new Array(FILM_CARDS_COUNT).fill().map(_mock_mock_film_card_js__WEBPACK_IMPORTED_MODULE_10__.generateFilmCard);
const filters = (0,_mock_mock_filters_js__WEBPACK_IMPORTED_MODULE_11__.setFiltersCount)(filmCards);

//Функция отрисовки карточки и попапа
const renderFilmCard = (filmCardListElement, filmCard) => {
  const filmComponent = new _view_film_card_js__WEBPACK_IMPORTED_MODULE_1__["default"](filmCard);
  const filmPopupComponent = new _view_popup_js__WEBPACK_IMPORTED_MODULE_4__["default"](filmCard);

  const onEscKeyDown = (evt) => {
    if ((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_14__.checkEsc)(evt)) {
      closePopup();
    }
  };

  const showPopup = () => {
    siteBody.appendChild(filmPopupComponent.getElement(filmCard));
    const commentsList = filmPopupComponent.getElement(filmCard).querySelector('.film-details__comments-list');
    for (let i = 0; i < filmCard.comments.length; i++) {
      (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(commentsList, new _view_comment_js__WEBPACK_IMPORTED_MODULE_12__["default"](filmCard.comments[i]).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
    }

    siteBody.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  };

  const closePopup = () => {
    siteBody.removeChild(filmPopupComponent.getElement(filmCard));
    siteBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  }

  filmComponent.setPopupShowClickHandler(() => showPopup());
  filmPopupComponent.setPopupCloseClickHandler(() => closePopup());

  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmCardListElement, filmComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND)
};

(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(siteMainElement, new _view_menu_js__WEBPACK_IMPORTED_MODULE_0__["default"](filters).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
(0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmFooterStatistic, new _view_films_count_js__WEBPACK_IMPORTED_MODULE_9__["default"](filmCards).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);

//Проверка наличия фильмов
if (filmCards.length === 0) {
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(siteMainElement, new _view_empty_film_list_js__WEBPACK_IMPORTED_MODULE_13__["default"]().getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
} else {
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(siteHeaderElement, new _view_user_rank_js__WEBPACK_IMPORTED_MODULE_8__["default"](filters).getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
  const filmSectionComponent = new _view_film_section_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(siteMainElement, filmSectionComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
  const filmListComponent = new _view_film_list_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmSectionComponent.getElement(), filmListComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);

  //Отрисовка карточек в списке
  const filmContainer = filmListComponent.getElement().querySelector('.films-list__container');
  for (let i = 0; i < FILMS_START_COUNT; i++) {
    renderFilmCard(filmContainer, filmCards[i]);
  };

  //Отрисовка секций Top Rated и Most Commented
  const mostCommentedFilmsComponent = new _view_mostcommented_films_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmSectionComponent.getElement(), mostCommentedFilmsComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
  const mostCommentedList = mostCommentedFilmsComponent.getElement().querySelector('.films-list__container');
  const mostCommentedFilms = filmCards.slice().sort(_utils_film_cards_js__WEBPACK_IMPORTED_MODULE_15__.compareCommentsNumber);
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(mostCommentedList, mostCommentedFilms[i]);
  }
  const TopRatedFilmsComponent = new _view_toprated_films_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmSectionComponent.getElement(), TopRatedFilmsComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);
  const topRatedList = TopRatedFilmsComponent.getElement().querySelector('.films-list__container');
  const topRatedFilms = filmCards.slice().sort(_utils_film_cards_js__WEBPACK_IMPORTED_MODULE_15__.compareFilmRaiting);
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderFilmCard(topRatedList, topRatedFilms[i]);
  }

  //Логика работы SHOW MORE BUTTON
  if (filmCards.length > FILM_COUNT_PER_STEP) {
    const showMoreButtonComponent = new _view_showmore_button_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_16__.render)(filmListComponent.getElement(), showMoreButtonComponent.getElement(), _utils_render_js__WEBPACK_IMPORTED_MODULE_16__.RenderPosition.BEFOREEND);

    let renderedFilmsCount = FILM_COUNT_PER_STEP;
    showMoreButtonComponent.setClickHandler(() => {

      filmCards
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((filmCard) => {
          renderFilmCard(filmContainer, filmCard);
        });

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= filmCards.length && renderedFilmsCount === filmCards.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  };
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map