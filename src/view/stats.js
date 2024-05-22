import SmartView from "./smart.js";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getRunTime } from '../utils/film-cards.js';
import { genreFilter } from '../utils/filter.js';
import { GenreType } from "../const.js";

const getSumDuration = (historyMovies) => {
  return historyMovies
    .slice()
    .map((movie) => movie.duration)
    .reduce((acc, duration) => acc + duration);
}



const getGenresCount = (historyMovies) => {
  const genres = historyMovies
    .slice()
    .map((movie) => movie.genre)
    .flat();
  console.log(genres);
  return {
    SciFi: genreFilter[GenreType.SCI_FI](genres).length,
    Animation: genreFilter[GenreType.ANIMATION](genres).length,
    Fantasy: genreFilter[GenreType.FANTASY](genres).length,
    Comedy: genreFilter[GenreType.COMEDY](genres).length,
    TVseries: genreFilter[GenreType.TV_SERIES](genres).length,
  };
}

const getTopGenre = (historyMovies) => {
  const genres = historyMovies
    .slice()
    .map((movie) => movie.genre)
    .flat();
  return genres.sort((a, b) =>
    genres.filter(v => v === a).length - genres.filter(v => v === b).length
  ).pop();
}

const getStatRunTime = (duration) => {
  const hours = Math.round(duration / 60);
  const minutes = duration % 60;

  if (minutes === 0) {
    return `${hours} <span class="statistic__item-description">h</span>`;
  }

  return `${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span>`
}

const renderChart = (statisticCtx, historyMovies) => {
  const BAR_HEIGHT = 50;
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;

  const genres = Object.values(GenreType);

  const genresCount = Object.values(getGenresCount(historyMovies));

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: genresCount,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}

const createStatsTemplate = (userRank, historyMovies) => {

  const totalDuration = getStatRunTime(getSumDuration(historyMovies));//Переделать верстку

  const totalWatchedMovies = historyMovies.length;

  const topGenre = getTopGenre(historyMovies);

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${totalWatchedMovies} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${totalDuration}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
}

export default class Stats extends SmartView {
  constructor(userRank, historyMovies, movies) {
    super();
    this._userRank = userRank;
    this._historyMovies = historyMovies;
    this._movies = movies;

    this._chart = null;

    this._setChart();
  }

  getTemplate() {
    return createStatsTemplate(this._userRank, this._historyMovies, this._movies);
  }

  _setChart() {
    if (this._chart !== null) {
      this._chart = null;
    }
    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._chart = renderChart(statisticCtx, this._historyMovies);
  }
}