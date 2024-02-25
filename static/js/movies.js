const searchInput = document.querySelector('.search-input');
const loadingContainer = document.querySelector('.loading-container');
const moviesContainer = document.getElementById('movies-container');
let currentSearchQuery = '';

searchInput.addEventListener('input', async function () {
    const query = searchInput.value.trim();

    if (query !== currentSearchQuery) {
        currentSearchQuery = query;
        loadingContainer.style.display = 'block';

        try {
            const response = await fetch(`/search?query=${query}`);
            const movies = await response.json();

            moviesContainer.innerHTML = '';

            movies.forEach(movie => {
                const movieBox = document.createElement('div');
                movieBox.classList.add('movie-box');

                let movieImage;
                if (movie.poster_path) {
                    movieImage = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                } else {
                    movieImage = 'none';
                }

                movieBox.innerHTML = `
                <div class="movie-image" style="background-image: url('${movieImage}'); background-color: #1f1f1f;" onclick="window.location.href = '/movie/${movie.id}'"></div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                </div>
            `;
                moviesContainer.appendChild(movieBox);
            });
            
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            loadingContainer.style.display = 'none';
        }
    }
});
