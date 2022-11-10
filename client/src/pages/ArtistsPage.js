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
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import MenuBar from '../components/MenuBar';
import { getPlayerSearch, getArtist } from '../fetcher'
const wideFormat = format('.3r');


const playerColumns = [
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
        
    }

];


class ArtistsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameQuery: '',
            nationalityQuery: '',
            clubQuery: '',
            ratingHighQuery: 100,
            ratingLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedArtistId: window.location.search ? window.location.search.substring(1).split('=')[1] : 1783,
            selectedArtistDetails: null,
            playersResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
        this.handleNationalityQueryChange = this.handleNationalityQueryChange.bind(this)
        this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handlePotentialChange = this.handlePotentialChange.bind(this)
    }

    

    handleNameQueryChange(event) {
        this.setState({ nameQuery: event.target.value })
    }

    handleClubQueryChange(event) {
        this.setState({ clubQuery: event.target.value })
    }

    handleNationalityQueryChange(event) {
        this.setState({ nationalityQuery: event.target.value })
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    handlePotentialChange(value) {
        this.setState({ potLowQuery: value[0] })
        this.setState({ potHighQuery: value[1] })
    }



    updateSearchResults() {
        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })
    }

    componentDidMount() {
        getPlayerSearch(this.state.nameQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

        getArtist(this.state.selectedArtistId).then(res => {
            this.setState({ selectedArtistDetails: res.results[0] })
        })
    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Name</label>
                            <FormInput placeholder="Name" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Nationality</label>
                            <FormInput placeholder="Nationality" value={this.state.nationalityQuery} onChange={this.handleNationalityQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Club</label>
                            <FormInput placeholder="Club" value={this.state.clubQuery} onChange={this.handleClubQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Rating</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleRatingChange} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>PotentialRating</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handlePotentialChange} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}><Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/></div>
                <Divider />

                {this.state.selectedArtistDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedArtistDetails.Name}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedPlayerDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.Club}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.JerseyNumber}</h5>
                            </Col>
                            <Col>
                            <h5>{this.state.selectedPlayerDetails.BestPosition}</h5>
                            </Col>
                        </Row>
                        <br>
                        </br>
                        <Row gutter='30' align='middle' justify='left'>
                            <Col>
                            Age: {this.state.selectedPlayerDetails.Age}
                            </Col>
                            <Col>
                            Height: {this.state.selectedPlayerDetails.Height}
                            </Col>
                            <Col>
                            Weight: {this.state.selectedPlayerDetails.Weight}
                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            {this.state.selectedPlayerDetails.Nationality}
                                <img src={this.state.selectedPlayerDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                            </Col>

                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Value: {this.state.selectedPlayerDetails.Value}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedPlayerDetails.ReleaseClause}
                                </Col>
                                <Col>
                                Wage: {this.state.selectedPlayerDetails.Wage}
                                </Col>
                                <Col>
                                Contract Valid Until: {this.state.selectedPlayerDetails.ContractValidUntil}
                                </Col>
                            
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.Skill} />
                            <h6>Reputation</h6>
                            <Rate disabled defaultValue={this.state.selectedPlayerDetails.InternationalReputation} />
                            <Divider/>
                            <h6>Best Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.BestOverallRating} >{this.state.selectedPlayerDetails.BestOverallRating}</Progress>
                            <h6>Potential</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Potential} >{this.state.selectedPlayerDetails.Potential}</Progress>
                            <h6>Rating</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedPlayerDetails.Rating} >{this.state.selectedPlayerDetails.Rating}</Progress> 
                            </Col >
                                <Col  push={2} flex={2}>

                                    {this.state.selectedPlayerDetails.BestPosition === 'GK'?<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Diving', domain: [0, 100], getValue: d => d.GKDiving },
                                    { name: 'Handling', domain: [0, 100], getValue: d => d.GKHandling },
                                    { name: 'Kicking', domain: [0, 100], getValue: d => d.GKKicking },
                                    { name: 'Penalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                    { name: 'Reflexes', domain: [0, 100], getValue: d => d.GKReflexes }
                                ]}
                                width={450}
                                height={400}
                                
                            />
                                    
                                    
                                    :<RadarChart
                                data={[this.state.selectedPlayerDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}
                                
                            />}
                                
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default ArtistsPage

