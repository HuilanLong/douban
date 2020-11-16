import React from 'react';
import BookDetail from './bookDetail';
import MovieDetail from './movieDetail';
import MusicDetail from './musicDetail';

class Detail extends React.Component {

    constructor(props) {
        super(props);
        const location = this.props.location;
        var tab = '';
        var item = {};
        if (location.state) {//判断当前有参数
            tab = location.state.tab;
            item = location.state.item;
            sessionStorage.setItem('tab', JSON.stringify(tab));
            sessionStorage.setItem('item', JSON.stringify(item));// 存入到sessionStorage中
            console.dir(sessionStorage);
        } else {
            tab = JSON.parse(sessionStorage.getItem('tab'));// 当没有参数时，取sessionStorage中的参数
            item = JSON.parse(sessionStorage.getItem('item'));
            console.dir(item);
        }
        this.state = {
            tab,
            item
        }
    }

    renderDetail = (tab, item) => {
        switch (tab) {
            case 'book':
                return <BookDetail item={item} />
            case 'movie':
                return <MovieDetail item={item} />;
            case 'music':
                return <MusicDetail item={item} />;
            default:
                return <div>Error:fail to load data!</div>;
        }
    }

    naviBack = () => {
        console.dir(this.props.history);
        this.props.history.push(
            {
                pathname: '/',
                query: {
                    tab: this.state.tab
                }
            }
        );
    }
    render() {
        const tab = JSON.parse(sessionStorage.getItem('tab'));
        const item = JSON.parse(sessionStorage.getItem('item'));
        console.dir(tab);
        console.dir(item);
        let category = '';
        switch (tab) {
            case 'book':
                category = '图书';
                break;
            case 'movie':
                category = '电影';
                break;
            case 'music':
                category = '音乐';
                break;
            default:
                console.log("error:unable to get tab name");

        }
        return <div className="detail">
            <div className="detail-head">
                <div className="detail-nav-back" onClick={this.naviBack}></div>
                <div className="detail-tab">{category}</div>
                <div className="detail-title">{item.title}</div>
            </div>
            <div className="detail-content">{this.renderDetail(tab, item)}</div>
        </div >
    }

    componentWillUnmount() {
        sessionStorage.removeItem('tab');
        sessionStorage.removeItem('item');
    }
}

export default Detail;