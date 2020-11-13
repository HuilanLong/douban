import React from 'react';
import './detail.scss';

class BookDetail extends React.Component {



    render() {
        const item = this.props.item;
        console.log('item in music-detail:');
        console.dir(item);
        return <div className="d-summary">
            <img className="d-img-book" src={item.image} alt={item.alt} />
            <div className="d-sumList">
                <div className="d-sumItem name">名称：{item.title}</div>
                <div className="d-sumItem author">作者：{item.author.map((author, index) => {
                    return <span className="d-author" key={index}>{author}</span>
                })}</div>
                <div className="d-sumItem publisher">出版社：{item.publisher}</div>
                <div className="d-sumItem pubdate">日期：{item.pubdate}</div>
                <div className="d-sumItem score">评分：{item.rating.average}</div>
                <div className="d-sumItem price">价钱：{item.price}</div>
                <div className="d-sumItem tags">{item.tags.map((tag, index) => {
                    return <span className="d-tag" key={index}>{tag.title}</span>
                })}</div>
            </div>
            <div className="d-introduction">
                <h2>序言</h2>
                <p className="d-catelog" dangerouslySetInnerHTML={{ __html: item.catalog }}></p>
                <h2>简介</h2>
                <p className="d-sumry">{item.summary}</p>
            </div>
        </div>
    }
}

export default BookDetail;