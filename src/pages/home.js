import React from 'react';
import { Input, Tabs } from 'antd';
import './home.scss';
import 'antd/dist/antd.css';
import { SearchOutlined, ProfileTwoTone, VideoCameraTwoTone, CustomerServiceTwoTone } from '@ant-design/icons';
import ItemList from './itemList';
import fetchJsonp from 'fetch-jsonp';



class Home extends React.Component {
    constructor(props) {
        super(props);
        let tab = 'book';
        if ('query' in this.props.location) {
            // console.log(this.props.location.query.tab);
            tab = this.props.location.query.tab;
        }

        this.state = {
            searchText: '',
            tab,
            list: []
        };
    }

    /**
     * 
     * @param {*} tab 
     * @param {*} searchText 
     */
    getDataList = (tab, searchText) => {
        if (!tab) {
            tab = 'book';
        };
        if (!searchText) {
            searchText = '';
        }
        const urlMain = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_` + tab + `"]&q={ke_coding_` + tab + `(_page:1,_limit:10,title:"%` + searchText + `%")`;
        let urlTail = '';
        // console.log("tab in getdatalist:" + tab);
        switch (tab) {
            case "book":
                urlTail += `{id,title,rating{max,numRaters,average,min},subtitle,author,pubdate,tags{count,name,title},origin_title,image,binding,translator,catalog,pages,images{small,large,medium},alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series{id,title}}}`;
                break;
            case "movie":
                urlTail += `{id,title,rating{max,average,stars,min,details{score_1,score_2,score_3,score_4,score_5}},genres,casts{alt,avatars{small,large,medium},name,name_en,id},durations,mainland_pubdate,pubdates,has_video,collect_count,original_title,subtype,directors{alt,avatars{small,large,medium},name,id},year,images{small,large,medium},alt}}`;
                break;
            case "music":
                urlTail += `{id,title,alt,rating{max,average,numRaters,min},author{name},alt_title,image,tags{count,name},mobile_link,attrs{publisher,singer,version,pubdate,title,media,tracks,discs}}}`;
                break;
            default:
                urlTail += `{id,title,rating{max,numRaters,average,min},subtitle,author,pubdate,tags{count,name,title},origin_title,image,binding,translator,catalog,pages,images{small,large,medium},alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series{id,title}}}`;
                break;
        }
        const url = encodeURI(urlMain + urlTail);
        // console.log(url);
        //发起ajax请求，获取数据
        fetchJsonp(url).then((response) => {
            // console.log("get response");
            return response.json();
        }).then((json) => {
            console.log('parsed json', json);
            if (json.retcode === 0) {
                this.setState({
                    list: json.result
                })
            }
        }).catch((ex) => {
            console.log('parse failed', ex);
        })
    }

    /***
     * 搜索
     */
    handleSearch = (e) => {
        console.log(e);
        this.setState({
            searchText: e.target.value
        })
        const searchText = this.state.searchText;
        const tab = this.state.tab;
        this.getDataList(tab, searchText);
    }

    componentDidMount() {
        const searchText = this.state.searchText;
        const tab = this.state.tab;
        this.getDataList(tab, searchText);

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.tab === this.state.tab;
    }

    render() {
        const tab = this.state.tab;
        let list = this.state.list;
        const { TabPane } = Tabs;
        const prefix = (
            <SearchOutlined style={{ color: '#D3D3D3' }} />
        );

        const { Search } = Input;
        return <div>
            <Search className="search-box" prefix={prefix} placeholder="书名、作者、ISBN" size='large' enterButton="搜索" onSearch={this.handleSearch} />
            <ItemList items={list} tab={tab} />
            <Tabs className="nav-tab" defaultActiveKey={this.state.tab} onChange={(activeKey) => {
                this.setState({ tab: activeKey }, () => this.getDataList(this.state.tab, this.state.searchText));
            }}>
                <TabPane tab={<div><ProfileTwoTone twoToneColor="eb2f96" /><p>图书</p></div>} key="book" />
                <TabPane tab={<div><VideoCameraTwoTone twoToneColor="999999" /><p>电影</p ></div>} key="movie" />
                <TabPane tab={<div><CustomerServiceTwoTone twoToneColor="999999" /><p>音乐</p ></div>} key="music" />
            </Tabs>
        </div >
    }
}

export default Home;