import React from 'react';
import { Form, FormInput, FormGroup, Button, CardBody, CardTitle, Progress } from "shards-react";
// import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
    Card,
    Select,
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Descriptions

} from 'antd'

// import { getMatchSearch, getMatch } from '../fetcher'
import { getAllArtworks, getArtworkDetail, getArtworkSearch } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { Meta } = Card;



class ArtworkPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artworkQuery: '',
            artistnameQuery: '',
            beginYearQuery: '', 
            endYearQuery: '',

            artworksResults: [],
            artworksPageNumber: 1,
            artworksPageSize: 10,
            artistsResults: [],
            pagination: null,

            selectedArtworkId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedArtworkDetails: null
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.updateArtworkDetail = this.updateArtworkDetail.bind(this)
        this.handleArtistNameChange = this.handleArtistNameChange.bind(this)
        this.handleArtworkQueryChange = this.handleArtworkQueryChange.bind(this)
        this.handleBeginYearChange = this.handleBeginYearChange.bind(this)
        this.handleEndYearChange = this.handleEndYearChange.bind(this)
        
    

    }
    artworksColumns = [
        {
            title: "Title",
            dataIndex: "title",
            // key: (text, row) => {
            //     return row.objectID
            // },
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, row) => {<a href={`/artworkDetail/${row.objectID}`}>{text}</a>
                return <div onClick={() => this.updateArtworkDetail(row.objectID)}>{text}</div>;
            },
        },
        {
            title: "Artist",
            dataIndex: "artist",
            // key: (text, row) => {
            //    return row.constituentID
            // },
            key: "artist",

            sorter: (a, b) => a.artist.localeCompare(b.artist),

            render: (text, row) => <a href={`/artists?id=${row.constituentID}`}>{text}</a>
        },
        {
            title: "Type",
            dataIndex: "visualBrowserClassification",
            key: "visualBrowserClassification",

            sorter: (a, b) => a.visualBrowserClassification.localeCompare(b.visualBrowserClassification)
        },
        {
            title: "Time Span",
            dataIndex: "visualBrowserTimeSpan",
            key: "visualBrowserTimeSpan",

            sorter: (a, b) => a.visualBrowserTimeSpan.localeCompare(b.visualBrowserTimeSpan)
        }        
    ]
    handleArtworkQueryChange(event) {
        this.setState({ artworkQuery: event.target.value })
    }

    handleArtistNameChange(event) {
        this.setState({ artistnameQuery: event.target.value })
    }

    handleBeginYearChange(event) {
        this.setState({ beginYearQuery: event.target.value })
    }

    handleEndYearChange(event) {
        this.setState({ endYearQuery: event.target.value })
    }


    // goToMatch(matchId) {
    //     window.location = `/matches?id=${matchId}`
    // }

    updateArtworkDetail(artwork) {
        getArtworkDetail(artwork).then(res => {
            this.setState({
                selectedArtworkDetails: res.results[0]
            });
        })
    }

    updateSearchResults() {
        getArtworkSearch(this.state.artworkQuery, this.state.artistnameQuery, this.state.beginYearQuery, this.state.endYearQuery, null, null).then(res => {
            this.setState({ artworksResults: res.results })
        })

    }

    //classificationOnChange() {
    //    getAllArtworks(null, null, 'painting').then(res => {
    //        this.setState({ artworksResults: res.results })
    //    })
    //}

    componentDidMount() {

        getArtworkSearch(this.state.artworkQuery, this.state.artistnameQuery, this.state.beginYearQuery, this.state.endYearQuery, null, null).then(res => {
            this.setState({ artworksResults: res.results })
        })

        //getAllArtworks(null, null, 'painting').then(res => {
        //    this.setState({ artworksResults: res.results })
        //})

        this.updateArtworkDetail(this.state.selectedArtworkId)


        // getArtwork(this.state.selectedArtistId).then(res => {
        //     this.setState({ selectedArtistDetails: res.results[0] })
        //     this.setState({ selectedArtistWorks: res.results })
        // })


        // getMatch(this.state.selectedMatchId).then(res => {
        //     this.setState({ selectedMatchDetails: res.results[0] })
        // })

    }


    render() {
        return (
            <div>
                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artwork</label>
                            {/* need to change based on discussion of search on Artwork page */}
                            <FormInput placeholder="Artwork" value={this.state.artworkQuery} onChange={this.handleArtworkQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist</label>
                            {/* need to change based on discussion of search on Artwork page */}
                            <FormInput placeholder="Artist" value={this.state.artistnameQuery} onChange={this.handleArtistNameChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                        </FormGroup></Col>

                    </Row>

                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' , marginTop: '2vh', marginBottom: '2vh'}}>
                            <label>Begin Year</label>
                            {/* need to change based on discussion of search on Artwork page */}
                            <FormInput placeholder="Begin Year" value={this.state.beginYearQuery} onChange={this.handleBeginYearChange} />
                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' , marginTop: '2vh', marginBottom: '2vh'}}>
                            <label>End Year</label>
                            {/* need to change based on discussion of search on Artwork page */}
                            <FormInput placeholder="End Year" value={this.state.endYearQuery} onChange={this.handleEndYearChange} />
                            
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw'}}>
                            <Button style={{ marginTop: '1vh' , width: '10vw'}} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>



                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Artworks</h3>

                    <Table //onRow={(record, rowIndex) => {
                        //return {
                            // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the artwork in the /artworks page using the Id parameter  
                        //};
                    //}}
                        dataSource={this.state.artworksResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} columns={this.artworksColumns}  >

                    </Table>

                </div>

                <Divider />
                {this.state.selectedArtworkDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Row>
                        {/* artwork specific display can be changed here */}
                        <Col span={6}>
                            <Card
                                style={{ width: '100%' }}
                                cover={
                                    <img
                                        alt="example"
                                        src={this.state.selectedArtworkDetails.iiifThumbURL}
                                    />
                                }

                            >
                            </Card>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={14}>
                            <Descriptions title={this.state.selectedArtworkDetails.title} bordered column={1}>
                                {/* <Descriptions.Item label="Title">{this.state.selectedArtworkDetails.title}</Descriptions.Item> */}
                                <Descriptions.Item label="Artist">{this.state.selectedArtworkDetails.artist}</Descriptions.Item>
                                <Descriptions.Item label="Location">{this.state.selectedArtworkDetails.location ? this.state.selectedArtworkDetails.location : 'Currently Not In Display'}</Descriptions.Item>
                                <Descriptions.Item label="Begin Year">{this.state.selectedArtworkDetails.beginYear}</Descriptions.Item>
                                <Descriptions.Item label="End Year">{this.state.selectedArtworkDetails.endYear}</Descriptions.Item>
                                <Descriptions.Item label="Credit Line">{this.state.selectedArtworkDetails.creditLine}</Descriptions.Item>
                                <Descriptions.Item label="Provenance">{this.state.selectedArtworkDetails.provenanceText}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </div> : null
                }
                <Divider />

            </div >
        )
    }
}

export default ArtworkPage

