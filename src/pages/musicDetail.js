import React from 'react';
import "./detail.scss";

class MusicDetail extends React.Component {

    render() {
        const item = this.props.item;
        console.log('item in music-detail:');
        console.dir(item);
        return <div className="d-summary">
            <img className="d-img-book" src={item.image} alt={item.alt} />
            <div className="d-sumList">
                <div className="d-sumItem name">名称：{item.title} {item.tags.map((tag, index) => {
                    return <span className="d-tag" key={index}>{tag.name}</span>
                })}</div>
                <div className="d-sumItem author">作者：{item.author.map((author, index) => {
                    return <span className="d-author" key={index}>{author.name}</span>
                })}</div>
                <div className="d-sumItem publisher">发布商：{item.attrs.publisher.map((pub, index) => {
                    return <span className="d-pub" key={index}>{pub}</span>
                })}</div>
                <div className="d-sumItem pubdate">日期：{item.attrs.pubdate.map((date, index) => {
                    return <span className="d-pubdate" key={index}>{date}</span>
                })}</div>
                <div className="d-sumItem score">评分：{item.rating.average}</div>
            </div>
            <div className="d-introduction">
                <h2>简介</h2>

                <h2>内容</h2>
                <p className="d-tracks" dangerouslySetInnerHTML={{ __html: item.attrs.tracks[0] }}></p>
            </div>
        </div>
    }
}

export default MusicDetail;