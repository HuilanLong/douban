import React from 'react';
import './detail.scss'

class MovieDetail extends React.Component {

    render() {
        const item = this.props.item;
        console.log('item in music-detail:');
        console.dir(item);
        return <div className="d-summary">
            <img className="d-movie-img" src={item.images.large} alt={item.alt} />
            < div className="d-movie-sumList" >
                <h2>简介</h2>
                <div className="d-sumItem name">名称：{item.title}{item.genres.map((genre, index) => {
                    return <span className="d-genre" key={index}>{genre}</span>
                })}</div>
                <div className="d-sumItem year">上映时间：{item.year}</div>
                <div className="d-sumItem directors">导演：{item.directors.map((director, index) => {
                    return <span className="d-director" key={index}>{director.name}</span>
                })}</div>
                <div className="d-sumItem title">{item.title}（{item.original_title}）</div>
            </div >
            <h2>演员</h2>
            <div className="d-actors">
                {item.casts.map((cast, index) => {
                    return <div className="d-cast" key={index}>
                        <img className="d-cast-img" alt={cast.alt} src={cast.avatars.large}></img>
                        <div className="d-cast-name">{cast.name}</div>
                    </div>
                })}
            </div>
        </div >
    }
}


export default MovieDetail;