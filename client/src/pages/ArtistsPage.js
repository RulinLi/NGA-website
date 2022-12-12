import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate
} from 'antd'
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getArtistSearch, getArtist } from '../fetcher'
const wideFormat = format('.3r');
const { Column, ColumnGroup } = Table;


const artistsColumns = [
    {
        title: 'Name',
        dataIndex: 'forwardDisplayName',
        key: 'forwardDisplayName',
        sorter: (a, b) => a.forwardDisplayName.localeCompare(b.forwardDisplayName),
        render: (text, row) => <a href={`/artists?id=${row.constituentID}`}>{text}</a>
    },

    {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality',
        sorter: (a, b) => a.nationality.localeCompare(b.nationality)
    },

    {
        title: 'Type',
        dataIndex: 'constituentType',
        key: 'constituentType',
        sorter: (a, b) => a.constituentType.localeCompare(b.constituentType)

    },

    // {
    //     title: 'Total Number of Works',
    //     dataIndex: 'totalNumWorks',
    //     key: 'totalNumWorks',
    //     sorter: (a, b) => a.totalNumWorks - b.totalNumWorks

    // }

];


class ArtistsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            nationalityQuery: '',

            //1783 is the constituentID of picasso
            selectedArtistId: window.location.search ? window.location.search.substring(1).split('=')[1] : 1783,
            selectedArtistDetails: null,
            selectedArtistWorks: [],
            artistsResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleNationalityQueryChange = this.handleNationalityQueryChange.bind(this)
    }



    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }


    handleNationalityQueryChange(event) {
        this.setState({ nationalityQuery: event.target.value })
    }


    updateSearchResults() {
        getArtistSearch(this.state.nameQuery, this.state.nationalityQuery, null, null).then(res => {
            this.setState({ artistsResults: res.results })
        })
    }

    componentDidMount() {
        getArtistSearch(this.state.nameQuery, this.state.nationalityQuery, null, null).then(res => {
            this.setState({ artistsResults: res.results })
        })

        getArtist(this.state.selectedArtistId).then(res => {
            this.setState({ selectedArtistDetails: res.results[0] })
            this.setState({ selectedArtistWorks: res.results })
        })



    }

    render() {
        return (

            <div>

                <MenuBar />

                <Form style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Nationality</label>
                            <FormInput placeholder="Nationality" value={this.state.nationalityQuery} onChange={this.handleNationalityQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '5vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                </Form>

                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}><Table dataSource={this.state.artistsResults} columns={artistsColumns} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }} /></div>
                <Divider />

                {this.state.selectedArtistDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>

                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h3>Artist Name: {this.state.selectedArtistDetails.name}</h3>

                                </Col>

                                <Col flex={2} style={{ textAlign: 'middle' }}>
                                    <h3>Nation: {this.state.selectedArtistDetails.nationality}</h3>
                                </Col>
                            </Row>

                        </CardBody>

                    </Card>

                    <Card style={{ marginTop: '2vh' }}>
                        <CardBody>
                            <Table onRow={(record, rowIndex) => {
                                return {
                                    // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the artwork in the /artworks page using the Id parameter  
                                };
                            }}
                                dataSource={this.state.selectedArtistWorks} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>

                                <Column title="Artwork Title" dataIndex="title" key="title" sorter={(a, b) => a.title.localeCompare(b.title)} render={(text, row) => <a href={`/artworks?id=${row.artID}`}>{text} </a>} />

                                {/* <Column title="Nation" dataIndex="nation" key="nation" sorter= {(a, b) => a.nation.localeCompare(b.nation)}/> */}

                                {/* <Column title="Artist" dataIndex="artist" key="artist" sorter= {(a, b) => a.artist.localeCompare(b.artist)}/> */}

                                <Column title="Begin Year" dataIndex="beginYear" key="beginYear" sorter={(a, b) => Number(a.beginYear) - Number(b.beginYear)} />
                                <Column title="End Year" dataIndex="endYear" key="endYear" sorter={(a, b) => Number(a.endYear) - Number(b.endYear)} />


                            </Table>



                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default ArtistsPage

