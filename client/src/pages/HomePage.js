import React from 'react';
import {
  Table,
  Pagination,
  Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { getAllArtworks, getAllArtists } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


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
    
  }

];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      artworksResults: [],
      artworksPageNumber: 1,
      artworksPageSize: 10,
      artistsResults: [],
      pagination: null  
    }

    this.classificationOnChange = this.classificationOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
  }


  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  classificationOnChange(value) {
   getAllArtworks(null, null, value).then(res => {
      this.setState({ artworksResults: res.results })
    })
    
  }

  componentDidMount() {
    getAllArtworks(null, null, 'painting').then(res => {
      this.setState({ artworksResults: res.results })
    })

    getAllArtists(null,null).then(res => {
      //console.log(res.results)
      this.setState({ artistsResults: res.results })
    })

 
  }


  render() {

    return (
      <div>
        <MenuBar />
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Artists</h3>
          <Table dataSource={this.state.artistsResults} columns={artistsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
        </div>
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
          dataSource={this.state.artworksResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            
              <Column title="Title" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>

              <Column title="Nation" dataIndex="nation" key="nation" sorter= {(a, b) => a.nation.localeCompare(b.nation)}/>

              <Column title="Artist" dataIndex="artist" key="artist" sorter= {(a, b) => a.artist.localeCompare(b.artist)}/>
              
              {/* <Column title="BeginYear" dataIndex="beginYear" key="beginYear" /> */}
              {/* <Column title="FinishYear" dataIndex="endYear" key="endYear" /> */}
              

          </Table>

        </div>


      </div>
    )
  }

}

export default HomePage

