import React from 'react';
import { withRouter } from 'react-router-dom';
import './itemList.scss';

class ItemList extends React.Component {

    state = {
        tab: '',
        items: [],
        item: {}
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            items: props.items,
            tab: props.tab,
        })
    }

    handleClick = (e) => {
        const index = e.currentTarget.attributes.value.value;
        console.log(this.state.tab);
        this.setState({
            item: this.props.items[index]
        }, () => {
            console.dir(this.state.item);
            this.props.history.push(
                {
                    pathname: '/detail',
                    query: {
                        tab: this.state.tab,
                        item: this.state.item
                    }
                }
            )
        })
    }
    rendList = (list, tab) => {
        let listHtml = [];
        console.log("get list:" + list);
        if (list && list.length > 0) {
            switch (tab) {
                case 'book':
                    listHtml = list.map((item, index) => {
                        return < div className="item" item={item} value={index} key={item.id} onClick={this.handleClick}>
                            <img alt={item.alt} src={item.images.small} className="item-img" />
                            <div className="item-info-sum">
                                <div className='item-attr name'>名称：{item.title}</div >
                                <div className="item-attr tags">{item.tags.map((tag, index) => { return <span className="item-tag" key={index}>{tag.name}</span> })}</div>
                                <div className="item-attr author">作者：{item.author.map((name, index) => { return <span key={index} className="item-author">{name}</span> })}</div>
                                <div className="item-attr score">评分：{item.rating.average}</div>
                                <div className="item-attr pubtime">时间：{item.pubdate}</div>
                            </div>
                        </div >
                    });
                    break;
                case 'music':
                    listHtml = list.map((item, index) => {
                        return < div className="item" item={item} value={index} key={item.id} onClick={this.handleClick}>
                            <img alt={item.alt} src={item.image} className="item-img" />
                            <div className="item-info-sum">
                                <div className='item-attr title'>名称：{item.title}</div >
                                <div className="item-attr authors">{item.author.map((auth, index) => { return <span className="item-author" key={index}>{auth.name}</span> })}</div>
                                <div className="item-attr score">评分：{item.rating.average}</div>
                            </div>
                        </div >
                    });
                    break;
                case 'movie':
                    listHtml = list.map((item, index) => {
                        return < div className="item" item={item} value={index} key={item.id} onClick={this.handleClick} >
                            <img alt={item.alt} src={item.images.large} className="item-img" />
                            <div className="item-info-sum">
                                <div className='item-attr movie-title'>{item.title} - {item.year}</div >
                                <div className="item-attr genres">{item.genres.map((tag, index) => { return <span className="item-genre" key={index}>{tag}</span> })}</div>
                                <div className="item-attr directors">{item.directors.map((director, index) => { return <span key={index} className="item-director">{director.nam}</span> })}</div>
                                <div className="item-attr score">评分：{item.rating.average}</div>
                            </div>
                        </div >
                    });
                    break;
                default:
                    listHtml = list.map((item, index) => {
                        return < div className="item" key={item.id}> {item.title}</div >
                    });

            }
            return listHtml;
        }
    }
    render() {
        const list = this.state.items;
        const tab = this.state.tab;
        console.log("tab in ItemList:" + tab);
        console.log("list in ItemList-render:");
        console.dir(list);
        return <div> {this.rendList(list, tab)}</div>;
    }

}

export default withRouter(ItemList);