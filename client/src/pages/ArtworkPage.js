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
import { getAllArtworks, getArtworkDetail } from '../fetcher'


import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { Meta } = Card;



class ArtworkPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artworkQuery: '',
            artistQuery: '',

            artworksResults: [],
            artworksPageNumber: 1,
            artworksPageSize: 10,
            artistsResults: [],
            pagination: null,

            // awayQuery: "",
            // homeQuery: "",
            // matchesResults: [],
            selectedArtworkId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedArtworkDetails: null
        }
        this.updateArtworkDetail = this.updateArtworkDetail.bind(this)
        // this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this)
        // this.updateSearchResults = this.updateSearchResults.bind(this)
    }
    artworksColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: (text, row) => {
                return row.objectID
            },
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text, row) => {
                return <div onClick={() => this.updateArtworkDetail(row.objectID)}>{text}</div>;
            },
        },
        {
            title: "Artist",
            dataIndex: "artist",
            key: (text, row) => {
                return row.constituentID
            },
            sorter: (a, b) => a.artist.localeCompare(b.artist),
            render: (text, row) => <a href={`/artists?id=${row.constituentID}`}>{text}</a>
        }
    ]
    // handleAwayQueryChange(event) {
    //     this.setState({ awayQuery: event.target.value })
    // }

    // handleHomeQueryChange(event) {
    //     this.setState({ homeQuery: event.target.value })
    // }

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

    // updateSearchResults() {
    //     getArtworkSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(res => {
    //         this.setState({ matchesResults: res.results })
    //     })

    // }

    // classificationOnChange(value) {
    //     getAllArtworks(null, null, value).then(res => {
    //         this.setState({ artworksResults: res.results })
    //     })

    // }

    componentDidMount() {
        getAllArtworks(null, null, 'painting').then(res => {
            this.setState({ artworksResults: res.results })
        })

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
                            <FormInput placeholder="Artwork" value={this.state.homeQuery} onChange={this.handleHomeQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Artist</label>
                            {/* need to change based on discussion of search on Artwork page */}
                            <FormInput placeholder="Artist" value={this.state.awayQuery} onChange={this.handleAwayQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Artworks</h3>
                    <Select defaultValue="painting" style={{ width: 120 }} onChange={this.classificationOnChange}>
                        <Option value="painting">painting</Option>
                        <Option value="sculpture">sculpture</Option>
                        <Option value="drawing">drawing</Option>
                        <Option value="print">print</Option>
                        <Option value="decorative art">decorative art</Option>
                        <Option value="volume">volume</Option>
                        <Option value="portfolio">portfolio</Option>
                        <Option value="technical material">technical material</Option>
                        <Option value="photograph">photograph</Option>
                        <Option value="new media">new media</Option>
                    </Select>

                    <Table onRow={(record, rowIndex) => {
                        return {
                            // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the artwork in the /artworks page using the Id parameter  
                        };
                    }}
                        dataSource={this.state.artworksResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} columns={this.artworksColumns}  >


                    </Table>

                </div>

                <Divider />
                {this.state.selectedArtworkDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Row>
                        <Col span={15}>
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
                        <Col span={8}>
                            <Descriptions title={this.state.selectedArtworkDetails.title} bordered column={1}>
                                <Descriptions.Item label="Artist">{this.state.selectedArtworkDetails.artist}</Descriptions.Item>
                                <Descriptions.Item label="Location">{this.state.selectedArtworkDetails.location ? this.state.selectedArtworkDetails.location : 'Currently Not In Display'}</Descriptions.Item>
                                <Descriptions.Item label="TimeSpan">{this.state.selectedArtworkDetails.visualBrowserTimeSpan}</Descriptions.Item>
                                <Descriptions.Item label="Credit Line">{this.state.selectedArtworkDetails.creditLine}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default ArtworkPage

