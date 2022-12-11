import React from 'react';
import { getAllArtworks, getArtworkDetail, getArtworkSearch } from '../fetcher'
import { Card } from 'antd';
const { Meta } = Card;
class MultipleArtworks extends React.Component {


    getArtworkDetail(artwork) {
        getArtworkDetail(artwork).then(res => {

            this.setState({
                artworks: [...this.state.artworks, res.results[0]]
            });
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            artworkIds: props.artworkIds,
            artworks: []
        }
    }
    componentDidMount() {
        this.state.artworkIds.forEach(element => this.getArtworkDetail(element));
    }

    render() {
        return (
            <div>
                {this.state.artworks.length > 0 ?
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                        {this.state.artworks.map((artwork) => {
                            return (
                                <Card onClick={() => { this.props.changeArtWork(artwork.objectID); }}
                                    hoverable
                                    style={{
                                        width: 240,
                                    }}
                                    cover={<img alt="example" src={artwork.iiifThumbURL} />}
                                >
                                    <Meta title={artwork.title} description={artwork.artist} />
                                </Card>)
                        })}

                    </div >
                    : <div>MultipleArtworks</div>}
            </div>

        )
    }
}

export default MultipleArtworks;