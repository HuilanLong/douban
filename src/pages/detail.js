import React from 'react';
import BookDetail from './bookDetail';
import MovieDetail from './movieDetail';
import MusicDetail from './musicDetail';

class Detail extends React.Component {

    state = {
        tab: this.props.location.query.tab,
        item: this.props.location.query.item
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
        const tab = this.state.tab;
        const item = this.state.item;
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
}

export default Detail;