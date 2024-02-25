from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search_movies():
    query = request.args.get('query')
    api_key = '04aae18c13755d9ce23441e1221b3529'
    url = f'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        movies = response.json()['results']
        formatted_movies = [{
            'id': movie['id'],
            'title': movie['title'],
            'poster_path': movie['poster_path']
        } for movie in movies]
        return jsonify(formatted_movies)
    except Exception as e:
        print('Error fetching movies:', e)
        return "<script>alert(f\"Error fetching movies:', {e}\")", 500

@app.route('/movie/<path:tmdb_movie_id>')
def movie(tmdb_movie_id):
    api_key = '04aae18c13755d9ce23441e1221b3529'
    url = f"https://api.themoviedb.org/3/movie/{tmdb_movie_id}?api_key={api_key}"
    
    response = requests.get(url)
    movie_data = response.json()
    
    print(tmdb_movie_id)
    return render_template('about_movie.html', movie_data=movie_data)
    
if __name__ == '__main__':
    app.run(debug=True)
